// src/Contact.jsx
import React from 'react';
import emailImg from '../../assets/email.logo.svg';

const Contact = () => {
  const whatsappNumber = "919432456083";
  const message = encodeURIComponent("Hi, I want to know about your courses and fees.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section id="contact" className="py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500">Contact Us</h2>
        <hr className='mb-4  border border-gray-700'></hr>
        <p className="text-lg mb-6">
          Have questions about our courses or programs? Reach out to us on WhatsApp or visit us at our location!
        </p>

        {/* ✅ WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-3 px-6 rounded mb-6 transition-all duration-300"
        >
          💬 Message Us on WhatsApp
        </a>

        {/* ✅ Physical Address */}
        <div className="mt-8 ">
          <h5 className="text-xl font-semibold mb-2">📍 Our Institute Address</h5>
          <p>Coder & AccoTax Learning Center</p>
          <p>Ground Floor</p>
          <p>25(10/A) Shibtala Road</p>
          <p>PO - Nona Chandan Pukur</p>
          <p>Barrackpore, Kol - 700122</p>
        </div>

        {/* ✅ Google Map */}
        <div className="mt-8">
          <iframe
            title="Coder & AccoTax Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d283.52283098422913!2d88.37444724388779!3d22.76869060091701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89b8eb3168ac5%3A0x7666eac9a1c26430!2sCoder%20%26%20AccoTax!5e1!3m2!1sen!2sin!4v1751969297792!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* ✅ Contact Email */}
        <div className="mt-8">
          <h5 className="text-xl font-semibold">📧 Email us</h5>
          <p>
            <a
              href="mailto:info.codenaccotax@co.in"
              className="hover:underline"
            >
              info.codenaccotax@co.in
            </a>
          </p>
          <p>
            <a
              href="mailto:codenaccotax@gmail.com"
              className="hover:underline"
            >
              codenaccotax@gmail.com
            </a>
          </p>
        </div>

        {/* ✅ Social Media */}
        <div className="mt-8">
          <h5 className="text-xl font-semibold mb-2">🔗 Follow Us</h5>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <a
              href="https://www.facebook.com/profile.php?id=61561702110617"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <i className="bi bi-facebook text-[#1877F2]"></i> Facebook
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <span class="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                <i className="bi bi-instagram"></i>
              </span>
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@CodernAccotax"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <i className="bi bi-youtube text-[#FF0000]"></i> YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
