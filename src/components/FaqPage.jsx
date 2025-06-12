import React, { useState } from 'react';

const faqs = [
  {
    question: 'What does the system monitor?',
    answer: 'It monitors boiler health, anomaly detection, and maintenance schedules in industrial environments.',
  },
  {
    question: 'How is anomaly detection performed?',
    answer: 'We use machine learning models trained on historical and real-time sensor data to detect early signs of failure.',
  },
  {
    question: 'How often is the data updated?',
    answer: 'Data is updated every 5 minutes through an automated background data ingestion process.',
  },
  {
    question: 'What types of anomalies can be detected?',
    answer: 'Thermal stress, pressure fluctuation, fuel inefficiency, and structural fatigue are among detectable anomalies.',
  },
  {
    question: 'Can this system integrate with legacy SCADA systems?',
    answer: 'Yes, our platform can interface with most SCADA systems using OPC or MQTT protocols.',
  },
  {
    question: 'Is there a mobile version of the dashboard?',
    answer: 'Yes! The dashboard is fully responsive and can be accessed from mobile, tablet, or desktop devices.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We follow industry best practices with SSL encryption, access control, and regular audits.',
  },
  {
    question: 'How do I schedule maintenance alerts?',
    answer: 'You can configure maintenance reminders from the dashboard settings under the Maintenance tab.',
  },
  {
    question: 'Can I customize the anomaly thresholds?',
    answer: 'Yes, thresholds can be adjusted per unit from the advanced settings panel.',
  },
  {
    question: 'Who do I contact for support?',
    answer: 'Email us at pavanjitsubash802@gmail.com or use the contact button on the dashboard.',
  },
];

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10 drop-shadow">
          🤔 Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md transition-all duration-300 border border-green-200 overflow-hidden ${
                openIndex === index ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 text-lg font-semibold text-green-900 hover:bg-green-50 focus:outline-none"
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <div className="p-5 text-gray-700 text-sm border-t border-green-100 bg-green-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqPage;

