// Topic6.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import FileUploadServlet from "./topic6_files/FileUploadServlet.java?raw";
import FileDownloadServlet from "./topic6_files/FileDownloadServlet.java?raw";
import MultiPartServlet from "./topic6_files/MultiPartServlet.java?raw";
import UploadJsp from "./topic6_files/upload_form.html?raw";
import FileListServlet from "./topic6_files/FileListServlet.java?raw";

// FAQ questions for this topic
import questions from "./topic6_files/topic6_questions";

const Topic6 = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark min-h-screen bg-gray-950 text-gray-100 font-sans leading-relaxed p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            File Upload & Download (Part API)
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Handling multipart form data – upload files, save them, and serve downloads using the built-in Part API (Servlet 3.0+).
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
        >
          <h2 className="text-2xl font-semibold text-yellow-400 flex items-center gap-2">
            <span>📁</span> What is the Part API?
          </h2>
          <p className="mt-3 text-gray-300">
            Before Servlet 3.0, handling file uploads required external libraries like Apache Commons FileUpload. The <strong>Part API</strong> (<code>javax.servlet.http.Part</code>) is a built‑in solution that simplifies multipart/form‑data processing. Each uploaded file is represented as a <code>Part</code> object, giving you access to the file content, name, size, and headers.
          </p>
          <p className="mt-3 text-gray-300">
            To enable multipart support, annotate your servlet with <code>@MultipartConfig</code> or configure it in <code>web.xml</code>. The API automatically parses the request and makes parts available via <code>request.getParts()</code> or <code>request.getPart(name)</code>.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-yellow-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world scenario:</strong> At Naihati Public School, students upload assignments via a web form. The <code>AssignmentUploadServlet</code> uses Part API to save PDFs and images to a server folder. Later, teachers can download the files using a download servlet.
            </p>
          </div>
        </section>

        {/* SVG: Upload/Download Flow */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">🔄 Upload & Download Workflow</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 700 200" className="w-full max-w-3xl h-auto">
              <rect x="20" y="40" width="160" height="60" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
              <text x="100" y="65" textAnchor="middle" fill="#fef08a" fontSize="13">HTML Form</text>
              <text x="100" y="82" textAnchor="middle" fill="#9ca3af" fontSize="11">enctype=multipart/form-data</text>

              <rect x="230" y="40" width="160" height="60" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="310" y="65" textAnchor="middle" fill="#fef08a" fontSize="13">Upload Servlet</text>
              <text x="310" y="82" textAnchor="middle" fill="#9ca3af" fontSize="11">@MultipartConfig</text>

              <rect x="460" y="40" width="180" height="60" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.8s" repeatCount="indefinite" />
              </rect>
              <text x="550" y="65" textAnchor="middle" fill="#fef08a" fontSize="13">File Storage</text>
              <text x="550" y="82" textAnchor="middle" fill="#9ca3af" fontSize="11">/uploads/ on server</text>

              <line x1="180" y1="70" x2="228" y2="70" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrUp)" />
              <line x1="390" y1="70" x2="458" y2="70" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrUp)" />

              <rect x="230" y="130" width="160" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="310" y="155" textAnchor="middle" fill="#93c5fd" fontSize="13">Download Servlet</text>
              <text x="310" y="172" textAnchor="middle" fill="#9ca3af" fontSize="11">File → OutputStream</text>

              <line x1="390" y1="70" x2="310" y2="128" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="550" y1="100" x2="400" y2="130" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4" />

              <defs>
                <marker id="arrUp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#eab308" />
                </marker>
              </defs>
              <text x="550" y="195" textAnchor="middle" fill="#6b7280" fontSize="11">Client downloads</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Client uploads → Servlet processes → Saves file → Download servlet retrieves and sends file with proper headers
          </p>
        </section>

        {/* Prerequisites: @MultipartConfig */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">⚙️ Enabling Multipart Support</h2>
          <p className="mt-3 text-gray-300">
            Annotate your servlet with <code>@MultipartConfig</code> to tell the container to parse the request as multipart/form-data. You can also specify:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li><code>location</code> – directory for temporary storage (default depends on container)</li>
            <li><code>maxFileSize</code> – maximum allowed file size (e.g., <code>1024 * 1024 * 5</code> for 5MB)</li>
            <li><code>maxRequestSize</code> – maximum size of entire form (including all parts)</li>
            <li><code>fileSizeThreshold</code> – size threshold after which file is written to disk</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="font-mono text-sm">@MultipartConfig(location = "/tmp", maxFileSize = 10485760, maxRequestSize = 20971520)</p>
          </div>
        </section>

        {/* HTML Form */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">📝 HTML Form for File Upload</h2>
          <p className="mt-3 text-gray-300">The form must have <code>method="POST"</code> and <code>enctype="multipart/form-data"</code>.</p>
          <JavaFileLoader
            fileModule={UploadJsp}
            title="upload.html – Upload Form"
            highlightLines={[6, 7]}
          />
        </section>

        {/* Upload Servlet Code */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">📤 File Upload Servlet</h2>
          <p className="mt-3 text-gray-300">
            In the servlet, call <code>request.getPart("fileInputName")</code> to obtain the <code>Part</code> object. Use its methods: <code>getSubmittedFileName()</code>, <code>getSize()</code>, <code>write(String fileName)</code>, and <code>getInputStream()</code>.
          </p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={FileUploadServlet}
              title="FileUploadServlet.java – Basic Upload"
              highlightLines={[20, 24, 25, 29, 30]}
            />
          </div>
          <div className="mt-4 p-3 bg-yellow-950/30 border-l-4 border-yellow-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Important:</strong> <code>Part.write()</code> is the easiest way to save, but ensure the directory exists. Also sanitize the filename – never trust user input!
            </p>
          </div>
        </section>

        {/* Handling Multiple Files */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">📎 Handling Multiple File Uploads</h2>
          <p className="mt-3 text-gray-300">
            For multiple files (HTML5 <code>multiple</code> attribute or multiple inputs), iterate over <code>request.getParts()</code> and filter by content type or name.
          </p>
          <JavaFileLoader
            fileModule={MultiPartServlet}
            title="MultiPartServlet.java – Multiple Files"
            highlightLines={[18, 19, 20, 21, 28]}
          />
        </section>

        {/* File Download Servlet */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">📥 File Download Servlet</h2>
          <p className="mt-3 text-gray-300">
            Download is not handled by Part API – you manually read the file from disk and write it to <code>response.getOutputStream()</code>. Set correct headers: <code>Content-Disposition</code> (attachment/inline) and <code>Content-Type</code>.
          </p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={FileDownloadServlet}
              title="FileDownloadServlet.java – Secure Download"
              highlightLines={[18, 19, 20, 21, 24, 28, 31]}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-950/30 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Security note:</strong> Never accept user input to specify file path directly. Validate against a whitelist or use a mapping (e.g., file ID stored in database).
            </p>
          </div>
        </section>

        {/* Listing Uploaded Files */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-yellow-400">📋 Listing Uploaded Files</h2>
          <p className="mt-3 text-gray-300">To provide a download interface, list files from the upload directory or database.</p>
          <JavaFileLoader
            fileModule={FileListServlet}
            title="FileListServlet.java – Generate Download Links"
            highlightLines={[12, 13, 14, 16, 19]}
          />
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Missing <code>@MultipartConfig</code>:</strong> Without this annotation, <code>getPart()</code> throws an exception.</li>
            <li><strong>Forgetting <code>enctype="multipart/form-data"</code> in HTML:</strong> Received as regular form fields, not parts.</li>
            <li><strong>Not checking <code>Part</code> size:</strong> A file part could be empty if no file selected – call <code>getSize() &gt; 0</code>.</li>
            <li><strong>Hardcoding file paths:</strong> Use relative paths or external configuration. Avoid absolute paths that may not exist on all servers.</li>
            <li><strong>Directory not writable:</strong> Ensure the target folder exists and the servlet container has write permissions.</li>
            <li><strong>No filename validation:</strong> Users can upload malicious filenames (e.g., <code>../../../config.xml</code>). Sanitize or generate unique names.</li>
            <li><strong>Not closing streams:</strong> Even with <code>Part.write()</code>, you may need to close <code>getInputStream()</code> if used manually.</li>
            <li><strong>Download servlet causing memory issues:</strong> For large files, read in chunks (buffer) instead of loading entire file into memory.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Always validate file size and type:</strong> Check content type via <code>Part.getContentType()</code> and limit extensions.</li>
            <li><strong>Generate unique file names:</strong> Use UUID or timestamp + user ID to avoid collisions and path traversal.</li>
            <li><strong>Store metadata in a database:</strong> Keep original filename, upload time, user, and server path for efficient management.</li>
            <li><strong>Upload to a dedicated directory outside the webapp:</strong> Prevents direct access to uploaded files. Use a symbolic link or configure a separate servlet to serve them.</li>
            <li><strong>Set reasonable timeouts and size limits</strong> – protect against denial‑of‑service via large uploads.</li>
            <li><strong>Use <code>Part.write()</code> with caution:</strong> It saves to the location specified in <code>@MultipartConfig</code>. Ensure that location is not web‑accessible.</li>
            <li><strong>Download with proper content type:</strong> Use <code>Files.probeContentType()</code> or a mapping based on extension to set correct MIME type.</li>
            <li><strong>Implement access control:</strong> Only allow file download if the user owns the file or has permission.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-yellow-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Add @MultipartConfig to Servlet",
              "✅ HTML form with POST and enctype=multipart/form-data",
              "✅ Retrieve Part via request.getPart(name)",
              "✅ Validate file size, type, and filename",
              "✅ Save file using part.write() or InputStream copy",
              "✅ Handle empty parts (no file selected)",
              "✅ Create upload directory if not exists",
              "✅ Use unique filenames to avoid collisions",
              "✅ Download: set Content-Disposition header",
              "✅ Stream file in chunks to avoid memory issues",
              "✅ Protect against path traversal (download)",
              "✅ Log errors and notify user"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-yellow-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-yellow-500/30"
        >
          <h2 className="text-xl font-semibold text-yellow-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> When you upload a file, inspect the <code>Part</code> headers – they include the original filename in <code>Content-Disposition</code>.</li>
            <li>⚙️ <strong>Try changing:</strong> Omit <code>@MultipartConfig</code> and see the exception. Then add it and test with different <code>maxFileSize</code> values.</li>
            <li>📂 <strong>Think about:</strong> Why should uploaded files never be stored inside the web application folder? (Hint: someone could guess the URL and download any file)</li>
            <li>🧩 <strong>Debug:</strong> Use <code>part.getInputStream()</code> to read the file content and write it manually – compare with <code>part.write()</code>. Which approach gives you more control?</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="File Upload & Download (Part API) FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The Part API is a game‑changer for students who previously used external libraries. Emphasise that the HTML form must be exactly right – one missing enctype and the upload fails. Run a live demo: build a simple profile picture uploader. Show them how to limit file types using `getContentType()` and how to rename files to avoid overwriting. For download, highlight the importance of `Content-Disposition: attachment` for forcing download vs `inline` for displaying in browser. Also discuss security: never trust user-supplied filenames, and always store files outside the web root. A fun exercise: create a shared document repository for the class." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 6: File Upload & Download (Part API) – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic6;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>