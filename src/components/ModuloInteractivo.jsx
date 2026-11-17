import { useState } from 'react';
import { ChevronRight, CheckCircle2, Circle, Plus, Search } from 'lucide-react';

const DATOS_MODULOS = {
  recetario: {
    titulo: 'Banco de Recetas Institucionales',
    subtitulo: 'Catálogo estandarizado con aportes calóricos y alérgenos verificados.',
    etiqueta: 'RECETARIO · NUTRESA CULINARY CLOUD',
    badgeCompletado: 'Aprobada',
    badgePendiente: 'En revisión',
    items: [
      { id: 1, nombre: 'Pechuga a la Plancha con Espinacas', detalle: '420 kcal · 38g Proteína · 25 min', listo: true },
      { id: 2, nombre: 'Bowl de Arroz Integral y Vegetales', detalle: '390 kcal · 14g Proteína · 20 min', listo: true },
      { id: 3, nombre: 'Tortilla Campesina con Tomate Chonto', detalle: '310 kcal · 19g Proteína · 15 min', listo: false },
    ],
  },
  planificador: {
    titulo: 'Planificador Semanal de Comidas',
    subtitulo: 'Organización de minutas diarias (Desayuno, Almuerzo, Media Tarde y Cena) para el ciclo actual.',
    etiqueta: 'GESTIÓN DE CALENDARIO · SEMANA ACTUAL',
    badgeCompletado: 'Completado',
    badgePendiente: 'Programado',
    items: [
      { id: 1, nombre: 'Lunes — Almuerzo: Pechuga a la Plancha + Arroz Integral', detalle: '640 kcal · Minuta Institucional #104', listo: true },
      { id: 2, nombre: 'Martes — Almuerzo: Salmón al Horno + Ensalada de Espinacas', detalle: '590 kcal · Minuta Institucional #108', listo: true },
      { id: 3, nombre: 'Miércoles — Cena: Tortilla Campesina con Tomate Chonto', detalle: '340 kcal · Minuta Ligera #112', listo: false },
      { id: 4, nombre: 'Jueves — Almuerzo: Bowl Proteico de Pollo y Aguacate', detalle: '615 kcal · Minuta Institucional #115', listo: false },
    ],
  },
  mercado: {
    titulo: 'Lista de Mercado Semanal',
    subtitulo: 'Control de compras e insumos requeridos para las minutas activas.',
    etiqueta: 'PRESUPUESTOS · LISTA DE COMPRAS',
    badgeCompletado: 'Comprado',
    badgePendiente: 'Por comprar',
    items: [
      { id: 1, nombre: 'Pechuga de Pollo Fresca (4 kg)', detalle: '$68,000 COP · Proteína', listo: true },
      { id: 2, nombre: 'Arroz Integral Premium (5 kg)', detalle: '$24,500 COP · Granos', listo: false },
      { id: 3, nombre: 'Espinaca Tierna Orgánica (12 atados)', detalle: '$19,200 COP · Vegetales', listo: false },
      { id: 4, nombre: 'Huevos Campesinos AA (2 cubetas)', detalle: '$34,000 COP · Lácteos y Huevos', listo: true },
    ],
  },
  despensa: {
    titulo: 'Inventario de Despensa',
    subtitulo: 'Disponibilidad de ingredientes en bodega y alertas de reposición.',
    etiqueta: 'INVENTARIO · CONTROL DE STOCK',
    badgeCompletado: 'Stock Óptimo',
    badgePendiente: 'Reponer pronto',
    items: [
      { id: 1, nombre: 'Arroz Blanco / Integral', detalle: 'Stock: 18 kg · Bodega Principal', listo: true },
      { id: 2, nombre: 'Tomate Chonto Orgánico', detalle: 'Stock: 6.5 kg · Cámara Fría', listo: true },
      { id: 3, nombre: 'Aceite de Oliva Extra Virgen', detalle: 'Stock: 1.2 L · Nivel Mínimo', listo: false },
    ],
  },
};

export default function ModuloInteractivo({ moduloId, onVolver }) {
  const config = DATOS_MODULOS[moduloId] || DATOS_MODULOS.recetario;
  const [items, setItems] = useState(config.items);
  const [filtro, setFiltro] = useState('');
  const [nuevoItem, setNuevoItem] = useState('');

  const alternarItem = (id) => {
    setItems(items.map((it) => (it.id === id ? { ...it, listo: !it.listo } : it)));
  };

  const agregarItem = (e) => {
    e.preventDefault();
    if (!nuevoItem.trim()) return;
    setItems([
      {
        id: Date.now(),
        nombre: nuevoItem.trim(),
        detalle: 'Agregado manualmente · Ciclo actual',
        listo: false,
      },
      ...items,
    ]);
    setNuevoItem('');
  };

  const visibles = items.filter((it) =>
    it.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <nav className="sazon-breadcrumbs" aria-label="Breadcrumb">
        <button className="sazon-crumb" onClick={onVolver}>Inicio</button>
        <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
        <span className="sazon-crumb active" style={{ textTransform: 'capitalize' }}>
          {moduloId === 'planificador' ? 'Planificador Semanal' : moduloId}
        </span>
      </nav>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--green)', fontWeight: 600, marginBottom: '0.3rem' }}>
        {config.etiqueta}
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
        {config.titulo}
      </h1>
      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.88rem' }}>{config.subtitulo}</p>

      <div className="sazon-card">
        <div className="sazon-filter-bar">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={15} style={{ position: 'absolute', left: 10, color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="sazon-input"
              style={{ paddingLeft: '2rem' }}
              placeholder="Filtrar elementos..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <form onSubmit={agregarItem} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="sazon-input"
              placeholder="Nuevo registro..."
              value={nuevoItem}
              onChange={(e) => setNuevoItem(e.target.value)}
            />
            <button type="submit" className="sazon-btn-lime">
              <Plus size={15} /> Agregar
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {visibles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No se encontraron registros con ese filtro.
            </div>
          ) : (
            visibles.map((it) => (
              <div
                key={it.id}
                onClick={() => alternarItem(it.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {it.listo ? (
                    <CheckCircle2 size={18} style={{ color: 'var(--green)' }} />
                  ) : (
                    <Circle size={18} style={{ color: 'var(--text-muted)' }} />
                  )}
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        color: 'var(--text-primary)',
                        textDecoration: it.listo && moduloId === 'mercado' ? 'line-through' : 'none',
                      }}
                    >
                      {it.nombre}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{it.detalle}</div>
                  </div>
                </div>
                <span className="sazon-pill">
                  {it.listo ? config.badgeCompletado : config.badgePendiente}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}