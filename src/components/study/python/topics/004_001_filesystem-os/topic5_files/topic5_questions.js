// src/components/study/python/topics/004_001_filesystem-os/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Running external shell commands using subprocess module (run, Popen, pipes)

const questions = [
  {
    question: "Why was the 'subprocess' module introduced to replace legacy 'os.system()'?",
    shortAnswer: "'subprocess' provides a secure, powerful API to spawn new processes, connect to their standard input/output/error pipes, set execution timeouts, capture outputs cleanly, and obtain exact return codes.",
    explanation: "Standard library process execution replacement.",
    hint: "Replaced os.system to provide secure pipe handling, output capture, and timeout controls.",
    level: "basic",
    codeExample: "res = subprocess.run(['python', '--version'], capture_output=True, text=True)"
  },
  {
    question: "What is the return value of 'subprocess.run()'?",
    shortAnswer: "A 'subprocess.CompletedProcess' instance containing attributes: '.returncode', '.stdout', '.stderr', and '.args'.",
    explanation: "CompletedProcess data struct.",
    hint: "Returns a CompletedProcess object with returncode, stdout, and stderr.",
    level: "basic",
    codeExample: "res = subprocess.run(['git', 'status'], capture_output=True, text=True)\nprint(res.returncode, res.stdout)"
  },
  {
    question: "What does 'capture_output=True' do in 'subprocess.run()'?",
    shortAnswer: "It automatically redirects both 'stdout' and 'stderr' to 'subprocess.PIPE', capturing process outputs for programmatic inspection instead of dumping them to the terminal.",
    explanation: "Standard stream capturing.",
    hint: "Captures both stdout and stderr into the returned CompletedProcess object.",
    level: "basic",
    codeExample: "result = subprocess.run(['echo', 'hello'], capture_output=True)"
  },
  {
    question: "Why should you pass 'text=True' (or 'universal_newlines=True') to 'subprocess.run()'?",
    shortAnswer: "Without 'text=True', 'stdout' and 'stderr' return raw bytes ('b'hello\\n''); with 'text=True', Python automatically decodes them into standard strings ('str') using the system encoding.",
    explanation: "Automatic string decoding.",
    hint: "Decodes binary output bytes into standard Python strings automatically.",
    level: "basic",
    codeExample: "res = subprocess.run(['echo', 'test'], capture_output=True, text=True)\nassert isinstance(res.stdout, str)"
  },
  {
    question: "What happens when you pass 'check=True' to 'subprocess.run()' and the command fails?",
    shortAnswer: "If the child process exits with a non-zero returncode, Python raises a 'subprocess.CalledProcessError' exception containing the returncode, command args, and captured stderr.",
    explanation: "Enforcing exit code validation.",
    hint: "Raises CalledProcessError on any non-zero exit code.",
    level: "basic",
    codeExample: "try:\n    subprocess.run(['false'], check=True)\nexcept subprocess.CalledProcessError as e:\n    print(e.returncode)"
  },
  {
    question: "How do you protect your Python application from external commands that hang indefinitely?",
    shortAnswer: "By specifying the 'timeout=seconds' parameter in 'subprocess.run()'; if the process exceeds the timeout, Python kills the child process and raises 'subprocess.TimeoutExpired'.",
    explanation: "Execution timeout protection.",
    hint: "Pass timeout=seconds to raise TimeoutExpired if execution exceeds the limit.",
    level: "basic",
    codeExample: "subprocess.run(['sleep', '10'], timeout=2.0)"
  },
  {
    question: "Why is 'shell=True' considered a major security vulnerability in production applications?",
    shortAnswer: "Command Injection: when 'shell=True' is used with untrusted user input, malicious shell metacharacters (';', '&&', '|', '`') allow attackers to execute arbitrary unauthorized shell commands.",
    explanation: "Command injection vulnerability in shell execution.",
    hint: "Enables command injection vulnerabilities when combining with untrusted user input.",
    level: "complex",
    codeExample: "# VULNERABLE: subprocess.run(f'cat {user_file}', shell=True)"
  },
  {
    question: "How does passing a list of arguments (e.g. \"['ping', host]\") prevent command injection?",
    shortAnswer: "The arguments are passed directly to the OS 'execve()' / 'CreateProcess()' API as discrete parameters without invoking the system shell interpreter, treating metacharacters strictly as literal data.",
    explanation: "Direct parameterized execution.",
    hint: "Passes arguments directly to OS kernel without shell interpreter parsing.",
    level: "moderate",
    codeExample: "subprocess.run(['ping', user_host]) # Secure: treats input strictly as host string"
  },
  {
    question: "What is the key difference between 'subprocess.run()' and 'subprocess.Popen()'?",
    shortAnswer: "'subprocess.run()' is synchronous and blocks execution until the child process terminates; 'subprocess.Popen()' is asynchronous/non-blocking, starting the process in the background and returning immediately.",
    explanation: "Synchronous blocking vs asynchronous background execution.",
    hint: "run() blocks until completion; Popen() starts the process asynchronously.",
    level: "basic",
    codeExample: "proc = subprocess.Popen(['python', 'long_task.py']) # Returns immediately"
  },
  {
    question: "How do you stream a child process's stdout line-by-line in real-time using 'Popen'?",
    shortAnswer: "Spawn with 'stdout=subprocess.PIPE, text=True' and iterate over 'proc.stdout': 'for line in proc.stdout: print(line.strip())'.",
    explanation: "Real-time stream iteration.",
    hint: "Iterate over proc.stdout when stdout=subprocess.PIPE and text=True.",
    level: "basic",
    codeExample: "proc = subprocess.Popen(['ping', 'localhost'], stdout=subprocess.PIPE, text=True)\nfor line in proc.stdout: print(line)"
  },
  {
    question: "What is 'proc.communicate(input=None, timeout=None)' and why should it be preferred over manual pipe reads?",
    shortAnswer: "'proc.communicate()' safely sends data to stdin, reads all stdout and stderr until EOF, waits for the process to terminate, and avoids deadlocks caused by full OS pipe buffers.",
    explanation: "Deadlock-free standard stream I/O.",
    hint: "Safely reads stdout/stderr and sends stdin without risk of OS pipe buffer deadlocks.",
    level: "moderate",
    codeExample: "stdout, stderr = proc.communicate(input='hello\\n')"
  },
  {
    question: "What is the difference between 'proc.poll()' and 'proc.wait()'?",
    shortAnswer: "'proc.poll()' checks if the child process has finished without blocking (returns 'None' if alive, exit code if finished); 'proc.wait()' blocks the calling thread until the process terminates.",
    explanation: "Non-blocking status query vs blocking wait.",
    hint: "poll() checks status without blocking; wait() blocks until termination.",
    level: "basic",
    codeExample: "if proc.poll() is None: print('Still running')"
  },
  {
    question: "What is the difference between 'proc.terminate()' and 'proc.kill()'?",
    shortAnswer: "'proc.terminate()' sends a graceful termination signal ('SIGTERM' on Unix, 'TerminateProcess' on Windows); 'proc.kill()' sends an uncatchable immediate termination signal ('SIGKILL' on Unix).",
    explanation: "Graceful termination vs forceful kill.",
    hint: "terminate sends SIGTERM (graceful); kill sends SIGKILL (forceful).",
    level: "basic",
    codeExample: "proc.terminate(); proc.wait()"
  },
  {
    question: "How do you chain multiple processes together using pipes in Python (equivalent to \"cat file | grep text\")?",
    shortAnswer: "Set 'p2 = subprocess.Popen(cmd2, stdin=p1.stdout, stdout=subprocess.PIPE)' and close 'p1.stdout.close()' in the parent.",
    explanation: "OS pipe chaining between subprocesses.",
    hint: "Pass p1.stdout as stdin to p2, then close p1.stdout in parent.",
    level: "moderate",
    codeExample: "p1 = Popen(['cat', 'f'], stdout=PIPE); p2 = Popen(['grep', 'x'], stdin=p1.stdout); p1.stdout.close()"
  },
  {
    question: "Why MUST you call 'p1.stdout.close()' in the parent script when piping 'p1.stdout' into 'p2.stdin'?",
    shortAnswer: "To ensure that only 'p2' holds an open read handle to the pipe; if the parent leaves its handle open, 'p2' will never receive an EOF and will hang indefinitely waiting for input.",
    explanation: "Pipe descriptor reference counting and EOF signaling.",
    hint: "Ensures p2 receives EOF when p1 terminates, preventing pipeline deadlocks.",
    level: "complex",
    codeExample: "p1.stdout.close() # Parent closes its handle to pipe"
  },
  {
    question: "What exception is raised if the executable specified in 'subprocess.run()' does not exist?",
    shortAnswer: "A 'FileNotFoundError' (or 'OSError: [Errno 2] No such file or directory').",
    explanation: "Missing binary exception.",
    hint: "Raises FileNotFoundError if the executable is not in PATH.",
    level: "basic",
    codeExample: "try:\n    subprocess.run(['non_existent_binary'])\nexcept FileNotFoundError:\n    print('Binary not installed')"
  },
  {
    question: "How do you pass custom environment variables to a child subprocess?",
    shortAnswer: "Using the 'env=' parameter with a dictionary: 'custom_env = os.environ.copy(); custom_env[\"NODE_ENV\"] = \"prod\"; subprocess.run(cmd, env=custom_env)'.",
    explanation: "Child process environment isolation.",
    hint: "Pass a dictionary to the env= parameter of subprocess.run.",
    level: "basic",
    codeExample: "my_env = {**os.environ, 'API_KEY': '123'}\nsubprocess.run(cmd, env=my_env)"
  },
  {
    question: "How do you set the Current Working Directory for a subprocess?",
    shortAnswer: "Using the 'cwd=' parameter: 'subprocess.run([\"git\", \"status\"], cwd=\"/path/to/repo\")'.",
    explanation: "Subprocess working directory specification.",
    hint: "Pass the target folder to cwd= parameter.",
    level: "basic",
    codeExample: "subprocess.run(['npm', 'install'], cwd='frontend/')"
  },
  {
    question: "What is 'subprocess.DEVNULL' and when is it used?",
    shortAnswer: "A special standard library sentinel representing the OS null device ('/dev/null' on Unix, 'NUL' on Windows) used to discard stdout or stderr silently without buffering.",
    explanation: "Discarding child process output streams.",
    hint: "Discards stream output silently without consuming memory buffer.",
    level: "basic",
    codeExample: "subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)"
  },
  {
    question: "What is 'sys.executable' and why should it always be used to invoke Python subprocesses?",
    shortAnswer: "'sys.executable' holds the absolute path to the exact Python interpreter binary currently running the application, ensuring child scripts execute inside the same virtual environment.",
    explanation: "Virtual environment interpreter preservation.",
    hint: "Guarantees child scripts run in the exact same Python virtual environment.",
    level: "basic",
    codeExample: "subprocess.run([sys.executable, 'worker.py'])"
  },
  {
    question: "What happens if a child process produces huge output and you use 'stdout=subprocess.PIPE' without reading it?",
    shortAnswer: "The OS pipe buffer (typically 64KB) fills up, and the child process freezes/deadlocks permanently waiting for the buffer to drain.",
    explanation: "OS pipe buffer exhaustion deadlock.",
    hint: "The OS pipe buffer fills up and causes the child process to freeze/deadlock.",
    level: "complex",
    codeExample: "# Avoid: proc = Popen(cmd, stdout=PIPE); proc.wait() -> DEADLOCK IF LARGE OUTPUT"
  },
  {
    question: "How do you hide the Windows command console window when launching a GUI subprocess in Python?",
    shortAnswer: "Use 'creationflags=subprocess.CREATE_NO_WINDOW' (Windows only) or 'startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW'.",
    explanation: "Windows window creation flags.",
    hint: "Use creationflags=subprocess.CREATE_NO_WINDOW on Windows.",
    level: "moderate",
    codeExample: "subprocess.run(cmd, creationflags=subprocess.CREATE_NO_WINDOW)"
  },
  {
    question: "What is 'shlex.split()' and why is it useful when constructing subprocess argument lists?",
    shortAnswer: "'shlex.split(command_string)' splits a command string into a token list according to Unix shell quoting rules, safely preserving quoted arguments with spaces.",
    explanation: "Safe shell token splitting.",
    hint: "Splits a string into a list of arguments respecting quoted substrings.",
    level: "basic",
    codeExample: "import shlex\nargs = shlex.split('git commit -m \"My Commit Message\"')"
  },
  {
    question: "Can 'subprocess' be used with 'asyncio' in asynchronous Python code?",
    shortAnswer: "Yes, using 'asyncio.create_subprocess_exec(*args)' or 'asyncio.create_subprocess_shell()', which integrates non-blocking child process streams with the asyncio event loop.",
    explanation: "Asyncio subprocess integration.",
    hint: "Yes, using asyncio.create_subprocess_exec.",
    level: "moderate",
    codeExample: "proc = await asyncio.create_subprocess_exec('git', 'status')"
  },
  {
    question: "What is the ultimate golden rule for running external commands in Python?",
    shortAnswer: "Always pass arguments as a token list (never 'shell=True' with untrusted input), capture text with 'capture_output=True, text=True', enforce success with 'check=True', and guard with 'timeout=seconds'.",
    explanation: "The complete enterprise guideline for subprocess in Python.",
    hint: "Use list arguments without shell=True, text=True, check=True, and timeout limits.",
    level: "basic",
    codeExample: "# Python Subprocess Mastery"
  }
];

export default questions;
