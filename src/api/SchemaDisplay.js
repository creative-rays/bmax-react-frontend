import React, { useEffect, useState } from 'react';
import fetchSchemaData from './api/fetchSchemaService';

const SchemaDisplay = () => {
  const [schemaData, setSchemaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSchemaData();
        setSchemaData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Schema Data</h1>
      <pre>{JSON.stringify(schemaData, null, 2)}</pre>
    </div>
  );
};

export default SchemaDisplay;
