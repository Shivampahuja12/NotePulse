import React from 'react';
import { User } from 'lucide-react';

export default function Header() {
  return (
    <header className="main-header">
      <h1 className="header-title">My Notes</h1>
      <div className="user-avatar" title="User Profile">
        <User size={22} color="#FFFFFF" />
      </div>
    </header>
  );
}
