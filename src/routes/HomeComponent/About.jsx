// ===============================================
// About.jsx
// -----------------------------------------------
// Purpose: Display details about Coder & AccoTax institute,
// including mission, achievements, certification, GitHub repo,
// and a call-to-action to join courses.
//
// Features:
// - Animated counters
// - ISO certificate download
// - GitHub section (open source / credibility link)
// - SEO and accessibility optimizations
// - Clean dark gradient UI
// ===============================================

import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";

// -----------------------------------------------
// 🎯 Animated Counter Component
// -----------------------------------------------
const Counter = ({ target, suffix = "+", duration = 2 }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const step = target / (duration * 60);
      const counter = setInterval(() => {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 16);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-sky-400">
      {count}
      {suffix}
    </span>
  );
};

// -----------------------------------------------
// 🌐 About Component
// -----------------------------------------------
const About = () => {
  const certificateLink = "/docs/iso-certificate.pdf"; // 🔗 public/docs/iso-certificate.pdf
  const githubLink = "https://github.com/codernaccotax"; // 🔗 Replace with your GitHub

  const scrollToCourses = () => {
    const section = document.getElementById("courses");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // 🧾 SEO Schema
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Coder & AccoTax",
    url: "https://codernaccotax.co.in",
    logo: "https://codernaccotax.co.in/cnat.ico",
    foundingDate: "1998",
    description:
      "Coder & AccoTax is an ISO 9001:2015 certified training institute offering courses in web development, Python, accounting, taxation, and data analysis — 27 years of excellence in professional education.",
    sameAs: [
      "https://www.facebook.com/",
      "https://www.linkedin.com/",
      "https://www.instagram.com/",
      githubLink,
    ],
  };

  return (
    <>
      <Helmet>
        <title>About Coder & AccoTax | ISO Certified Coding & Accounting Institute</title>
        <meta
          name="description"
          content="Coder & AccoTax is an ISO 9001:2015 certified institute with 27+ years of experience offering training in coding, accounting, taxation, and data analysis."
        />
        <meta
          name="keywords"
          content="Coder & AccoTax, ISO certified, coding institute India, accounting courses, taxation training, Python programming, data analysis course, full stack web development"
        />
        <link rel="canonical" href="https://codernaccotax.co.in/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Coder & AccoTax | ISO Certified Institute" />
        <meta
          property="og:description"
          content="Learn about Coder & AccoTax — an ISO 9001:2015 certified institute with 27 years of excellence in coding, accounting, and compliance education."
        />
        <meta property="og:image" content="https://codernaccotax.co.in/og-about.png" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Coder & AccoTax - 27+ Years of Excellence"
        />
        <meta
          name="twitter:description"
          content="ISO-certified professional training institute offering web development, accounting, taxation, and data analysis courses."
        />
        <meta name="twitter:image" content="https://codernaccotax.co.in/og-about.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      {/* ============================================
          ABOUT SECTION
      ============================================ */}
      <section
        id="about"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* Background glow */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.12),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(56,189,248,0.12),transparent_60%)]"
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center md:text-left">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 text-center mb-4"
          >
            About Us
          </motion.h1>

          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 border border-gray-700 max-w-[150px] mx-auto"
          />

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 md:p-10"
          >
            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              <strong className="text-amber-400">Coder & AccoTax</strong> is a
              premier ISO 9001:2015 certified institute providing professional
              training in <strong>Full Stack Web Development</strong>,
              <strong> Python Programming</strong>, <strong>Accounting</strong>,
              <strong> Taxation</strong>, and <strong>Data Analysis</strong>. 
              Established in 1998, we’ve been a trusted name in professional and 
              career-oriented education for over two decades.
            </p>

            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              With more than{" "}
              <strong className="text-amber-400">27 years of experience</strong> and 
              over <strong className="text-amber-400">5000 successful learners</strong>,
              we take pride in offering result-driven training backed by 
              experienced faculty and modern digital infrastructure.
            </p>

            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              Our teaching approach blends <strong className="text-amber-400">practical 
              industry exposure</strong>, <strong className="text-amber-400">real-world 
              projects</strong>, and <strong className="text-amber-400">continuous 
              mentorship</strong>. Whether you want to build a career in tech or 
              accounting, we equip you with skills that truly matter.
            </p>

            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              Beyond training, we believe in sharing knowledge openly. Explore our 
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 ml-1 underline"
              >
                GitHub repository
              </a>{" "}
              for open learning materials, code samples, and collaborative 
              projects — part of our vision to make education accessible to all.
            </p>

            <p className="text-justify leading-relaxed text-gray-300">
              Together, let’s code smarter, calculate better, and create a 
              brighter professional future.
            </p>
          </motion.article>

          {/* Achievements */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center"
          >
            {[
              { icon: "🎓", label: "Years of Excellence", value: 27 },
              { icon: "👩‍🎓", label: "Students Trained", value: 5000 },
              { icon: "🌐", label: "Corporate Projects", value: 200 },
              { icon: "🏆", label: "Awards & Certifications", value: 15 },
              { icon: "🏅", label: "ISO 9001:2015 Certified", isISO: true },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 hover:border-sky-600 transition-all duration-500"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                {stat.isISO ? (
                  <span className="text-lg font-semibold text-sky-400">
                    ISO 9001:2015
                  </span>
                ) : (
                  <Counter target={stat.value} />
                )}
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                {stat.isISO && (
                  <a
                    href={certificateLink}
                    download="CoderAccoTax_ISO_Certificate.pdf"
                    className="mt-3 inline-block text-xs text-white bg-sky-700 hover:bg-sky-600 px-3 py-1 rounded-full transition-all duration-300"
                  >
                    ⬇ Download Certificate
                  </a>
                )}
              </motion.div>
            ))}
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-14 text-center"
          >
            <p className="text-gray-400 italic mb-3">
              Ready to start your journey with us?
            </p>
            <button
              onClick={scrollToCourses}
              className="px-6 py-2 bg-gradient-to-r from-sky-600 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition-all duration-300"
            >
              🚀 Join Us Now
            </button>
          </motion.div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mt-10 text-gray-400 italic"
          >
            “Education is not just learning — it’s transformation. At Coder & AccoTax, 
            we help you code your success and calculate your growth.”
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default About;
