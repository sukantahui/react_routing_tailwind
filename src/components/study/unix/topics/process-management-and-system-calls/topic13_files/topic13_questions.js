// topic13_questions.js
const questions = [
  {
    question: "What does the 'r' column in vmstat indicate?",
    shortAnswer: "Number of processes in the run queue (ready to run but waiting for CPU).",
    explanation: "High 'r' (sustained > number of CPU cores) indicates CPU overload. The load average is derived from this.",
    hint: "r = runnable processes.",
    level: "basic",
    codeExample: "vmstat 1"
  },
  {
    question: "What does the 'b' column indicate?",
    shortAnswer: "Number of processes blocked on I/O (usually disk or network).",
    explanation: "High 'b' suggests I/O bottleneck. Combined with high 'wa', it indicates storage subsystem issues.",
    hint: "b = blocked.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What do 'si' and 'so' mean?",
    shortAnswer: "Si = swap in (KB per second), so = swap out (KB per second).",
    explanation: "Any non‑zero values indicate active swapping. Persistent non‑zero values mean insufficient RAM.",
    hint: "si/so = swap in/out rate.",
    level: "intermediate",
    codeExample: "vmstat 1 | awk '{print $3, $4}'"
  },
  {
    question: "What do 'bi' and 'bo' represent?",
    shortAnswer: "Blocks received from disk (read) and sent to disk (write), typically in KB/s.",
    explanation: "High 'bi' indicates heavy reads, high 'bo' indicates heavy writes.",
    hint: "bi = block in, bo = block out.",
    level: "intermediate",
    codeExample: "vmstat 2"
  },
  {
    question: "What is the difference between 'us', 'sy', 'id', 'wa', 'st'?",
    shortAnswer: "us = user CPU time, sy = system CPU time, id = idle, wa = I/O wait, st = stolen time (virtualisation).",
    explanation: "us+sy = total CPU utilisation. High wa suggests disk bottleneck; high st means hypervisor overload.",
    hint: "All percentages sum to 100%.",
    level: "basic",
    codeExample: "vmstat 1 5"
  },
  {
    question: "What does a high value of 'cs' indicate?",
    shortAnswer: "High context switch rate (context switches per second).",
    explanation: "Very high cs (e.g., > 50000) may indicate lock contention or many threads waking/sleeping. Can be normal for web servers.",
    hint: "cs = context switches.",
    level: "intermediate",
    codeExample: "vmstat 1 | awk '{print $12}'"
  },
  {
    question: "What does 'in' mean in vmstat output?",
    shortAnswer: "Interrupts per second (including timer, disk, network interrupts).",
    explanation: "High interrupt rate without corresponding I/O may indicate a hardware or driver issue.",
    hint: "in = interrupts.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How to make vmstat show timestamps?",
    shortAnswer: "Use `vmstat -t` (adds date/time column), or `vmstat -n` with `date` in a loop.",
    explanation: "Helpful for correlating events with logs.",
    hint: "vmstat -t 2 10",
    level: "basic",
    codeExample: "vmstat -t 2"
  },
  {
    question: "What does the first line of vmstat output represent?",
    shortAnswer: "Averages since system boot (or since statistics were last reset).",
    explanation: "Subsequent lines are per‑interval values. Many beginners mistakenly read the first line as current.",
    hint: "Ignore the first line for real‑time monitoring.",
    level: "basic",
    codeExample: "vmstat 1 3"
  },
  {
    question: "How to get vmstat to skip the first (summary) line?",
    shortAnswer: "Use `vmstat --no-first` (if your version supports it) or use `tail -n +2`.",
    explanation: "Some systems do not support this flag; alternative is to pipe through tail.",
    hint: "vmstat 1 5 | tail -n +2",
    level: "advanced",
    codeExample: "vmstat 1 5 | awk 'NR>2'"
  },
  {
    question: "What is a healthy value for 'wa' (I/O wait)?",
    shortAnswer: "Ideally < 5%. Up to 10% is acceptable. > 20% indicates a disk bottleneck.",
    explanation: "High wa often caused by slow disks, RAID rebuilds, or many random writes.",
    hint: "Check with iostat if wa is high.",
    level: "intermediate",
    codeExample: "vmstat 2"
  },
  {
    question: "How to monitor disk I/O per device using vmstat?",
    shortAnswer: "Use `vmstat -d` (disk statistics) or `vmstat -D` (summary).",
    explanation: "Shows reads, writes, and I/O for each disk – more detailed than the global bi/bo.",
    hint: "vmstat -d",
    level: "intermediate",
    codeExample: "vmstat -d 2"
  },
  {
    question: "What does 'st' (stolen time) indicate?",
    shortAnswer: "Percentage of CPU time stolen by the hypervisor from a virtual machine.",
    explanation: "High st (> 5%) means the host is overcommitted, and your VM is not getting its allocated CPU share.",
    hint: "Check with the cloud provider.",
    level: "advanced",
    codeExample: "vmstat 1"
  },
  {
    question: "How to detect memory pressure with vmstat?",
    shortAnswer: "Look at `si` and `so` – non‑zero rates indicate swapping. Also check `free` and `cache` columns.",
    explanation: "If free memory is low and si/so are zero, the kernel is using caches effectively – not a problem.",
    hint: "si/so > 0 = swapping.",
    level: "intermediate",
    codeExample: "vmstat 1 10 | grep -v '^procs' | awk '{if ($3>0 || $4>0) print}'"
  },
  {
    question: "What is the difference between 'buff' and 'cache'?",
    shortAnswer: "buff: buffer cache (block device metadata), cache: page cache (file contents).",
    explanation: "Both are used to accelerate I/O; Linux will reclaim them when processes need memory.",
    hint: "Buffers are for raw block I/O, cache for files.",
    level: "intermediate",
    codeExample: "free -h"
  },
  {
    question: "How to run vmstat in background and log output?",
    shortAnswer: "`vmstat 5 > vmstat.log 2>&1 &` (appends every 5 seconds).",
    explanation: "Useful for long‑term performance monitoring.",
    hint: "nohup vmstat 5 > /var/log/vmstat.log &",
    level: "intermediate",
    codeExample: "vmstat 2 1000 > /tmp/vmstat.out &"
  },
  {
    question: "Why does vmstat show '0' for si/so even when swap is used?",
    shortAnswer: "Swap in/out are rates per second. If no pages are being swapped at that exact second, values are 0.",
    explanation: "Activity may be bursty; use a longer average (sum over 10 seconds) or check `free -h` for swap total.",
    hint: "Check `cat /proc/meminfo | grep Swap` for total swap usage.",
    level: "advanced",
    codeExample: "grep Swap /proc/meminfo"
  },
  {
    question: "What is the 'system' column in vmstat (in, cs)?",
    shortAnswer: "Interrupts (in) and context switches (cs) per second.",
    explanation: "High in without disk/net I/O could indicate IRQ storm. High cs can be normal for multi‑threaded apps.",
    hint: "in and cs.",
    level: "basic",
    codeExample: "vmstat 1"
  },
  {
    question: "How to get memory statistics in kilobytes instead of pages?",
    shortAnswer: "Modern vmstat outputs in KB (since kernel 2.5+). Some older versions use pages.",
    explanation: "Use `vmstat -S M` for MB, or `-S K` for KB.",
    hint: "vmstat -S M",
    level: "intermediate",
    codeExample: "vmstat -S M 2"
  },
  {
    question: "What is the 'swpd' column?",
    shortAnswer: "Amount of swap memory used (in KB).",
    explanation: "High swpd does not necessarily mean active swapping; pages could have been swapped out long ago.",
    hint: "swpd = swapped out memory total.",
    level: "basic",
    codeExample: "vmstat | awk '{print $3}'"
  },
  {
    question: "How to monitor only CPU usage with vmstat?",
    shortAnswer: "`vmstat 1 | awk '{print $13, $14, $15, $16, $17}'` (us, sy, id, wa, st).",
    explanation: "You can also use `top` or `mpstat` for per‑core CPU.",
    hint: "vmstat 1 | cut -d ' ' -f 21-25",
    level: "intermediate",
    codeExample: "vmstat 1 | awk 'NR>2 {print $13\"% us\", $14\"% sy\", $15\"% id\", $16\"% wa\"}'"
  },
  {
    question: "What does 'vmstat -s' show?",
    shortAnswer: "A summary of various memory and event counters (total memory, pages swapped, forks, etc.).",
    explanation: "Includes values like total pages swapped in/out, page reclaims, and slab allocator info.",
    hint: "vmstat -s",
    level: "intermediate",
    codeExample: "vmstat -s | head -20"
  },
  {
    question: "What does 'vmstat -m' do?",
    shortAnswer: "Displays slab cache information (kernel object memory usage).",
    explanation: "Helps diagnose kernel memory leaks; shows each slab cache and its size.",
    hint: "vmstat -m",
    level: "advanced",
    codeExample: "vmstat -m | grep dentry"
  },
  {
    question: "What is a 'context switch' and why does it matter?",
    shortAnswer: "Saving/restoring a process state when switching between processes.",
    explanation: "Too many context switches can degrade performance (TLB flush, cache invalidation).",
    hint: "cs column.",
    level: "intermediate",
    codeExample: "vmstat 1"
  },
  {
    question: "How to check if my system is thrashing using vmstat?",
    shortAnswer: "Look for sustained non‑zero si/so and high wa, low us/sy, and high b.",
    explanation: "Thrashing = constant paging, low CPU efficiency, and high I/O wait.",
    hint: "si/so > 0 and wa > 20% for minutes.",
    level: "advanced",
    codeExample: "vmstat 2"
  },
  {
    question: "What is the difference between 'free' memory and 'available' memory?",
    shortAnswer: "Free: completely unused RAM. Available: free + cache/buff that can be reclaimed instantly.",
    explanation: "Linux caching makes free appear low; available is more useful.",
    hint: "vmstat only shows 'free', not 'available'.",
    level: "intermediate",
    codeExample: "free -h"
  },
  {
    question: "Can vmstat monitor network statistics?",
    shortAnswer: "No, use `netstat`, `ss`, `ifconfig`, or `nload` for network.",
    explanation: "vmstat focuses on CPU, memory, disk, and swapper.",
    hint: "not in vmstat.",
    level: "basic",
    codeExample: "ss -tunp"
  },
  {
    question: "Why does my vmstat show 'r' = 0 even when CPU is busy?",
    shortAnswer: "If there is exactly one runnable process and it's running, 'r' counts 1. But if you have more cores, r can be less than cores even with high utilisation.",
    explanation: "r counts processes waiting for CPU, not currently running.",
    hint: "Running processes are not in the run queue.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How to export vmstat data to CSV?",
    shortAnswer: "Pipe through `sed` or `awk` to replace spaces with commas.",
    explanation: "Example: `vmstat -n 2 10 | awk 'NR>2 {print $1\",\"$2...}'`",
    hint: "Use `tr -s ' ' ','`",
    level: "advanced",
    codeExample: "vmstat -n 2 5 | tail -n +3 | tr -s ' ' ','"
  },
  {
    question: "What is the 'event' column in `vmstat -s`?",
    shortAnswer: "Number of various events (forks, page faults, context switches, etc.).",
    explanation: "Cumulative counters since boot; subtract to get rates.",
    hint: "vmstat -s | grep -E 'forks|pgin|pgout'",
    level: "expert",
    codeExample: "vmstat -s | head -30"
  }
];

export default questions;