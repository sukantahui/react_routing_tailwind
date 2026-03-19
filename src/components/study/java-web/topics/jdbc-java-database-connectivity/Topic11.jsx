// Topic11.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic11_files folder
import blobInsert from "./topic11_files/BlobInsert.java?raw";
import blobRetrieve from "./topic11_files/BlobRetrieve.java?raw";
import clobInsert from "./topic11_files/ClobInsert.java?raw";
import clobRetrieve from "./topic11_files/ClobRetrieve.java?raw";

const Topic11 = () => {
  // Calculate Sukanta Hui's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998; // started in 1998

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen py-8 px-4 transition-colors duration-300">
      {/* Scoped keyframe animations (respects reduced motion) */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Main container – all sections stacked */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ===== SECTION 1: TITLE & INTRODUCTION ===== */}
        <section
          className="animate-[fadeSlideUp_0.6s_ease-out]"
          aria-label="Introduction to BLOB and CLOB"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🖼️ Handling BLOB and CLOB Data
          </h1>
          <p className="text-lg leading-relaxed">
            Databases can store more than just numbers and short strings. <strong>BLOB</strong> (Binary Large Object)
            is used for binary data like images, PDFs, or audio files. <strong>CLOB</strong> (Character Large Object)
            stores large character data, such as entire books or XML documents. JDBC provides methods to read and write
            these large objects efficiently.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Tuhina</span> from Shyamnagar is building a digital library system. She needs
            to store book covers (images) and full‑text book descriptions (CLOB) in the database. JDBC's BLOB/CLOB support
            makes this possible.
          </p>
        </section>

        {/* ===== SECTION 2: BLOB vs CLOB ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="BLOB vs CLOB comparison"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📊 BLOB vs CLOB
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center space-x-3 mb-2">
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-bold">BLOB</h3>
              </div>
              <p>Binary Large Object – stores binary data (images, videos, files).</p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>JDBC type: <code>Types.BLOB</code></li>
                <li>Java mapping: <code>byte[]</code>, <code>InputStream</code></li>
                <li>Methods: <code>setBinaryStream()</code>, <code>getBinaryStream()</code>, <code>setBytes()</code>, <code>getBytes()</code></li>
              </ul>
            </div>
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center space-x-3 mb-2">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold">CLOB</h3>
              </div>
              <p>Character Large Object – stores large text data (books, XML, JSON).</p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>JDBC type: <code>Types.CLOB</code></li>
                <li>Java mapping: <code>String</code>, <code>Reader</code></li>
                <li>Methods: <code>setCharacterStream()</code>, <code>getCharacterStream()</code>, <code>setString()</code>, <code>getString()</code></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: DATABASE TABLE STRUCTURE ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Table structure"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🗂️ Example Table Schema
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <pre className="text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto">
              {`CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    cover_image BLOB,                -- stores the book cover image
    description CLOB                  -- stores the full book description
);`}
            </pre>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              MySQL, PostgreSQL, Oracle all support BLOB and CLOB types, though type names may vary (e.g., <code>TEXT</code> for large text in MySQL).
            </p>
          </div>
        </section>

        {/* ===== SECTION 4: VISUAL FLOW (BLOB STORAGE) ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="BLOB storage flow"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📥 Storing a BLOB (Image)
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 150" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Image file */}
              <rect x="20" y="30" width="80" height="60" rx="4" className="stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="40" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">image.jpg</text>
              
              {/* FileInputStream */}
              <rect x="120" y="20" width="100" height="40" rx="4" className="stroke-emerald-400 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="140" y="45" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">FileInputStream</text>
              
              {/* PreparedStatement */}
              <rect x="240" y="20" width="120" height="40" rx="4" className="stroke-sky-400 fill-sky-50 dark:fill-sky-900/20" />
              <text x="260" y="45" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">PreparedStatement</text>
              <text x="250" y="60" className="text-[8px] fill-gray-500" stroke="none">setBinaryStream()</text>
              
              {/* Database */}
              <rect x="380" y="30" width="80" height="60" rx="4" className="stroke-purple-400 fill-purple-50 dark:fill-purple-900/20" />
              <text x="400" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Database</text>
              
              {/* Arrows */}
              <path d="M100 60 L120 40" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <path d="M220 40 L240 40" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <path d="M360 40 L380 60" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            The image file is read as a stream and sent to the database via <code>setBinaryStream()</code>.
          </p>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for BLOB and CLOB"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Inserting a BLOB (Image)</h3>
            <JavaFileLoader
              fileModule={blobInsert}
              title="BlobInsert.java"
              highlightLines={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} // file reading, setBinaryStream
            />

            <h3 className="text-xl font-medium mt-6">🔹 Retrieving a BLOB</h3>
            <JavaFileLoader
              fileModule={blobRetrieve}
              title="BlobRetrieve.java"
              highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]} // getBinaryStream, writing to file
            />

            <h3 className="text-xl font-medium mt-6">🔹 Inserting a CLOB (Large Text)</h3>
            <JavaFileLoader
              fileModule={clobInsert}
              title="ClobInsert.java"
              highlightLines={[6, 7, 8, 9, 10, 11, 12, 13]} // setCharacterStream
            />

            <h3 className="text-xl font-medium mt-6">🔹 Retrieving a CLOB</h3>
            <JavaFileLoader
              fileModule={clobRetrieve}
              title="ClobRetrieve.java"
              highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} // getCharacterStream, reading
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> For very large files (GBs), reading the entire file into a byte array
              (<code>setBytes()</code>) may cause memory issues. Always use streaming methods (<code>setBinaryStream()</code>,
              <code>setCharacterStream()</code>) for large objects.
            </p>
          </div>
        </section>

        {/* ===== SECTION 6: COMMON PITFALLS ===== */}
        <section
          className="animate-[fadeSlideUp_1.1s_ease-out] space-y-3"
          aria-label="Common mistakes"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-red-200 dark:border-red-800 pb-2">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
            <li>Using <code>setBytes()</code> or <code>getBytes()</code> for very large files – leads to memory overflow.</li>
            <li>Forgetting to close streams (FileInputStream, etc.) – resource leaks.</li>
            <li>Not setting the content length correctly – some databases need to know the length.</li>
            <li>Assuming all databases support the same BLOB/CLOB method names (e.g., Oracle uses different approach).</li>
            <li>Storing large objects in the database without considering performance – sometimes file system is better.</li>
            <li>Not handling <code>SQLException</code> properly when streams are interrupted.</li>
          </ul>
        </section>

        {/* ===== SECTION 7: BEST PRACTICES ===== */}
        <section
          className="animate-[fadeSlideUp_1.2s_ease-out] space-y-3"
          aria-label="Best practices"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-green-200 dark:border-green-800 pb-2">
            ✅ Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
            <li>Always use streaming methods (<code>setBinaryStream</code>, <code>getBinaryStream</code>) for large objects.</li>
            <li>Close input/output streams in finally blocks or use try-with-resources.</li>
            <li>Consider storing only the file path in the database and files on disk if the files are very large (videos).</li>
            <li>Set appropriate fetch size for CLOBs to avoid memory issues.</li>
            <li>Use database-specific optimizations (e.g., Oracle's <code>BLOB</code> and <code>CLOB</code> locators).</li>
            <li>Test with realistic file sizes to ensure performance.</li>
          </ul>
        </section>

        {/* ===== SECTION 8: TIPS & TRICKS ===== */}
        <section
          className="animate-[fadeSlideUp_1.3s_ease-out] space-y-3"
          aria-label="Professional tips"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-amber-200 dark:border-amber-800 pb-2">
            🧠 Tips & Tricks
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>🔹 <strong>BLOB length:</strong> Use <code>preparedStatement.setBinaryStream(paramIndex, inputStream, file.length())</code>
                to give the database a hint about the size (improves performance).</li>
              <li>🔹 <strong>CLOB from file:</strong> For a text file, use <code>new FileReader(file)</code> with <code>setCharacterStream</code>.</li>
              <li>🔹 <strong>Partial reading:</strong> You can read BLOB/CLOB in chunks using streams to process large data without loading it all.</li>
              <li>🔹 <strong>Database limits:</strong> Know your database's maximum BLOB/CLOB size (MySQL's LONGBLOB can store up to 4GB).</li>
              <li>🔹 <strong>Swadeep's trick:</strong> For thumbnails, store the image as BLOB, but also store a thumbnail version to speed up listing pages.</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 9: TEACHER'S NOTE ===== */}
        <section
          className="animate-[fadeSlideUp_1.4s_ease-out] space-y-3"
          aria-label="Teacher's note"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            👩‍🏫 Teacher's Note
          </h2>
          <div
            className={clsx(
              "bg-indigo-100 dark:bg-indigo-900/40 p-5 rounded-xl",
              "transition-all duration-300 hover:shadow-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/60"
            )}
          >
            <p className="font-bold text-indigo-900 dark:text-indigo-100">Sukanta Hui</p>
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              📧 sukantahui@codernaccotax.co.in | 📞 7003756860
            </p>
            <p className="text-sm mt-1">
              💼 {experience} years of experience in Programming, RDBMS, OS, Web Development.
            </p>
            <p className="mt-3">
              <span className="font-semibold">Point to remember:</span> Many students think storing images in the database is always
              bad – it's actually a valid approach for small to medium files and when transactional integrity is required.
              Teach them to choose based on use case.
              <br />
              <span className="italic">
                "Debangshu, if you need to keep the image and metadata in sync (e.g., medical records), database BLOB is great.
                For serving millions of images, a CDN + file system is better."
              </span>
            </p>
          </div>
        </section>

        {/* ===== SECTION 10: MINI CHECKLIST ===== */}
        <section
          className="animate-[fadeSlideUp_1.5s_ease-out] space-y-3"
          aria-label="Quick checklist"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2">
            📋 Mini Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
            <ul className="space-y-2">
              <li>✔️ I understand the difference between BLOB and CLOB.</li>
              <li>✔️ I can insert an image (BLOB) into the database using streaming.</li>
              <li>✔️ I can retrieve and save a BLOB to a file.</li>
              <li>✔️ I can store and retrieve large text (CLOB) using character streams.</li>
              <li>✔️ I know to always use streaming for large objects.</li>
              <li>✔️ I am aware of the trade‑offs of storing files in the database vs. file system.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic11;