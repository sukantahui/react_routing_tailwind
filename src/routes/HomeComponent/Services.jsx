// src/Services.jsx
import React from 'react';

const services = [
  { icon: "bi-code-slash", title: "Software Development", description: "Custom software solutions for your business." },
  { icon: "bi-display", title: "Website Design", description: "Modern, responsive, and SEO-friendly websites." },
  { icon: "bi-cpu", title: "Computer Hardware", description: "Sales and support for desktops, laptops, and accessories." },
  { icon: "bi-file-earmark-text", title: "Tax Filing", description: "Quick and accurate income tax filing services." },
  { icon: "bi-receipt", title: "GST", description: "Complete GST registration and return filing assistance." },
];

const Services = () => {
  return (
    <section id="services" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500">Our Services</h2>
        <hr className='mb-4  border border-gray-700'></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <i className={`bi ${service.icon} text-4xl text-blue-600 mb-4`}></i>
              <h5 className="text-xl font-semibold mb-2 text-indigo-600">{service.title}</h5>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
