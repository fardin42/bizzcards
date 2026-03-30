const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
const PLAN_ID = Deno.env.get('RAZORPAY_PLAN_ID'); 

export default async function(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    const { name, email, whatsapp, slug } = await request.json();

    // 1. Create a Razorpay Subscription (₹299/mo + ₹500 setup)
    const subBody = {
      plan_id: PLAN_ID,
      total_count: 120, // 10 years
      quantity: 1,
      customer_notify: 1,
      notes: {
        slug: slug,
        customer_name: name,
        whatsapp: whatsapp
      }
    };

    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
    const rzpResponse = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subBody)
    });

    const subscription = await rzpResponse.json();

    if (!rzpResponse.ok) {
      throw new Error(subscription.error?.description || 'Razorpay subscription creation failed');
    }

    return new Response(JSON.stringify({
      subscriptionId: subscription.id,
      keyId: RAZORPAY_KEY_ID,
    }), { headers });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), { 
      status: 400, 
      headers 
    });
  }
}
