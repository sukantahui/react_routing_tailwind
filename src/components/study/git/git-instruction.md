# Master Instructions for Tutorial Topic Generation (Git & GitHub Master Edition)

- **Repository**: `react_routing_tailwind`
- **Subject**: Git Version Control & GitHub Enterprise Collaboration (Master Edition)
- **Designated Educator & Course Mentor**: **Sukanta Hui** (Senior Software Architect & Mentor, Coder & AccoTax, Barrackpore, West Bengal, India)
- **Personal GitHub Profile**: [https://github.com/sukantahui](https://github.com/sukantahui)
- **Official Organization GitHub**: [https://github.com/codernaccotax](https://github.com/codernaccotax)
- **Organization / Institution**: Coder & AccoTax (Barrackpore, WB, India)
- **Target Environment**: React 19 + Vite + Tailwind CSS (No `tailwind.config.js` required)
- **Primary Students**: Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, Tuhina
- **Key Localities**: Barrackpore, Kolkata, Chandan Pukur, Jadavpur, Shyamnagar, Ichapur, Naihati

---

## 1. Directory Structure & File Naming Rules

### Roadmap as the Single Source of Truth

- `git-roadmap.json` is the authoritative source for:
  - segment order
  - module order
  - module slug
  - topic order
  - topic title
  - topic description
  - topic dependencies
  - topic count

- Never invent a module slug, topic number, topic title, or topic sequence.
- Never rename a roadmap topic unless explicitly instructed.
- Never create a topic that does not exist in the roadmap.
- Never omit a roadmap topic.
- Before generating or modifying a topic, verify:
  1. module slug exists
  2. topic index exists
  3. topic title matches the roadmap
  4. previous/next topic relationship is correct
  5. output path matches the roadmap

---

### Folder & File Organization

1. **Roadmap Driven**: Use the `git-roadmap.json` file located at `src/components/study/git/git-roadmap.json` to retrieve all module slugs, topic definitions, and sequence orders.
2. **Slug Folders**: Every folder created under `src/components/study/git/topics/` MUST match the module slug defined in the roadmap (e.g. `001_001_introduction-to-version-control-and-git-architecture`, `001_002_git-three-tree-architecture-and-basic-workflow`, etc.). No other folders may exist directly inside `topics/`.
3. **Sequential Topic Files**: Inside each slug folder, create `Topic[number].jsx` (e.g. `Topic0.jsx`, `Topic1.jsx`, `Topic2.jsx`).
   - **One Topic = One File** (Do not combine multiple topics into a single file).
   - **No Topic Mixing** (Scope must be strictly limited to the current topic).
   - **Sequential Progression** (Each topic must build on previously covered concepts).
4. **Dedicated Companion Files**: Inside each slug folder, create a subfolder named `topic[number]_files/` containing:
   - `topic[number]_note.txt` — Plain text printable version of the topic (loaded by `<PlainTextPrint>`).
   - `[topic_name]_lab.sh` (or `_demo.sh` / `_demo.bash`) — Standalone executable terminal script/command sandbox walkthrough.
   - `topic[number]_questions.js` — Array of 25 to 30 structured Q&A items (loaded by `<FAQTemplate>`).
   *(Do NOT create any redundant `topic[number]_content.txt` files).*

---

### Topic Size Control

A topic JSX file must remain focused on one conceptual objective.

If the topic becomes too large:

- Do NOT split it into unrelated topics.
- Keep the topic as one JSX component.
- Extract only reusable UI logic into existing/common components when such components already exist.
- Do not create topic-specific shared components unless explicitly requested.
- Keep educational content inside the topic file and its designated companion files.

---

### Topic Scope Boundary

Depth must be comprehensive within the topic boundary.
Breadth must remain controlled by the roadmap.

Every topic must answer:

1. What is this concept?
2. Why does it exist?
3. How does it work?
4. How is it used?
5. What mistakes occur?
6. How do I practice it?

Do not teach advanced concepts before their roadmap topic.

If an advanced concept is necessary for explanation:
- introduce only the minimum required context
- explicitly mark it as "Preview"
- do not turn the preview into a full lesson

Do not duplicate complete explanations from earlier or later topics.
Use short references such as:
"Covered earlier in Topic X."

---

### Prerequisite Awareness

Before generating a topic:

1. Identify concepts already introduced in previous roadmap topics.
2. Identify concepts required by the current topic.
3. Do not assume students know concepts that have not yet been introduced.
4. If a prerequisite is missing:
   - provide a short prerequisite explanation
   - do not teach the entire prerequisite topic
   - clearly identify it as prerequisite knowledge
5. Never introduce terminology without first defining it.

---

## 2. Component Structure & Mandatory Section Sequence

Every topic component MUST be a **React 19 function-based component** and follow this exact sequential layout (stacked vertically, not side-by-side):

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Header Section (Breadcrumbs, Badges, H1 Title, Summary)             │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Dedicated Simple Language Section ("Explain Like I'm 10" / Analogy) │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Dedicated Topic Description (What, Why, How, When, Industry Context)│
├────────────────────────────────────────────────────────────────────────┤
│ 4. Semantic Visual SVG Diagram (Native SVG <animate> for DAG / Trees)  │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Deep Technical Breakdown (Command Flags, Internals, State Tables)   │
├────────────────────────────────────────────────────────────────────────┤
│ 6. CLI Terminal Demonstration & Output Inspection                      │
├────────────────────────────────────────────────────────────────────────┤
│ 7. Common Pitfalls, Merge/Reset Gotchas & Defensive Best Practices    │
├────────────────────────────────────────────────────────────────────────┤
│ 8. Hint Section ("Think About This...")                                │
├────────────────────────────────────────────────────────────────────────┤
│ 9. FAQ Section (<FAQTemplate>)                                         │
├────────────────────────────────────────────────────────────────────────┤
│ 10. Plain Text Printable Note (<PlainTextPrint>)                       │
├────────────────────────────────────────────────────────────────────────┤
│ 11. Teacher's Note (<Teacher>)                                         │
├────────────────────────────────────────────────────────────────────────┤
│ 12. Next & Previous Topic Navigation Button                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Mandatory Dedicated Simple Language Section Guidelines

> [!IMPORTANT]
> **Every single topic file MUST contain a dedicated "Simple Language Explanation" section right after the header.**
> The goal of this section is to make complex Git and GitHub concepts effortlessly understandable for absolute beginners, school students, and non-technical readers before introducing technical jargon or terminal syntax.

### Key Requirements for the Simple Language Section:
1. **"Explain Like I'm 10" Clarity**: Zero complex jargon in this section. Explain the core intuition in simple, vivid, friendly English.
2. **Real-Life Everyday Analogy**: Compare the Git concept to a familiar real-world scenario. Examples:
   - **Commits**: Like creating a **Save Point / Checkpoint in a video game** so you can reload if you make a mistake.
   - **Staging Area (Index)**: Like putting items into a **shopping cart** before paying at the cash register, or staging actors on a theater stage before the curtain rises.
   - **Branches**: Like **parallel universes or multiverse timelines in a sci-fi movie** where you can experiment without affecting the main reality.
   - **Merge Conflicts**: Like **two students writing notes on the exact same line of a shared notebook** at the same time and the teacher asking which sentence to keep.
   - **Git Rebase**: Like **taking your customized chapter and moving it to the end of the newest updated book** so the entire story reads in a straight, seamless line.
   - **Git Stash**: Like **putting your unfinished homework into a desk drawer** when an urgent errand arrives, and taking it back out when you return.
   - **Git Reflog**: Like the **black box flight recorder of an airplane** that records every single button pressed so nothing is ever truly lost.
   - **Git Cherry-Pick**: Like **plucking one ripe mango from a specific tree branch** and placing it into your fruit basket without cutting down the whole branch.
   - **Remote vs Local**: Like having a **personal notebook in your backpack (Local)** vs a **shared whiteboard in the Barrackpore classroom (Remote / GitHub)**.
3. **Conversational Classroom Story**: Use friendly dialogue featuring **Sukanta Hui** and his students (**Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, Tuhina**) to unpack the confusion in simple terms.

---

## 4. UI, Styling & Animation Specifications

### A. Zero-Config Tailwind CSS
* **No `tailwind.config.js` required**: Use standard Tailwind CSS utility classes and arbitrary values (`animate-[...]`, `animation-delay-[...]`).
* **Do NOT use external animation libraries**: No Framer Motion, GSAP, or external CSS files inside topic files.
* **Avoid `opacity-0`**: Never use `opacity-0` as a default class.
* **Dark Mode Default**: Always style for dark mode by default (`bg-slate-900 text-slate-200`, with high-contrast terminal panels in `bg-slate-950 border border-slate-800`).
* **Currency Formatting**: Always use the **Rupee sign (`₹`)** for monetary figures (e.g. cloud cost overruns or leaked credential billing examples) instead of `$`.

### B. Micro-Animations & Interactions
* **Transitions**: Smooth transitions (`transition-all duration-300`).
* **Hover Emphasis**: Subtle elevation or soft glow on:
  - Simple explanation cards
  - Command breakdown cards
  - Git DAG node bubbles and branch pointer pills
  - Teacher's note box
* **Motion-Safe**: Respect reduced-motion preferences using `motion-safe:`.
* **SVGs**: Semantic inline `<svg>` illustrations with labeled commit bubbles (SHA hashes), branch pointer arrows, detached HEAD indicators, Three-Tree state transitions, and native SVG `<animate>` tags.

---

## 5. Content Depth & Pedagogical Standards (Strictly Git & GitHub)

### A. Non-Negotiable Depth Checklist
Every topic must provide exhaustive theoretical and practical depth:
- **Simple Language Breakdown**: Crystal-clear layman intuition and relatable real-life analogy.
- **Why it is needed**: The problem statement and operational disaster that occurs without this command/workflow.
- **What it is**: Rigorous technical definition, Git object type implications, and conceptual boundaries.
- **How it works internally**:
  - HEAD movement
  - Index/staging area updates
  - working-tree changes
  - Git object creation
  - object IDs
  - commit DAG traversal
  - references and reflogs
  - SHA-1 repositories and, where relevant, SHA-256 repositories
- **When it is used**: Practical selection criteria, team scenarios, and real-world deployment cases.
- **Command Syntax & Flags**: Complete command line options (`-p`, `--soft`, `--mixed`, `--hard`, `--rebase`, `-i`, `--autosquash`, `--force-with-lease`, etc.).
- **Real-World Examples**: At least 4 distinct, concrete industry scenarios (e.g. hotfixing production, backporting security patches, resolving complex 3-way merge conflicts, auditing regressions).
- **Beginner Pitfalls & Defensive Best Practices**: Critical misconceptions, uncommitted file loss prevention, and step-by-step recovery commands using `git reflog`.

### B. Classroom Story & Pedagogical Tone
- Integrate local educator discussions featuring **Sukanta Hui (Coder & AccoTax)**.
- Official GitHub Organization: **`https://github.com/codernaccotax`**
- Personal GitHub Profile: **`https://github.com/sukantahui`**
- Involve students naturally in lab drills: **Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, Tuhina**.
- Local context: **Barrackpore, Kolkata, Chandan Pukur, Jadavpur, Shyamnagar, Ichapur, Naihati**.

### C. Operating System Compatibility

**Primary Shell**:
- **Git Bash** (Standard cross-platform developer baseline)

**Cross-Platform Explanations**:
Where a command or behavior differs on:
- **Windows** (PowerShell / Command Prompt / Git Bash, line endings `CRLF`, case sensitivity)
- **macOS** (zsh, default `LF`, case-preserving/insensitive HFS+/APFS)
- **Linux** (bash/zsh, native `LF`, case-sensitive ext4)

Always explicitly explain the difference.

**Filesystem & Command Assumptions**:
Do not assume:
- `/bin/bash`
- Unix filesystem paths (e.g., hardcoded `/home/user/...` or `/tmp/...`)
- Unix-only utility commands (`grep`, `sed`, `awk`, `cat`, `rm -rf`)

unless the environment is explicitly designated as Git Bash, Linux, or macOS. Provide Windows PowerShell equivalents where appropriate.

### D. Executable Lab Rule

Every lab must be independently reproducible.

Before each command sequence, establish:

- repository state
- branch state
- required files
- required commits
- required remotes
- expected starting conditions

A learner must be able to copy the commands into a clean practice repository and reproduce the demonstrated state.

### E. Mandatory Misconception Handling

Every topic must identify at least 3 common misconceptions.

Format:

- ❌ **Misconception**
- ✅ **Correct understanding**
- 💡 **Why people get confused**

### F. Comparison Requirement

Whenever the topic involves commonly confused concepts, include a comparison table.

Examples:

- Git vs GitHub
- fetch vs pull
- merge vs rebase
- reset vs revert
- stash vs commit
- branch vs tag
- local branch vs remote-tracking branch
- HEAD vs branch pointer
- working tree vs index vs repository

### G. Practice Challenge

Every topic must end its educational content with a small hands-on challenge.

The challenge must:

- require the learner to perform the concept
- not simply copy the demonstration
- have a clear expected result
- include a hidden/teacher solution in the note or FAQ where appropriate

---

## 6. Standard Component Import & Code Integration Templates

### A. Simple Language & Real-Life Analogy Section Template
```jsx
// Inside Topic Component (Section 2 - right after Header):
<section className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/20 shadow-xl space-y-4">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl font-bold">
      💡
    </div>
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
        In Simple Words (The Everyday Analogy)
      </h2>
      <p className="text-xs text-slate-400">
        Understand the core concept in plain English before looking at technical commands
      </p>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-slate-300">
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
      <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
        The Real-Life Story:
      </h3>
      <p className="text-slate-300">
        Imagine you are playing a challenging video game. Before entering a dangerous boss room, you always save your game at a <strong>checkpoint</strong>. If you make a mistake, you don't lose the whole game—you simply reload from your save point.
      </p>
      <p className="text-slate-400 text-xs">
        In Git, a <strong>Commit</strong> is exactly that save point! It takes a permanent photo of your code so you can jump back whenever you need.
      </p>
    </div>

    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
      <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
        Why Everyone Loves This:
      </h3>
      <p className="text-slate-300">
        When Sukanta Sir teaches students in Barrackpore, he explains that Git removes the fear of making mistakes. You can delete code, try wild new ideas, or rewrite functions with 100% peace of mind.
      </p>
      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-200/90 font-mono">
        &ldquo;No fear of breaking things: Save often, experiment boldly!&rdquo;
      </div>
    </div>
  </div>
</section>
```

---

### B. Terminal Command Demonstration Panel Template
```jsx
// Inside Topic Component:
<section className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-2">
      <span>💻</span> Live Terminal Demonstration &amp; Workflow
    </h2>
    <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
      Git Bash (Primary) · Windows / macOS / Linux
    </span>
  </div>

  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-xs sm:text-sm">
    {/* Terminal Header Bar */}
    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        <span className="text-xs text-slate-400 ml-2 font-medium">terminal@coder-accotax: ~/project-repo</span>
      </div>
      <span className="text-[11px] text-slate-500">git version 2.45+</span>
    </div>

    {/* Terminal Command Execution Body */}
    <div className="p-4 sm:p-5 space-y-3 overflow-x-auto text-slate-300">
      <div>
        <span className="text-emerald-400 font-bold">$ </span>
        <span className="text-amber-200">git status -s</span>
      </div>
      <div className="text-slate-400 pl-4">
        <p className="text-rose-400"> M src/controllers/auth.controller.js</p>
        <p className="text-emerald-400">A  src/models/user.model.js</p>
        <p className="text-slate-500">?? .env.local</p>
      </div>

      <div>
        <span className="text-emerald-400 font-bold">$ </span>
        <span className="text-amber-200">git commit -m &quot;feat(auth): add JWT token refresh interceptor&quot;</span>
      </div>
      <div className="text-slate-400 pl-4 border-l-2 border-slate-750">
        <p className="text-sky-300">[main a8f93e1] feat(auth): add JWT token refresh interceptor</p>
        <p> 2 files changed, 48 insertions(+), 3 deletions(-)</p>
      </div>
    </div>
  </div>
</section>
```

---

### C. FAQ Component Template (`<FAQTemplate>`)
```jsx
import FAQTemplate from "../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

// Inside Topic Component:
<FAQTemplate
  title="Git Foundations & Architecture FAQs"
  questions={questions}
/>
```

#### FAQ Quality Distribution

Every topic must contain 25–30 questions.

Recommended distribution:

- 8–10 Basic
- 8–10 Intermediate
- 7–10 Advanced

Questions must cover different dimensions:

- Definition
- Why
- How
- Internal behavior
- Command usage
- Flags
- Comparison
- Troubleshooting
- Misconceptions
- Recovery
- Real-world scenario
- Interview-style reasoning

Do not create multiple questions that test the same fact with different wording.

#### `topic0_questions.js` File Specification:
```javascript
const questions = [
  {
    question: "Why does Git use a distributed architecture instead of a centralized server?",
    shortAnswer: "Every developer repository is a complete self-contained clone with full history, enabling instant offline commits, branching, and eliminating single points of failure.",
    explanation: "In centralized VCS (like SVN or CVS), the central server holds the repository database. If the server is offline or corrupt, no one can commit or branch. In Git, every local clone contains the full object database and commit DAG, allowing developers in Barrackpore or anywhere to branch, commit, diff, and log with zero network latency.",
    hint: "Think about whether you need an internet connection to run 'git log' or 'git commit'.",
    level: "basic",
    codeExample: "# Inspect full history completely offline:\ngit log --graph --oneline"
  },
  {
    question: "What is the difference between git fetch and git pull?",
    shortAnswer: "git pull first fetches updates and then integrates them into the current branch; the integration may use merge, rebase, or fast-forward behavior depending on configuration and options.",
    explanation: "git fetch origin downloads new commits, refs, and blobs without changing your working tree. git pull performs a fetch and then integrates the fetched changes into the current branch. Depending on configuration and options, the integration may use merge, rebase, or a fast-forward update.",
    hint: "Beginner mental model: git pull = git fetch + an integration step (merge, rebase, or fast-forward).",
    level: "intermediate",
    codeExample: "# Recommended safe inspection workflow:\ngit fetch origin\ngit diff main origin/main\ngit merge origin/main"
  }
  // ... MUST contain 25 to 30 structured questions across Basic, Intermediate, and Advanced levels
];

export default questions;
```

---

### D. Plain Text Printable Note Template (`<PlainTextPrint>`)
```jsx
import PlainTextPrint from "../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

// Inside Topic Component:
<PlainTextPrint
  content={noteText}
  title="Git Foundations Quick Revision Note"
  stampEnabled={true}
  showDownload={true}
  downloadButtonText="Download Printable Note"
  downloadFileName="git_foundations_revision_note.txt"
/>
```

---

### E. Teacher's Note & Mentorship Component (`<Teacher>`)

#### Teacher's Note Requirements & Educator Identity
- **Designated Educator**: **Sukanta Hui** (Senior Mentor & Architect, Coder & AccoTax, Barrackpore).
- Every Git topic component must import and mount the `<Teacher />` component (`import Teacher from "../../../common/TeacherSukantaHui";`).
- The Teacher section embeds Sukanta Hui's verified educator profile, student interaction history (with Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, Tuhina), and pedagogical guidance:

1. **One Memorable Teaching Principle**: Core mental model or architectural truth.
2. **One Defensive Warning**: Highlight dangerous misconceptions or high-risk commands (e.g. `git reset --hard`, destructive force pushes).
3. **One Practical Professional Habit**: Daily workflow discipline (e.g. `git status` checks, atomic commits, staging reviews).
4. **One Motivational Statement**: Encouraging mastery of terminal internals and problem-solving confidence.

```jsx
import Teacher from "../../../common/TeacherSukantaHui";

// Inside Topic Component:
<Teacher
  note="Principle: Git is an append-only snapshot database, not a file overwriter. Warning: Never run git reset --hard with unstaged, uncommitted work! Habit: Always run 'git status' before and after every state-changing command. Motivation: Once you master the DAG and branch pointers, you will never fear a merge conflict again! — Sukanta Hui, Coder & AccoTax"
/>
```

---

### F. Next & Previous Topic Navigation Component
```jsx
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import roadmapData from "../../git-roadmap.json";

const TopicNavigation = () => {
  const { moduleSlug, topicIndex } = useParams();
  const currentIndex = Number(topicIndex);
  const folder = roadmapData.folder; // 'git'

  const currentModule = roadmapData.segments
    .flatMap(segment => segment.modules)
    .find(module => module.slug === moduleSlug);

  if (!currentModule) return null;
  const totalTopics = currentModule.topics.length;
  const hasNext = currentIndex < totalTopics - 1;
  const hasPrev = currentIndex > 0;

  return (
    <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
      {hasPrev ? (
        <Link
          to={`/${folder}/topic/${moduleSlug}/${currentIndex - 1}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-sm font-semibold"
        >
          <ArrowLeft size={16} />
          <span>Previous Topic</span>
        </Link>
      ) : <div />}

      {hasNext ? (
        <Link
          to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
        >
          <span>Ready for Topic {currentIndex + 2}</span>
          <ArrowRight size={16} />
        </Link>
      ) : (
        <Link
          to={`/${folder}/module/${moduleSlug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-sm hover:bg-emerald-900 transition"
        >
          <span>Complete Module Overview</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </nav>
  );
};
```

### G. Vocabulary & Computer Dictionary Lookup Integration (`<WordDictionary>`)

All tutorial topics and tracks are integrated with the global **Vocabulary & Computer Dictionary Lookup System**:

1. **Automatic Text Selection Lookup**:
   - Whenever any student selects or highlights a word or tech term (e.g. *catastrophic*, *immutable*, *idempotent*, *rebase*, *detached HEAD*), a sleek floating tooltip automatically appears near their cursor.
   - Provides 1-click **"Define [word]"**, instant pronunciation audio, and direct links to:
     - 💻 **Computer Hope** (Authoritative computer dictionary & IT jargon reference)
     - ⚡ **TechTerms Computer Dictionary**
     - 🦖 **MDN Web Docs**
     - 🌿 **GeeksforGeeks CS Reference**
     - 🚀 **DevDocs API & Tech Reference**
     - 🌐 **Webopedia Tech Encyclopedia**
     - 🏛️ **Cambridge Dictionary**
     - 📚 **Merriam-Webster**
     - 🔍 **Google Search Definition**
     - 🎓 **Oxford Learner's Dictionaries**
     - 🌐 **Wikipedia / Wiktionary**

2. **Master Topic View & Workspace Integration**:
   - In `StudyTopicView.jsx`, students have a persistent **"Dictionary"** button in the top header and a dedicated **"Dictionary" tab** in the right workspace panel for side-by-side study.

3. **Optional In-Topic Vocabulary & Tech Glossary Highlights**:
   - Topic authors may optionally embed a custom vocabulary card using `<WordDictionary>` when introducing heavy or domain-specific terminology:
   ```jsx
   import WordDictionary from "../../../common/WordDictionary";

   // Inside Topic Component for a dedicated vocabulary / tech glossary helper card:
   <WordDictionary initialWord="catastrophic" showTitle={true} />
   ```

---

### H. Cross-Module Navigation

When the current topic is the final topic of a module:

- Previous → previous topic (if available)
- Next → first topic of the next roadmap module (if available)
- If no next module exists → Course Completion / Module Overview

Navigation must follow the roadmap across segments and modules.

---

## 6A. Security & Credential Safety

- Never include real API keys, GitHub Personal Access Tokens, passwords, SSH private keys, or production credentials.
- Use clearly fake placeholders such as `ghp_EXAMPLE_NOT_A_REAL_TOKEN`.
- Never encourage committing `.env`, credentials, secrets, or private keys.
- When demonstrating secret leakage, use fake credentials, explain detection, and show safe remediation.
- Clarify that deleting a secret from the latest commit does not automatically remove it from Git history.

---

## 7. Output & Quality Guarantee

1. **Full File Generation**: Always output 100% complete, copy-paste-ready, un-truncated topic JSX files.
2. **Strict Relative Pathing**:
   - `roadmapData`: `import roadmapData from "../../git-roadmap.json";` (from `topics/[slug]/TopicN.jsx`).
   - Common components: `import FAQTemplate from "../../../common/FAQTemplate";`
   - Common components: `import PlainTextPrint from "../../../common/PlainTextPrint";`
   - Common Teacher component: `import Teacher from "../../../common/TeacherSukantaHui";` (Teacher Sukanta Hui Mentorship Card)
3. **Zero Placeholder Policy**: No empty functions, no placeholder TODOs, and no fake code snippets. Every command, diagram, analogy, and example must be completely authentic, functional, and deeply educational.

---

## 8. Pre-Output Validation

Before declaring the task complete, verify:

### File Validation
- Correct module folder
- Correct TopicN.jsx filename
- Correct topic[N]_files folder
- Correct note filename
- Correct questions filename
- Correct lab filename

### Content Validation
- All 12 required sections exist
- Simple Language section is immediately after Header
- Topic scope is correct
- No missing required content
- No duplicated sections
- 25–30 FAQ questions exist
- Basic/Intermediate/Advanced questions are balanced

### Code Validation
- JSX syntax is valid
- All imports resolve
- All referenced files exist
- No unused imports where avoidable
- No undefined variables
- No broken JSX nesting
- React component has a valid default export

### UI Validation
- Responsive layout
- No accidental horizontal page overflow
- Keyboard accessibility
- Reduced-motion support
- SVG labels are readable

### Git Validation
- Commands are syntactically valid
- Destructive commands are clearly marked
- Git state transitions are accurate
- No misleading simplifications

### Companion File Consistency
- Topic JSX, printable note, FAQ, and lab must describe the same topic.
- Keep terminology, command syntax, safety warnings, and examples synchronized.
- If the JSX explanation changes, update every affected companion file.
- Never allow the note or FAQ to reference an older version of the topic.

### Build Validation
If tools are available:
- run the project's lint/build checks
- fix errors before final output
- do not claim successful validation unless it was actually performed

### Verification Honesty

Never claim:

- "tested"
- "build passed"
- "lint passed"
- "command executed successfully"
- "file verified"

unless the agent actually performed the corresponding verification.

If verification could not be performed, explicitly state:

"Not executed; requires local environment verification."

---

## 9. Repository Safety Rules

Unless explicitly requested:

- Do not modify `git-roadmap.json`.
- Do not modify existing topic files outside the requested topic.
- Do not rename existing topic folders.
- Do not rename existing topic files.
- Do not delete existing files.
- Do not modify shared components.
- Do not modify routing configuration.
- Do not modify package.json.
- Do not add dependencies.
- Do not modify global CSS.
- Do not change Tailwind configuration.
- Do not alter unrelated modules.

---

## 10. Instruction Priority

When requirements conflict, follow this priority order:

1. Repository safety
2. Roadmap correctness
3. Topic scope
4. Technical correctness
5. Functional React/code correctness
6. Pedagogical clarity
7. Accessibility
8. Responsive UI
9. Visual design
10. Animation/decorative effects
