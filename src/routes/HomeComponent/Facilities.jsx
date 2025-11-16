// ===============================================
// Facilities.jsx (Class-Based Component)
// -----------------------------------------------
// Purpose:
//   Highlight modern lab facilities for SEO + trust.
//   Designed to match the dark-themed UI.
// ===============================================

import React, { Component } from "react";

class Facilities extends Component {
  render() {
    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">

        {/* Soft background glow */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_70%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.12),transparent_70%)]"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400">
            Our Modern IT Lab
          </h2>

          <div className="w-24 h-[2px] bg-gray-700 mx-auto mt-4 mb-12 rounded-full"></div>

          {/* Facilities Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Facility Box */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 text-center hover:border-sky-600 transition-all duration-300 shadow-lg">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">High-Performance Systems</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Latest hardware with fast processing for coding, development 
                and data analysis work.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 text-center hover:border-sky-600 transition-all duration-300 shadow-lg">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">High-Speed Internet</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Reliable, high-speed internet for coding platforms, online tools 
                and cloud services.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 text-center hover:border-sky-600 transition-all duration-300 shadow-lg">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Hands-on Project Lab</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Dedicated setup for practical programming, debugging and 
                real-world project development.
              </p>
            </div>

          </div>

          {/* Secondary Row */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 text-center hover:border-sky-600 transition-all duration-300 shadow-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Safe & Quiet Environment</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Peaceful, distraction-free atmosphere ideal for coding, 
                accounting and analysis work.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 text-center hover:border-sky-600 transition-all duration-300 shadow-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Software & Learning Tools</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Ready-to-use coding editors, IDEs, accounting software 
                and data tools for hands-on training.
              </p>
            </div>

          </div>

        </div>
      </section>
    );
  }
}

export default Facilities;
