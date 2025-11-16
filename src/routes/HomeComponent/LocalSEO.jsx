import React from "react";

export default function LocalSEO() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-sky-400">
          Coding & Finacial Classes in Barrackpore
        </h2>

        {/* Underline */}
        <div className="w-16 h-1 bg-sky-500 mx-auto mt-3 rounded-full"></div>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-300">
          At <span className="font-semibold text-amber-400">Coder & AccoTax</span>, 
          we offer structured, practical hands-on training in 
          <span className="font-semibold text-gray-200"> Web Development</span>, 
          <span className="font-semibold text-gray-200"> Python</span>, 
          <span className="font-semibold text-gray-200"> Java</span>,  
          <span className="font-semibold text-gray-200"> Tally</span>,  
          <span className="font-semibold text-gray-200"> GST</span>, and 
          <span className="font-semibold text-gray-200"> Data Analysis</span>.
          <br /><br />
          Students from <span className="font-medium text-sky-400">Barrackpore, Titagarh, Shyamnagar, Palta, Agarpara </span> 
          trust us for a calm environment, project-driven learning and expert guidance.
        </p>

        {/* CTA Button */}
        <a
          href="#courses"
          className="inline-block mt-10 bg-sky-600 text-white font-medium px-8 py-3 rounded-full shadow-md hover:bg-sky-700 transition"
        >
          Explore Courses →
        </a>
      </div>
    </section>
  );
}
