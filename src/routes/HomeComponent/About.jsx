// src/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-center">About Us</h2>
        <hr className='mb-4  border border-gray-700'></hr>

        <p className="text-justify  mb-5">
          <strong className='text-amber-700'>Coder & AccoTax</strong> is a premier coding and professional training institute dedicated to teaching modern web and software development using industry-leading tools and technologies. With expert instructors, real-world projects, and a strong emphasis on hands-on learning, we empower students with the skills they need to thrive in the ever-evolving tech industry.
        </p>

        <p className="text-justify  mb-5">
          We have been proudly serving in this field for the past <strong  className='text-amber-700'>27 years</strong>, offering quality education and training in programming, accounting, taxation, and data analysis. Our institute is <strong  className='text-amber-700'>ISO Certified</strong>, ensuring high standards in teaching methodology and infrastructure.
        </p>

        <p className="text-justify  mb-5">
          Our team comprises <strong  className='text-amber-700'>well-trained and highly educated teachers</strong> who specialize in various subjects and class levels. Whether it's school-level programming or advanced professional courses, we cater to a wide range of learners.
        </p>

        <p className="text-justify ">
          Over the years, our students have gone on to build successful careers and are now <strong  className='text-amber-700'>well established across different parts of the world</strong>. Their achievements are a testament to the quality and commitment we bring to every classroom.
        </p>
      </div>
    </section>
  );
};

export default About;
