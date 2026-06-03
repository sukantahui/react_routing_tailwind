// Topic9.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import msgqueueDemoSh from './topic9_files/msgqueue_demo.sh?raw';
import msgqueueServerC from './topic9_files/msgqueue_server.c?raw';
import msgqueueClientC from './topic9_files/msgqueue_client.c?raw';

const Topic9 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Message Passing Basics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-teal-500 pl-4">
            Structured communication between processes using message queues – beyond simple byte streams.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-teal-500">📨</span> What is Message Passing?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                <strong className="text-teal-600 dark:text-teal-400">Message passing</strong> is an inter‑process communication (IPC) mechanism where processes exchange discrete messages (structured data) through a kernel‑managed object called a <strong>message queue</strong>.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li>Messages have a <strong>type</strong> (a positive integer) and <strong>data</strong> (any bytes).</li>
                <li>Processes can send messages to a queue, and other processes can receive messages by type.</li>
                <li><strong>System V message queues</strong> (older, widely available)</li>
                <li><strong>POSIX message queues</strong> (newer, with better interfaces, namespacing)</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`#include <sys/msg.h>
int msgget(key_t key, int msgflg);
int msgsnd(int msqid, const void *msgp, size_t msgsz, int msgflg);
ssize_t msgrcv(int msqid, void *msgp, size_t msgsz, long msgtyp, int msgflg);`}
                </code>
                <p className="text-xs mt-1">System V message queue system calls</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-emerald-500">🏢</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                Imagine a post office in <strong>Ichapur</strong>. Different people (<strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>) can drop letters into mail slots. Each letter has a <strong>type label</strong> (e.g., "personal", "business", "urgent"). 
                Recipients can collect only letters of a specific type. The post office holds letters until they are picked up. 
                Unlike a pipe (which is like a phone call – real‑time and connected), a message queue is like an <strong>asynchronous mailbox</strong>: sender and receiver don't need to run at the same time.
              </p>
              <div className="mt-4 border-l-4 border-emerald-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "Message queues decouple sender and receiver in time and space – they don't need a common parent."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Message Queue Operation */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">📬 How a Message Queue Works</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on each component – animated messages flow into the queue</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="750" height="300" viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="mq-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#0d9488" />
                </marker>
                <filter id="shadow-mq">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Sender 1 */}
              <g transform="translate(80, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-mq)">
                <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="width" values="100;106;100" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Sender A</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">type=1, data="hello"</text>
                <title>Process sends message of type 1</title>
              </g>
              
              {/* Sender 2 */}
              <g transform="translate(80, 150)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-mq)">
                <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Sender B</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">type=2, data="world"</text>
                <title>Process sends message of type 2</title>
              </g>
              
              {/* Message Queue (kernel) */}
              <g transform="translate(300, 105)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-mq)">
                <rect x="-70" y="-45" width="140" height="90" rx="10" fill="#1e293b" stroke="#0d9488" strokeWidth="2">
                  <animate attributeName="stroke" values="#0d9488;#14b8a6;#0d9488" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-20" textAnchor="middle" fill="#5eead4" fontWeight="bold" fontSize="12">Message Queue</text>
                <text x="0" y="0" textAnchor="middle" fill="#cbd5e1" fontSize="10">[type 1, "hello"]</text>
                <text x="0" y="15" textAnchor="middle" fill="#cbd5e1" fontSize="10">[type 2, "world"]</text>
                <text x="0" y="30" textAnchor="middle" fill="#cbd5e1" fontSize="10">[type 1, "msg3"]</text>
                <title>Kernel holds messages by type in a FIFO order within each type</title>
              </g>
              
              {/* Receiver 1 */}
              <g transform="translate(570, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-mq)">
                <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="x" values="570;573;570" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Receiver X</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">recv type=1</text>
                <text x="0" y="28" textAnchor="middle" fill="white" fontSize="9">gets "hello"</text>
                <title>Process receives messages of type 1</title>
              </g>
              
              {/* Receiver 2 */}
              <g transform="translate(570, 150)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-mq)">
                <rect x="-50" y="-30" width="100" height="60" rx="8" fill="#8b5cf6" className="hover:fill-purple-500 transition">
                  <animate attributeName="x" values="570;573;570" dur="2.8s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-5" textAnchor="middle" fill="white" fontWeight="bold">Receiver Y</text>
                <text x="0" y="15" textAnchor="middle" fill="white" fontSize="10">recv type=2</text>
                <text x="0" y="28" textAnchor="middle" fill="white" fontSize="9">gets "world"</text>
                <title>Process receives messages of type 2</title>
              </g>
              
              {/* Arrows from senders to queue */}
              <line x1="130" y1="50" x2="230" y2="85" stroke="#0d9488" strokeWidth="2" markerEnd="url(#mq-arrow)"/>
              <line x1="130" y1="150" x2="230" y2="120" stroke="#0d9488" strokeWidth="2" markerEnd="url(#mq-arrow)"/>
              
              {/* Arrows from queue to receivers */}
              <line x1="370" y1="85" x2="510" y2="60" stroke="#0d9488" strokeWidth="2" markerEnd="url(#mq-arrow)"/>
              <line x1="370" y1="130" x2="510" y2="150" stroke="#0d9488" strokeWidth="2" markerEnd="url(#mq-arrow)"/>
              
              <text x="375" y="230" textAnchor="middle" fill="#6b7280" fontSize="12">Messages persist in kernel until received – sender and receiver need not run simultaneously</text>
            </svg>
          </div>
        </div>

        {/* System V vs POSIX message queues */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-teal-100 dark:bg-teal-900/30 p-5 rounded-2xl border-l-8 border-teal-500">
            <h4 className="font-mono font-bold">System V Message Queues</h4>
            <ul className="list-disc pl-4 text-sm mt-1 space-y-0.5">
              <li>Identified by <strong>key_t</strong> (IPC key, often created with ftok)</li>
              <li>Each message has a long integer type (≥ 1)</li>
              <li>Message data is any struct with <code>long mtype</code> as first member</li>
              <li>Kernel limits: <code>msgmax</code>, <code>msgmnb</code>, <code>msgmni</code></li>
              <li>Can be controlled with <code>ipcs</code>, <code>ipcrm</code> commands</li>
            </ul>
          </div>
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-5 rounded-2xl border-l-8 border-emerald-500">
            <h4 className="font-mono font-bold">POSIX Message Queues</h4>
            <ul className="list-disc pl-4 text-sm mt-1 space-y-0.5">
              <li>Identified by <strong>name</strong> (e.g., "/myqueue")</li>
              <li>Use <code>mq_open()</code>, <code>mq_send()</code>, <code>mq_receive()</code></li>
              <li>Supports priorities and non‑blocking operations</li>
              <li>Mount at <code>/dev/mqueue</code> (can be listed)</li>
              <li>More modern, better for real‑time applications</li>
            </ul>
          </div>
        </div>

        {/* Example C code – System V message queue */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 System V Message Queue – Sender & Receiver</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`// common.h
#define MSG_KEY 1234
#define MSG_SIZE 256

struct msgbuf {
    long mtype;
    char mtext[MSG_SIZE];
};

// sender.c
int msqid = msgget(MSG_KEY, IPC_CREAT | 0666);
struct msgbuf msg = { .mtype = 1, .mtext = "Hello from Barrackpore" };
msgsnd(msqid, &msg, strlen(msg.mtext)+1, 0);

// receiver.c
int msqid = msgget(MSG_KEY, 0666);
struct msgbuf msg;
msgrcv(msqid, &msg, MSG_SIZE, 1, 0);
printf("Received: %s\\n", msg.mtext);`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Compile separately, run sender then receiver. Check queues with <code>ipcs -q</code>.</p>
        </div>

        {/* Shell and C demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={msgqueueDemoSh}
            title="Shell: inspect and manage message queues with ipcs"
            highlightLines={[3, 8, 14]}
          />
          <ShellFileLoader
            fileModule={msgqueueServerC}
            title="msgqueue_server.c – creates a queue and receives messages"
            highlightLines={[8, 15, 22]}
          />
          <ShellFileLoader
            fileModule={msgqueueClientC}
            title="msgqueue_client.c – sends messages to the queue"
            highlightLines={[6, 12]}
          />
          <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-teal-600">🔍</span> Try these commands to explore message queues:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# List all System V message queues
ipcs -q
# Remove a queue (dangerous)
ipcrm -q <msqid>
# Monitor POSIX queues
mount -t mqueue none /dev/mqueue && ls /dev/mqueue`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Always <strong>check return values</strong> of msgget, msgsnd, msgrcv – they can fail for many reasons.</li>
              <li>Set appropriate <strong>permissions</strong> (e.g., 0666) when creating a queue.</li>
              <li>Use <code>msgctl(msqid, IPC_RMID, NULL)</code> to clean up queues to avoid kernel resource leaks.</li>
              <li>For POSIX queues, use <code>mq_unlink()</code> after use.</li>
              <li>Use <strong>message types</strong> to implement a simple priority system (higher type number = higher priority).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Write a program where multiple senders and receivers communicate through one message queue. Use different message types to filter messages. What happens if you try to send a message with mtype = 0? (It's illegal).</p>
            <p className="mt-1 text-xs">Also: Run two receivers waiting for different types, and one sender. Which receiver gets the message based on its type?</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Forgetting to define the message structure correctly – first member must be <code>long mtype</code>.</li>
              <li>Assuming message queues are automatically removed – they persist after all processes exit.</li>
              <li>Not handling <code>msgrcv</code> returning partial messages (it returns number of bytes read).</li>
              <li>Using the same queue for different data types without proper serialisation.</li>
              <li>IPC key collisions (ftok with same path/ID).</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always delete message queues when no longer needed (<code>msgctl</code> with <code>IPC_RMID</code>).</li>
              <li>Use a well‑known key generated by <code>ftok()</code> with a consistent path and ID.</li>
              <li>Set <code>IPC_NOWAIT</code> flag for non‑blocking operations when needed.</li>
              <li>For cross‑platform code, prefer POSIX message queues or use a wrapper library.</li>
              <li>Monitor queue usage with <code>ipcs -q</code> to detect leaks.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand message passing when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-teal-500">☑</span> Can explain difference between pipes and message queues</div>
            <div className="flex items-center gap-2"><span className="text-teal-500">☑</span> Know how to create, send, receive, and delete System V message queues</div>
            <div className="flex items-center gap-2"><span className="text-teal-500">☑</span> Understand the role of message type in filtering</div>
            <div className="flex items-center gap-2"><span className="text-teal-500">☑</span> Can use ipcs/ipcrm to inspect and clean queues</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Message Passing Basics" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 p-6 rounded-2xl border border-teal-200 dark:border-teal-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “In my classes at <strong>Shyamnagar</strong>, I compare pipes to a telephone call – direct and live; message queues to email – stored and asynchronous. 
                <strong>Debangshu</strong> once built a multi‑client chat system using message queues – he learned why message types are essential for routing. 
                A classic exercise: write a server that listens for requests (type = 1) and sends replies (type = client PID). 
                This teaches not only IPC but also protocol design. 
                Always emphasise: message queues are great for unrelated processes and persist beyond process lifetimes – that’s both a feature and a pitfall.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>strace -e trace=msgget,msgsnd,msgrcv</code> to see system calls in action.</p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-slide-up {
            0% { opacity: 0.7; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [class*="animate-"] { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic9;