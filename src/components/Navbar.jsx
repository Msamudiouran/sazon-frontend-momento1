import { Menu } from 'lucide-react';

export default function Navbar({ onOpenSidebar, usuario }) {
  return (
    <header className="sazon-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <button className="sazon-menu-btn" onClick={onOpenSidebar} aria-label="Abrir menú">
          <Menu size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
          >
            <circle cx="32" cy="32" r="32" fill="#215B33" />
            <circle cx="29" cy="32" r="10.5" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="29" cy="32" r="4" fill="#7FBA00" />
            <path d="M39.5 32H50" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M24 16.5C24 14.5 26 14.5 26 12.5" stroke="#7FBA00" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M30 15.5C30 13.5 32 13.5 32 11.5" stroke="#7FBA00" strokeWidth="2.2" strokeLinecap="round" />
          </svg>

          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Sazón
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--green)' }}>
              GESTIÓN CULINARIA
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            {usuario.nombre}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {usuario.correo}
          </div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green21)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>
          {usuario.iniciales}
        </div>
      </div>
    </header>
  );
}