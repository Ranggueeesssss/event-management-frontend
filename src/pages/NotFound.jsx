import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="empty-state">
      <FileQuestion size={48} style={{ color: 'var(--text-muted)' }} />
      <h1>404 - Page Not Found</h1>
      <p style={{ maxWidth: '400px', color: 'var(--text-secondary)' }}>
        Oops! The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
