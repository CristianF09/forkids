import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('Verificăm plata...');

  useEffect(() => {
    if (sessionId) {
      axios
        .get(`/api/checkout/confirm?session_id=${sessionId}`)
        .then((res) => {
          setStatus('Plata a fost confirmată! Am trimis materialul prin email.');
        })
        .catch((err) => {
          console.error(err);
          setStatus('A apărut o eroare la confirmarea plății.');
        });
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