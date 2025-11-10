// src/About.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-sky-300">
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const certificateLink = "/docs/iso-certificate.pdf"; // 👈 Replace with your actual certificate file path
  const scrollToCourses = () => {
    const section = document.getElementById("courses");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(37,99,235,0.15),transparent_60%)]"
      ></motion.div>

      <div className="relative max-w-5xl mx-auto px-6 text-center md:text-left">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-center mb-4 drop-shadow-lg"
        >
          About Us
        </motion.h2>

        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8 border border-gray-700 max-w-[150px] mx-auto"
        />

        {/* About Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-gray-900/60 border border-gray-700/50 backdrop-blur-xl shadow-lg shadow-purple-500/10 rounded-3xl p-8 md:p-10 hover:shadow-pink-500/30 transition-all duration-700"
        >
          <p className="text-justify mb-5 leading-relaxed text-gray-300">
            <strong className="text-amber-400">Coder & AccoTax</strong> is a
            premier coding and professional training institute dedicated to
            teaching modern web and software development using
            industry-leading tools and technologies. With expert instructors,
            real-world projects, and a strong emphasis on hands-on learning, we
            empower students with the skills they need to thrive in the
            ever-evolving tech industry.
          </p>

          <p className="text-justify mb-5 leading-relaxed text-gray-300">
            We have been proudly serving in this field for the past{" "}
            <strong className="text-amber-400">27 years</strong>, offering
            quality education and training in programming, accounting,
            taxation, and data analysis. Our institute is{" "}
            <strong className="text-amber-400">ISO Certified</strong>,
            ensuring high standards in teaching methodology and infrastructure.
          </p>

          <p className="text-justify mb-5 leading-relaxed text-gray-300">
            Our team comprises{" "}
            <strong className="text-amber-400">
              well-trained and highly educated teachers
            </strong>{" "}
            who specialize in various subjects and class levels. Whether it's
            school-level programming or advanced professional courses, we cater
            to a wide range of learners.
          </p>

          <p className="text-justify leading-relaxed text-gray-300">
            Over the years, our students have gone on to build successful
            careers and are now{" "}
            <strong className="text-amber-400">
              well established across different parts of the world
            </strong>
            . Their achievements are a testament to the quality and commitment
            we bring to every classroom.
          </p>
        </motion.div>

        {/* 🌟 Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center"
        >
          {[
            { icon: "🎓", label: "Years of Excellence", value: 27 },
            { icon: "👩‍🎓", label: "Students Trained", value: 5000 },
            { icon: "🌐", label: "Corporate Projects", value: 200 },
            { icon: "🏆", label: "Certifications & Awards", value: 15 },
            {
              icon: "🏅",
              label: "ISO 9001:2015 Certified",
              isISO: true,
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6 shadow-md hover:shadow-sky-500/20 transition-all duration-500"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              {stat.isISO ? (
                <span className="text-lg font-semibold text-sky-300">
                  ISO 9001:2015
                </span>
              ) : (
                <Counter target={stat.value} />
              )}
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>

              {/* ISO Certificate Download Button */}
              {stat.isISO && (
                <a
                  href={certificateLink}
                  download
                  className="mt-3 inline-block text-xs text-white bg-sky-700 hover:bg-sky-600 px-3 py-1 rounded-full transition-all duration-300"
                >
                  ⬇ Download Certificate
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* 🚀 Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-gray-400 italic">
            Ready to start your learning journey with us?
          </p>
          <button
            onClick={scrollToCourses}
            className="px-6 py-2 bg-gradient-to-r from-sky-600 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-sky-400/40 transition-all duration-500"
          >
            🚀 Join Us Now
          </button>
        </motion.div>

        {/* Footer Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 text-gray-400 italic"
        >
          “Building Future-Ready Professionals with Code, Knowledge & Confidence.”
        </motion.p>
      </div>
    </section>
  );
};

export default About;
