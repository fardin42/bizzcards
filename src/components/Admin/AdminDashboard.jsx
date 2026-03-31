import React from 'react';

export default function AdminDashboard({ clients, toggleCardStatus, setView }) {
  return (
    <section className="dashboard">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <div>
          <h1>Super Admin</h1>
          <p style={{color: '#a0aec0'}}>Managing all {clients.length} digital cards</p>
        </div>
        <button className="btn-primary" onClick={() => setView('home')}>← View Site</button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Client / Profile</th>
              <th>WhatsApp</th>
              <th>Card Path (Slug)</th>
              <th>Billing</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => {
              const card = client.cards?.[0];
              const sub = card?.subscriptions?.[0];
              return (
                <tr key={i}>
                  <td>
                    <b>{client.name}</b><br/>
                    <span style={{fontSize: '0.8rem', color: '#a0aec0'}}>{client.email}</span>
                  </td>
                  <td>{client.whatsapp}</td>
                  <td>
                    <a href={`/${card?.slug}`} target="_blank" style={{color: 'var(--primary)', textDecoration: 'none'}}>
                      /{card?.slug}
                    </a>
                  </td>
                  <td>
                    {sub ? (
                      <>
                        <span style={{color: sub.last_payment_status === 'captured' ? '#48bb78' : '#ed8936'}}>
                          {sub.last_payment_status.toUpperCase()}
                        </span>
                        <br/>
                        <span style={{fontSize: '0.8rem', opacity: 0.6}}>Next: {new Date(sub.next_bill_date).toLocaleDateString()}</span>
                      </>
                    ) : 'No Data'}
                  </td>
                  <td>
                    <span className={`badge badge-${card?.status || 'pending'}`}>
                      {(card?.status || 'pending').toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {card && (
                      <button 
                        className={`btn-action ${card.status === 'active' ? 'btn-suspend' : 'btn-activate'}`}
                        onClick={() => toggleCardStatus(card.id, card.status)}
                      >
                        {card.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
