import React from 'react';

export default function ThankYou({ paidSlug, setView }) {
  return (
    <section className="thank-you-view">
      <div className="thank-you-card" style={{ maxWidth: '500px', padding: '40px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
        <h1 style={{ fontSize: '2rem' }}>Payment Successful!</h1>
        <p style={{ color: 'var(--text-dim)' }}>Your digital card is being generated. You can find it live at:</p>
        
        <div className="live-link-box">
           mydigi.cards/{paidSlug}
        </div>
        
        <div className="step-card">
          <h3 style={{ marginBottom: '15px', color: 'var(--text)' }}>What happens next?</h3>
          <div className="step-item">
            <span className="step-number">1</span>
            <span>Our designers will start customizing your template.</span>
          </div>
          {/* <div className="step-item">
            <span className="step-number">2</span>
            <span>You'll receive a WhatsApp message once it's live.</span>
          </div> */}
          <div className="step-item">
            <span className="step-number">2</span>
            <span>Your card will be active within 72 hours.</span>
          </div>
        </div>
        
        <button className="btn-primary" onClick={() => setView('home')} style={{marginTop: '30px', width: '100%' }}>
          Back to Website
        </button>
      </div>
    </section>
  );
}
