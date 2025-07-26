// src/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-10 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-amber-800 text-center mb-6">About Us</h2>

        <p className="text-justify text-gray-800 mb-5">
          <strong>Coder & AccoTax</strong> is a premier coding and professional training institute dedicated to teaching modern web and software development using industry-leading tools and technologies. With expert instructors, real-world projects, and a strong emphasis on hands-on learning, we empower students with the skills they need to thrive in the ever-evolving tech industry.
        </p>

        <p className="text-justify text-gray-800 mb-5">
          We have been proudly serving in this field for the past <strong>27 years</strong>, offering quality education and training in programming, accounting, taxation, and data analysis. Our institute is <strong>ISO Certified</strong>, ensuring high standards in teaching methodology and infrastructure.
        </p>

        <p className="text-justify text-gray-800 mb-5">
          Our team comprises <strong>well-trained and highly educated teachers</strong> who specialize in various subjects and class levels. Whether it's school-level programming or advanced professional courses, we cater to a wide range of learners.
        </p>

        <p className="text-justify text-gray-800">
          Over the years, our students have gone on to build successful careers and are now <strong>well established across different parts of the world</strong>. Their achievements are a testament to the quality and commitment we bring to every classroom.
        </p>
      </div>
    </section>
  );
};

export default About;
