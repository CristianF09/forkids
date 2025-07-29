import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('Plata a fost confirmată!');

  useEffect(() => {
    if (sessionId) {
      setStatus('Plata a fost confirmată! Veți primi materialul prin email în câteva minute.');
    } else {
      setStatus('Mulțumim pentru achiziție! Veți primi materialul prin email.');
    }
  }, [sessionId]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Mulțumim!</h1>
      <p>{status}</p>
    </div>
  );
};

export default Success; 