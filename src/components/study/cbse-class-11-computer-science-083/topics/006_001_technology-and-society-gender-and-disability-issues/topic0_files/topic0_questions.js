const questions = [
  {
    id: 1,
    question: "Which of the following is an official prescribed area under Unit III (Society, Law and Ethics) of the CBSE Class XI Computer Science (083) curriculum?",
    options: [
      "Technology & Society: Gender and Disability Issues in Computing",
      "Quantum Computer Architecture",
      "Assembly Language Kernel Hacking",
      "Microprocessor Fabrication"
    ],
    correctAnswer: 0,
    explanation: "The official CBSE Computer Science (083) syllabus explicitly prescribes 'Technology and Society: Gender and disability issues while teaching and using computers' under Unit III.",
    hint: "Prescribed area covering gender parity and disability inclusion in computing."
  },
  {
    id: 2,
    question: "What does the 'Digital Gender Divide' refer to in societal computing contexts?",
    options: [
      "The disparity between men and women in their access to digital devices, internet connectivity, computer science education, and technical career opportunities",
      "A software bug affecting certain user accounts",
      "Different keyboard layouts for men and women",
      "The price difference between mobile phones"
    ],
    correctAnswer: 0,
    explanation: "The Digital Gender Divide describes inequalities in digital access, digital literacy, device ownership, and representation in STEM/computing professions between genders, especially pronounced in rural communities.",
    hint: "Disparity in access, literacy, and career participation."
  },
  {
    id: 3,
    question: "Which assistive technology tool converts on-screen digital text and UI elements into synthesized speech or refreshable Braille output for visually impaired users?",
    options: [
      "Screen Reader (e.g., NVDA, JAWS, VoiceOver)",
      "Screen Magnifier",
      "Speech-to-Text Dictation",
      "Closed Captioning"
    ],
    correctAnswer: 0,
    explanation: "A Screen Reader (such as open-source NVDA, JAWS, or Apple VoiceOver) reads aloud the textual and structural semantic content of graphical windows and web pages for visually impaired or blind users.",
    hint: "Screen readers synthesize speech from screen content."
  },
  {
    id: 4,
    question: "What is a 'Refreshable Braille Display'?",
    options: [
      "An electro-mechanical hardware device that dynamically raises round-tipped pins through holes to produce Braille characters in real time from computer text",
      "A printer that prints on cardboard",
      "A high-refresh-rate gaming monitor",
      "A barcode scanner"
    ],
    correctAnswer: 0,
    explanation: "A Refreshable Braille display connects via USB/Bluetooth and dynamically pushes mechanical pins up and down to allow deaf-blind or blind users to read text through tactile touch.",
    hint: "Tactile dynamic Braille pins pushed up electro-mechanically."
  },
  {
    id: 5,
    question: "Which assistive input hardware allows individuals with severe motor disabilities or quadriplegia to control a mouse cursor using only their eye movements?",
    options: [
      "Eye-Tracking Camera System",
      "Standard Optical Mouse",
      "Touch Screen Stylus",
      "Graphics Tablet"
    ],
    correctAnswer: 0,
    explanation: "Eye-tracking systems use near-infrared illumination and cameras to track the user's gaze on screen, allowing cursor navigation and dwell-clicking without requiring hand movement.",
    hint: "Eye-tracking technology monitors gaze position."
  },
  {
    id: 6,
    question: "What is the primary purpose of Closed Captioning (CC) and Subtitling in video and multimedia platforms?",
    options: [
      "To provide synchronized text transcripts of spoken dialogue and auditory cues for deaf or hard-of-hearing individuals",
      "To translate videos into other languages only",
      "To increase video file compression",
      "To display advertisements"
    ],
    correctAnswer: 0,
    explanation: "Closed Captioning provides textual transcripts of dialogue, sound effects, and musical cues, ensuring multimedia content is fully accessible to deaf and hard-of-hearing users.",
    hint: "Synchronized textual transcript of audio for hearing-impaired users."
  },
  {
    id: 7,
    question: "What does WCAG stand for in global web accessibility standards?",
    options: [
      "Web Content Accessibility Guidelines",
      "World Computer Access Group",
      "Wide Communication Accessibility Gateway",
      "Web Central Authoring Grid"
    ],
    correctAnswer: 0,
    explanation: "WCAG (Web Content Accessibility Guidelines), developed by the W3C Web Accessibility Initiative (WAI), defines international standards (Perceivable, Operable, Understandable, Robust - POUR) to make web content accessible to persons with disabilities.",
    hint: "Web Content Accessibility Guidelines."
  },
  {
    id: 8,
    question: "What are the four foundational principles of accessibility defined by WCAG (POUR)?",
    options: [
      "Perceivable, Operable, Understandable, Robust",
      "Portable, Optimized, Universal, Reliable",
      "Private, Open, Unified, Responsive",
      "Programmed, Organized, Usable, Rendered"
    ],
    correctAnswer: 0,
    explanation: "WCAG's POUR principles state that digital interfaces must be: 1. Perceivable (sensory presentation), 2. Operable (keyboard navigation), 3. Understandable (clear language), and 4. Robust (compatible with assistive tools).",
    hint: "POUR = Perceivable, Operable, Understandable, Robust."
  },
  {
    id: 9,
    question: "What is the role of the `alt` (alternative text) attribute in HTML image tags (`<img src='logo.png' alt='School Logo'>`)?",
    options: [
      "To provide a descriptive text equivalent read aloud by screen readers when visually impaired users browse the webpage",
      "To change the image dimensions",
      "To apply a CSS blur filter",
      "To load the image faster"
    ],
    correctAnswer: 0,
    explanation: "The `alt` attribute provides a textual description of the image content, enabling screen reader software to convey the image's purpose to blind and visually impaired users.",
    hint: "Alt text describes image content for screen readers."
  },
  {
    id: 10,
    question: "Which Indian Government national flagship initiative aims to make the physical and digital ecosystem universally accessible for Divyangjan (persons with disabilities)?",
    options: [
      "Sugamya Bharat Abhiyan (Accessible India Campaign)",
      "Digital India Land Records",
      "Make in India",
      "Swachh Bharat Abhiyan"
    ],
    correctAnswer: 0,
    explanation: "Sugamya Bharat Abhiyan (Accessible India Campaign), launched by the Ministry of Social Justice and Empowerment in 2015, mandates universal accessibility across public infrastructure, transport, and government ICT portals.",
    hint: "Sugamya Bharat Abhiyan (Accessible India Campaign)."
  },
  {
    id: 11,
    question: "Which Indian statutory act guarantees equal rights, non-discrimination, and mandatory accessibility for persons with disabilities in education, employment, and public services?",
    options: [
      "Rights of Persons with Disabilities (RPwD) Act, 2016",
      "Information Technology Act, 2000",
      "Copyright Act, 1957",
      "Companies Act, 2013"
    ],
    correctAnswer: 0,
    explanation: "The Rights of Persons with Disabilities (RPwD) Act 2016 replaced the 1995 Act, expanding recognized disabilities from 7 to 21 and establishing mandatory accessibility standards across government and commercial ICT systems.",
    hint: "RPwD Act 2016."
  },
  {
    id: 12,
    question: "Why is high color contrast between text and background critical for digital accessibility?",
    options: [
      "It ensures that users with low vision, color blindness (e.g. Deuteranopia), or elderly users can easily read text content without visual strain",
      "It reduces computer power consumption",
      "It makes the website load faster",
      "It prevents software bugs"
    ],
    correctAnswer: 0,
    explanation: "WCAG mandates a minimum contrast ratio of 4.5:1 for normal text so that individuals with partial sight, cataracts, or color vision deficiency can read content legibly.",
    hint: "Ensures legibility for low vision and color-blind users."
  },
  {
    id: 13,
    question: "Which assistive tool benefits individuals with dysgraphia, tremors, or severe physical motor impairments who cannot use a physical keyboard?",
    options: [
      "Voice Recognition / Speech-to-Text Dictation software",
      "Screen Color Inverter",
      "RAM upgrade",
      "Optical drive"
    ],
    correctAnswer: 0,
    explanation: "Speech-to-text dictation engines (like Windows Speech Recognition, Google Voice Typing) convert spoken voice directly into typed text without requiring hand keyboard dexterity.",
    hint: "Speech-to-text voice typing."
  },
  {
    id: 14,
    question: "What is an 'Adaptive Switch' or 'Sip-and-Puff' device?",
    options: [
      "A specialized assistive input device operated by sipping or puffing air into a pneumatic tube, or pressing large oversized buttons with feet/head",
      "An electronic power switch on the PSU",
      "A network router switch",
      "A Python loop statement"
    ],
    correctAnswer: 0,
    explanation: "Sip-and-puff switches and adaptive microswitches allow individuals with paralysis or severe motor limitations to navigate computers and electric wheelchairs using air pressure or minor body twitches.",
    hint: "Pneumatic air-pressure input device."
  },
  {
    id: 15,
    question: "Why is Keyboard-Only Navigation essential in accessible web applications?",
    options: [
      "Because blind users (using screen readers) and users with motor tremors cannot manipulate a precise mouse pointer and rely entirely on `Tab`, `Shift+Tab`, and `Enter` keys",
      "Because mice are no longer manufactured",
      "Because keyboards use less RAM",
      "Because Python requires keyboards"
    ],
    correctAnswer: 0,
    explanation: "Accessible applications must be 100% operable via keyboard alone so that users unable to hold or guide an optical mouse can navigate all buttons, links, and forms via keyboard focus.",
    hint: "Enables navigation without requiring mouse pointing."
  },
  {
    id: 16,
    question: "What type of assistive font or display mode helps neurodivergent individuals with Dyslexia read code and text more effectively?",
    options: [
      "OpenDyslexic / Dyslexie fonts with weighted bottoms and distinct character shapes to prevent letter flipping",
      "Italicized serif fonts",
      "All-uppercase font style",
      "Tiny 8pt fonts"
    ],
    correctAnswer: 0,
    explanation: "Dyslexia-friendly fonts utilize heavy base gravity weighting and uniquely shaped glyphs for confusing letters (`b`, `d`, `p`, `q`) to prevent visual inversion and reading fatigue.",
    hint: "Special fonts with bottom weighting to prevent letter inversion."
  },
  {
    id: 17,
    question: "Which of the following practices promotes gender parity and inclusion in school Computer Science classrooms?",
    options: [
      "Providing equal encouragement, female computing role models (Ada Lovelace, Grace Hopper, Katherine Johnson), collaborative pair programming, and bias-free learning materials",
      "Assigning hardware tasks only to boys and documentation only to girls",
      "Restricting coding clubs to certain students",
      "Assuming girls are less interested in logic"
    ],
    correctAnswer: 0,
    explanation: "Promoting gender equity involves dismantling stereotypes, highlighting historic and modern female pioneers in computing, ensuring equal access to coding labs, and fostering an inclusive pair-programming culture.",
    hint: "Equal encouragement, celebrating female computing pioneers, and bias-free labs."
  },
  {
    id: 18,
    question: "Who was Ada Lovelace in the history of Computer Science?",
    options: [
      "The English mathematician widely recognized as the world's first computer programmer for writing an algorithm for Charles Babbage's Analytical Engine in 1843",
      "The inventor of the optical mouse",
      "The founder of Google",
      "The designer of ASCII"
    ],
    correctAnswer: 0,
    explanation: "Ada Lovelace published the first algorithm intended to be executed by Charles Babbage's mechanical Analytical Engine, earning her the title of the world's first computer programmer.",
    hint: "World's first computer programmer (1843)."
  },
  {
    id: 19,
    question: "Who was Rear Admiral Grace Hopper in computer science history?",
    options: [
      "A pioneering computer scientist who developed the first compiler (A-0) and popularized the high-level English-like programming language COBOL",
      "The creator of Python",
      "The inventor of the transistor",
      "The designer of Linux"
    ],
    correctAnswer: 0,
    explanation: "Grace Hopper developed the first linker/compiler and pioneered the idea of machine-independent programming languages, leading directly to COBOL. She also popularized the term 'debugging' after finding an actual moth in a relay.",
    hint: "Pioneered compilers and COBOL."
  },
  {
    id: 20,
    question: "What is 'Universal Design' (Inclusive Design) in software engineering?",
    options: [
      "Designing products and digital environments so they are usable by all people, to the greatest extent possible, without the need for specialized adaptation",
      "Designing software that runs only on one specific computer model",
      "Using only one color in UI design",
      "Writing software in a single file"
    ],
    correctAnswer: 0,
    explanation: "Universal Design ensures software is inherently accessible and usable by everyone—regardless of age, disability, language, or socioeconomic background—from the initial design phase.",
    hint: "Inherent usability for all people without extra adaptations."
  },
  {
    id: 21,
    question: "What is a major accessibility issue with purely audio-based CAPTCHA challenges for deaf users, or purely visual image CAPTCHAs for blind users?",
    options: [
      "Single-modality CAPTCHAs exclude users who lack that specific sensory modality; accessible systems must provide multi-modal alternatives (both visual and audio options)",
      "CAPTCHAs use too much internet bandwidth",
      "CAPTCHAs slow down CPU clock cycles",
      "Computers cannot solve CAPTCHAs"
    ],
    correctAnswer: 0,
    explanation: "Single-sensory tests create impassable barriers. Accessible design requires dual alternatives (audio challenge for visually impaired, visual challenge for deaf users, or biometric bypass).",
    hint: "Requires multi-modal alternatives (both audio and visual)."
  },
  {
    id: 22,
    question: "Which of the following is a cognitive accessibility accommodation in educational software?",
    options: [
      "Distraction-free Reading Modes, predictable navigation layouts, and step-by-step progress indicators",
      "Flashing strobe lights",
      "Rapidly auto-scrolling text",
      "Complex technical jargon with no definitions"
    ],
    correctAnswer: 0,
    explanation: "Cognitive accessibility aids users with ADHD, autism, or learning disabilities through clear hierarchies, predictable navigation, plain language, and minimal visual clutter.",
    hint: "Distraction-free modes and clear, predictable layouts."
  },
  {
    id: 23,
    question: "Why should web developers avoid relying solely on color to convey critical information (e.g., displaying only a red dot for 'Error' and green dot for 'Success')?",
    options: [
      "Users with Red-Green Color Blindness (Deuteranopia/Protanopia) cannot distinguish between red and green without accompanying text labels or icons (e.g. checkmark vs cross)",
      "Colors use too much display power",
      "Monitors might turn off colors",
      "Python does not support color"
    ],
    correctAnswer: 0,
    explanation: "Color blindness affects ~8% of males. Information conveyed with color must also be reinforced with text labels, patterns, or icons (WCAG Guideline 1.4.1: Use of Color).",
    hint: "Reinforce color with icons and text labels for color-blind users."
  },
  {
    id: 24,
    question: "Which keyboard shortcut standard in modern browsers allows a user to jump directly to main content, bypassing repetitive navigation menus?",
    options: ["Skip to Main Content Link (Tab focus)", "Alt + F4", "Ctrl + Alt + Del", "Shift + Space"],
    correctAnswer: 0,
    explanation: "A 'Skip to Content' link is an invisible link that becomes visible when keyboard users press `Tab`, allowing them to skip dozens of header navigation links and jump straight to the article.",
    hint: "Skip to Content link."
  },
  {
    id: 25,
    question: "Case Study: Susmita and Mamata are developing an admission portal for a school in Barrackpore. Which set of features ensures compliance with CBSE accessibility and gender-inclusive guidelines?",
    options: [
      "Full keyboard navigation + Screen reader compatible alt text + High contrast 4.5:1 ratio + Gender-inclusive dropdowns ('Female', 'Male', 'Transgender / Other', 'Prefer not to say')",
      "Flash animations with no text transcript + mouse-only submit button",
      "Purely visual image-based forms with no keyboard tab index",
      "Restricting portal access to high-speed broadband only"
    ],
    correctAnswer: 0,
    explanation: "Combining keyboard accessibility, screen reader semantic markup, WCAG contrast standards, and inclusive form fields creates a compliant, universally accessible public portal.",
    hint: "Keyboard access, screen reader alt text, WCAG contrast, and inclusive gender options."
  }
];

export default questions;
