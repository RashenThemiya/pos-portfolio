import { Copy } from './Copy';

export function Section({ id, band = false, title, description, titleId, children }) {
  return (
    <section id={id} className={band ? 'band' : undefined}>
      <div className="wrap">
        {title && <div className="sec-head">
          <h2 id={titleId}><Copy value={title} /></h2>
          {description && <p><Copy value={description} /></p>}
        </div>}
        {children}
      </div>
    </section>
  );
}
