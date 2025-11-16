// ===============================================
// WhyChooseUs.jsx (Class-Based - Unique Version)
// -----------------------------------------------
// Purpose: Provide NEW unique reasons to choose Coder & AccoTax,
// avoiding overlap with About section.
// ===============================================

import React, { Component } from "react";

class WhyChooseUs extends Component {
  render() {
    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">

        {/* Glow Background */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.12),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.12),transparent_70%)]"></div>

        <div className="relative max-w-6xl mx-auto px-6">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400">
            Why Choose Coder & AccoTax?
          </h2>

          <div className="w-24 h-[2px] bg-gray-700 mx-auto mt-4 mb-12 rounded-full"></div>

          {/* First Row */}
          <div className="grid md:grid-cols-3 gap-8">


            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition">
              <div className="text-4xl mb-3">🙋‍♂️</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Personal Mentorship</h3>
              <p className="text-gray-300 text-sm">
                One-to-one doubt clearing and personalized support for every student.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Flexible Batch Timings</h3>
              <p className="text-gray-300 text-sm">
                Morning, afternoon and evening batches for students and working professionals.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Career & Placement Support</h3>
              <p className="text-gray-300 text-sm">
                Resume building, mock interviews and career guidance to help you get job-ready.
              </p>
            </div>

          </div>

          {/* Second Row */}
          <div className="grid md:grid-cols-3 gap-8 mt-10">

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Lifetime Study Access</h3>
              <p className="text-gray-300 text-sm">
                Unlimited access to course materials, notes and source code.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Small Batch Size</h3>
              <p className="text-gray-300 text-sm">
                We limit batch size to ensure personal attention for every learner.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition">
              <div className="text-4xl mb-3">🧑‍💻</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Hybrid Learning (Online + Offline)</h3>
              <p className="text-gray-300 text-sm">
                Continue learning even if you cannot attend physically — full hybrid support.
              </p>
            </div>

          </div>
          {/* Third Row */}
          <div className="grid md:grid-cols-3 gap-8 mt-10">

            {/* Success Rate */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition shadow-lg">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">High Student Success Rate</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                More than <span className="text-amber-400 font-semibold">92%</span> of our students
                successfully complete the course and earn industry-ready skills.
              </p>
            </div>

            {/* Modern Digital Tools */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition shadow-lg">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">Modern Digital Tools</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Access to updated IDEs, coding environments, accounting software,
                cloud tools & real project resources.
              </p>
            </div>

            {/* ISO-Level Training Standards */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 text-center hover:border-sky-500 transition shadow-lg">
              <div className="text-4xl mb-3">🏅</div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">ISO-Level Training Quality</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our institute follows <span className="text-amber-400 font-semibold">ISO 9001:2015</span>
                teaching standards ensuring structured, high-quality learning.
              </p>
            </div>

          </div>

          {/* Fourth Row — Testimonials / Social Proof */}
          <div className="grid md:grid-cols-3 gap-8 mt-10">

            {/* Testimonial 1 */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 hover:border-sky-500 transition shadow-lg">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-lg font-semibold text-sky-400 mb-2">Excellent Learning Experience</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                “The best place I've been to.... And as sir says once a student always a student! Whatever coding I've learnt that's just because of sir..... 😊😊😊😊”
              </p>
              <p className="text-amber-400 text-xs mt-3">— Tamoshree Dey, Web Development Student</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 hover:border-sky-500 transition shadow-lg">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-lg font-semibold text-sky-400 mb-2">Supportive Faculty</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                “I am Nanda Gopal Sutradhar, a student of this institute. I don’t know what to write, but today I am an Assistant Professor at Swami Vivekananda University — and all the credit goes to my Guru, Sukanta Hui. He is my ideal. Without his guidance, I would not have been able to reach my goal. This is one of the best computer training centres in Barrackpore. I haven’t seen God, but I believe he is my God. I love you very much, sir..❤️❤️❤️.”
              </p>
              <p className="text-amber-400 text-xs mt-3">— N. G Sutradhar, Assistant Professor</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-7 hover:border-sky-500 transition shadow-lg">
              <div className="text-4xl mb-3">👌</div>
              <h3 className="text-lg font-semibold text-sky-400 mb-2">Great Career Guidance</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                “They helped me prepare for interviews and build my resume. I got
                internship opportunities within weeks.”
              </p>
              <p className="text-amber-400 text-xs mt-3">— Sourav Ghosh, Accounting & Taxation Student</p>
            </div>
            {/* Google Review Link */}
            <div className="text-center mt-12">
              <a
                href="https://www.google.com/search?q=Coder+%26+AccoTax+Barrackpore&ludocid=3313055389009979952&gsas=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-400 hover:to-sky-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-amber-700/20 hover:shadow-sky-600/30 transition-all duration-300"
              >
                ⭐ Read More Google Reviews
              </a>

              <p className="text-gray-400 text-sm mt-3 italic">
                Verified student reviews on Google — 100% genuine.
              </p>
            </div>

          </div>


        </div>
      </section>
    );
  }
}

export default WhyChooseUs;
