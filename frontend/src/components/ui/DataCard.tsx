import { ReactNode } from 'react';

type DataCardProps = {
  title: string;
  value?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

const DataCard = ({ title, value, footer, children }: DataCardProps) => (
  <section className="data-card">
    <div className="data-card__header">
      <h3>{title}</h3>
      {value !== undefined && <p className="data-card__value">{value}</p>}
    </div>
    {children && <div className="data-card__body">{children}</div>}
    {footer && <div className="data-card__footer">{footer}</div>}
  </section>
);

export default DataCard;


