import { useState, useEffect } from 'react';
import { BookOpen, CalendarDays, ShoppingCart, Package, BarChart3 } from 'lucide-react';
import {
  Navbar,
  Sidebar,
  ModuleCard,
  AdminResumenMsu,
  ModuloInteractivo,
  Footer,
} from '../components';

const USUARIO = {
  nombre: 'Carlos Admin Sazón',
  correo: 'carlos.admin@nutresa.com',
  iniciales: 'CA',
};

const MODULOS = [
  { id: 'recetario', titulo: 'Recetario', descripcion: 'Explora, crea y organiza el banco de recetas de Sazón.', etiqueta: 'Recetas', icon: BookOpen, destacado: false },
  { id: 'planificador', titulo: 'Planificador Semanal', descripcion: 'Organiza las comidas de cada semana en un calendario claro.', etiqueta: 'Gestión de calendario', icon: CalendarDays, destacado: false },
  { id: 'mercado', titulo: 'Lista de Mercado', descripcion: 'Arma tu lista de compras y controla el presupuesto.', etiqueta: 'Presupuestos', icon: ShoppingCart, destacado: false },
  { id: 'despensa', titulo: 'Despensa', descripcion: 'Controla el inventario de los ingredientes disponibles.', etiqueta: 'Inventario', icon: Package, destacado: false },
  { id: 'estadisticas', titulo: 'Estadísticas Admin', descripcion: 'Consulta el resumen estadístico de planes de menú.', etiqueta: 'Admin', icon: BarChart3, destacado: true },
];

export default function DashboardGeneralView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [vistaActiva, setVistaActiva] = useState('dashboard');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const renderizarContenido = () => {
    if (vistaActiva === 'estadisticas') {
      return <AdminResumenMsu onVolver={() => setVistaActiva('dashboard')} />;
    }

    if (['recetario', 'planificador', 'mercado', 'despensa'].includes(vistaActiva)) {
      return (
        <ModuloInteractivo
          key={vistaActiva}
          moduloId={vistaActiva}
          onVolver={() => setVistaActiva('dashboard')}
        />
      );
    }

    return (
      <>
        <span className="sazon-crumb active">Inicio</span>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--green)', fontWeight: 600, margin: '0.75rem 0 0.35rem 0' }}>
          PANEL DE CONTROL · NUTRESA CULINARY CLOUD
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
          Dashboard General
        </h1>
        <p style={{ margin: 0, fontSize: '0.92rem' }}>
          Accede de forma rápida a los módulos principales del proyecto Sazón.
        </p>

        <section className="sazon-grid">
          {MODULOS.map((modulo) => (
            <ModuleCard
              key={modulo.id}
              modulo={modulo}
              onAbrir={(id) => setVistaActiva(id)}
            />
          ))}
        </section>
      </>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} usuario={USUARIO} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        vistaActiva={vistaActiva}
        onCambiarVista={setVistaActiva}
        usuario={USUARIO}
      />

      <main style={{ flex: 1, maxWidth: '1160px', width: '100%', margin: '0 auto', padding: '1.75rem 1.5rem 3.5rem' }}>
        {renderizarContenido()}
      </main>

      <Footer darkMode={darkMode} onToggleTheme={() => setDarkMode((prev) => !prev)} />
    </div>
  );
}