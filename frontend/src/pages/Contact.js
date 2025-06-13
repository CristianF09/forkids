import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Contactează-ne</h1>
      <p className="text-center text-gray-600 mb-12">
        Suntem aici pentru a răspunde întrebărilor tale și pentru a te ajuta cu orice ai nevoie
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Informații de contact</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">contact@corcodusa.ro</p>
                <p className="text-sm text-gray-500">Răspundem în maxim 24 de ore</p>
              </div>
              <div>
                <h3 className="font-medium">Telefon</h3>
                <p className="text-gray-600">+40 755 123 456</p>
                <p className="text-sm text-gray-500">Luni - Vineri: 9:00 - 17:00</p>
              </div>
              <div>
                <h3 className="font-medium">Program</h3>
                <p className="text-gray-600">Luni - Vineri: 9:00 - 17:00</p>
                <p className="text-sm text-gray-500">Răspundem și la email în weekend</p>
              </div>
              <div>
                <h3 className="font-medium">Adresă</h3>
                <p className="text-gray-600">București, România</p>
                <p className="text-sm text-gray-500">Lucrăm 100% digital</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Cum te putem ajuta?</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Ai întrebări despre produsele noastre?</li>
              <li>• Întâmpini dificultăți la plasarea unei comenzi?</li>
              <li>• Ai nevoie de asistență după achiziție?</li>
              <li>• Dorești să colaborezi cu noi?</li>
            </ul>
            <p className="mt-4 text-gray-600">
              Nu ezita să ne contactezi folosind formularul de mai jos sau prin metodele de contact de mai sus.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Trimite-ne un mesaj</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nume
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Trimite mesajul
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact; 