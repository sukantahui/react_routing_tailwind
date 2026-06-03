const questions = [
  {
    question: "What is vimtutor?",
    shortAnswer: "An interactive, built‑in Vim tutorial that teaches basic commands by doing.",
    explanation: "It opens a specially crafted text file where each lesson explains a command and then asks you to try it. You learn through practice.",
    hint: "Think of it as 'Vim for Dummies' but extremely effective.",
    level: "basic",
    codeExample: "$ vimtutor"
  },
  {
    question: "How do I start vimtutor?",
    shortAnswer: "Type `vimtutor` in your terminal and press Enter.",
    explanation: "No arguments needed. It runs inside your terminal and opens a copy of the tutorial file. You can exit anytime with `:q`.",
    hint: "If vimtutor is not found, install Vim fully (e.g., `sudo apt install vim` on Debian/Ubuntu).",
    level: "basic",
    codeExample: "vimtutor\nvimtutor fr   // French version"
  },
  {
    question: "How long does it take to complete vimtutor?",
    shortAnswer: "About 30-40 minutes for a first run, depending on typing speed.",
    explanation: "You can break it into multiple sessions; the tutorial saves your progress (the file is a temporary copy).",
    hint: "Set aside a distraction‑free half hour for best results.",
    level: "basic",
    codeExample: ":q   // quit, resume later with same command"
  },
  {
    question: "What does vimtutor teach?",
    shortAnswer: "Cursor movement, deletion, insertion, undo, searching, saving, visual mode, and many basic Vim commands.",
    explanation: "It covers the essential 20% of Vim that you'll use 80% of the time. No previous experience required.",
    hint: "After vimtutor, you'll be able to edit files, search, and make basic changes confidently.",
    level: "basic",
    codeExample: "Lesson 1: h j k l, w, b, e, gg, G\nLesson 2: x, dd, u, U, Ctrl+R"
  },
  {
    question: "Can I use arrow keys in vimtutor?",
    shortAnswer: "Yes, but the tutorial will remind you to use `h j k l`.",
    explanation: "The tutorial is designed to train you away from the arrow keys, as they slow you down in the long run. Use `h j k l` as much as possible.",
    hint: "The tutorial even has an exercise to disable arrow keys temporarily – try it!",
    level: "basic",
    codeExample: ":noremap <Up> <Nop>   // disables arrow keys (in tutorial file)"
  },
  {
    question: "Is vimtutor available on all systems?",
    shortAnswer: "Yes, wherever Vim is installed, vimtutor should be present.",
    explanation: "On Windows with Git Bash or WSL, vimtutor works. On macOS, it's included with the system Vim. On Linux, it's part of the vim‑runtime package.",
    hint: "If not, reinstall Vim or use `vim -u NONE -c 'e /usr/share/vim/vim*/tutor/tutor'`.",
    level: "intermediate",
    codeExample: "which vimtutor   // shows path"
  },
  {
    question: "Can I resume vimtutor after quitting?",
    shortAnswer: "Yes, run `vimtutor` again – it will continue from where you left off.",
    explanation: "vimtutor creates a temporary copy of the tutorial in your home directory (e.g., `~/.vimtutor`). Your progress is saved as long as you don't delete that file.",
    hint: "If you want a fresh start, delete `~/.vimtutor` and relaunch.",
    level: "intermediate",
    codeExample: "rm ~/.vimtutor   // start over from beginning"
  },
  {
    question: "What if I get stuck on an exercise?",
    shortAnswer: "Read the instructions again carefully – the answer is usually just above.",
    explanation: "The tutorial is self‑contained. If a command doesn't work, check that you are in Normal mode and that you typed exactly what was asked.",
    hint: "Use `u` to undo mistakes. Use `:help <command>` if you need more explanation.",
    level: "basic",
    codeExample: "u      // undo\n:help x   // help on delete command"
  },
  {
    question: "Does vimtutor support languages other than English?",
    shortAnswer: "Yes, many languages are included. Use `vimtutor <lang>` (e.g., `vimtutor fr`).",
    explanation: "Available languages depend on your Vim installation. Common ones: de, fr, it, es, zh, ru, ko, etc.",
    hint: "Check `/usr/share/vim/vim*/tutor/` for available tutor files.",
    level: "intermediate",
    codeExample: "vimtutor de\nvimtutor zh_CN\nls /usr/share/vim/vim*/tutor/tutor.*"
  },
  {
    question: "Can I create my own tutor for others?",
    shortAnswer: "Yes, copy the original tutor file and modify it.",
    explanation: "The tutor file is plain text with special markup. You can create a custom version for your class or team.",
    hint: "The original file is at `/usr/share/vim/vim*/tutor/tutor`. Copy it, edit, and teach!",
    level: "advanced",
    codeExample: "cp /usr/share/vim/vim*/tutor/tutor ~/my_tutor.txt\nvim ~/my_tutor.txt"
  },
  {
    question: "Is vimtutor the same as Vim's built-in help?",
    shortAnswer: "No, vimtutor is an interactive tutorial; `:help` is a reference manual.",
    explanation: "vimtutor is for learning step‑by‑step, while `:help` is for looking up specific commands when you already know the basics.",
    hint: "Use vimtutor first, then `:help` to go deeper.",
    level: "basic",
    codeExample: ":help   // opens help system"
  },
  {
    question: "What should I do after finishing vimtutor?",
    shortAnswer: "Practice! Edit real files, write a small script, then repeat vimtutor in a week.",
    explanation: "Vim mastery requires muscle memory. Use `vimtutor` as a periodic refresher. Then move on to `vimtutor`'s advanced lessons (if available) or Vim's own help.",
    hint: "Try `vimtutor` again but use only the commands you learned – no cheats.",
    level: "basic",
    codeExample: "vim ~/.bashrc   // practice on a real file"
  },
  {
    question: "Can I use vimtutor to learn Vimscript?",
    shortAnswer: "No, vimtutor teaches only basic editing, not scripting.",
    explanation: "For Vimscript, use `:help usr_41.txt` or the `vimscript` tutorial online.",
    hint: "After mastering the basics, explore `:help` and the user manual (`:help user-manual`).",
    level: "intermediate",
    codeExample: ":help usr_41"
  },
  {
    question: "Why does vimtutor sometimes show double letters?",
    shortAnswer: "That's part of the tutorial's feedback mechanism. It expects you to delete the extra letter or perform an action.",
    explanation: "The tutorial places two identical letters and asks you to delete one – that's a test.",
    hint: "Read the instruction above – it will tell you exactly what to do.",
    level: "basic",
    codeExample: "For example: 'The only way to learn is to do ...'"
  },
  {
    question: "Is there a vimtutor for advanced users?",
    shortAnswer: "Some distributions include an 'advanced' tutor (e.g., `vimtutor_adv`), but not standard.",
    explanation: "For advanced topics, see `:help` and read the Vim user manual. There are also external resources like Vimcasts.",
    hint: "Consider `vimtutor` as the starting line, not the finish.",
    level: "advanced",
    codeExample: ":help user-manual"
  },
  {
    question: "Can I run vimtutor inside Vim (already open)?",
    shortAnswer: "Yes, use `:e $VIMRUNTIME/tutor/tutor` to open the tutorial file, but it won't have the interactive feedback.",
    explanation: "The special interactivity (checking your actions) is embedded in the file itself, so it still works. However, quitting with `:q` won't save progress the same way.",
    hint: "Better to run `vimtutor` from the command line for the full experience.",
    level: "intermediate",
    codeExample: ":e $VIMRUNTIME/tutor/tutor"
  },
  {
    question: "What happens if I edit vimtutor's file directly?",
    shortAnswer: "You can, but you'll lose the interactive feedback because the tutor checks your actions based on the original content.",
    explanation: "It's better to make a copy if you want to experiment.",
    hint: "Use `:saveas mytutor` if you want to modify.",
    level: "intermediate",
    codeExample: ":saveas ~/my_tutor.txt"
  },
  {
    question: "Does vimtutor work in Neovim?",
    shortAnswer: "Yes, Neovim includes a compatible `vimtutor` command (usually `nvim +Tutor`).",
    explanation: "Neovim's `:Tutor` opens an improved version of the classic tutor. It uses the same interactive methodology.",
    hint: "Type `nvim +Tutor` to start the Neovim tutor.",
    level: "basic",
    codeExample: "nvim +Tutor"
  },
  {
    question: "Can I share vimtutor with someone who doesn't have Vim?",
    shortAnswer: "They would need Vim installed; there is no web version.",
    explanation: "The interactive checking relies on Vim's editing capabilities. However, you can export the plain text content of the tutor file for reading.",
    hint: "Send them a link to download Vim (free) and then `vimtutor`.",
    level: "basic",
    codeExample: "echo 'Install Vim from https://www.vim.org/download.php'"
  },
  {
    question: "Why does vimtutor tell me that I'm using arrow keys?",
    shortAnswer: "Because the tutorial detects arrow key usage and gives you a friendly reminder to use `h j k l`.",
    explanation: "It's not an error; it's a teaching prompt. The tutorial will continue to work even if you use arrow keys, but you're missing the learning opportunity.",
    hint: "Listen to the tutor – switch to `h j k l` for faster editing in the long run.",
    level: "basic",
    codeExample: "The message: 'Better yet, avoid using the arrow keys altogether!'"
  },
  {
    question: "How do I get help while inside vimtutor?",
    shortAnswer: "Use `:help` or `:help <topic>` just like in normal Vim.",
    explanation: "The `:help` system is fully functional inside the tutor. You can also consult the table of contents with `:help help.txt`.",
    hint: "If you need to know what a command does, `:help x` – no need to leave the tutorial.",
    level: "intermediate",
    codeExample: ":help x\n:help insert"
  }
];

export default questions;