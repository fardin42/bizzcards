import React from 'react';

export default function Home({ setView }) {
  return (
    <section className="hero-grid">
      <div className="hero-content">
        <h1 style={{ lineHeight: '1.1' }}>Modern Digital Business Cards for Professionals</h1>
        <p style={{color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '30px'}}>
          Share your contact details instantly with a sleek, one-page digital profile. Join 100+ businesses using MyDigi Cards.
        </p>
        <ul style={{textAlign: 'left', color: 'var(--text-dim)', marginBottom: '30px', paddingLeft: '20px'}}>
          <li>✓ One-click WhatsApp & Save Contact</li>
          <li>✓ Integration with Social Media & Maps</li>
          <li>✓ Interactive Business Profiles</li>
          <li>✓ Eco-friendly & Reusable</li>
        </ul>
        <button className="btn-primary" onClick={() => setView('checkout')}>
          Create Your Card - ₹299/mo
        </button>
      </div>
      
      <div className="hero-preview">
        <iframe 
          src="/jewellery/demo-jeweller/index.html" 
          title="Digital Card Preview"
        />
      </div>
    </section>
  );
}
