import React from 'react';
import { useParams } from 'react-router-dom';

export default function EventDetail() {
  const { id } = useParams();
  return (
    <div style={{ padding: '2rem 0', textAlign: 'center' }}>
      <h1>Event Detail</h1>
      <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
        Showing details for event ID: {id} (Coming soon)
      </p>
    </div>
  );
}
