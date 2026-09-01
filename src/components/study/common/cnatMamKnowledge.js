// ============================================================================
// CNAT MAM AI CHATBOT KNOWLEDGE BASE & INTENT ENGINE
// Specializing in Excel, Financial Modeling, TallyPrime, Accounting & Coding
// ============================================================================

export const CNAT_MAM_PROFILE = {
  name: "CNAT Mam",
  title: "Senior AI Academic Mentor & Student Counselor",
  organization: "Coder & AccoTax Centre of Excellence",
  avatar: "/teachers/cnat.jpg",
  greeting: "Hello dear student! I am CNAT Mam, your academic mentor. How can I help you master your current topic or guide you with institute & teacher details today?",
};

export const QUICK_PROMPT_CHIPS = [
  { label: "💡 Explain Current Topic", query: "Can you explain the main concepts of this topic in simple terms?" },
  { label: "📞 Teacher Contact", query: "Can you provide teacher contact number and communication details?" },
  { label: "🏢 Organisation Details", query: "Tell me about Coder & AccoTax institute, campus location and accreditation." },
  { label: "👨‍🏫 Faculty Info", query: "Who are the teachers and instructors at Coder & AccoTax?" },
  { label: "🎓 Courses Offered", query: "What courses and modules are taught at Coder & AccoTax?" },
  { label: "📊 Practical Example", query: "Give me practical formula examples with real-world inputs and outputs." },
  { label: "🛠️ Fix Error Code", query: "How do I diagnose and fix formula errors like #VALUE!, #N/A or #REF!?" },
  { label: "📝 Exam & Viva Tips", query: "What are the most important interview and exam questions for this module?" },
];

