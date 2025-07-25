import useDashboardData from '../resolvers/useDashboardData';

export default function Dashboard() {
  const data = useDashboardData();

  if (!data) return <p>Loading data...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{data.message}</p>
    </div>
  );
}
