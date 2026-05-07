import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0 Component
 * 
 * Prototype: function Topic0(): JSX.Element
 * Return type: JSX.Element
 * Purpose: Introduce the concept of network file sharing, its need, historical evolution,
 *          and modern use cases (office networks, cloud backends).
 * When & why used: As the first topic in a networking/storage curriculum to establish
 *                  foundational knowledge before diving into specific protocols.
 */
const Topic0 = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* ========== HERO SECTION ========== */}
        <div className="space-y-6 text-center md:text-left">
          <div 
            className="animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]"
            style={{ animationFillMode: 'both' }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 mb-4">
              Topic 0 • Foundation
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Introduction to Network File Sharing
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Why centralized file access? From floppy disks to cloud storage – the evolution,
              benefits, and real-world applications of sharing files over a network.
            </p>
          </div>
        </div>

        {/* ========== NEED FOR CENTRALIZED FILE ACCESS ========== */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                Why Centralized File Access?
              </h2>
              <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>🔹 <strong>Data consistency</strong> – Everyone sees the same version of a file (no more "final_v2_final.docx" conflicts).</p>
                <p>🔹 <strong>Backup & recovery</strong> – Centralized storage simplifies scheduled backups and disaster recovery.</p>
                <p>🔹 <strong>Access control</strong> – Granular permissions (who can read/write) from a single management point.</p>
                <p>🔹 <strong>Collaboration</strong> – Multiple users can work on shared documents simultaneously (with proper locking).</p>
                <p>🔹 <strong>Cost efficiency</strong> – Redundant local storage replaced by shared network drives.</p>
              </div>
              <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg text-sm">
                💡 <strong>Think about:</strong> In a school of 200 students, how would you distribute worksheets without network sharing? (USB drives? Email attachments? Both cause chaos.)
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Historical Context
              </h2>
              <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                <p>📀 <strong>1980s:</strong> Sneakernet (floppy disks). Barrackpore school lab: Susmita copies files to disk, walks to another computer.</p>
                <p>💾 <strong>Late 80s:</strong> Novell NetWare – first popular network OS for file/print sharing.</p>
                <p>🖧 <strong>Early 90s:</strong> NFS (Sun) becomes standard on Unix; SMB (Microsoft) on Windows.</p>
                <p>☁️ <strong>2000s–present:</strong> Cloud storage (Google Drive, OneDrive, Dropbox) – network file sharing over the internet.</p>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <span className="font-mono">Observe carefully:</span> The fundamental need hasn't changed – only the protocols and media evolved.
              </div>
            </div>
          </div>
        </div>

        {/* ========== COMMON USE CASES (CARDS WITH STAGGERED ANIMATION) ========== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 mb-6">Common Use Cases Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Office Networks</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">Shared drives for departments (Finance, HR), networked printers, roaming user profiles. Example: Ichapur government office uses SMB shares for document management.</p>
              <div className="mt-3 text-xs text-indigo-600 dark:text-indigo-400">💡 Try changing this: Map a network drive in Windows to a Samba share.</div>
            </div>
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700">
              <div className="text-4xl mb-3">☁️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Cloud Storage Backends</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">Google Drive, Dropbox, OneDrive – all use network file protocols (often custom) to sync files between servers and clients.</p>
              <div className="mt-3 text-xs text-indigo-600 dark:text-indigo-400">💡 Think about: How does your phone sync photos to the cloud? That's network file sharing in action.</div>
            </div>
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Educational Labs</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">Student home directories, shared assignment folders, central software repository. Jadavpur University uses NFS to host Linux home directories.</p>
              <div className="mt-3 text-xs text-indigo-600 dark:text-indigo-400">💡 Observe carefully: Why would Mamata's school choose NFS over USB drives?</div>
            </div>
          </div>
        </div>

        {/* ========== INTERACTIVE SVG: EVOLUTION TIMELINE ========== */}
        <div className="mt-20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Evolution of Network File Sharing</h3>
            <p className="text-gray-500 dark:text-gray-400">Hover on each milestone</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 transition-all hover:shadow-xl">
            <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              {/* Timeline line */}
              <line x1="50" y1="100" x2="750" y2="100" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="8 4" />
              
              {/* 1980s */}
              <g transform="translate(80, 100)">
                <circle r="16" fill="#818cf8" className="transition-all duration-300 hover:r-20 hover:fill-indigo-500" cursor="pointer">
                  <title>Sneakernet - Floppy disks</title>
                </circle>
                <text x="0" y="30" textAnchor="middle" fill="#1f2937" dark="white" fontSize="12" className="dark:fill-white">1980s</text>
                <text x="0" y="45" textAnchor="middle" fill="#4b5563" dark="#9ca3af" fontSize="10" className="dark:fill-gray-400">Floppy disks</text>
              </g>
              
              {/* 1990s */}
              <g transform="translate(280, 100)">
                <circle r="16" fill="#f59e0b" className="transition-all duration-300 hover:r-20 hover:fill-amber-500" cursor="pointer">
                  <title>NFS & SMB/CIFS</title>
                </circle>
                <text x="0" y="30" textAnchor="middle" fill="#1f2937" dark="white" fontSize="12" className="dark:fill-white">1990s</text>
                <text x="0" y="45" textAnchor="middle" fill="#4b5563" dark="#9ca3af" fontSize="10" className="dark:fill-gray-400">NFS / SMB</text>
              </g>
              
              {/* 2000s */}
              <g transform="translate(500, 100)">
                <circle r="16" fill="#10b981" className="transition-all duration-300 hover:r-20 hover:fill-emerald-500" cursor="pointer">
                  <title>NAS Appliances</title>
                </circle>
                <text x="0" y="30" textAnchor="middle" fill="#1f2937" dark="white" fontSize="12" className="dark:fill-white">2000s</text>
                <text x="0" y="45" textAnchor="middle" fill="#4b5563" dark="#9ca3af" fontSize="10" className="dark:fill-gray-400">NAS (e.g., NFS/SMB)</text>
              </g>
              
              {/* 2010s+ */}
              <g transform="translate(680, 100)">
                <circle r="16" fill="#ec4899" className="transition-all duration-300 hover:r-20 hover:fill-pink-500" cursor="pointer">
                  <title>Cloud Storage</title>
                </circle>
                <text x="0" y="30" textAnchor="middle" fill="#1f2937" dark="white" fontSize="12" className="dark:fill-white">2010s+</text>
                <text x="0" y="45" textAnchor="middle" fill="#4b5563" dark="#9ca3af" fontSize="10" className="dark:fill-gray-400">Cloud (Drive, Dropbox)</text>
              </g>
              
              {/* Animated arrow */}
              <polygon points="750,95 770,100 750,105" fill="#4f46e5">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </polygon>
            </svg>
            <p className="text-center text-xs text-gray-500 mt-4">*Each circle represents a major shift in how we share files</p>
          </div>
        </div>

        {/* ========== TIPS, COMMON MISTAKES, BEST PRACTICES, CHECKLIST ========== */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 dark:from-emerald-950/30 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 hover:shadow transition">
              <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">💡 Pro Tips (Industry Perspective)</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1 leading-relaxed">
                <li>Always plan for growth: Use logical names (e.g., //fileserver/share) not IP addresses.</li>
                <li>For cloud storage, understand bandwidth costs and sync conflicts.</li>
                <li>In mixed OS environments, prefer SMB (most compatible) or WebDAV.</li>
                <li>Small office? A Raspberry Pi with OpenMediaVault can be a cheap NAS.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-rose-50 dark:from-rose-950/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-800 hover:shadow transition">
              <h4 className="text-xl font-bold text-rose-800 dark:text-rose-300">⚠️ Common Pitfalls (Beginners)</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Assuming network file sharing is "automatic" – permissions, firewalls, and services must be configured.</li>
                <li>Storing sensitive data on a share without encryption or access control.</li>
                <li>Not planning for offline access – cloud caches help, but not all protocols support it.</li>
                <li>Misunderstanding: "Cloud is always backed up" – not true; user error still deletes files.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow transition">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">✅ Best Practices for Network File Sharing</h4>
              <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Use dedicated file servers or NAS devices (not a random desktop).</li>
                <li>Implement regular backup of shares (e.g., 3-2-1 rule).</li>
                <li>Set up access logging to detect unauthorized access.</li>
                <li>For cloud shares, enable versioning and recycle bin.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 hover:shadow transition">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300">📋 Mini Checklist (What Students Should Remember)</h4>
              <ul className="space-y-2 text-gray-800 dark:text-gray-200 text-sm">
                <li>☐ Centralized file access solves consistency, backup, and collaboration problems.</li>
                <li>☐ NFS = Unix/Linux native; SMB = Windows native (but works everywhere via Samba).</li>
                <li>☐ Cloud storage is network file sharing over the internet (with sync and versioning).</li>
                <li>☐ Always consider security: authentication, encryption, permissions.</li>
                <li>☐ Start with a small lab – two VMs and a shared folder – to understand the concept.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== FAQ SECTION ========== */}
        <div className="mt-20">
          <FAQTemplate 
            title="Introduction to Network File Sharing – FAQs" 
            questions={questions} 
          />
        </div>

        {/* ========== TEACHER'S NOTE ========== */}
        <div className="mt-12">
          <Teacher note="This topic sets the stage. Many students have used Google Drive or USB drives but never thought about the underlying protocols. Use stories: Debangshu forgot his USB drive before a presentation; centralized share would have saved him. Also, emphasize that 'cloud' is just someone else's network file server. Encourage students to set up a simple shared folder between two computers in the lab – any method – to experience the need firsthand. Ask: 'What happens if two people edit the same cloud file at once?' That's concurrency control – a key problem in network file sharing." />
        </div>

        {/* ========== KEYFRAMES ANIMATION ========== */}
        <style jsx>{`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(24px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[fadeSlideUp_.*\\] {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic0;