export function getCNATMamResponse(userQuery, context = {}) {
  const q = userQuery.toLowerCase().trim();
  const currentTopic = context.topicTitle || "General Curriculum";

  // 1. Teacher & Faculty Contact Query
  if (q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("whatsapp") || q.includes("teacher number") || q.includes("reach") || q.includes("call") || q.includes("helpline")) {
    return `### 📞 Teacher & Faculty Contact Details\n\nHere are the official contact details to reach Senior Faculty Lead **Sukanta Hui**:\n\n- **Phone / WhatsApp:** **+91 70037 56860**\n- **Official Email:** **sukantahui@codernaccotax.co.in** | **contact@codernaccotax.co.in**\n- **LinkedIn:** [Sukanta Hui Profile](https://www.linkedin.com/in/sukantahui/)\n- **Web Portal:** [www.codernaccotax.co.in](https://www.codernaccotax.co.in)\n\n*CNAT Mam's Advice:* For instant doubt clearance during lab hours, feel free to send a message on WhatsApp!`;
  }

  // 2. Faculty & Instructors Info Query
  if (q.includes("teacher") || q.includes("teachers") || q.includes("faculty") || q.includes("instructor") || q.includes("educator") || q.includes("sukanta") || q.includes("who is teaching") || q.includes("trainer")) {
    return `### 👨‍🏫 Faculty & Academic Lead Profiles\n\n- **Sukanta Hui** (*Founder & Senior Lead Educator*):\n  - 25+ years corporate & practical training expertise in Enterprise Software Development, Financial Accounting, Advanced Excel Analytics, Database Systems, and Automated Business Systems.\n  - **Direct Helpline:** **+91 70037 56860** | **sukantahui@codernaccotax.co.in**\n\n- **CNAT Mam** (*Senior AI Academic Counselor & Interactive Mentor*):\n  - Dedicated student guidance assistant for interactive topic explanations, formula debugging, and 24/7 doubt clearance!`;
  }

  // 3. Organisation & Campus Details Query
  if (q.includes("organisation") || q.includes("organization") || q.includes("institute") || q.includes("coder & accotax") || q.includes("address") || q.includes("location") || q.includes("campus") || q.includes("about") || q.includes("centre") || q.includes("where is")) {
    return `### 🏢 Coder & AccoTax Centre of Excellence\n\n- **Institute Name:** Coder & AccoTax Educational Institute\n- **Accreditation:** ISO 9001:2015 Certified Training Centre\n- **Founder & Director:** Senior Educator Sukanta Hui\n- **Campus Address:** 25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, West Bengal, India\n- **Core Specializations:** Full Stack Software Engineering, Python Data Science, Advanced Excel Analytics, Power BI Stack, TallyPrime GST & Statutory Accounting.\n- **Official Web Portal:** [https://www.codernaccotax.co.in](https://www.codernaccotax.co.in)\n- **Helpline Number:** **+91 70037 56860**`;
  }

  // 4. Courses & Curriculum Query
  if (q.includes("course") || q.includes("courses") || q.includes("subject") || q.includes("subjects") || q.includes("curriculum") || q.includes("what do you teach") || q.includes("syllabus")) {
    return `### 🎓 Offered Professional Certification Courses\n\nAt **Coder & AccoTax**, we offer industry-standard practical training across:\n\n1. **Microsoft Excel Ultra Expert:** Cell formatting, complex lookups (XLOOKUP, INDEX-MATCH), dynamic arrays, Power Query M Code, Power Pivot DAX & VBA.\n2. **TallyPrime & Corporate Accounting:** Double-entry bookkeeping, GST invoicing, TDS/TCS compliance, inventory registers & financial statements.\n3. **Full Stack Software Development:** React 19, JavaScript (ES6+), Python Data Science, C/C++, Core Java, and MySQL Database Schema.\n4. **Quantitative Analysis & General Computer Applications.**`;
  }

  // 5. Bot Self-Identity Query
  if (q.includes("who are you") || q.includes("your name") || q.includes("cnat mam") || q.includes("about you")) {
    return `### 🎓 Hello! I am CNAT Mam\n\nI am your dedicated **Senior AI Academic Counselor & Mentor** at Coder & AccoTax!\n\nI am trained to help you with:\n- Topic-by-topic concept explanations\n- Practical formula breakdowns & step-by-step logic\n- Diagnosing calculation errors (\`#VALUE!\`, \`#N/A\`)\n- Answering questions about our institute, teachers, and courses!\n\nFeel free to ask me anything anytime during your study sessions!`;
  }

  // 6. Current Topic Explanation Query
  if (q.includes("explain current topic") || q.includes("explain this topic") || q.includes("main concept")) {
    return `### 💡 Topic Overview: ${currentTopic}\n\nHere is a breakdown of what you are learning in this topic:\n\n- **Core Objective:** Master standard syntax, formula evaluation order, and clean data hygiene rules.\n- **Key Formula Mechanics:** Ensure cell memory stores raw numbers/serials while applying custom formats for display.\n- **Enterprise Practice:** Always wrap dynamic range calculations inside defensive formula guards like \`IFERROR()\` or \`CLEAN()\`.\n\n*Pro Tip from CNAT Mam:* Try testing each formula step-by-step in the interactive grid below!`;
  }

  // 7. Practical Examples Query
  if (q.includes("example") || q.includes("practical") || q.includes("sample formula")) {
    return `### 📊 Practical Formula Showcase\n\nHere are classic real-world examples commonly used in corporate accounting & analytics:\n\n1. **Text Cleaning Triad:**\n   \`=TRIM(CLEAN(PROPER(A2)))\` \n   *(Strips non-printable chars, excess spaces & standardizes capitalization)*\n\n2. **Overnight Shift Duration:**\n   \`=MOD(end_time - start_time, 1) * 24\` \n   *(Seamlessly calculates hours worked across midnight)*\n\n3. **Dynamic SLA Milestone:**\n   \`=WORKDAY(start_date, 15, HOLIDAYS)\` \n   *(Calculates exact completion date excluding weekends and holidays)*`;
  }

  // 8. Error Troubleshooting Query
  if (q.includes("error") || q.includes("#value!") || q.includes("#n/a") || q.includes("troubleshoot")) {
    return `### 🛠️ Common Excel Error Diagnosis Guide\n\nHere is how to quickly resolve spreadsheet error codes:\n\n- **\`#VALUE!\` Error:** Occurs when math functions encounter text strings instead of numbers. *Fix:* Wrap in \`VALUE()\` or \`NUMBERVALUE()\`, or clean text with \`TRIM()\`.\n- **\`#N/A\` Error:** Indicates a lookup function (e.g. \`VLOOKUP\` or \`XLOOKUP\`) failed to find a match. *Fix:* Check for trailing spaces or wrap in \`IFERROR(formula, "Not Found")\`.\n- **\`#REF!\` Error:** Indicates an invalid cell reference resulting from a deleted row/column.\n- **\`###\` Display:** The column width is too narrow to display the formatted number/date. *Fix:* Double-click column header boundary to auto-fit width!`;
  }

  // 9. Exam / Viva Tips Query
  if (q.includes("exam") || q.includes("viva") || q.includes("interview") || q.includes("tips")) {
    return `### 📝 CNAT Mam's Top Exam & Viva Checklist\n\nWhen appearing for practical tests or technical interviews, remember these golden rules:\n\n1. **Raw Memory vs Rendered Display:** Explain that Excel stores dates as integer serial numbers (days since Jan 1, 1900) and time as decimals.\n2. **Absolute vs Relative References:** Be ready to demonstrate \`F4\` key shortcut to lock cell coordinates (\`$A$1\` vs \`A1\`).\n3. **Case Sensitivity:** Remember that \`FIND()\` is case-sensitive, whereas \`SEARCH()\` is case-insensitive.\n4. **Structured References:** When working with official Excel Tables, use column headers like \`[@Salary]\` instead of hardcoded coordinates.`;
  }

  // 10. Specific Function Keyword Matches
  if (q.includes("trim") || q.includes("clean") || q.includes("proper") || q.includes("upper") || q.includes("lower")) {
    return `### 🔤 Text Cleaning Functions Essentials\n\n- **\`TRIM(text)\`**: Removes all leading, trailing, and double spaces, leaving single spaces between words.\n- **\`CLEAN(text)\`**: Removes all non-printable control characters (ASCII 0–31).\n- **\`PROPER(text)\`**: Capitalizes the first letter of each word.\n- **\`UPPER(text)\` / \`LOWER(text)\`**: Converts string to ALL CAPS or all lowercase.\n\n*Combined Formula:* \`=TRIM(CLEAN(PROPER(A2)))\``;
  }

  if (q.includes("datedif") || q.includes("yearfrac") || q.includes("workday") || q.includes("networkdays")) {
    return `### 📅 Date & Working Day Calculations\n\n- **\`DATEDIF(start, end, unit)\`**: Calculates difference in Years ("Y"), Months ("M"), or Days ("D").\n- **\`YEARFRAC(start, end)\`**: Calculates exact fractional year tenure (useful for interest rates and financial models).\n- **\`WORKDAY(start, days, [holidays])\`**: Returns target end date adding N working days.\n- **\`NETWORKDAYS(start, end, [holidays])\`**: Returns total business days worked between two dates.`;
  }

  if (q.includes("textbefore") || q.includes("textafter") || q.includes("textsplit")) {
    return `### ✂️ Modern Excel Dynamic Array Text Functions\n\n- **\`TEXTBEFORE(text, delimiter)\`**: Extracts text occurring before a specified character or string.\n- **\`TEXTAFTER(text, delimiter)\`**: Extracts text occurring after a specified character or string.\n- **\`TEXTSPLIT(text, col_delimiter)\`**: Splits a text string into an array of columns across adjacent cells!`;
  }

  // Default Intelligent Fallback
  return `Dear student, regarding **${currentTopic}**:\n\nAlways ensure your input data is sanitized using clean text or serial date formulas before running complex aggregations.\n\nFor teacher contact & helpline, you can reach **Sukanta Hui** at **+91 70037 56860** or email **contact@codernaccotax.co.in**.\n\nIf you have a specific topic, teacher, or course question, feel free to ask me!`;
}
