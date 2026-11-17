import { useState } from 'react';
import {
  Plus, Download, ClipboardCheck, Target, Award, HeartPulse,
  CheckCircle2, ArrowRight, Search, XCircle, ChevronRight
} from 'lucide-react';

const BARRAS_SEMANAS = [
  { etiqueta: 'S1', valor: 140, altura: '48%' },
  { etiqueta: 'S2', valor: 165, altura: '56%' },
  { etiqueta: 'S3', valor: 198, altura: '68%' },
  { etiqueta: 'S4', valor: 180, altura: '62%' },
  { etiqueta: 'S5', valor: 215, altura: '74%' },
  { etiqueta: 'S6', valor: 240, altura: '82%' },
  { etiqueta: 'S7', valor: 230, altura: '79%' },
  { etiqueta: 'S8*', valor: 290, altura: '100%', destacado: true },
];

const BARRAS_MESES = [
  { etiqueta: 'May', valor: 480, altura: '55%' },
  { etiqueta: 'Jun', valor: 530, altura: '61%' },
  { etiqueta: 'Jul', valor: 610, altura: '70%' },
  { etiqueta: 'Ago', valor: 590, altura: '68%' },
  { etiqueta: 'Sep', valor: 720, altura: '83%' },
  { etiqueta: 'Oct', valor: 865, altura: '100%', destacado: true },
];

const TOP_INGREDIENTES = [
  { pos: 1, nombre: 'Pollo / Pechuga fresca', minutas: '1,480 minutas (38%)', pct: 88, emoji: '🍗' },
  { pos: 2, nombre: 'Arroz Integral / Blanco', minutas: '1,210 minutas (32%)', pct: 74, emoji: '🍚' },
  { pos: 3, nombre: 'Espinacas Tiernas', minutas: '945 minutas (25%)', pct: 60, emoji: '🥬' },
  { pos: 4, nombre: 'Tomate Chonto Orgánico', minutas: '820 minutas (21%)', pct: 50, emoji: '🍅' },
  { pos: 5, nombre: 'Huevos Campesinos AA', minutas: '760 minutas (19%)', pct: 44, emoji: '🥚' },
];

const PLANES_ESTATICOS = [
  { idUsuario: 'USR-1042', usuario: 'Andrés Vélez Hurtado', nombrePlan: 'Plan Balanceado Alto Proteína', rangoSemanal: '16 Nov - 22 Nov', comidas: '21 / 28', estado: 'Activo' },
  { idUsuario: 'USR-1089', usuario: 'Luis Loaiza', nombrePlan: 'Minuta Vegetariana Semanal', rangoSemanal: '16 Nov - 22 Nov', comidas: '18 / 28', estado: 'Borrador' },
  { idUsuario: 'USR-1104', usuario: 'Miguel Ángel Samudio', nombrePlan: 'Plan Rendimiento Deportivo', rangoSemanal: '09 Nov - 15 Nov', comidas: '28 / 28', estado: 'Completado' },
  { idUsuario: 'USR-1127', usuario: 'Carlos Admin Sazón', nombrePlan: 'Minuta Institucional Nutresa', rangoSemanal: '16 Nov - 22 Nov', comidas: '24 / 28', estado: 'Activo' },
];

