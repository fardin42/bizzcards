import React, { useState, useEffect } from 'react';

export default function Home({ setView }) {
  const [walletCards, setWalletCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bizzcards_wallet');
    if (saved) {
      try {
        setWalletCards(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <section className="hero-grid">
      {walletCards.length > 0 && (
        <div 
          onClick={() => setView('wallet')}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#1a365d',
            padding: '8px 16px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', marginRight: '5px' }}>
            {walletCards.slice(0, 3).map((card, idx) => (
              <img 
                key={card.id} 
                src={card.avatar} 
                alt="card" 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '2px solid #1a365d',
                  marginLeft: idx === 0 ? '0' : '-10px',
                  objectFit: 'cover'
                }} 
              />
            ))}
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>My Wallet ➔</span>
        </div>
      )}

      <div className="hero-content">
        <h1 style={{ lineHeight: '1.1' }}>Modern Digital Business Cards for Professionals</h1>
        <p style={{color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '30px'}}>
          Share your contact details instantly with a sleek, one-page digital profile. Join 100+ businesses using Bizzcards.
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
        <div className="preview-placeholder">
          <span>📱</span>
          <p>Preview Coming Soon</p>
        </div>
      </div>
    </section>
  );
}
