import { Moon, Sun } from 'lucide-react';

export default function Footer({ darkMode, onToggleTheme }) {
  return (
    <>
      <footer className="sazon-footer">
        <div>© 2026 Grupo Nutresa S.A. Todos los derechos reservados.</div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span>Resumen de Planes</span>
          <span>Banco de Recetas</span>
          <span>soporte.sazon@nutresa.com</span>
        </div>
      </footer>

      <button className="sazon-theme-fab" onClick={onToggleTheme}>
        {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        {darkMode ? 'Modo Día' : 'Modo Noche'}
      </button>
    </>
  );
}