function StatCard({ title, value, description }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h3>{value.toLocaleString()}</h3>
      <span>{description}</span>
    </div>
  );
}

export default StatCard;