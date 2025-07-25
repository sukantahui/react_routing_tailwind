import { useEffect, useState } from 'react';

export default function useDashboardData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate Angular Resolver fetching data before route activation
    setTimeout(() => {
      setData({ message: 'Data from resolver (like Angular)' });
    }, 500);
  }, []);

  return data;
}
