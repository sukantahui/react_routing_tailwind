// Topic9.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import AsyncServletExample from "./topic9_files/AsyncServlet.java?raw";
import AsyncListenerExample from "./topic9_files/AsyncListenerExample.java?raw";
import LongRunningTask from "./topic9_files/LongRunningTask.java?raw";
import AsyncTimeoutServlet from "./topic9_files/AsyncTimeoutServlet.java?raw";
import WebXmlAsyncConfig from "./topic9_files/web_async_config.xml?raw";

// FAQ questions for this topic
import questions from "./topic9_files/topic9_questions";

const Topic9 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            Asynchronous Servlets
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Handling long‑running requests without blocking container threads – scalable and non‑blocking I/O with Servlet 3.0+ asynchronous processing.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
        >
          <h2 className="text-2xl font-semibold text-red-400 flex items-center gap-2">
            <span>⚡</span> What are Asynchronous Servlets?
          </h2>
          <p className="mt-3 text-gray-300">
            Traditional servlets use one thread per request. If a request involves a long operation (e.g., database query, web service call, file processing), the container thread remains occupied, leading to poor scalability. <strong>Asynchronous servlets</strong> allow you to release the container thread while the operation continues in a separate thread, then resume the response later.
          </p>
          <p className="mt-3 text-gray-300">
            Introduced in Servlet 3.0 (and enhanced in 3.1 with non‑blocking I/O), this feature is essential for applications with many concurrent long‑polling, chat, or data‑processing requests.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-red-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> In Barrackpore High School, a teacher (container thread) takes a student's assignment (request). Instead of sitting idle while the assignment is graded (long task), the teacher starts a teaching assistant (worker thread) and immediately helps the next student. When the assistant finishes, the teacher returns the graded work to the first student.
            </p>
          </div>
        </section>

        {/* SVG: Async flow */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">🔄 Synchronous vs Asynchronous Processing</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            <svg viewBox="0 0 320 200" className="w-80 h-auto">
              <rect x="20" y="20" width="280" height="160" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
              <text x="160" y="45" textAnchor="middle" fill="#fca5a5" fontWeight="bold" fontSize="14">❌ Synchronous</text>
              <rect x="40" y="60" width="80" height="30" rx="5" fill="#2d3748" stroke="#f87171" />
              <text x="80" y="80" textAnchor="middle" fill="#fca5a5" fontSize="11">Request A</text>
              <rect x="40" y="100" width="80" height="30" rx="5" fill="#2d3748" stroke="#f87171" />
              <text x="80" y="120" textAnchor="middle" fill="#fca5a5" fontSize="11">Request B</text>
              <text x="160" y="80" textAnchor="middle" fill="#9ca3af" fontSize="11">Container Thread</text>
              <text x="160" y="110" textAnchor="middle" fill="#9ca3af" fontSize="11">(Blocked)</text>
              <text x="240" y="80" textAnchor="middle" fill="#9ca3af" fontSize="11">Long task →</text>
              <text x="160" y="150" textAnchor="middle" fill="#f87171" fontSize="10">Thread wasted while waiting</text>
            </svg>
            <svg viewBox="0 0 320 200" className="w-80 h-auto">
              <rect x="10" y="10" width="300" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="160" y="35" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" fontSize="14">✅ Asynchronous</text>
              <rect x="30" y="50" width="80" height="25" rx="5" fill="#2d3748" stroke="#34d399" />
              <text x="70" y="67" textAnchor="middle" fill="#6ee7b7" fontSize="10">Request A</text>
              <rect x="30" y="80" width="80" height="25" rx="5" fill="#2d3748" stroke="#34d399" />
              <text x="70" y="97" textAnchor="middle" fill="#6ee7b7" fontSize="10">Request B</text>
              <rect x="30" y="110" width="80" height="25" rx="5" fill="#2d3748" stroke="#34d399" />
              <text x="70" y="127" textAnchor="middle" fill="#6ee7b7" fontSize="10">Request C</text>
              <text x="160" y="70" textAnchor="middle" fill="#9ca3af" fontSize="11">Container Thread</text>
              <text x="160" y="100" textAnchor="middle" fill="#34d399" fontSize="11">Released early</text>
              <text x="250" y="70" textAnchor="middle" fill="#fcd34d" fontSize="10">Worker Pool</text>
              <rect x="220" y="85" width="70" height="20" rx="4" fill="#2d3748" stroke="#fcd34d" />
              <text x="255" y="100" textAnchor="middle" fill="#fef08a" fontSize="9">Async task</text>
              <text x="160" y="150" textAnchor="middle" fill="#34d399" fontSize="10">More concurrent requests possible</text>
            </svg>
          </div>
        </section>

        {/* Enabling Async: @WebServlet(asyncSupported=true) */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">🔧 Enabling Asynchronous Support</h2>
          <p className="mt-3 text-gray-300">
            Two steps: mark the servlet with <code>asyncSupported = true</code> in <code>@WebServlet</code> or in <code>web.xml</code>. Then call <code>request.startAsync()</code> to obtain an <code>AsyncContext</code>.
          </p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={AsyncServletExample}
              title="AsyncServlet.java – Basic Async Example"
              highlightLines={[5, 6, 12, 13, 14, 20]}
            />
          </div>
          <div className="mt-4 p-3 bg-red-950/30 border-l-4 border-red-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Important:</strong> The servlet's <code>service()</code> method must exit after starting async. Do <strong>not</strong> write to response before calling <code>asyncContext.complete()</code>.
            </p>
          </div>
        </section>

        {/* AsyncContext Methods */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">📦 AsyncContext – The Core Object</h2>
          <ul className="list-disc list-inside text-gray-300 mt-3 space-y-1">
            <li><code>ServletRequest getRequest()</code> – get original request (wrapped).</li>
            <li><code>ServletResponse getResponse()</code> – get original response.</li>
            <li><code>void start(Runnable run)</code> – dispatch a thread to process the async task.</li>
            <li><code>void complete()</code> – finish the async processing, commit response.</li>
            <li><code>void dispatch(String path)</code> – forward to another resource (e.g., JSP).</li>
            <li><code>void setTimeout(long timeoutMs)</code> / <code>long getTimeout()</code> – manage timeout.</li>
            <li><code>void addListener(AsyncListener listener)</code> – listen for async events.</li>
          </ul>
        </section>

        {/* Timeout Handling */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">⏱️ Timeout and Error Handling</h2>
          <p className="mt-3 text-gray-300">If an async operation takes too long, the container will call <code>AsyncListener.onTimeout()</code> and complete the response with an error. You can set a timeout or implement custom logic.</p>
          <JavaFileLoader
            fileModule={AsyncTimeoutServlet}
            title="AsyncTimeoutServlet.java – Setting Timeout"
            highlightLines={[12, 13, 20, 21, 22]}
          />
        </section>

        {/* AsyncListener */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">👂 AsyncListener – Monitor Async Lifecycle</h2>
          <p className="mt-3 text-gray-300">Receive callbacks on async completion, timeout, error, or start. Useful for logging or resource cleanup.</p>
          <JavaFileLoader
            fileModule={AsyncListenerExample}
            title="CustomAsyncListener.java – Logging async events"
            highlightLines={[6, 7, 8, 12]}
          />
        </section>

        {/* Long-Running Task Pattern */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">🏭 Executor Pattern with Async Servlets</h2>
          <p className="mt-3 text-gray-300">Instead of starting raw threads, use a shared thread pool (e.g., <code>ExecutorService</code>). This prevents resource exhaustion.</p>
          <JavaFileLoader
            fileModule={LongRunningTask}
            title="LongRunningTask.java – Using ExecutorService"
            highlightLines={[9, 16, 17]}
          />
        </section>

        {/* <!-- web.xml configuration (alternative) --> */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-red-400">📄 Configuring Async in web.xml</h2>
          <p className="mt-3 text-gray-300">If you prefer XML over annotations, add <code>&lt;async-supported&gt;true&lt;/async-supported&gt;</code> to servlet and filter definitions.</p>
          <JavaFileLoader
            fileModule={WebXmlAsyncConfig}
            title="web.xml – Async Configuration"
            highlightLines={[4, 5, 9, 10]}
          />
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Omitting <code>asyncSupported=true</code></strong> – <code>request.startAsync()</code> throws <code>IllegalStateException</code>.</li>
            <li><strong>Not calling <code>complete()</code></strong> – The response hangs; client waits until timeout.</li>
            <li><strong>Accessing request/response after container thread returns</strong> – The original request/response objects are still valid (they are wrapped), but you must not rely on thread-local data.</li>
            <li><strong>Sharing <code>AsyncContext</code> across threads without synchronization</strong> – Only one thread should call <code>complete()</code> or <code>dispatch()</code>.</li>
            <li><strong>Starting too many threads without a pool</strong> – Can exhaust server resources; always use an <code>ExecutorService</code>.</li>
            <li><strong>Handling exceptions in async threads</strong> – Uncaught exceptions won't propagate to the container; you must manually call <code>asyncContext.complete()</code> with error.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Always set a timeout</strong> – prevent infinite hanging requests.</li>
            <li><strong>Use a dedicated thread pool</strong> – <code>Executors.newCachedThreadPool()</code> or a fixed pool sized appropriately.</li>
            <li><strong>Implement <code>AsyncListener</code> for critical monitoring</strong> – log timeouts and errors.</li>
            <li><strong>Do not hold references to <code>HttpSession</code> or other request-scoped objects longer than necessary</strong> – they may cause memory leaks.</li>
            <li><strong>Consider using non‑blocking I/O (Servlet 3.1)</strong> – <code>ReadListener</code> / <code>WriteListener</code> for streaming large data.</li>
            <li><strong>Test with load tools</strong> – async servlets can improve throughput, but misconfiguration can degrade performance.</li>
          </ul>
        </section>

                {/* Mini Checklist (continued) */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-red-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Add asyncSupported=true to @WebServlet (or web.xml)",
              "✅ Call request.startAsync() inside service()",
              "✅ Store AsyncContext for later completion",
              "✅ Always call asyncContext.complete() when done",
              "✅ Set timeout to avoid hanging requests",
              "✅ Use executor service, not raw threads",
              "✅ Implement AsyncListener for error handling",
              "✅ Avoid writing to response before complete()",
              "✅ Handle exceptions in worker threads",
              "✅ Test with concurrent load to measure improvement"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-red-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-red-500/30"
        >
          <h2 className="text-xl font-semibold text-red-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> In server logs, note that the request thread exits quickly while async task runs on another thread.</li>
            <li>⚙️ <strong>Try changing:</strong> Remove <code>asyncSupported=true</code> and see the IllegalStateException.</li>
            <li>📂 <strong>Think about:</strong> How would you implement a chat application where clients long-poll for new messages?</li>
            <li>🧩 <strong>Debug:</strong> Use AsyncListener to log when timeout or error occurs – helps track misconfigured async tasks.</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Asynchronous Servlets FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Asynchronous servlets are a game-changer for scalability. Students often think they magically make things faster – clarify that they free up container threads, not speed up individual requests. A great live demo: create a servlet that sleeps for 5 seconds synchronously vs asynchronously; show how many concurrent requests can be handled. Emphasise that async is not a silver bullet – only use for I/O-bound or long-polling tasks, not CPU-bound work. Also mention Servlet 3.1 non-blocking I/O for even better scalability." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 9: Asynchronous Servlets – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic9;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>
     