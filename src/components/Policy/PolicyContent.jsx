import React from 'react';

export default function PolicyContent({ type }) {
  const policies = {
    privacy: (
      <div className="policy-content">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. This Privacy Policy explains how MyDigi Cards collects, uses, and protects your information.</p>
        
        <h2>Information We Collect</h2>
        <ul>
          <li><b>Personal Details:</b> Name, email address, and WhatsApp number.</li>
          <li><b>Business Details:</b> Business name, category, and any social links you provide for your card.</li>
          <li><b>Payment Info:</b> We do not store credit card details; all payments are processed securely by Razorpay.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to create your digital business card, manage your subscription, and contact you for support or important updates.</p>

        <h2>Security</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your details.</p>
      </div>
    ),
    terms: (
      <div className="policy-content">
        <h1>Terms & Conditions</h1>
        <p>By using MyDigi Cards, you agree to comply with and be bound by the following terms and conditions of use.</p>

        <h2>Use of Service</h2>
        <p>MyDigi Cards provides digital business card solutions. You are responsible for ensuring the accuracy of the information provided on your card.</p>

        <h2>Subscription & Billing</h2>
        <p>Our service is based on a recurring subscription model. By subscribing, you authorize us to charge the applicable fees to your chosen payment method.</p>

        <h2>Account Termination</h2>
        <p>We reserve the right to suspend or terminate accounts that violate our terms or engage in fraudulent activities.</p>
      </div>
    ),
    refund: (
      <div className="policy-content">
        <h1>Refund & Cancellation Policy</h1>
        <p>At MyDigi Cards, we strive for customer satisfaction.</p>

        <h2>Cancellation</h2>
        <p>You can cancel your subscription at any time through your dashboard or by contacting support. Once cancelled, your card will remain active until the end of the current billing cycle.</p>

        <h2>Refunds</h2>
        <p>Refunds are processed under the following conditions:</p>
        <ul>
          <li>If there is a technical failure that prevents your card from being activated.</li>
          <li>If you request a refund within 24 hours of your first payment and have not yet shared your card more than 5 times.</li>
        </ul>
        <p>Refunds typically take 5-7 business days to reflect in your original payment method.</p>
      </div>
    ),
    contact: (
      <div className="policy-content">
        <h1>Contact Us</h1>
        <p>If you have any questions about these policies or our service, please contact us:</p>
        
        <div style={{ marginTop: '20px' }}>
          <p><b>Business Name:</b> MyDigi Cards</p>
          <p><b>Email:</b> contact@pgrowmedia.com</p>
          <p><b>Address:</b> FL NO B 1302 SHREEJI, EXCELENCIA SERENE MEADOW, SAWARKAR NAGAR GANGAPUR ROAD, Nashik, MH, 422013</p>
          <p><b>Support Hours:</b> Mon-Sat, 10 AM - 6 PM IST</p>
        </div>
      </div>
    ),
    about: (
      <div className="policy-content">
        <h1>About Us</h1>
        <p>Welcome to MyDigi Cards, your partner in modern networking.</p>
        <p>We provide professionals and businesses with sleek, interactive, and environmentally friendly digital business cards. Our mission is to help you make a lasting impression in a digital-first world.</p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li><b>Instant Sharing:</b> Share via QR, WhatsApp, or Link.</li>
          <li><b>Dynamic Updates:</b> Update your details anytime without reprinted.</li>
          <li><b>Eco-Friendly:</b> Save paper and go digital.</li>
        </ul>
      </div>
    )
  };

  return policies[type] || policies.privacy;
}
