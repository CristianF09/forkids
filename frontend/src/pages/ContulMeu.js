import React from 'react';
import { useAuth } from '../context/AuthContext';

function ContulMeu() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Contul Meu</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informații Personale</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nume</label>
              <p className="mt-1 text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-500">
              Editează informațiile
            </button>
          </div>
        </div>

        {/* Purchased Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cărțile Mele</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium">Alfabetul în Joacă</h3>
              <p className="text-sm text-gray-600">Cumpărat pe 15 Martie 2024</p>
              <button className="text-indigo-600 hover:text-indigo-500 text-sm">
                Descarcă PDF
              </button>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium">Matematică Distractivă</h3>
              <p className="text-sm text-gray-600">Cumpărat pe 15 Martie 2024</p>
              <button className="text-indigo-600 hover:text-indigo-500 text-sm">
                Descarcă PDF
              </button>
            </div>
            <div>
              <h3 className="font-medium">Aventuri în Culori</h3>
              <p className="text-sm text-gray-600">Cumpărat pe 15 Martie 2024</p>
              <button className="text-indigo-600 hover:text-indigo-500 text-sm">
                Descarcă PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Istoric Comenzi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preț
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  15 Martie 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Pachet Complet
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  89 Lei
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  Finalizată
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContulMeu; 