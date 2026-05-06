// Topic8.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import pipeDemoSh from './topic8_files/pipe_demo.sh?raw';
import pipeCalcSh from './topic8_files/pipe_calc.sh?raw';
import pipeDemoC from './topic8_files/pipe_demo.c?raw';

const Topic8 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
            Inter-process Communication: pipe()
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-sky-500 pl-4">
            Connecting processes with unidirectional data streams – the classic Unix IPC mechanism.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-sky-500">📡</span> What is a Pipe?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                A <strong className="text-sky-600 dark:text-sky-400">pipe</strong> is a unidirectional data channel that can be used for communication between related processes (usually a parent and child). 
                It provides a simple byte‑stream abstraction: one process writes to the pipe, another reads from it.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><code>pipe()</code> creates a pair of file descriptors: <code>fd[0]</code> for reading, <code>fd[1]</code> for writing</li>
                <li><strong>Unidirectional</strong> – data flows from write end to read end</li>
                <li><strong>FIFO</strong> (First In, First Out) byte stream with limited kernel buffer</li>
                <li><strong>Blocking behaviour</strong>: read blocks if empty, write blocks if full (unless O_NONBLOCK)</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border text-sm font-mono">
                <code className="block whitespace-pre">
                  {`#include <unistd.h>
int pipe(int pipefd[2]);`}
                </code>
                <p className="text-xs mt-1">Returns 0 on success, -1 on error. <code>pipefd[0]</code> is read end, <code>pipefd[1]</code> is write end.</p>
              </div>
              <p className="mt-3 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border">
                💡 Pipes are the foundation of the Unix philosophy: "<strong>do one thing and communicate via text streams</strong>".
              </p>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-blue-500">🏭</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                In a factory at <strong>Shyamnagar</strong>, an assembly line moves items from one station to the next.
                The conveyor belt (<strong>pipe</strong>) is one‑way: worker <strong>Swadeep</strong> places finished components on the belt (write end), 
                and worker <strong>Tuhina</strong> picks them up at the other end (read end). 
                If the belt is empty, Tuhina waits (blocking read). If the belt is full, Swadeep waits (blocking write). 
                The belt can be made non‑blocking, but typically they just wait until items arrive. 
                This is exactly how <strong>Abhronila</strong>'s script pipes output to <code>grep</code>.
              </p>
              <div className="mt-4 border-l-4 border-blue-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "Pipes turn the output of one program into the input of another – the glue of Unix."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Pipe communication between parent and child */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">📬 Pipe Communication: Parent ↔ Child</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on each component – animated data flow shows the message</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="700" height="300" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="pipe-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                </marker>
                <filter id="shadow-pipe">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Parent process */}
              <g transform="translate(120, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-pipe)">
                <rect x="-60" y="-35" width="120" height="70" rx="10" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="width" values="120;126;120" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-8" textAnchor="middle" fill="white" fontWeight="bold">Parent</text>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="11">write(fd[1])</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10">"Hello from parent"</text>
                <title>Parent writes to the pipe using fd[1]</title>
              </g>
              
              {/* Pipe line */}
              <line x1="180" y1="60" x2="400" y2="60" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeDasharray="10,5"/>
              <line x1="180" y1="60" x2="400" y2="60" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,6">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
              </line>
              <text x="290" y="45" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="bold">pipe buffer (kernel)</text>
              
              {/* Child process */}
              <g transform="translate(520, 60)" className="cursor-pointer hover:drop-shadow-lg transition" filter="url(#shadow-pipe)">
                <rect x="-60" y="-35" width="120" height="70" rx="10" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="-8" textAnchor="middle" fill="white" fontWeight="bold">Child</text>
                <text x="0" y="8" textAnchor="middle" fill="white" fontSize="11">read(fd[0])</text>
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="10">"Hello from parent"</text>
                <title>Child reads from the pipe using fd[0]</title>
              </g>
              
              {/* Arrow from parent to pipe */}
              <line x1="180" y1="75" x2="240" y2="75" stroke="#0284c7" strokeWidth="2" markerEnd="url(#pipe-arrow)"/>
              <text x="210" y="95" fill="#0284c7" fontSize="10">write</text>
              
              {/* Arrow from pipe to child */}
              <line x1="440" y1="75" x2="490" y2="75" stroke="#0284c7" strokeWidth="2" markerEnd="url(#pipe-arrow)"/>
              <text x="465" y="95" fill="#0284c7" fontSize="10">read</text>
              
              {/* File descriptor diagram */}
              <g transform="translate(200, 180)">
                <rect x="0" y="0" width="280" height="70" rx="8" fill="#1e293b" className="hover:fill-gray-800 transition" />
                <text x="140" y="20" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">struct pipe_inode_info</text>
                <text x="20" y="40" fill="#cbd5e1" fontSize="10">write_fd = fd[1]</text>
                <text x="20" y="55" fill="#cbd5e1" fontSize="10">read_fd  = fd[0]</text>
                <text x="160" y="40" fill="#cbd5e1" fontSize="10">buffer: circular queue</text>
                <text x="160" y="55" fill="#cbd5e1" fontSize="10">size: typically 64KB</text>
              </g>
              
              <text x="350" y="270" textAnchor="middle" fill="#6b7280" fontSize="12">Pipes are unidirectional – data flows from write end to read end</text>
            </svg>
          </div>
        </div>

        {/* Pipe characteristics */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-sky-100 dark:bg-sky-900/30 p-5 rounded-2xl border-l-8 border-sky-500">
            <h4 className="font-mono font-bold">Key Properties</h4>
            <ul className="list-disc pl-4 text-sm mt-1 space-y-0.5">
              <li>Unidirectional – one process writes, another reads</li>
              <li>Byte stream (not message‑oriented)</li>
              <li>Limited kernel buffer (typically 16 pages = 64KB on Linux)</li>
              <li>Blocking I/O by default (can be set non‑blocking with fcntl)</li>
              <li>Used only between related processes (parent‑child or siblings)</li>
              <li>Data is consumed upon reading – no persistence</li>
            </ul>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-2xl border-l-8 border-blue-500">
            <h4 className="font-mono font-bold">Common Use Cases</h4>
            <ul className="list-disc pl-4 text-sm mt-1 space-y-0.5">
              <li>Shell pipelines: <code>ls -l | grep foo</code></li>
              <li>Parent sending commands to child (e.g., shell job control)</li>
              <li>Child sending results back to parent (e.g., computation server)</li>
              <li>Two-way communication using two pipes</li>
              <li>Filter programs (stdin → pipe → stdout)</li>
            </ul>
          </div>
        </div>

        {/* Example C code with pipe() */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-md transition animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <h3 className="text-xl font-semibold mb-3">📝 Example: Parent writes, child reads</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>
{`#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main() {
    int fd[2];
    if (pipe(fd) == -1) {
        perror("pipe");
        return 1;
    }

    pid_t pid = fork();
    if (pid == -1) {
        perror("fork");
        return 1;
    }

    if (pid == 0) {
        // Child: read from pipe
        close(fd[1]);  // close unused write end
        char buffer[100];
        ssize_t n = read(fd[0], buffer, sizeof(buffer) - 1);
        if (n > 0) {
            buffer[n] = '\\0';
            printf("Child received: %s\\n", buffer);
        }
        close(fd[0]);
    } else {
        // Parent: write to pipe
        close(fd[0]);  // close unused read end
        char *msg = "Hello from parent!";
        write(fd[1], msg, strlen(msg) + 1);
        close(fd[1]);
        wait(NULL);
    }
    return 0;
}`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Compile with <code>gcc -o pipe_demo pipe_demo.c</code></p>
        </div>

        {/* Shell demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Practical Demos</h3>
          <ShellFileLoader
            fileModule={pipeDemoSh}
            title="Shell: anonymous pipe between commands"
            highlightLines={[3, 6, 10]}
          />
          <ShellFileLoader
            fileModule={pipeCalcSh}
            title="Shell: two-way pipe using process substitution"
            highlightLines={[4, 8]}
          />
          <ShellFileLoader
            fileModule={pipeDemoC}
            title="pipe_demo.c – compile and run yourself"
            highlightLines={[5, 12, 19, 24]}
          />
          <div className="bg-sky-50 dark:bg-sky-950/30 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2"><span className="text-sky-600">🔍</span> Command-line pipe exploration:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`# See pipe buffer size
ulimit -a | grep 'pipe size'
# Create a slow pipeline
yes | head -1000 | wc -l
# Measure pipeline performance
time sh -c "dd if=/dev/zero bs=1M count=100 | cat > /dev/null"`}
            </code>
          </div>
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Close unused ends!</strong> If parent doesn't close its read end, the child may never get EOF; if child doesn't close write end, parent may block.</li>
              <li>Use <code>write()</code> and <code>read()</code> in loops – pipes guarantee atomic writes under PIPE_BUF (typically 4096 bytes) for small messages.</li>
              <li>Set <code>fcntl(fd, F_SETFL, O_NONBLOCK)</code> for non‑blocking I/O (useful in event loops).</li>
              <li>For bidirectional comm, use <strong>two pipes</strong> (or socketpair). A single pipe cannot be used both ways.</li>
              <li>Monitor pipe buffer usage via <code>fcntl(fd, F_GETPIPE_SZ)</code> (Linux specific).</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Experiment</div>
            <p className="mt-2 text-sm">Write a program that forks, and the child sends a large message (e.g., 1MB) through the pipe. What happens if the parent does not read? Why does the write block? Try calling <code>fcntl(fd[1], F_SETFL, O_NONBLOCK)</code> – what changes?</p>
            <p className="mt-1 text-xs">Also: create two pipes – one parent→child and one child→parent to implement a back‑and‑forth conversation.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Forgetting to close the unused pipe end – leads to deadlock or the child never seeing EOF.</li>
              <li>Assuming <code>read()</code> will return the whole message in one call – it may return partial data.</li>
              <li>Using a pipe for bidirectional communication without two pipes – data will be consumed by the wrong process.</li>
              <li>Not checking return values of read/write on pipes – they can be interrupted or return short counts.</li>
              <li>Writing more than <code>PIPE_BUF</code> bytes without considering atomicity.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always check the return of <code>read()</code> and <code>write()</code> for errors and short transfers.</li>
              <li>Use <code>{`while ( (n = read(fd, buf, size)) > 0 ) { ... }`}</code> to read until EOF.</li>
              <li>For structured messages, encode length first or delimit with newlines (as Unix tools do).</li>
              <li>Consider using <code>socketpair(AF_UNIX, SOCK_STREAM, 0, fd)</code> for bidirectional streams.</li>
              <li>In multi‑threaded programs, each thread should have its own pipe or proper locking.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand pipe() when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-sky-500">☑</span> Can explain that pipes are unidirectional</div>
            <div className="flex items-center gap-2"><span className="text-sky-500">☑</span> Know why both ends must be closed appropriately</div>
            <div className="flex items-center gap-2"><span className="text-sky-500">☑</span> Can write a program that sends a string parent→child</div>
            <div className="flex items-center gap-2"><span className="text-sky-500">☑</span> Understand blocking behaviour and PIPE_BUF</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Inter-process Communication: pipe()" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/40 dark:to-blue-950/40 p-6 rounded-2xl border border-sky-200 dark:border-sky-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-sky-800 dark:text-sky-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “I tell students at <strong>Barrackpore</strong> and <strong>Naihati</strong>: pipe() is the secret sauce of Unix. 
                <strong>Abhronila</strong> was amazed when she realised that <code>ls | grep txt</code> creates a pipe between two processes. 
                The key lesson: after <code>fork()</code>, each process must close the end it doesn't need. 
                I've seen countless bugs where a parent kept the read end open and the child never got EOF. 
                Another memorable class: we implemented a ring of processes using pipes – each child passed a token. 
                That exercise taught more about concurrency than any lecture.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>strace -f -e read,write</code> on a piped command to see the actual data transfer.</p>
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

export default Topic8;