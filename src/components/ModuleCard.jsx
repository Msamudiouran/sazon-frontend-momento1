import { ArrowRight } from 'lucide-react';

export default function ModuleCard({ modulo, onAbrir }) {
  const Icon = modulo.icon;
  return (
    <article className={`sazon-card ${modulo.destacado ? 'featured' : ''}`}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div className="sazon-card-icon-box"><Icon size={21} /></div>
          <span className="sazon-pill">{modulo.etiqueta}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: modulo.destacado ? '#fff' : 'var(--text-primary)', margin: '0 0 0.45rem 0' }}>
          {modulo.titulo}
        </h3>
        <p style={{ fontSize: '0.88rem', lineHeight: 1.45, margin: '0 0 1.4rem 0', opacity: modulo.destacado ? 0.9 : 1 }}>
          {modulo.descripcion}
        </p>
      </div>
      <div>
        <button className="sazon-card-link" onClick={() => onAbrir(modulo.id)}>
          Abrir módulo <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}