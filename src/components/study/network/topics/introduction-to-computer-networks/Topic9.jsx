import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic9.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Introduce client-server architecture – its structure, working,
 *          advantages, and real-world examples (web server, database server).
 * When & Why Used: After exploring network topologies, this topic shifts to
 *                  logical architectures. It sets the stage for comparing
 *                  peer-to-peer (Topic10) and for understanding how services
 *                  like the web and databases operate.
 */

const Topic9 = () => {
  const definition =
    "Client-server architecture is a computing model in which a central server provides services, resources, or data to multiple clients. Clients request services; servers listen for requests and respond. Communication is typically request–response over a network.";

  const howItWorks = [
    "Client initiates a request (e.g., click a link, submit a form).",
    "Request travels across the network to the server.",
    "Server processes the request (e.g., fetches data, performs computation).",
    "Server sends a response back to the client (e.g., web page, query result).",
    "Client displays or processes the response."
  ];

  const advantages = [
    "Centralized management – updates, backups, and security policies applied once on the server.",
    "Scalability – servers can be upgraded or clustered to handle more clients.",
    "Security – sensitive data and logic reside on the server, not distributed to clients.",
    "Resource sharing – multiple clients can share expensive hardware/software (e.g., database, printer).",
    "Reliability – server can be made redundant (clustering, failover)."
  ];

  const realWorldExamples = [
    {
      title: "🌐 Web Server (HTTP/HTTPS)",
      description:
        "When Swadeep in Barrackpore visits a website, his browser (client) sends a GET request to the web server. The server returns HTML, CSS, and JavaScript files. The browser renders them. Popular web servers: Apache, Nginx, IIS."
    },
    {
      title: "🗄️ Database Server (SQL/NoSQL)",
      description:
        "Tuhina uses an online shopping app. When she searches for 'laptops', the app's application server queries a database server (e.g., MySQL, PostgreSQL, MongoDB). The database returns product data, which is sent back to her phone."
    },
    {
      title: "📧 Email Server (SMTP/IMAP)",
      description:
        "Abhronila sends an email from her Gmail client to Susmita's Outlook client. The email travels from her client to Gmail's SMTP server, then across the internet to the recipient's mail server, where Susmita's client retrieves it via IMAP."
    },
    {
      title: "☁️ File Server",
      description:
        "At Ichapur University, students save assignments to a central file server. The server manages access permissions and backups. Debangshu can access his files from any lab computer because the server holds them."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Thinking the server must be a physical machine",
      correction:
        "Servers can be virtual machines or containers (e.g., Docker). Multiple virtual servers can run on one physical host."
    },
    {
      mistake: "Confusing client-server with peer-to-peer",
      correction:
        "In client-server, servers provide services; clients consume them. In peer-to-peer, every node can act as both client and server."
    },
    {
      mistake: "Ignoring statelessness in web servers",
      correction:
        "HTTP is stateless – each request is independent. For stateful sessions, cookies or server-side sessions are needed."
    }
  ];

  const bestPractices = [
    "Use a reverse proxy (e.g., Nginx) in front of application servers to handle SSL, load balancing, and caching.",
    "Separate concerns: web servers, application servers, and database servers should run on different machines (or containers) for security and scalability.",
    "Implement proper authentication and authorization (e.g., OAuth, JWT).",
    "Monitor server health (CPU, memory, network) and set up alerts."
  ];

  const tipsAndTricks = [
    "Use `curl` or Postman to manually test API endpoints – it helps debug client-server communication.",
    "Understand the difference between 4xx (client error) and 5xx (server error) HTTP status codes; they pinpoint where the problem lies.",
    "For databases, use connection pooling to reduce overhead.",
    "When designing a client-server system, start with a clear API contract (OpenAPI/Swagger)."
  ];

  const miniChecklist = [
    "☐ I can define client-server architecture and explain its key components.",
    "☐ I understand the request–response model.",
    "☐ I can list at least three advantages of client-server over other models.",
    "☐ I can give real-world examples (web server, database server, email server).",
    "☐ I know that servers can be virtualized and that security is a central concern."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Client-Server Architecture
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The backbone of modern distributed computing
          </p>
        </div>

        {/* Concept & How It Works */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏛️</span>
              <h2 className="text-2xl font-semibold">What is Client-Server?</h2>
            </div>
            <p className="text-gray-200">{definition}</p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-300 italic">
                💡 Think of a restaurant: you (client) order from a waiter; the kitchen (server) prepares the meal; the waiter brings it back.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-2xl font-semibold">How It Works</h2>
            </div>
            <ul className="list-decimal pl-5 space-y-2 text-gray-200">
              {howItWorks.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SVG Illustration: Client-Server Request-Response */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-semibold">Visual: Request‑Response Flow</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="280" viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Client sending request to server, server sending response back</title>
              
              {/* Client side */}
              <rect x="50" y="80" width="140" height="100" fill="#1F2937" stroke="#60A5FA" strokeWidth="2" rx="8" />
              <text x="120" y="125" fill="#E5E7EB" fontSize="14" textAnchor="middle">Client</text>
              <text x="120" y="150" fill="#9CA3AF" fontSize="10" textAnchor="middle">Browser / App</text>
              
              {/* Server side */}
              <rect x="560" y="80" width="140" height="100" fill="#1F2937" stroke="#34D399" strokeWidth="2" rx="8" />
              <text x="630" y="125" fill="#E5E7EB" fontSize="14" textAnchor="middle">Server</text>
              <text x="630" y="150" fill="#9CA3AF" fontSize="10" textAnchor="middle">Web / DB / App</text>
              
              {/* Request arrow (client → server) */}
              <path d="M190 130 L550 130" stroke="#F97316" strokeWidth="3" fill="none" strokeDasharray="5 3" />
              <polygon points="550,130 540,125 540,135" fill="#F97316" />
              <text x="370" y="115" fill="#F97316" fontSize="12" textAnchor="middle">Request</text>
              
              {/* Response arrow (server → client) */}
              <path d="M550 170 L190 170" stroke="#FBBF24" strokeWidth="3" fill="none" strokeDasharray="5 3" />
              <polygon points="190,170 200,165 200,175" fill="#FBBF24" />
              <text x="370" y="195" fill="#FBBF24" fontSize="12" textAnchor="middle">Response</text>
              
              {/* Animated packet on request */}
              <circle cx="190" cy="130" r="5" fill="#F97316">
                <animate attributeName="cx" values="190;550" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="130;130" dur="1.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Animated packet on response */}
              <circle cx="550" cy="170" r="5" fill="#FBBF24">
                <animate attributeName="cx" values="550;190" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
                <animate attributeName="cy" values="170;170" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Client sends a request; server processes and returns a response.
          </p>
        </div>

        {/* Advantages */}
        <div
          className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">✅</span>
            <h2 className="text-2xl font-semibold">Advantages</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-200 grid md:grid-cols-2 gap-x-6">
            {advantages.map((adv, i) => (
              <li key={i}>{adv}</li>
            ))}
          </ul>
        </div>

        {/* Real-World Examples */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌍</span>
            <h2 className="text-2xl font-semibold">Real‑World Examples</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {realWorldExamples.map((ex, idx) => (
              <div
                key={ex.title}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-cyan-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.6 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-cyan-300">{ex.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{ex.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-2xl font-semibold">Common Mistakes & Pitfalls</h2>
            </div>
            <ul className="space-y-4">
              {commonMistakes.map((item, idx) => (
                <li key={idx} className="border-b border-gray-700 pb-3 last:border-0">
                  <p className="font-medium text-red-300">{item.mistake}</p>
                  <p className="text-gray-300 text-sm mt-1">✓ {item.correction}</p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✅</span>
              <h2 className="text-2xl font-semibold">Best Practices</h2>
            </div>
            <ul className="space-y-3 list-disc pl-5 text-gray-200">
              {bestPractices.map((practice, idx) => (
                <li key={idx} className="hover:text-green-300 transition-colors">
                  {practice}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tips & Tricks + Mini Checklist */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h2 className="text-2xl font-semibold">Tips & Tricks</h2>
            </div>
            <ul className="space-y-3 list-disc pl-5 text-gray-200">
              {tipsAndTricks.map((tip, idx) => (
                <li key={idx} className="hover:text-yellow-300 transition-colors">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📋</span>
              <h2 className="text-2xl font-semibold">Mini Checklist</h2>
            </div>
            <div className="grid gap-2">
              {miniChecklist.map((item, idx) => (
                <p key={idx} className="text-gray-200 flex items-start gap-2">
                  <span className="text-green-400">✓</span> {item.substring(2)}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div
          className="border border-dashed border-blue-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: When you log into a website, what is the client? What is the server? How does the server know who you are across multiple requests?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Use your browser's developer tools (Network tab) to inspect the requests your favorite website makes. Which requests go to which servers? What responses do you see (e.g., 200 OK, 404 Not Found)?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Client-server is a fundamental pattern. Start with the restaurant analogy, then show real HTTP requests using browser dev tools. Emphasize that the same pattern appears everywhere: web, databases, file sharing. Contrast with peer-to-peer (next topic) to highlight differences. If possible, set up a simple local web server (Python's http.server) and have students make requests. They'll see the client-server relationship firsthand."
            }
          />
        </div>

        {/* Keyframe Styles */}
        <style>{`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(1rem);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic9;