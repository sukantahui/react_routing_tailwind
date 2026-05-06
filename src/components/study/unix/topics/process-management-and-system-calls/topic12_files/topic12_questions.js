// topic12_questions.js
const questions = [
  {
    question: "What is swapped memory?",
    shortAnswer: "Memory pages moved from RAM to disk (swap space) to free physical memory.",
    explanation: "Swapping allows the system to run more processes than physical RAM can hold, but at a performance cost.",
    hint: "free command shows swap used.",
    level: "basic",
    codeExample: "free -h"
  },
  {
    question: "What is the difference between swapping and paging?",
    shortAnswer: "Swapping traditionally moves entire processes; paging moves fixed‑size pages. Modern Unix uses paging but the term 'swapping' is used loosely.",
    explanation: "Linux uses demand paging; whole process swap is rare.",
    hint: "swapping = process, paging = page.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How to check swap space usage?",
    shortAnswer: "`free -h`, `swapon --show`, `cat /proc/swaps`.",
    explanation: "These commands show total swap size, used and free space, and what devices/files are used.",
    hint: "free -h",
    level: "basic",
    codeExample: "free -h"
  },
  {
    question: "What is swappiness?",
    shortAnswer: "A kernel parameter (0–200) that controls how aggressive the kernel swaps out process memory.",
    explanation: "Higher values = more swapping; lower values = prefer to reclaim file cache instead of swapping.",
    hint: "sysctl vm.swappiness",
    level: "intermediate",
    codeExample: "cat /proc/sys/vm/swappiness"
  },
  {
    question: "What is thrashing?",
    shortAnswer: "Continuous heavy swapping that leads to low CPU utilisation and high disk I/O.",
    explanation: "System spends most time moving pages between RAM and disk instead of doing useful work.",
    hint: "vmstat shows si/so columns.",
    level: "intermediate",
    codeExample: "vmstat 1"
  },
  {
    question: "How can you disable swap entirely?",
    shortAnswer: "`sudo swapoff -a` (temporary); remove swap entries from /etc/fstab permanently.",
    explanation: "Disabling swap can cause OOM killer to activate sooner if RAM is exhausted.",
    hint: "swapoff -a",
    level: "advanced",
    codeExample: "swapoff -a"
  },
  {
    question: "What is the difference between a swap partition and a swap file?",
    shortAnswer: "Swap partition is a dedicated disk partition; swap file is a regular file on an existing filesystem.",
    explanation: "Swap partition may have slightly better performance (no filesystem overhead); swap file is easier to resize.",
    hint: "mkswap, swapon.",
    level: "intermediate",
    codeExample: "dd if=/dev/zero of=/swapfile bs=1M count=4096; mkswap /swapfile; swapon /swapfile"
  },
  {
    question: "What is mlock() used for?",
    shortAnswer: "Locks a range of memory pages into RAM, preventing them from being swapped out.",
    explanation: "Essential for real‑time applications, security‑sensitive data (passwords), and low‑latency requirements.",
    hint: "mlock(addr, length);",
    level: "intermediate",
    codeExample: "mlock(buffer, size);"
  },
  {
    question: "What are `si` and `so` in vmstat output?",
    shortAnswer: "si = swap in (pages read from swap into RAM), so = swap out (pages written from RAM to swap).",
    explanation: "Non‑zero values indicate active swapping. High, sustained values indicate thrashing.",
    hint: "vmstat 1",
    level: "intermediate",
    codeExample: "vmstat 1 5"
  },
  {
    question: "How does the OOM killer relate to swap?",
    shortAnswer: "When RAM and swap are exhausted, the OOM killer terminates processes to free memory.",
    explanation: "Lack of swap increases OOM risk. But too little swap may cause early OOM; too much may hide memory leaks.",
    hint: "Out-Of-Memory killer.",
    level: "advanced",
    codeExample: "dmesg | grep -i 'killed process'"
  },
  {
    question: "What is the recommended swap size today?",
    shortAnswer: "Depends on RAM and usage: for hibernation = RAM, for DB servers often 0, for general desktop = 2–8 GB.",
    explanation: "Red Hat recommends: RAM < 2GB → 2x RAM; 2-8GB → equal; >8GB → 0.5x RAM.",
    hint: "No universal rule, but 2-8GB is common.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is zswap?",
    shortAnswer: "Kernel feature that compresses swapped pages before writing to disk, reducing I/O.",
    explanation: "Zswap uses a compressed cache in RAM; only when the cache is full pages are written to disk.",
    hint: "cat /sys/module/zswap/parameters/enabled",
    level: "expert",
    codeExample: "sudo modprobe zswap"
  },
  {
    question: "What is zram?",
    shortAnswer: "A compressed block device in RAM used as swap (no disk backing).",
    explanation: "Faster than disk swap, used in embedded systems and low‑RAM environments.",
    hint: "lsmod | grep zram",
    level: "expert",
    codeExample: "modprobe zram && echo lz4 > /sys/block/zram0/comp_algorithm"
  },
  {
    question: "How can you see how much swap a specific process is using?",
    shortAnswer: "Check /proc/<pid>/status – look for 'VmSwap' field.",
    explanation: "Also using `smem -s swap` or `top -p <pid>` and press 'f' to add SWAP column.",
    hint: "grep VmSwap /proc/*/status",
    level: "advanced",
    codeExample: "grep -E '^(Pid|VmSwap)' /proc/1234/status"
  },
  {
    question: "What is the default swappiness value?",
    shortAnswer: "60 (on most Linux distributions).",
    explanation: "60 means moderate swapping – balanced between reclaiming file cache and swapping.",
    hint: "sysctl vm.swappiness",
    level: "basic",
    codeExample: "sysctl vm.swappiness"
  },
  {
    question: "How to change swappiness temporarily?",
    shortAnswer: "`sudo sysctl vm.swappiness=10` (immediate, until reboot).",
    explanation: "Lower values reduce swapping, higher values increase swapping.",
    hint: "sudo sysctl -w vm.swappiness=10",
    level: "intermediate",
    codeExample: "echo 10 | sudo tee /proc/sys/vm/swappiness"
  },
  {
    question: "Does swap hurt SSD lifespan?",
    shortAnswer: "Modern SSDs have high endurance; moderate swap is fine. Avoid heavy swapping on cheap/low‑end SSDs.",
    explanation: "Swapping involves writes; for heavy swapping consider reducing swappiness or adding RAM.",
    hint: "mtbf of modern SSDs is high.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the `mem` and `swap` usage reported by top?",
    shortAnswer: "`top` shows physical memory usage and swap usage in summary lines.",
    explanation: "The swap used field indicates how much swap is occupied by pages not in RAM.",
    hint: "RES vs VIRT columns.",
    level: "basic",
    codeExample: "top -p $$"
  },
  {
    question: "Why does `free` show Swap total 0?",
    shortAnswer: "No swap space is configured on the system.",
    explanation: "You can add a swap file or partition to enable swapping.",
    hint: "sudo swapon --show",
    level: "basic",
    codeExample: "dd if=/dev/zero of=/swapfile bs=1M count=2048 && mkswap /swapfile && swapon /swapfile"
  },
  {
    question: "What is 'swap priority'?",
    shortAnswer: "When multiple swap areas exist, priority (higher number = higher priority) determines which is used first.",
    explanation: "Use `swapon -p` to set priority; useful for putting swap on faster devices first.",
    hint: "swapon --show",
    level: "advanced",
    codeExample: "swapon -p 10 /dev/sda2"
  },
  {
    question: "What is the relationship between swap and hibernation (suspend-to-disk)?",
    shortAnswer: "Hibernation saves RAM contents to swap partition before powering off. Swap must be at least as large as RAM.",
    explanation: "Only swap partitions (not files) are supported for hibernation on many systems.",
    hint: "resume= kernel parameter.",
    level: "advanced",
    codeExample: "grep resume /proc/cmdline"
  },
  {
    question: "What are the limits on swap space?",
    shortAnswer: "Linux supports up to 32 swap areas, each up to 2 TiB on 32‑bit systems, practically unlimited on 64‑bit.",
    explanation: "Use `swapon -l` to list size limits; swap files also limited by filesystem.",
    hint: "max_swapfiles=32",
    level: "expert",
    codeExample: "cat /proc/sys/kernel/max_swapfiles"
  },
  {
    question: "Why does my system swap even when free memory is available?",
    shortAnswer: "The kernel moves pages proactively to prepare for future demand (especially file cache vs anonymous memory).",
    explanation: "Swapping out unused pages frees memory for page cache, improving I/O performance.",
    hint: "vm.vfs_cache_pressure also influences.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the `swapoff` command and when to use it?",
    shortAnswer: "Disables swapping on specified devices/files; forces all swapped pages back into RAM.",
    explanation: "Useful before resizing a swap file or if swap is on a failing disk.",
    hint: "sudo swapoff -a",
    level: "intermediate",
    codeExample: "sudo swapoff /dev/sda2"
  },
  {
    question: "What are the kernel parameters related to swap?",
    shortAnswer: "vm.swappiness, vm.vfs_cache_pressure, vm.dirty_ratio, vm.dirty_background_ratio (indirectly affect swapping).",
    explanation: "Also vm.min_free_kbytes, vm.watermark_scale_factor.",
    hint: "sysctl -a | grep vm | sort",
    level: "expert",
    codeExample: "sysctl vm.vfs_cache_pressure"
  },
  {
    question: "How to monitor swap I/O performance?",
    shortAnswer: "Use `iostat -x 1`, `vmstat 1`, `sar -W 1` to see swap reads/writes per second.",
    explanation: "High swap I/O with high utilisation indicates thrashing.",
    hint: "iostat -k",
    level: "advanced",
    codeExample: "iostat -d -x 1 | grep -E 'Device|sda'"
  },
  {
    question: "What is the 'dirty' memory and how does it affect swapping?",
    shortAnswer: "Dirty pages are modified not yet written to disk; they may be swapped out only after being cleaned.",
    explanation: "High dirty ratio can cause write storms and more swapping.",
    hint: "vm.dirty_ratio",
    level: "expert",
    codeExample: "cat /proc/meminfo | grep Dirty"
  },
  {
    question: "Can a process be prevented from being swapped out?",
    shortAnswer: "Yes, with mlock() or mlockall(). Root or ulimit -l needed for large amounts.",
    explanation: "Also using real‑time scheduling may influence, but mlock is explicit.",
    hint: "mlockall(MCL_CURRENT | MCL_FUTURE);",
    level: "advanced",
    codeExample: "mlockall(MCL_CURRENT | MCL_FUTURE);"
  },
  {
    question: "What is 'swapon -a'?",
    shortAnswer: "Activates all swap devices listed in /etc/fstab.",
    explanation: "Used at boot or after adding swap entries.",
    hint: "swapon -a",
    level: "basic",
    codeExample: "sudo swapon -a"
  },
  {
    question: "What happens if swap space is 100% full?",
    shortAnswer: "No more pages can be swapped out; if RAM also exhausted, OOM killer activates.",
    explanation: "Some systems may panic; Linux will reclaim cache and then start killing processes.",
    hint: "watch free -h",
    level: "intermediate",
    codeExample: null
  }
];

export default questions;