import crypto from 'node:crypto';
import { createClient } from 'npm:@insforge/sdk';

export default async function(request) {
  // Handle CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const bodyText = await request.text();
    if (!bodyText) {
       return new Response(JSON.stringify({ error: 'Empty request body' }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, clientData } = JSON.parse(bodyText);

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !clientData) {
      return new Response(JSON.stringify({ error: 'Missing payment or client data' }), { 
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!keySecret) {
      throw new Error('Razorpay secret key not found in environment');
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Invalid payment signature' }), { 
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Payment Verified! Now insert into InsForge Database
    const supabaseUrl = Deno.env.get('INSFORGE_BASE_URL') || Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('ANON_KEY') || Deno.env.get('SUPABASE_ANON_KEY');
    
    // Creating client with just anon key as RLS is off by default
    const supabase = createClient({ baseUrl: supabaseUrl, anonKey: supabaseKey });

    // 1. Insert Profile
    const { data: profile, error: profileError } = await supabase.database
      .from('profiles')
      .insert([{
        name: clientData.name,
        whatsapp: clientData.whatsapp,
        email: clientData.email
      }])
      .select()
      .single();

    if (profileError) throw profileError;

    // 2. Insert Card
    const { data: card, error: cardError } = await supabase.database
      .from('cards')
      .insert([{
        slug: clientData.slug,
        client_id: profile.id,
        status: 'active'
      }])
      .select()
      .single();

    if (cardError) throw cardError;

    // 3. Insert Subscription Record
    const { error: subError } = await supabase.database
      .from('subscriptions')
      .insert([{
        card_id: card.id,
        razorpay_subscription_id: 'pending_setup', // They just paid onboarding. Recurring setup comes later.
        next_bill_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        last_payment_status: 'success'
      }]);

    if (subError) throw subError;

    return new Response(JSON.stringify({ success: true, profile, card }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Verification error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
}
