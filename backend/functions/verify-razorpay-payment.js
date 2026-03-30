import { createClient } from 'npm:@insforge/sdk';

const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
const DB_URL = Deno.env.get('INSFORGE_BASE_URL');
const ANON_KEY = Deno.env.get('ANON_KEY');

export default async function(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });

  try {
    const body = await request.json();
    // VERSION 2.1 - REDEPLOY
    console.log("Full Body Received:", JSON.stringify(body));

    const { 
      razorpay_payment_id, 
      razorpay_subscription_id, 
      razorpay_signature, 
      clientData 
    } = body;

    // Verbose error to ensure we are running the new code
    if (!razorpay_subscription_id) {
        throw new Error(`DEBUG_V2.1: Missing razorpay_subscription_id. Received keys: ${Object.keys(body).join(', ')}`);
    }
    if (!razorpay_signature) {
        throw new Error(`Missing razorpay_signature. Received keys: ${Object.keys(body).join(', ')}`);
    }
    if (!clientData) {
        throw new Error("Missing clientData");
    }
    // Only throw if BOTH are missing (optional fallback)
    if (!razorpay_payment_id && !razorpay_subscription_id) {
        throw new Error(`Missing payment/subscription ID. Received: ${Object.keys(body).join(', ')}`);
    }

    // 1. Verify Razorpay Signature
    // If payment_id is missing, we use subscription_id for the HMAC string
    const signData = razorpay_payment_id 
        ? `${razorpay_payment_id}|${razorpay_subscription_id}` 
        : razorpay_subscription_id;
        
    const expectedSignature = await computeHmac(signData, RAZORPAY_KEY_SECRET || "");

    // Note: If verification fails here, we still want to log it
    if (expectedSignature !== razorpay_signature) {
      console.error(`Signature Mismatch. Expected: ${expectedSignature}, Got: ${razorpay_signature}`);
      throw new Error('Invalid payment signature');
    }

    // 2. Save Client to Database
    const client = createClient({ 
      baseUrl: DB_URL || "", 
      anonKey: ANON_KEY || "" 
    });
    
    // Create Profile
    const { data: profile, error: pError } = await client.database.from('profiles')
      .insert([{ 
        name: clientData.name, 
        whatsapp: clientData.whatsapp, 
        email: clientData.email 
      }])
      .select()
      .single();

    if (pError) throw new Error(`Profile creation failed: ${pError.message}`);

    // Create Card
    const { data: card, error: cError } = await client.database.from('cards')
      .insert([{ 
        slug: clientData.slug, 
        client_id: profile.id, 
        status: 'active' 
      }])
      .select()
      .single();

    if (cError) throw new Error(`Card creation failed: ${cError.message}`);

    // Create Subscription record
    const { error: sError } = await client.database.from('subscriptions')
      .insert([{
        card_id: card.id,
        razorpay_subscription_id: razorpay_subscription_id,
        is_autopay_enabled: true,
        last_payment_status: 'captured',
        next_bill_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }]);

    if (sError) throw new Error(`Subscription tracking failed: ${sError.message}`);

    return new Response(JSON.stringify({ success: true }), { headers });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Verification Error:", msg);
    return new Response(JSON.stringify({ error: msg }), { status: 400, headers });
  }
}

async function computeHmac(data, secret) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, msgData);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