export default function AdminResumenMsu({ onVolver }) {
  const [periodo, setPeriodo] = useState('semanas');
  const [planes, setPlanes] = useState(PLANES_ESTATICOS);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [nuevoNombrePlan, setNuevoNombrePlan] = useState('');

  const barrasActivas = periodo === 'semanas' ? BARRAS_SEMANAS : BARRAS_MESES;

  const planesFiltrados = planes.filter((p) => {
    const coincideTexto =
      p.idUsuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.nombrePlan.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || p.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  const handleCrearPlan = (e) => {
    e.preventDefault();
    if (!nuevoUsuario.trim() || !nuevoNombrePlan.trim()) return;
    const nuevo = {
      idUsuario: `USR-${1130 + planes.length}`,
      usuario: nuevoUsuario.trim(),
      nombrePlan: nuevoNombrePlan.trim(),
      rangoSemanal: '23 Nov - 29 Nov',
      comidas: '14 / 28',
      estado: 'Activo',
    };
    setPlanes([nuevo, ...planes]);
    setNuevoUsuario('');
    setNuevoNombrePlan('');
    setMostrarForm(false);
  };

  const exportarCSV = () => {
    const filas = [
      ['ID Usuario', 'Usuario', 'Nombre del Plan', 'Rango Semanal', 'Comidas', 'Estado'],
      ...planesFiltrados.map((p) => [p.idUsuario, p.usuario, p.nombrePlan, p.rangoSemanal, p.comidas, p.estado]),
    ];
    const contenido = filas.map((f) => f.join(',')).join('\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'metricas-planes-sazon.csv';
    enlace.click();
    URL.revokeObjectURL(url);
  };

  const alternarEstado = (idUsuario) => {
    setPlanes(
      planes.map((p) =>
        p.idUsuario === idUsuario
          ? { ...p, estado: p.estado === 'Activo' ? 'Completado' : 'Activo' }
          : p
      )
    );
  };

  return (
    <div>
      {/* Breadcrumbs: Inicio > Planificador > Resumen de Planes */}
      <nav className="sazon-breadcrumbs" aria-label="Breadcrumb">
        <button className="sazon-crumb" onClick={onVolver}>Inicio</button>
        <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
        <button className="sazon-crumb" onClick={onVolver}>Planificador</button>
        <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
        <span className="sazon-crumb active">Resumen de Planes</span>
      </nav>

      {/* Cabecera */}
      <div className="sazon-header-row">
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--green)', fontWeight: 600, marginBottom: '0.3rem' }}>
            MÓDULO ADMIN · NUTRESA CULINARY CLOUD
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
            Resumen Estadístico de Planes de Menú
          </h1>
          <p style={{ margin: 0, fontSize: '0.88rem' }}>
            Supervisión integral de planeación culinaria e inventario de minutas alimentarias.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button className="sazon-btn-lime" onClick={() => setMostrarForm((prev) => !prev)}>
            <Plus size={16} /> Nuevo Plan Base
          </button>
          <button className="sazon-btn-outline" onClick={exportarCSV}>
            <Download size={15} /> Exportar Métricas
          </button>
        </div>
      </div>

      {/* Formulario desplegable para crear un plan nuevo */}
      {mostrarForm && (
        <form
          onSubmit={handleCrearPlan}
          className="sazon-card"
          style={{ marginBottom: '1.25rem', flexDirection: 'row', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}
        >
          <input
            type="text"
            className="sazon-input"
            placeholder="Nombre del responsable (ej. Laura Gómez)"
            value={nuevoUsuario}
            onChange={(e) => setNuevoUsuario(e.target.value)}
            required
          />
          <input
            type="text"
            className="sazon-input"
            placeholder="Nombre de la minuta (ej. Plan Bajo en Sodio)"
            value={nuevoNombrePlan}
            onChange={(e) => setNuevoNombrePlan(e.target.value)}
            required
          />
          <button type="submit" className="sazon-btn-lime">Guardar Plan</button>
          <button type="button" className="sazon-btn-outline" onClick={() => setMostrarForm(false)}>Cancelar</button>
        </form>
      )}

      {/* Fila 1: 4 Tarjetas KPI */}
      <section className="sazon-kpi-grid">
        <article className="sazon-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
            <span className="sazon-kpi-label">TOTAL PLANES CREADOS</span>
            <ClipboardCheck size={17} style={{ color: 'var(--green)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="sazon-kpi-value">{(1424 + planes.length).toLocaleString('es-CO')}</span>
            <span className="sazon-pill">+12%</span>
          </div>
        </article>

        <article className="sazon-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
            <span className="sazon-kpi-label">PROMEDIO COMIDAS/USUARIO</span>
            <Target size={17} style={{ color: 'var(--green)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
            <span className="sazon-kpi-value">18.4</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 28 comidas</span>
          </div>
        </article>

        <article className="sazon-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
            <span className="sazon-kpi-label">INGREDIENTE TOP #1</span>
            <Award size={17} style={{ color: 'var(--green)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Pechuga
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            612 minutas preparadas
          </div>
        </article>

        <article className="sazon-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
            <span className="sazon-kpi-label">EQUILIBRIO SALUDABLE</span>
            <HeartPulse size={17} style={{ color: 'var(--green)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="sazon-kpi-value">74%</span>
            <span className="sazon-pill">Óptimo</span>
          </div>
        </article>
      </section>

      {/* Fila 2: Volumen de Planes Creados + Estado de Planes (Dona 68%) */}
      <section className="sazon-two-col">
        <article className="sazon-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0' }}>
                Volumen de Planes Creados
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Distribución {periodo === 'semanas' ? 'semanal en el ciclo bimensual actual' : 'mensual consolidada'}
              </p>
            </div>

            <div className="sazon-toggle-group">
              <button
                className={`sazon-toggle-btn ${periodo === 'semanas' ? 'active' : ''}`}
                onClick={() => setPeriodo('semanas')}
              >
                Semanas
              </button>
              <button
                className={`sazon-toggle-btn ${periodo === 'meses' ? 'active' : ''}`}
                onClick={() => setPeriodo('meses')}
              >
                Meses
              </button>
            </div>
          </div>

          <div className="sazon-bars-wrap">
            {barrasActivas.map((b) => (
              <div key={b.etiqueta} className="sazon-bar-col">
                <span className="sazon-bar-num">{b.valor}</span>
                <div
                  className={`sazon-bar ${b.destacado ? 'highlight' : ''}`}
                  style={{ height: b.altura }}
                />
                <span className="sazon-bar-label">{b.etiqueta}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', fontSize: '0.78rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green21)' }} />
              Semana 8 en curso: Récord Institucional
            </span>
            <span className="sazon-pill">+26% vs. promedio</span>
          </div>
        </article>

        <article className="sazon-card">
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0' }}>
              Estado de Planes
            </h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Ratio de actividad y adherencia mensual
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1.25rem 0' }}>
            <div style={{ position: 'relative', width: 140, height: 140 }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--marfil-2)" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#3F4040" strokeWidth="4" strokeDasharray="80 100" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--green21)" strokeWidth="4" strokeDasharray="60 100" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--text-primary)', lineHeight: 1 }}>
                  68%
                </strong>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--green)', fontWeight: 700, marginTop: 2 }}>
                  ACTIVOS
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green21)' }} />
                Planes Activos
              </span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>971 (68%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3F4040' }} />
                Borradores en Progreso
              </span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>314 (22%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--marfil-2)' }} />
                Archivados / Completos
              </span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>143 (10%)</strong>
            </div>
          </div>
        </article>
      </section>

      {/* Fila 3: Top 5 Ingredientes + Sello de Excelencia Institucional */}
      <section className="sazon-two-col">
        <article className="sazon-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0' }}>
                Top 5 Ingredientes Más Frecuentes
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Frecuencia en recetas planificadas dentro de minutas institucionales
              </p>
            </div>
            <span className="sazon-pill" style={{ fontFamily: 'var(--font-mono)' }}>8,420 recetas base</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {TOP_INGREDIENTES.map((ing) => (
              <div key={ing.pos} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {ing.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span>{ing.pos}. {ing.nombre}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--green)' }}>
                      {ing.minutas}
                    </span>
                  </div>
                  <div className="sazon-progress-track">
                    <div className="sazon-progress-fill" style={{ width: `${ing.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="sazon-card featured">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--green7f)', fontWeight: 700, marginBottom: '0.5rem' }}>
              SELLO DE EXCELENCIA INSTITUCIONAL
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#fff', margin: '0 0 0.65rem 0' }}>
              Estandarización Culinaria Sazón
            </h2>
            <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.88)' }}>
              Supervisión en tiempo real de alérgenos, gramajes y aportes calóricos certificados bajo la normativa institucional del Grupo Nutresa.
            </p>

            <div className="sazon-rec-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--green7f)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <CheckCircle2 size={16} /> Recomendación Semanal Automática
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.88)' }}>
                Optimizar aporte de hisopanos frescos con hidratación vegetal.
              </div>
            </div>
          </div>

          <button
            className="sazon-btn-lime"
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
            onClick={exportarCSV}
          >
            Descargar Fichas Técnicas (.CSV) <ArrowRight size={16} />
          </button>
        </article>
      </section>

      {/* Fila 4: Tabla inferior con buscador y filtros */}
      <section className="sazon-card">
        <div className="sazon-filter-bar">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={15} style={{ position: 'absolute', left: 10, color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="sazon-input"
              style={{ paddingLeft: '2rem' }}
              placeholder="Buscar por ID de Usuario o Nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              className="sazon-select"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="Todos">Todos los Estados</option>
              <option value="Activo">Activo</option>
              <option value="Borrador">Borrador</option>
              <option value="Completado">Completado</option>
            </select>

            <button
              className="sazon-clear-btn"
              onClick={() => { setBusqueda(''); setFiltroEstado('Todos'); }}
            >
              <XCircle size={15} /> Limpiar Filtros
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="sazon-table">
            <thead>
              <tr>
                <th>ID USUARIO</th>
                <th>NOMBRE DEL PLAN</th>
                <th>RANGO SEMANAL</th>
                <th>COMIDAS</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {planesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                    No se encontraron planes con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                planesFiltrados.map((plan) => (
                  <tr key={plan.idUsuario}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {plan.idUsuario}
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>
                        {plan.usuario}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{plan.nombrePlan}</td>
                    <td>{plan.rangoSemanal}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{plan.comidas}</td>
                    <td><span className="sazon-pill">{plan.estado}</span></td>
                    <td>
                      <button className="sazon-card-link" onClick={() => alternarEstado(plan.idUsuario)}>
                        Alternar estado
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}