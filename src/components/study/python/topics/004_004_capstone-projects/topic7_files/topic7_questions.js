// src/components/study/python/topics/004_004_capstone-projects/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Resume and portfolio presentation strategies

const questions = [
  {
    question: "What is the Google X-Y-Z formula for writing engineering resume bullet points?",
    shortAnswer: "The formula states: 'Accomplished [X], as measured by [Y], by doing [Z]' (e.g. 'Reduced query latency by 85% [Y] across 10,000 daily active student records [X] by implementing a Redis Cache-Aside layer [Z]').",
    explanation: "The standard high-impact resume bullet writing formula.",
    hint: "Accomplished [X], as measured by [Y], by doing [Z].",
    level: "basic",
    codeExample: "# Example: Built [X], improved [Y] by 40%, by implementing [Z]"
  },
  {
    question: "How do Applicant Tracking Systems (ATS) scan and rank software engineering resumes?",
    shortAnswer: "ATS parsers extract plain text and match candidate skills against job description keywords (e.g. 'Python', 'SQLite', 'Redis', 'Docker', 'pytest', 'CI/CD', 'Asyncio'); complex multi-column graphics or non-standard fonts can cause parsing failures.",
    explanation: "ATS parsing mechanics and keyword extraction.",
    hint: "Parses text and matches keywords; multi-column or graphic-heavy PDFs can break parsing.",
    level: "basic",
    codeExample: "# Maintain clean, single-column, standard-font PDF resume layouts"
  },
  {
    question: "Why is pinning 2-3 polished GitHub repositories better than having 50 unmaintained toy scripts?",
    shortAnswer: "Hiring managers spend only 1-2 minutes reviewing GitHub profiles; having 2-3 exceptional, fully-tested, badge-decorated, and well-documented capstone projects provides an immediate high-signal demonstration of senior craftsmanship, whereas dozens of abandoned repos create noise.",
    explanation: "Curating high-signal portfolio repositories.",
    hint: "Quality over quantity: 2-3 deep, tested repos create a stronger impression than 50 unfinished scripts.",
    level: "basic",
    codeExample: "# Pin: 1. Institutional Student Manager (Full Capstone with 96% coverage)"
  },
  {
    question: "What are the 4 stages of the STAR method for behavioral and technical interviews?",
    shortAnswer: "1. Situation (set the context and challenge), 2. Task (your specific technical responsibility), 3. Action (the architectural and coding decisions you took), and 4. Result (quantified business or technical outcome).",
    explanation: "The STAR behavioral interview storytelling framework.",
    hint: "Situation, Task, Action, Result.",
    level: "basic",
    codeExample: "# STAR: Context -> Challenge -> Engineering Action -> Measurable Impact"
  },
  {
    question: "What should you do when an interviewer asks: 'Tell me about a difficult bug you solved'?",
    shortAnswer: "Use STAR to explain: 1. The bug's symptom and business impact, 2. The diagnostic hypothesis and tools used (logging, debugger, git bisect), 3. The root cause analysis, 4. The surgical fix, and 5. The preventive automated regression test added to CI.",
    explanation: "Root cause analysis storytelling and regression prevention.",
    hint: "Explain symptom -> diagnostic tools -> root cause -> surgical fix -> regression test added.",
    level: "moderate",
    codeExample: "# Structure: Symptom -> Debugging -> Root Cause -> Fix -> Automated Test"
  },
  {
    question: "Why should every portfolio repository include an architectural diagram in its README.md?",
    shortAnswer: "Architectural diagrams (Mermaid / SVG) communicate high-level system comprehension in 5 seconds, proving to hiring managers that you understand layered design, separation of concerns, and data flow beyond basic scripting.",
    explanation: "Visual communication of software architecture.",
    hint: "Visually communicates system design, data flow, and decoupled layers at a glance.",
    level: "basic",
    codeExample: "```mermaid\ngraph LR\nClient --> API_Gateway --> Gunicorn --> SQLite\n```"
  },
  {
    question: "What length should a software engineer's resume be?",
    shortAnswer: "A single page (1 page) for engineers with under 8-10 years of experience; concise, quantified bullet points with zero fluff allow recruiters to scan core competencies in under 10 seconds.",
    explanation: "Standard engineering resume length guidelines.",
    hint: "1 page is standard for under 8-10 years of experience.",
    level: "basic",
    codeExample: "# 1-Page Clean Layout: Contact -> Skills -> Experience -> Projects -> Education"
  },
  {
    question: "How do you demonstrate 'Seniority' in a Python portfolio without 10 years of formal experience?",
    shortAnswer: "By implementing production-grade engineering standards: strict static typing ('mypy --strict'), 85%+ branch test coverage with pytest, CI/CD matrix workflows (.github), structured logging, defensive custom exceptions, and clear architecture documentation.",
    explanation: "Signaling professional engineering maturity through code quality.",
    hint: "Strict static typing + 85%+ branch coverage + multi-OS CI/CD + clean architecture.",
    level: "moderate",
    codeExample: "# Signals maturity: pytest-cov + mypy strict + conventional commits"
  },
  {
    question: "What is the best way to handle live technical coding whiteboard/screen-share rounds?",
    shortAnswer: "1. Clarify requirements and constraints upfront, 2. State assumptions and edge cases, 3. Discuss Time/Space Big-O complexity before writing code, 4. Think out loud, 5. Write clean modular code, and 6. Walk through test cases manually to verify correctness.",
    explanation: "Live technical coding interview protocol.",
    hint: "Clarify inputs/edge cases -> state Big-O -> think out loud -> write code -> verify with test cases.",
    level: "moderate",
    codeExample: "# Step 1: Clarify -> Step 2: Big-O -> Step 3: Code -> Step 4: Trace"
  },
  {
    question: "How should you list your technical skills on a resume to maximize ATS matching?",
    shortAnswer: "Group skills into clear, categorized sections (e.g. Languages: Python, SQL; Backend & Web: FastAPI, Django; Persistence & Cache: SQLite, PostgreSQL, Redis; Tooling & DevOps: Docker, Git, GitHub Actions, pytest, Mypy).",
    explanation: "Categorized skills organization for ATS and recruiters.",
    hint: "Categorize into Languages, Backend, Databases/Caching, and DevOps/Testing.",
    level: "basic",
    codeExample: "Skills:\n- Languages: Python 3.12, SQL\n- Testing & Quality: pytest, pytest-cov, mypy, ruff"
  },
  {
    question: "What is the role of a GitHub Profile README ('username/username')?",
    shortAnswer: "It acts as your personal engineering landing page, highlighting your primary technical stack, featured open-source capstone projects with links and badges, and professional contact links.",
    explanation: "GitHub profile landing page branding.",
    hint: "Personal developer landing page showcasing tech stack, pinned projects, and bio.",
    level: "basic",
    codeExample: "# Hi, I'm Sukanta! | Python Engineer | Pinned Projects: Institutional Manager"
  },
  {
    question: "How should you answer: 'What is your biggest weakness as an engineer?'",
    shortAnswer: "State a genuine technical or workflow area you identified in the past, followed immediately by the concrete proactive steps and tools you are currently using to overcome it (growth mindset).",
    explanation: "Handling behavioral self-awareness questions.",
    hint: "Pick a real area of past improvement and explain the concrete actions you took to improve.",
    level: "moderate",
    codeExample: "# E.g. 'I used to under-document code; now I mandate Google docstrings and doctests.'"
  },
  {
    question: "Why should you avoid putting skill rating percentage bars (e.g. 'Python: 90%') on a resume?",
    shortAnswer: "Arbitrary percentage bars are unquantifiable and subjective (what does 90% Python mean?), confuse ATS parsers, and waste valuable resume space that should instead showcase real quantified achievements.",
    explanation: "Anti-pattern of subjective skill meters on resumes.",
    hint: "Subjective and meaningless; replace with real project bullet points and metrics.",
    level: "basic",
    codeExample: "# ANTI-PATTERN: 'Python: 85%' | BEST PRACTICE: 'Architected Python API with 96% coverage'"
  },
  {
    question: "What questions should you ask the interviewer when they ask: 'Do you have any questions for us?'",
    shortAnswer: "Ask high-signal technical and cultural questions: 'What does your CI/CD deployment rhythm look like?', 'How does the engineering team handle technical debt and refactoring?', and 'What is the biggest technical scaling bottleneck the team is currently tackling?'.",
    explanation: "Reverse interviewing and demonstrating genuine engineering curiosity.",
    hint: "Ask about their CI/CD release cadence, tech debt management, and architecture challenges.",
    level: "basic",
    codeExample: "# High-signal questions prove you think about team workflows and engineering scale"
  },
  {
    question: "How should you describe academic or bootcamp capstone projects on a resume?",
    shortAnswer: "Treat the capstone as a real software engineering product: highlight user problems solved, system architecture choices (SQLite, Redis, OOP layers), test coverage percentages, and GitHub links with live demonstrations.",
    explanation: "Presenting capstone projects as production software.",
    hint: "Frame as a production software product with architectural tradeoffs and test metrics.",
    level: "basic",
    codeExample: "# Capstone: Institutional Student Ledger System (github.com/org/repo)"
  },
  {
    question: "What is the importance of a clean Git commit history in your public portfolio?",
    shortAnswer: "A clean history using Conventional Commits ('feat:', 'fix:') and atomic pull requests demonstrates that you know how to collaborate effectively in professional engineering teams.",
    explanation: "Git hygiene as a proxy for professional collaboration skills.",
    hint: "Proves you follow professional team workflows, atomic commits, and release hygiene.",
    level: "basic",
    codeExample: "# Conventional commits prove professional collaboration standards"
  },
  {
    question: "How do you prepare for system design rounds for junior/mid-level Python roles?",
    shortAnswer: "Focus on fundamentals: drawing clear data flow diagrams, separating stateless application servers from stateful databases, applying caching (Redis Cache-Aside), using database indexes/replicas, and explaining CAP theorem tradeoffs.",
    explanation: "System design preparation strategies for backend interviews.",
    hint: "Master stateless app tiers, Redis caching, DB indexing/replicas, and message queues.",
    level: "moderate",
    codeExample: "# Diagram: Client -> NGINX -> Gunicorn -> Redis / PostgreSQL"
  },
  {
    question: "Why should you deploy a live demo or provide pre-recorded asciinema/GIFs in your GitHub README?",
    shortAnswer: "Technical recruiters and hiring managers may not have time to clone and run code locally; a 10-second GIF or live link provides instant visual proof that the software functions as advertised.",
    explanation: "Instant visual verification of working software.",
    hint: "A 10-second GIF or demo link gives recruiters instant proof of working software.",
    level: "basic",
    codeExample: "![Demo Animation](assets/demo.gif)"
  },
  {
    question: "What is the rule for negotiating compensation offers?",
    shortAnswer: "Never accept an initial offer on the spot; thank the recruiter enthusiastically, ask for the complete offer in writing (base, bonus, equity, benefits), research market rates, and negotiate professionally based on value and competing opportunities.",
    explanation: "Salary negotiation fundamentals.",
    hint: "Request complete written offer, research market data, and negotiate based on value.",
    level: "basic",
    codeExample: "# Always review total compensation in writing before making decisions"
  },
  {
    question: "What is the ultimate golden rule of resume and portfolio presentation?",
    shortAnswer: "Lead with quantified impact (Google X-Y-Z formula), showcase 2-3 exceptional, fully-tested, and badge-decorated capstone repositories, communicate technical tradeoffs clearly using STAR, and demonstrate professional engineering discipline in every commit.",
    explanation: "The complete career portfolio and technical presentation standard.",
    hint: "Quantified X-Y-Z metrics + top 2-3 tested repos + STAR storytelling + clean Git hygiene.",
    level: "basic",
    codeExample: "# Enterprise Resume & Portfolio Presentation Standard"
  }
];

export default questions;
