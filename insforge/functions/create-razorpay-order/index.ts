// Deno uses ES modules. We don't need 'node:buffer' for simple conversions
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

    const { name, email, whatsapp, slug } = JSON.parse(bodyText);

    if (!name || !email || !whatsapp || !slug) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Access secrets stored in InsForge via Deno.env 
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!keyId || !keySecret) {
      console.error('Razorpay keys are not set in the environment');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Razorpay requires Basic Auth: base64(key_id:key_secret)
    const token = btoa(`${keyId}:${keySecret}`);

    // Create an order in Razorpay for ₹500
    const orderPayload = {
      amount: 50000,
      currency: "INR",
      receipt: `receipt_${slug}_${Date.now()}`
    };

    const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    const rzpData = await rzpResponse.json();

    if (!rzpResponse.ok) {
      console.error('Razorpay Order Error:', rzpData);
      return new Response(JSON.stringify({ error: 'Failed to create payment order with Razorpay' }), { 
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Return the Order ID and Public Key to the frontend
    return new Response(JSON.stringify({
      orderId: rzpData.id,
      amount: rzpData.amount,
      keyId: keyId
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Function error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
