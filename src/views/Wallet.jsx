import React, { useState, useEffect } from 'react';

export default function Wallet({ setView }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bizzcards_wallet');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sort newest first
        parsed.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setCards(parsed);
      } catch (e) {
        console.error('Failed to parse wallet data', e);
      }
    }
  }, []);

  const removeCard = (idToRemove) => {
    const updated = cards.filter(card => card.id !== idToRemove);
    setCards(updated);
    localStorage.setItem('bizzcards_wallet', JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => setView('home')} style={styles.backBtn}>← Home</button>
        <h1 style={styles.title}>My Wallet</h1>
      </header>

      {cards.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🪪</div>
          <h2 style={styles.emptyTitle}>Your wallet is empty</h2>
          <p style={styles.emptyText}>Scan a Bizzcard and tap "Add to Wallet" to save contacts here for quick access.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {cards.map(card => (
            <div key={card.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <img src={card.avatar} alt={card.name} style={styles.avatar} />
                <div style={styles.info}>
                  <h3 style={styles.name}>{card.name}</h3>
                  <p style={styles.titleText}>{card.title}</p>
                  <p style={styles.company}>{card.company}</p>
                </div>
                <button onClick={() => removeCard(card.id)} style={styles.removeBtn} title="Remove">×</button>
              </div>
              
              <div style={styles.actions}>
                <a href={card.url} style={{...styles.actionBtn, background: '#1a365d', color: '#fff'}}>
                  View Card
                </a>
              </div>
            </div>
          ))}

          {/* Add a banner at the bottom to create their own card */}
          <div style={styles.createBanner}>
            <p style={{ margin: '0 0 10px 0', color: '#a0aec0', fontSize: '0.9rem' }}>Want a card like this?</p>
            <button onClick={() => setView('checkout')} style={styles.createBtn}>
              Create Your Own Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '80vh',
    fontFamily: "'Outfit', sans-serif",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #2d3748',
    paddingBottom: '15px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#a0aec0',
    cursor: 'pointer',
    fontSize: '1rem',
    marginRight: '20px',
  },
  title: {
    fontSize: '1.8rem',
    color: '#fff',
    margin: 0,
    fontWeight: '700',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    background: '#1a202c',
    borderRadius: '16px',
    border: '1px dashed #4a5568',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '15px',
    opacity: 0.8,
  },
  emptyTitle: {
    fontSize: '1.4rem',
    color: '#e2e8f0',
    marginBottom: '10px',
  },
  emptyText: {
    color: '#a0aec0',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    background: '#1a202c',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #2d3748',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #fff',
  },
  info: {
    flex: 1,
  },
  name: {
    margin: '0 0 4px 0',
    fontSize: '1.2rem',
    color: '#fff',
    fontWeight: '600',
  },
  titleText: {
    margin: '0 0 2px 0',
    fontSize: '0.9rem',
    color: '#a0aec0',
  },
  company: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#fbbf24',
    fontWeight: '500',
  },
  removeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    color: '#718096',
    fontSize: '1.5rem',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  actionBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'transform 0.2s',
  },
  createBanner: {
    marginTop: '20px',
    padding: '20px',
    background: '#1a202c',
    borderRadius: '16px',
    border: '1px solid #2d3748',
    textAlign: 'center',
  },
  createBtn: {
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  }
};
