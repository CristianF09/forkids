import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (sessionId) {
      setMessage('Plata a fost confirmată! Veți primi materialul prin email în câteva minute. Vă rugăm să verificați și folderul spam.');
    } else {
      setMessage('Mulțumim pentru achiziție! Veți primi materialul prin email în câteva minute.');
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-[#20BF55]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#20BF55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mulțumim!</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{message}</p>
        <Link
          to="/"
          className="inline-block bg-[#FF6B00] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#E05C00] transition-colors"
        >
          Înapoi la homepage
        </Link>
      </div>
    </div>
  );
};

export default Success;
