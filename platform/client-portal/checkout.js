// Replace with your InsForge project details
const INSFORGE_URL = 'https://r5t9vg65.ap-southeast.insforge.app';
const INSFORGE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjAyNTl9.ZYRuDmsTRC5Ynnmv_6-v954E7au7aMObeS-MZgKkubA'; // Get from Dashboard -> API Settings

// For now, we will use a fetch directly to the edge function. 
// Edge functions don't enforce RLS by themselves but we pass the anon key in headers.

document.getElementById('onboarding-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const loadingSpinner = submitBtn.querySelector('.spinner');
    const btnText = submitBtn.querySelector('.btn-text');
    
    // Reset state
    submitBtn.disabled = true;
    loadingSpinner.style.display = 'inline-block';
    btnText.textContent = 'Processing...';
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    const formData = {
        name: document.getElementById('name').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        slug: document.getElementById('slug').value,
    };
    
    try {
        // Step 1: Call our Edge Function to create a Razorpay Subscription
        const orderResponse = await fetch(`${INSFORGE_URL}/functions/create-razorpay-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${INSFORGE_ANON_KEY}`
            },
            body: JSON.stringify(formData)
        });
        
        const result = await orderResponse.json();
        
        if (!orderResponse.ok) {
            throw new Error(result.error || 'Failed to initialize subscription.');
        }

        // Step 2: Initialize Razorpay Checkout for Subscriptions
        const options = {
            "key": result.keyId,
            "subscription_id": result.subscriptionId, // Use subscription_id instead of order_id
            "name": "Digital Cards Platform",
            "description": "Premium Onboarding & ₹249/mo Plan",
            "image": "https://example.com/your_logo.png",
            "handler": async function (response){
                // Step 3: Verify Subscription Payment on Backend
                loadingSpinner.style.display = 'inline-block';
                btnText.textContent = 'Verifying...';
                
                try {
                    const verifyResponse = await fetch(`${INSFORGE_URL}/functions/verify-razorpay-payment`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${INSFORGE_ANON_KEY}`
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_subscription_id: response.razorpay_subscription_id,
                            razorpay_signature: response.razorpay_signature,
                            clientData: formData
                        })
                    });
                    
                    if (verifyResponse.ok) {
                        formMessage.className = 'form-message success';
                        formMessage.textContent = 'Payment successful! Your onboarding is complete.';
                        document.getElementById('onboarding-form').reset();
                        btnText.textContent = 'Successfully Onboarded';
                    } else {
                        throw new Error('Payment verification failed.');
                    }
                } catch(err) {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = err.message;
                    submitBtn.disabled = false;
                    loadingSpinner.style.display = 'none';
                    btnText.textContent = 'Pay ₹500 & Onboard';
                }
            },
            "prefill": {
                "name": formData.name,
                "email": formData.email,
                "contact": formData.whatsapp
            },
            "theme": {
                "color": "#4f46e5"
            }
        };

        const rzp1 = new Razorpay(options);
        
        rzp1.on('payment.failed', function (response){
            formMessage.className = 'form-message error';
            formMessage.textContent = `Payment failed: ${response.error.description}`;
            submitBtn.disabled = false;
            loadingSpinner.style.display = 'none';
            btnText.textContent = 'Pay ₹500 & Onboard';
        });

        rzp1.open();

    } catch (err) {
        formMessage.className = 'form-message error';
        formMessage.textContent = err.message;
        submitBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        btnText.textContent = 'Pay ₹500 & Onboard';
    }
});
