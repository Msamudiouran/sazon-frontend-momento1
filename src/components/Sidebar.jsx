import { useState } from 'react';
import {
  X, Gauge, LayoutGrid, MessageSquare, Package, ShoppingCart,
  HeartPulse, CalendarDays, BookOpen, Users, Settings, ChevronDown, UtensilsCrossed
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard General', icon: Gauge },
  { id: 'catalogo', label: 'Catálogo', icon: LayoutGrid },
  { id: 'comunidad', label: 'Comunidad', icon: MessageSquare },
  { id: 'despensa', label: 'Despensa', icon: Package },
  { id: 'mercado', label: 'Lista de Mercado', icon: ShoppingCart },
  { id: 'nutricion', label: 'Nutrición', icon: HeartPulse },
  { id: 'planificador', label: 'Planificador', icon: CalendarDays, sub: true },
  { id: 'recetario', label: 'Recetario', icon: BookOpen },
  { id: 'usuarios', label: 'Usuarios', icon: Users, sub: true },
];

export default function Sidebar({ isOpen, onClose, vistaActiva, onCambiarVista, usuario }) {
  const [planificadorAbierto, setPlanificadorAbierto] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="sazon-overlay" onClick={onClose} />
      <aside className="sazon-sidebar">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              <span style={{ background: 'var(--green11)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                <UtensilsCrossed size={16} />
              </span>
              Sazón
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ fontSize: '0.68rem', letterSpacing: '0.08em', opacity: 0.75, margin: '1rem 0 0.5rem 0.5rem' }}>
            MÓDULOS
          </div>

          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const esPlanificador = item.id === 'planificador';
            const activo = vistaActiva === item.id || (esPlanificador && vistaActiva === 'estadisticas');

            return (
              <div key={item.id}>
                <button
                  className={`sazon-nav-item ${activo ? 'active' : ''}`}
                  onClick={() => {
                    if (esPlanificador) {
                      setPlanificadorAbierto((prev) => !prev);
                    } else {
                      onCambiarVista(item.id);
                      onClose();
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <Icon size={17} /> {item.label}
                  </span>
                  {item.sub && (
                    <ChevronDown
                      size={15}
                      style={{
                        transform: esPlanificador && planificadorAbierto ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  )}
                </button>

                {esPlanificador && planificadorAbierto && (
                  <div className="sazon-submenu">
                    <button
                      className={`sazon-subitem ${vistaActiva === 'estadisticas' ? 'active' : ''}`}
                      onClick={() => { onCambiarVista('estadisticas'); onClose(); }}
                    >
                      Resumen de Planes
                    </button>
                    <button
                      className="sazon-subitem"
                      onClick={() => { onCambiarVista('estadisticas'); onClose(); }}
                    >
                      Métricas de Menú
                    </button>
                    <button
                      className="sazon-subitem"
                      onClick={() => { onCambiarVista('estadisticas'); onClose(); }}
                    >
                      Ir a Plan Semanal
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', margin: '0.75rem 0' }} />
          <button className="sazon-nav-item" onClick={onClose}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <Settings size={17} /> Configuración
            </span>
          </button>
        </div>

        <div style={{ background: 'var(--green11)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '1rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--green56)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
            {usuario.iniciales}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>Carlos Admin</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.85 }}>
              {usuario.correo}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}