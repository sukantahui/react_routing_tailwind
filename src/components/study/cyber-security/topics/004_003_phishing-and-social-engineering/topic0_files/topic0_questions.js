const questions = [
  {
    question: "Why is the human factor universally described as the 'weakest link' in modern cybersecurity architectures?",
    shortAnswer: "Because human decision-making is governed by cognitive biases, emotional triggers (fear, urgency, trust), and fatigue that can be manipulated regardless of firewall or encryption strength.",
    explanation: "Even with state-of-the-art firewalls, 256-bit encryption, and EDR agents, an attacker does not need to exploit software vulnerabilities if they can manipulate an employee into clicking a malicious link, executing malware, or entering credentials into a spoofed portal. Social engineering exploits human psychology rather than software code flaws.",
    hint: "You can build a steel vault with an unbreakable lock, but if the guard voluntarily hands over the key to a charming stranger, the vault is breached.",
    level: "basic",
    codeExample: `// The Human Vulnerability Equation:
// Security Strength = MIN(Technical Controls, Human Security Behavior)
// If Human Behavior is compromised through social engineering, Technical Controls = 0.`
  },
  {
    question: "What is Kevin Mitnick's fundamental axiom regarding Social Engineering and Human Vulnerability?",
    shortAnswer: "People are the weakest link because it is vastly easier to trick a human into giving up access credentials than it is to break cryptographic algorithms or zero-day software defenses.",
    explanation: "Renowned security expert Kevin Mitnick demonstrated that technical security mechanisms have a single point of failure: the human operator. He famously stated that you could spend millions on firewalls and intrusion detection systems, but a single 2-minute phone call exploiting trust or authority can bypass every layer of technical defense.",
    hint: "It takes 2 minutes of conversation to ask for a password, but decades to mathematically break AES-256.",
    level: "basic",
    codeExample: `// Mitnick's Axiom Representation:
// Cost to brute-force AES-256 : > 10^50 CPU Years
// Cost to trick user via Phish : 1 Phone Call / Email (~2 Minutes)`
  },
  {
    question: "What is the 'Default-to-Trust' Cognitive Heuristic (Truth-Default Theory), and how do social engineers weaponize it?",
    shortAnswer: "Humans naturally default to assuming that others are telling the truth; attackers exploit this presumption by impersonating trusted entities (colleagues, IT admins, banks).",
    explanation: "Truth-Default Theory (TDT) by Dr. Timothy Levine proves that in human communication, people operate under a default assumption of honesty unless triggered by blatant anomalies. Attackers exploit this by masquerading as familiar figures (e.g. HR manager or IT support desk in Kolkata), allowing fraudulent requests to bypass suspicion.",
    hint: "Assuming a package delivery person at your door is real unless they are wearing an obvious disguise.",
    level: "moderate",
    codeExample: `// Truth-Default Cognitive Pattern:
// Incoming Communication ➔ Default State: Presume Sincere
// Attacker Vector: Uses corporate branding + familiar terminology ➔ Passes Truth-Default Threshold!`
  },
  {
    question: "How does Decision Fatigue & Cognitive Overload cause employees to fail phishing tests at the end of business days?",
    shortAnswer: "Prolonged cognitive work depletes mental willpower and executive function, causing users to rely on fast, automatic System 1 thinking rather than analytical scrutiny.",
    explanation: "According to Daniel Kahneman's dual-system cognitive model, critical evaluation requires System 2 (slow, effortful, analytical thinking). After 8 hours of intensive mental labor, cognitive resources are exhausted (ego depletion). An employee receiving an urgent password reset prompt at 5:45 PM relies on System 1 (fast, intuitive heuristics) and clicks without checking the sender domain.",
    hint: "Why you are more likely to buy junk food when exhausted late at night after a long workday.",
    level: "moderate",
    codeExample: `// Cognitive Load vs Phishing Vulnerability:
// System 2 (Analytical, High Energy) ➔ Inspects email headers & URL domain (Safe)
// System 1 (Intuitive, Fatigued)    ➔ Sees familiar logo & clicks immediately (COMPROMISED!)`
  },
  {
    question: "What is Authority Bias in Social Engineering, and how does it compel compliance in hierarchical corporate structures?",
    shortAnswer: "The psychological tendency to comply unquestioningly with instructions from individuals perceived to possess legitimate institutional authority (e.g. CEO, Police, Regulators).",
    explanation: "Stemming from the Milgram experiments, humans are socially conditioned to obey authority figures. In Business Email Compromise (BEC), an attacker impersonates the Chief Executive Officer or Managing Director, demanding an urgent wire transfer: 'I am in a confidential board meeting in Kolkata, wire ₹45 Lakhs to vendor immediately.' Subordinates bypass normal verification out of deference and fear of insubordination.",
    hint: "Stepping aside immediately when someone wearing a security badge or police uniform tells you to move.",
    level: "moderate",
    codeExample: `// Authority Bias Exploit Flow:
// [Attacker: Spoofed CEO Email] ➔ "Urgent wire transfer needed before 4 PM!"
// [Subordinate: Authority Bias Activated] ➔ Skips secondary verification ➔ Transfers funds!`
  },
  {
    question: "How does Urgency Bias (Fear of Negative Consequences) disable logical critical thinking during a Phishing Attack?",
    shortAnswer: "High-stress urgency triggers amygdala hijacking, shifting cognitive processing to fight-or-flight instincts where fear of account loss or disciplinary action overrides rational analysis.",
    explanation: "When an email claims: 'Your payroll account will be permanently deactivated in 15 minutes unless you verify your PAN card now', the brain perceives an immediate existential threat. The emotional amygdala overrides the rational prefrontal cortex, compelling the victim to take immediate action to resolve the threat before thinking through the request's legitimacy.",
    hint: "A smoke alarm going off in the room makes you run for the exit before checking if there is real smoke.",
    level: "basic",
    codeExample: `// Urgency & Fear Mechanism:
// Phishing Subject: "FINAL NOTICE: Corporate Email Termination in 15 Minutes!"
// Psychological Impact: Prefrontal Cortex suppressed ➔ Amygdala panic ➔ Immediate credential submission!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes Cheating by Personation using Computer Resources?",
    shortAnswer: "Cheating by pretending to be some other person or entity over computer networks, punishable with imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly criminalizes impersonation: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers Cheating by Personation in phishing and social engineering.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Impersonating bank executives or corporate officers via phishing emails to defraud users
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "What is the 'Human Firewall' Paradigm, and how does it transform employees from security liabilities into proactive sensors?",
    shortAnswer: "A culture of continuous training, positive reinforcement, and frictionless reporting where employees actively detect, report, and neutralize social engineering threats in real time.",
    explanation: "The legacy security model treated users as 'stupid and careless' to be restricted by rigid policies. The modern Human Firewall paradigm empowers users through simulated phishing, gamified training, and a 1-click 'Report Phish' button. When 10,000 trained employees report suspicious emails within 2 minutes of delivery, the organization's detection speed surpasses automated scanners.",
    hint: "Having 1,000 alert neighborhood watch members watching the streets rather than just relying on 2 police cars.",
    level: "moderate",
    codeExample: `// Human Firewall Metrics:
// Phish-Prone Percentage (PPP) : Reduced from 38.5% ➔ 2.1% after 12 months
// Mean Time to Report (MTTR)     : 10,000 employees report novel lure in < 180 seconds!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities for failing to train employees against social engineering?",
    shortAnswer: "Failure to implement reasonable organizational security safeguards (mandatory employee cybersecurity awareness) triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) of the DPDP Act 2023 mandates that data fiduciaries must implement reasonable security safeguards to prevent personal data breaches. If an organization in West Bengal fails to train its workforce, leading to an employee falling for a basic phishing lure that leaks 500,000 customer PAN cards, the DPBI can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to train employees against social engineering triggers maximum penalties under national data privacy law.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent employee security training`
  },
  {
    question: "What is the Principle of 'Failing Safely' (Poka-Yoke / Resilient Engineering) in Human-Centric Security Architecture?",
    shortAnswer: "Designing technical controls assuming humans WILL make mistakes, ensuring a single click or human error cannot result in catastrophic enterprise compromise.",
    explanation: "Blaming users for clicking links is ineffective. Resilient engineering implements boundary controls: 1. FIDO2 / WebAuthn Passkeys (cryptographic hardware keys immune to credential phishing); 2. Content Disarm & Reconstruction (stripping macros from attachments); 3. Least Privilege (standard users cannot install software); 4. Out-of-band wire transfer approval protocols.",
    hint: "Installing seatbelts and airbags in a car because you know drivers will eventually make a driving mistake.",
    level: "expert",
    codeExample: `// Resilient Architecture against Human Error:
// User Clicks Phishing Link ➔ WebAuthn Passkey refuses to sign origin 'evil-bank.in' ➔ Zero Credential Loss!
// User Opens Weaponized Doc ➔ ASR Rules block PowerShell child process ➔ Zero Malware Execution!`
  },
  {
    question: "How does Reciprocity and the 'Helpfulness Trap' exploit human social instincts in Social Engineering?",
    shortAnswer: "The psychological compulsion to return a favor or assist someone in distress; attackers pose as overwhelmed new employees or helpful technicians to elicit unauthorized assistance.",
    explanation: "Humans are evolutionary social creatures who value cooperation. An attacker poses as a new employee from the Jadavpur branch struggling to access payroll: 'I am so sorry to bother you, I am locked out and need to submit my timesheet before 5 PM'. The victim's innate desire to be helpful and empathetic overrides strict identity verification protocols.",
    hint: "Holding the door open for someone carrying heavy boxes who does not have an access badge.",
    level: "moderate",
    codeExample: `// Helpfulness Trap Exploit Pattern:
// Attacker: "I'm a new intern in Kolkata office, could you email me the employee directory PDF?"
// Human Instinct: Empathy & Politeness ➔ Bypasses Data Classification Protocol!`
  },
  {
    question: "What is Social Proof (Consensus Bias), and how do attackers manipulate it in spear-phishing campaigns?",
    shortAnswer: "The tendency to look to the actions of peers to determine appropriate behavior; attackers claim that 'everyone else on the team has already submitted their credentials'.",
    explanation: "When uncertain, individuals conform to group norms. An attacker sends a phishing lure: '92% of the Kolkata FinTech team has already completed the mandatory security verification. Only your account is pending.' Believing their colleagues have already verified the request, the victim assumes it is legitimate and complies immediately.",
    hint: "Walking into a restaurant because you see a long line of people waiting outside.",
    level: "moderate",
    codeExample: `// Social Proof Lure Construction:
// Email Body: "All members of the Barrackpore SCADA team have updated their passwords. Click here to complete your pending update."`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for social engineering breaches causing unauthorized access?",
    shortAnswer: "All organizations in India must report credential compromises, unauthorized access, and phishing breaches to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all credential phishing compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is Scarcity Bias in Social Engineering, and how does it compel rapid irrational action?",
    shortAnswer: "The perception that an opportunity or resource is extremely limited in quantity or time, triggering Fear of Missing Out (FOMO) and rushed decision-making.",
    explanation: "E-commerce and phishing attacks both leverage scarcity. Phishing lures like: 'Diwali Festival Bonus: First 50 employees to claim receive a ₹25,000 gift voucher. Only 4 vouchers remaining!' create intense FOMO, causing employees to click fraudulent links without inspecting URLs.",
    hint: "A store claiming 'Only 2 items left at this price!' making you buy before thinking.",
    level: "basic",
    codeExample: `// Scarcity Lure Pattern:
// Subject: "FESTIVAL BONUS: Only 5 Gift Cards Left for Salt Lake Office Staff - Claim Now!"`
  },
  {
    question: "How does Confirmation Bias reinforce belief in sophisticated spear-phishing lures?",
    shortAnswer: "Humans seek and interpret information in ways that confirm their pre-existing expectations; an email matching an expected business event (e.g. an upcoming flight or appraisal) is accepted without doubt.",
    explanation: "If an employee in Barrackpore is actively waiting for an annual performance appraisal letter, an email titled 'Annual Appraisal & Increment Details 2026.pdf' matches their mental expectation perfectly. Confirmation bias leads them to overlook minor grammatical inconsistencies or suspicious sender domains because the subject matter aligns with what they expected to receive.",
    hint: "Hearing a knock on the door right when you were expecting food delivery, so you open it without asking who it is.",
    level: "expert",
    codeExample: `// Confirmation Bias Exploit:
// Context: Target just attended an industrial safety seminar.
// Attacker Lure: "Certificate of Participation - Industrial Safety Seminar 2026.pdf.exe" ➔ 100% Trust!`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access achieved through social engineering credential harvesting?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for accessing computer systems using stolen credentials.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using harvested credentials from phishing to access corporate financial switches
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is the 'Zero-Blame' Security Culture, and why does punitive action against phishing victims harm organizational security?",
    shortAnswer: "Punishing employees for clicking phishing links creates fear, causing them to conceal mistakes; a zero-blame culture encourages immediate reporting, allowing SOC teams to contain breaches in minutes.",
    explanation: "If an organization fires or penalizes employees who fail phishing tests, victims will hide their mistakes when they accidentally enter credentials into real phishing portals. In a zero-blame culture, employees immediately press 'Report Phish' without fear, giving incident responders the critical 5-minute window needed to isolate compromised tokens before lateral movement occurs.",
    hint: "If a child is punished severely for spilling milk, they will hide the spill behind the sofa instead of asking for a towel to clean it up.",
    level: "moderate",
    codeExample: `// Zero-Blame vs Punitive Culture:
// PUNITIVE   : User enters password ➔ Hides incident ➔ Attacker dwells undetected for 45 days!
// ZERO-BLAME : User enters password ➔ Reports within 60 seconds ➔ SOC revokes token in 2 minutes!`
  },
  {
    question: "Synthesize an enterprise-wide Human Risk Management (HRM) Framework that reduces Phish-Prone Percentage below 2%.",
    shortAnswer: "A continuous loop integrating Contextual Micro-Training, Role-Specific Phishing Simulations, Frictionless 1-Click Reporting, FIDO2 Passwordless Hardware Keys, and Positive Recognition Rewards.",
    explanation: "To achieve human resilience: 1. Continuous Micro-Training: 2-minute bite-sized interactive modules delivered monthly. 2. Role-Based Simulations: Finance receives invoice lures; IT receives API token lures. 3. 1-Click Reporting: Email client plugin submitting headers directly to SOAR automation. 4. Technical Safeguards: FIDO2 WebAuthn passkeys that mathematically refuse to sign fraudulent origins. 5. Gamification: Recognizing top-reporting departments with quarterly security awards.",
    hint: "Combine monthly 2-minute micro-training, role-based phishing tests, 1-click reporting, FIDO2 passkeys, and positive rewards.",
    level: "expert",
    codeExample: `// Master Human Risk Management (HRM) Architecture:
// 1. Training Layer    : Monthly 2-minute adaptive micro-learning modules
// 2. Simulation Layer  : Contextual, role-tailored phishing lures (Finance, HR, Engineering)
// 3. Telemetry Layer   : 1-Click Phish Alarm button sending raw headers to SOAR triage
// 4. Engineering Layer : FIDO2 / WebAuthn passkeys (Renders credential phishing 100% ineffective)
// 5. Incentive Layer   : Quarterly 'Security Champion' recognitions across Kolkata & Barrackpore offices`
  },
  {
    question: "What is Liking & Familiarity Bias (Ingratiation), and how do social engineers build rapport over weeks before attacking?",
    shortAnswer: "The tendency to agree to requests from people we like or perceive as similar to ourselves; attackers build artificial social rapport on LinkedIn/WhatsApp before launching requests.",
    explanation: "Social engineers frequently engage in long-term grooming. An attacker connects on LinkedIn, compliments the target on recent technical publications, engages in casual discussions about Kolkata tech events for 3 weeks, and only then shares a 'collaborative research document' containing an exploit payload.",
    hint: "Making friends with the security guard over 2 weeks before asking them to let you in after hours.",
    level: "moderate",
    codeExample: `// Ingratiation Attack Workflow:
// Week 1: Friendly LinkedIn connection + compliments target's research
// Week 2: Casual discussions on AI & Cyber Security in West Bengal
// Week 3: Shares "Joint_Research_Paper.docx" (Contains Remote Template Injection Payload!)`
  },
  {
    question: "How do Visual Discrepancy Deficits in Mobile Devices increase Human Phishing Vulnerability?",
    shortAnswer: "Mobile email clients truncate long sender addresses and hide full URLs, stripping critical visual clues needed to detect domain typosquatting.",
    explanation: "On desktop monitors, users can hover over links to inspect full URLs (`https://login.microsoft.com.evil-portal.in`) and view full sender headers. On mobile smartphones, screen real estate is limited: the client displays only the display name ('Microsoft Security Team') and truncates the domain, causing mobile users to fail phishing tests at 3x the rate of desktop users.",
    hint: "Looking through a tiny peephole where you only see a person's necktie but cannot see their face.",
    level: "moderate",
    codeExample: `// Mobile URL Display Truncation:
// Full URL    : https://secure-bank.in.attacker-domain.com/login/auth
// Mobile View : "https://secure-bank.in..." (Hides malicious domain completely!)`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the legal penalty for unauthorized access achieved by exploiting human trust?",
    shortAnswer: "Dishonestly or fraudulently gaining unauthorized computer access carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes unauthorized computer access: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent access.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Using social engineering deception to access corporate servers
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is Commitment and Consistency Bias, and how does the 'Foot-in-the-Door' Technique exploit it?",
    shortAnswer: "The desire to appear consistent with prior commitments; getting a target to agree to a trivial, harmless request makes them significantly more likely to comply with a larger, dangerous request later.",
    explanation: "Once a person takes a stand or performs a small favor, psychological pressure compels them to maintain behavioral consistency. An attacker first asks for a harmless public document ('Could you confirm the office address?'). Once the victim complies, the attacker escalates: 'Thanks! Could you also quickly verify this vendor invoice link?' Having already agreed to help, the victim feels compelled to follow through.",
    hint: "Asking to borrow a pencil first, and once that is granted, asking to borrow the entire car.",
    level: "expert",
    codeExample: `// Foot-in-the-Door Social Engineering Sequence:
// Request 1 (Trivial)   : "Hi Mamata, is the Salt Lake office open today?" → (User: Yes)
// Request 2 (Dangerous) : "Great! Could you approve this internal vendor invoice link for us?" → (User Complies!)`
  },
  {
    question: "How does the 'Bystander Effect' in Shared Email Inboxes cause Phishing Emails to go Unreported?",
    shortAnswer: "When an email is sent to a shared distribution list (`sales@company.in`), individual employees assume someone else will verify or report it, leading to zero defensive action.",
    explanation: "Social psychologists have long proven that individual responsibility diffuses in large groups. When a suspicious phishing email arrives in a shared inbox with 50 team members, each person thinks: 'One of the senior engineers will report this'. As a result, nobody clicks the 'Report Phish' button, and the phishing campaign remains active for hours.",
    hint: "Seeing a broken street light on a busy road and assuming someone else has already called the city repair line.",
    level: "moderate",
    codeExample: `// Diffusion of Responsibility in Shared Inboxes:
// Target: support-team@kolkata-fintech.in (50 Recipients)
// Individual Action Probability P(Report) = 1 / N ➔ Results in zero reports!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Social Engineering?",
    shortAnswer: "Deceiving a victim by pretending to be an authorized executive or vendor to fraudulently induce them to transfer funds or corporate assets, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Phishing scams that trick employees into wire transfers are prosecuted under Section 420 alongside IT Act Section 66D.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for phishing scams.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving accounting staff via spoofed CEO emails to transfer corporate funds
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is Contextual Micro-Learning in Human Risk Management, and why is it 5x more effective than Annual Security Seminars?",
    shortAnswer: "Delivering short (60-90 second) interactive learning moments immediately when an employee clicks a simulated phishing test, transforming a mistake into an instant, memorable teachable moment.",
    explanation: "Annual 1-hour compliance slide decks suffer from rapid memory decay (Ebbinghaus Forgetting Curve), with users forgetting 80% within 7 days. Contextual micro-learning triggers at the exact moment of error: when a user clicks a simulated phishing link, a friendly 90-second interactive landing page explains the 3 specific red flags they missed (e.g. sender mismatch, fake urgency). Retention increases by over 500%.",
    hint: "Correcting a tennis player's grip immediately after they hit the ball out of bounds rather than giving them a textbook to read 6 months later.",
    level: "moderate",
    codeExample: `// Teachable Moment Workflow:
// User Clicks Simulated Phish ➔ Instant Redirection: "Oops! You were caught by a simulation."
// Displays 90-Second Interactive Breakdown: 1. Sender Domain Mismatch; 2. Artificial Urgency Clue; 3. Suspicious Attachment Extension`
  },
  {
    question: "How does the Dunning-Kruger Effect increase Cybersecurity Risk among Non-Technical Executives?",
    shortAnswer: "Individuals with low cybersecurity domain competence drastically overestimate their ability to recognize sophisticated social engineering attacks, refusing to follow standard verification procedures.",
    explanation: "Executives frequently believe that phishing attacks are obvious grammatical spam from foreign princes, asserting: 'I am too smart to fall for a scam'. Because of this cognitive bias, they fail to recognize modern hyper-personalized spear-phishing lures (which use perfect grammar, accurate corporate terminology, and valid vendor logos), making executives prime targets for Whaling attacks.",
    hint: "A novice chess player believing they can easily beat a grandmaster because they know how the pieces move.",
    level: "expert",
    codeExample: `// Dunning-Kruger Security Bias:
// Executive Mindset : "I know what phishing looks like, I don't need training."
// Reality           : 4x more likely to fall for high-context Whaling & BEC lures!`
  },
  {
    question: "What is the 'Illusion of Control' Cognitive Bias in Password Management?",
    shortAnswer: "The false belief that adding complex personal substitutions (e.g. `P@ssw0rd2026!`) makes a password impenetrable, when automated dictionary and rule-based cracking tools crack them in milliseconds.",
    explanation: "Users believe they are exerting clever control by substituting letters with numbers (`E` to `3`, `A` to `@`). In reality, hash cracking tools (Hashcat) apply standardized mutation rules (`best64.rule`) that automatically test all common letter substitutions in under 5 milliseconds. This illusion of security prevents users from adopting password managers and passkeys.",
    hint: "Thinking a secret handshake is unbreakable when everyone in town uses the exact same handshake variation.",
    level: "moderate",
    codeExample: `# Hashcat Rule-Based Mutation:
# Input: "Password2026" → Rule: toggles '@' and '0' → Automatically tries "P@ssw0rd2026!" in 0.002 seconds!`
  },
  {
    question: "How does Visual Homoglyph (IDN Typosquatting) exploit Human Visual Perception Limits?",
    shortAnswer: "By substituting ASCII characters with visually identical Unicode Cyrillic or Greek glyphs (e.g. Latin 'a' `U+0061` vs Cyrillic 'а' `U+0430`), making spoofed domain names indistinguishable to the naked human eye.",
    explanation: "Internationalized Domain Names (IDN) permit non-Latin scripts. An attacker registers `pаypal.com` where the first 'a' is Cyrillic `U+0430`. When rendered in browsers, the domain looks 100% identical to the real `paypal.com`. Because human visual perception cannot differentiate between identical pixel shapes, only technical defenses (Punycode conversion `xn--pypal-4ve.com` and browser anti-homoglyph filters) can prevent deception.",
    hint: "Two identical twin keys where only one has microscopic grooves that fit the real lock.",
    level: "expert",
    codeExample: `// Homoglyph Domain Comparison:
// Legitimate Domain : paypal.com (All Latin Characters)
// Spoofed Domain     : pаypal.com (Contains Cyrillic 'а' U+0430 ➔ Punycode: xn--pypal-4ve.com)`
  },
  {
    question: "Synthesize the mathematical relationship between Human Error Probability (P_error), Cognitive Fatigue Factor (F_cognitive), Urgency Manipulation Intensity (I_urgency), and Technical Friction (R_friction) in Social Engineering Vulnerability.",
    shortAnswer: "Human error probability is modeled as P_error = 1 - e^(- (F_cognitive * I_urgency) / R_friction); high cognitive fatigue and urgency drive P_error to 1.0, but enforcing technical friction (FIDO2/MFA) reduces actual compromise probability to zero.",
    explanation: "Let $F_{\\text{cognitive}} \\ge 1.0$ represent the employee's mental fatigue multiplier, $I_{\\text{urgency}} \\ge 1.0$ represent the psychological urgency intensity of the lure, and $R_{\\text{friction}}$ represent the technical friction (multi-step verification, FIDO2 WebAuthn prompts, out-of-band confirmation). The probability of an employee making an error is: $P_{\\text{error}} = 1 - e^{-\\frac{F_{\\text{cognitive}} \\times I_{\\text{urgency}}}{R_{\\text{friction}}}}$. When technical friction is high ($R_{\\text{friction}} \\to \\infty$), such as requiring cryptographic hardware keys, the mathematical probability of successful credential theft drops to zero regardless of human fatigue.",
    hint: "Mathematical proof showing that technical friction (FIDO2/MFA) neutralizes human cognitive fatigue and urgency manipulation.",
    level: "expert",
    codeExample: `// Human Vulnerability Mathematical Proof:
// F_cognitive = 2.5 (End of Day Burnout) | I_urgency = 3.0 (Urgent Wire Transfer Threat)
// Without Technical Friction (R=1.0) ➔ P_error = 1 - e^(-7.5) = 99.94% (VULNERABLE!)
// With FIDO2 Technical Friction (R=1000) ➔ P_error = 1 - e^(-0.0075) = 0.74% (SECURED!)`
  }
];

export default questions;
