type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="empty-state">
    <h4>{title}</h4>
    {description && <p>{description}</p>}
    {action}
  </div>
);

export default EmptyState;


