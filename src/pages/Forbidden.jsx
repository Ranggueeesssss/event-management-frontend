import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Forbidden() {
  return (
    <div className="empty-state">
      <ShieldAlert size={48} style={{ color: 'var(--danger)' }} />
      <h1>403 - Forbidden</h1>
      <p style={{ maxWidth: '400px', color: 'var(--text-secondary)' }}>
        Access Denied. You do not have the required permissions to view this resource.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
