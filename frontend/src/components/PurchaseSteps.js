import { ShoppingCart, CreditCard, MailCheck, BookOpenCheck } from "lucide-react";

const PurchaseSteps = () => {
  const steps = [
    {
      icon: <ShoppingCart className="w-10 h-10 text-pink-600" />,
      title: "Alege cărțile",
      text: "Selectează cărțile care se potrivesc nevoilor copilului tău sau alege pachetul complet pentru economii maxime.",
    },
    {
      icon: <CreditCard className="w-10 h-10 text-green-600" />,
      title: "Finalizează comanda",
      text: "Plătește în siguranță prin sistemul securizat Stripe.com și primești o confirmare imediată.",
    },
    {
      icon: <MailCheck className="w-10 h-10 text-blue-600" />,
      title: "Primești email-ul",
      text: "În câteva minute vei primi un email cu linkul de descărcare pentru cărțile achiziționate.",
    },
    {
      icon: <BookOpenCheck className="w-10 h-10 text-purple-600" />,
      title: "Bucură-te de cărți",
      text: "Descarcă, printează sau folosește direct pe tabletă – cărțile sunt ale tale pentru totdeauna!",
    },
  ];

  return (
    <section className="bg-white py-12 px-4 md:px-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Proces simplu și rapid</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            {step.icon}
            <h3 className="mt-4 text-lg font-semibold text-gray-700">{step.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PurchaseSteps;
