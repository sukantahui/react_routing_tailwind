const questions = [
  {
    question: "What are Dr. Robert Cialdini's 6 Core Principles of Influence, and how are they weaponized in Social Engineering?",
    shortAnswer: "1. Authority; 2. Urgency/Scarcity; 3. Trust/Liking; 4. Reciprocity; 5. Social Proof; 6. Consistency/Commitment; weaponized to manipulate targets into bypassing security controls.",
    explanation: "Dr. Robert Cialdini's foundational psychological principles describe how humans make automated compliance decisions. Social engineers weaponize these principles: Authority compels obedience to fake executives; Urgency/Scarcity creates panic and FOMO; Liking builds deceptive rapport; Reciprocity exploits the urge to return favors; Social Proof leverages peer conformity; Consistency locks victims into compliance.",
    hint: "Authority ➔ Urgency ➔ Scarcity ➔ Trust ➔ Reciprocity ➔ Social Proof.",
    level: "basic",
    codeExample: `// Cialdini's Principles Applied to Attack Vectors:
// Authority   : "This is the Managing Director, wire ₹45 Lakhs immediately."
// Urgency     : "Your account will be suspended within 15 minutes!"
// Scarcity    : "Only 3 gift vouchers left for Salt Lake employees."
// Reciprocity : "I helped you with the printer yesterday, could you verify this link for me?"`
  },
  {
    question: "How does the Authority Principle exploit Organizational Hierarchies in Business Email Compromise (BEC)?",
    shortAnswer: "Employees reflexively comply with directives from perceived senior executives (CEO, CFO, Board Members) to avoid insubordination, bypassing standard verification procedures.",
    explanation: "In hierarchical corporate cultures, questioning an executive's direct instruction is perceived as insubordination. Attackers spoof the CEO's display name, sending an email: 'I am in a confidential board meeting in Kolkata, process this confidential vendor invoice immediately'. The victim's authority bias suppresses skepticism, resulting in unauthorized financial transfers.",
    hint: "A junior clerk obeying an urgent command stamped with the royal seal.",
    level: "moderate",
    codeExample: `// Authority-Driven BEC Attack Flow:
// [Spoofed Sender: ceo@kolkata-fintech.in]
// "Mamata, I need an urgent wire transfer of ₹45,00,000 to our legal vendor before 4 PM. Keep this confidential."
// [Result: Authority deference overrides standard multi-party approval controls!]`
  },
  {
    question: "What is the psychological mechanism behind Urgency-Induced 'Tunnel Vision' (Cognitive Myopia) in Phishing?",
    shortAnswer: "Artificial time constraints trigger emotional stress, narrowing cognitive focus to immediate relief while blinding the victim to surrounding red flags (spoofed domains, bad grammar).",
    explanation: "When a target receives a notification claiming: 'Critical Security Alert: Account termination in 10 minutes', stress hormones surge. The brain experiences cognitive tunnel vision, focusing 100% of mental bandwidth on resolving the urgent crisis, making the user completely blind to obvious anomalies like sender typos (`admin@micros0ft.in`).",
    hint: "Focusing so hard on putting out a small spark in your hand that you fail to notice the fire extinguisher right behind you.",
    level: "moderate",
    codeExample: `// Urgency-Induced Cognitive Myopia:
// Focus Window: "Click button to avoid deactivation!"
// Ignored Clues: Sender is 'security@paypa1-support.xyz', HTTP non-SSL link, generic greeting!`
  },
  {
    question: "How does Scarcity Bias manipulate 'Fear of Missing Out' (FOMO) to drive Clicks on Malicious Links?",
    shortAnswer: "By framing an opportunity as highly restricted in quantity or availability, triggering competitive anxiety that forces immediate uncritical action.",
    explanation: "Scarcity triggers evolutionary hoarding instincts. Phishing lures offering 'Diwali Festival Gift Cards: First 25 employees only (3 remaining)' create FOMO. Employees rush to claim the reward before colleagues take all spots, bypassing security scrutiny.",
    hint: "Pushing through a crowd to grab the last umbrella in a rainstorm.",
    level: "basic",
    codeExample: `// Scarcity Phishing Lure:
// Subject: "FESTIVAL BONUS: Only 5 Gift Cards Left for Salt Lake Office Staff - Claim Now!"`
  },
  {
    question: "What is the Ingratiation & Liking Principle, and how do Advanced Persistent Threats (APTs) use it in Long-Term Grooming?",
    shortAnswer: "Building artificial emotional rapport, shared interests, and mutual flattery over weeks on LinkedIn/WhatsApp before introducing a weaponized attachment or malicious link.",
    explanation: "People naturally trust individuals they like and perceive as similar to themselves. APT actors create fake profiles on LinkedIn, connect with aerospace or power grid engineers in West Bengal, compliment their publications, discuss shared regional interests for 3 weeks, and then send a 'joint research paper' (`.docx`) containing a remote template exploit.",
    hint: "A spy making friends with the palace guard at the local tavern over a month before asking what time the gates close.",
    level: "expert",
    codeExample: `// Ingratiation & Rapport-Building Timeline:
// Week 1: Connects on LinkedIn; praises target's research paper on SCADA telemetry.
// Week 2: Casual discussions on power grid resilience in West Bengal.
// Week 3: Sends "Collaborative_Grid_Research.docx" (Contains Remote Template Injection!)`
  },
  {
    question: "How does Reciprocity Bias trap Employees into Violating Security Policies (The Helpfulness Trap)?",
    shortAnswer: "Attackers provide a small favor, compliment, or assistance first, creating an unconscious social debt that makes the target feel obligated to comply with a subsequent dangerous request.",
    explanation: "Social psychologists recognize reciprocity as one of the most powerful universal social norms: when someone gives us something, we feel deeply compelled to give back. An attacker answers a public forum query for an employee or buys them tea, and then asks: 'Could you just let me plug in this USB drive to print my resume?' The employee complies to settle the mental debt.",
    hint: "Accepting a free flower at the airport and then feeling guilty when the person asks for a donation.",
    level: "moderate",
    codeExample: `// Reciprocity Exploit Sequence:
// Action 1: Attacker provides helpful troubleshooting advice on a public IT forum.
// Action 2: "Hey, since I helped you, could you quickly review this internal document link for me?" → User complies!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes the statutory penalty for Cheating by Personation via Social Engineering?",
    shortAnswer: "Impersonating another person or entity using computer resources to deceive or cheat carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly criminalizes social engineering impersonation: 'Whoever, by means for any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D penalizes Cheating by Personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66D):
// Offense: Impersonating corporate executives or banking officers in phishing scams
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "What is Social Proof (Consensus Bias), and how is it used to bypass Corporate Skepticism?",
    shortAnswer: "Claiming that respected peers or the majority of the team has already performed the requested action, eliminating individual doubt through herd conformity.",
    explanation: "When people are uncertain about a request, they observe group behavior. A spear-phishing lure states: '94% of the Barrackpore engineering team has already submitted their Aadhaar verification. Only your submission is pending.' The victim assumes that because everyone else complied, the request must be safe and legitimate.",
    hint: "Following the crowd through an unmarked doorway assuming everyone knows where they are going.",
    level: "moderate",
    codeExample: `// Social Proof Lure Text:
// "All senior engineers at the Barrackpore Grid have updated their security tokens. Please click below to finalize your pending update."`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities for failing to train staff on social engineering influence principles?",
    shortAnswer: "Failure to implement organizational security safeguards (employee security awareness) triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India (DPBI).",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable security safeguards. If an organization in West Bengal fails to train its employees against psychological manipulation, resulting in an employee falling for a social engineering lure that leaks citizen health or financial records, the DPBI can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to train employees against social engineering triggers maximum penalties under national data privacy law.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent organizational security safeguards`
  },
  {
    question: "What is the 'Stop, Look, Think' Cognitive Pause Workflow, and how does it defeat Urgency and Fear Manipulation?",
    shortAnswer: "A trained behavioral reflex that interrupts impulsive System 1 reactions, forcing a 30-second deliberate pause to analyze sender domains, message intent, and out-of-band verification.",
    explanation: "Social engineering relies on speed to prevent critical thinking. The Cognitive Pause protocol trains employees: 1. Stop (Do not click immediately); 2. Look (Inspect the full sender email address, hover over URLs, examine the tone); 3. Think (Is this an unprompted request? Does it violate standard procedure?); 4. Verify Out-of-Band (Call the sender on a trusted phone number).",
    hint: "Taking three deep breaths before replying to an angry letter.",
    level: "basic",
    codeExample: `// Cognitive Pause Protocol:
// Incoming Phish: "URGENT WIRE TRANSFER REQUIRED!"
// Step 1: STOP (Disable immediate click reflex)
// Step 2: LOOK (Sender is 'ceo@external-mail.in', not internal domain)
// Step 3: VERIFY (Call CEO via dedicated internal extension)`
  },
  {
    question: "How does Out-of-Band (OOB) Dual-Authorization neutralize Authority-Driven Business Email Compromise (BEC)?",
    shortAnswer: "By requiring all wire transfers or sensitive credential changes above a threshold to be verified via a completely separate, secondary communication channel (e.g. verified phone call).",
    explanation: "Authority manipulation works only when email is the sole authorization channel. In an Out-of-Band Dual-Authorization protocol, even if the CEO sends an email demanding an urgent ₹50 Lakh wire transfer, corporate policy strictly forbids processing until a secondary approver calls the CEO on their verified corporate mobile phone to confirm the transaction.",
    hint: "Requiring two separate keys held by two different officers to open the missile silo.",
    level: "expert",
    codeExample: `// Dual-Authorization Policy Rule:
// if (WireTransfer.Amount > 100000 && Channel == "EMAIL") {
//     Require_Secondary_Approver();
//     Enforce_Out_Of_Band_Voice_Verification(CEO_Phone_Registry);
// }`
  },
  {
    question: "What is Commitment and Consistency Bias, and how does the 'Sunk Cost' Trap escalate Social Engineering Compliance?",
    shortAnswer: "Once a target complies with an initial small request, psychological desire for self-consistency compels them to agree to increasingly dangerous follow-up demands.",
    explanation: "Humans strive to maintain internal consistency in their actions. An attacker first asks for a harmless favor ('Could you confirm the spelling of your manager's name?'). Having established themselves as helpful, the victim feels psychologically committed to continuing the interaction when the attacker asks to review an 'internal invoice attachment'.",
    hint: "Agreeing to take a small step onto thin ice, making it harder to say no when asked to take three more steps.",
    level: "expert",
    codeExample: `// Escalation of Commitment Flow:
// Step 1: "Hi Mamata, is the Salt Lake office open today?" → (User: Yes)
// Step 2: "Great! Could you verify this vendor invoice link for our audit?" → (User Complies!)`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for social engineering breaches causing data leaks?",
    shortAnswer: "All organizations in India must report social engineering breaches, unauthorized access, and credential theft to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all social engineering breaches within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do Visual Discrepancy Deficits in Mobile Devices amplify Human Social Engineering Vulnerability?",
    shortAnswer: "Mobile email apps truncate long sender addresses and hide full URLs, stripping the visual indicators necessary to detect domain spoofing.",
    explanation: "Desktop email clients allow users to hover over links to view full destination URLs (`https://login.microsoft.com.attacker.in`) and see complete sender headers. Mobile screens hide full email headers, displaying only friendly display names ('HR Department'), causing mobile users to fail phishing tests at 3x the rate of desktop users.",
    hint: "Looking through a tiny keyhole where you can only see a person's tie, not their face.",
    level: "moderate",
    codeExample: `// Mobile URL Display Truncation:
// Full URL    : https://secure-bank.in.attacker-domain.com/login/auth
// Mobile View : "https://secure-bank.in..." (Hides malicious domain completely!)`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized system access resulting from social engineering deception?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for gaining unauthorized access via deceptive social engineering.",
    explanation: "Section 43(a) explicitly penalizes unauthorized access: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized system access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using social engineering deception to access corporate financial switches
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is Pretexting, and how does creating an Elaborate Fictional Scenario establish Psychological Legitimacy?",
    shortAnswer: "Inventing a fabricated scenario and detailed backstory (pretext) where the attacker assumes a role (e.g. auditor, fire inspector, vendor) to justify requesting sensitive information.",
    explanation: "Unlike basic phishing which relies on a generic email template, Pretexting builds an elaborate persona and backstory. The attacker researches corporate vendor relationships, calls the accounting desk posing as 'Debangshu from external audit', references genuine project names, and requests employee tax IDs to 'finalize compliance filings'. The depth of context creates total psychological legitimacy.",
    hint: "An undercover actor wearing a mechanic's uniform with grease on their hands asking for the keys to inspect the engine.",
    level: "expert",
    codeExample: `// Pretexting Scenario Blueprint:
// Role      : Senior Compliance Auditor from West Bengal Power Regulatory Commission
// Context   : Mandatory Q3 SCADA Safety Assessment
// Objective : Elicit Substation IP addresses and engineer contact rosters`
  },
  {
    question: "How does the 'Sunk Cost Fallacy' prevent Phishing Victims from Reporting Fraudulent Payments?",
    shortAnswer: "Victims who have already made an unauthorized transfer feel deep embarrassment and guilt, hoping the situation will resolve itself rather than immediately alerting the incident response team.",
    explanation: "When an employee realizes they may have transferred corporate funds to a fraudulent account, cognitive dissonance and fear of termination trigger the Sunk Cost Fallacy and denial. They delay reporting for hours hoping the vendor confirms receipt, missing the critical 1-hour window where banks can freeze fraudulent wire transfers.",
    hint: "Continuing to throw good money after bad because you don't want to admit the first investment was a mistake.",
    level: "moderate",
    codeExample: `// Reporting Delay Impact:
// Reported within 1 Hour  ➔ Bank Recovers 95% of Wire Transfer Funds!
// Reported after 24 Hours ➔ Funds Laundered via Mule Accounts (0% Recovery Rate!)`
  },
  {
    question: "Synthesize an enterprise-wide Influence Defense & Counter-Manipulation Architecture.",
    shortAnswer: "A multi-layered defense integrating Dual-Authorization Out-of-Band Verification, FIDO2 Passwordless Keys, Automated DMARC `p=reject` Email Filtering, Contextual Micro-Training, and Zero-Blame Incident Reporting.",
    explanation: "To achieve total resilience against influence principles: 1. Authority Defense: Enforce dual-party out-of-band authorization on financial wire transfers. 2. Urgency/Scarcity Defense: Train users on the 30-second 'Stop, Look, Think' cognitive pause. 3. Technical Defense: Deploy FIDO2 WebAuthn passkeys immune to credential harvesting. 4. Perimeter Defense: Enforce DMARC `p=reject` to block domain spoofing. 5. Cultural Defense: Maintain a zero-blame reporting culture with 1-click reporting.",
    hint: "Combine dual out-of-band approvals, FIDO2 passkeys, DMARC p=reject, 30-second cognitive pauses, and zero-blame reporting.",
    level: "expert",
    codeExample: `// Master Influence Defense Architecture Blueprint:
// 1. Authorization Layer : Dual-party out-of-band voice confirmation for transfers > ₹1,00,000
// 2. Identity Layer      : FIDO2 WebAuthn Passkeys (Origin binding stops credential phishing)
// 3. Email Gateway Layer : Enforce DMARC p=reject + SPF + DKIM to block domain spoofing
// 4. Behavioral Layer    : "Stop, Look, Think" 30-second pause on urgent emails
// 5. Reporting Layer     : 1-Click Phish Alert button integrated with automated SOAR triage`
  },
  {
    question: "What is Baiting (Physical and Digital), and how does Curiosity exploit Human Psychology?",
    shortAnswer: "Leaving an infected physical USB drive or alluring digital download (e.g. 'Executive Salaries 2026') in plain sight, exploiting curiosity and greed to trigger execution.",
    explanation: "Baiting plays on human curiosity. Attackers leave branded USB flash drives in parking lots or lobbies labeled 'Executive_Salaries_2026.xlsx.lnk' or email free software crack links. The victim's innate curiosity overrides security cautions, prompting them to plug in the drive or download the trojanized file.",
    hint: "A shiny wrapped gift left on the park bench labeled 'Do not open'.",
    level: "basic",
    codeExample: `// Baiting Lure Structure:
// Physical Media : USB labeled "Q4_Confidential_Salaries_Kolkata.xlsx.lnk"
// Execution      : Double-clicking launches hidden PowerShell stager!`
  },
  {
    question: "How does the 'Contrast Principle' make Dangerous Requests appear Minor in Social Engineering?",
    shortAnswer: "Presenting an extreme, unreasonable request first (which is rejected), followed by the real target request, which now appears small and reasonable by comparison.",
    explanation: "Psychological contrast alters perception. An attacker calls an IT admin: 'I need you to grant me full Domain Admin access immediately'. When the admin refuses, the attacker says: 'Alright, could you at least reset this one user account for me?' Compared to Domain Admin access, resetting the single account appears minor and harmless, prompting the admin to comply.",
    hint: "Showing a customer a ₹50,000 suit first so that a ₹5,000 shirt seems cheap by comparison.",
    level: "expert",
    codeExample: `// Contrast Principle Manipulation Sequence:
// Request 1 (Extreme)   : "Grant full Domain Admin rights to my vendor account." ➔ REJECTED!
// Request 2 (Target)    : "Can you just reset the password on Mamata's account then?" ➔ COMPLIED!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the legal penalty for unauthorized access gained through social engineering deception?",
    shortAnswer: "Dishonestly or fraudulently gaining unauthorized computer access carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer access: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent access.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Using psychological manipulation to obtain unauthorized computer access
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is Spear Phishing vs Whaling in Social Engineering?",
    shortAnswer: "Spear Phishing targets specific individuals with customized research; Whaling specifically targets high-profile C-suite executives (CEOs, CFOs, Board Members).",
    explanation: "Generic phishing sends mass broadcast emails. Spear Phishing researches a specific employee in Kolkata, referencing real colleagues and projects. Whaling is high-tier spear phishing targeting the 'big fish' (C-suite executives), using sophisticated legal or financial pretexts (e.g. sub-poenas, acquisition agreements) to capture executive credentials.",
    hint: "Fishing with a net (Phishing) vs harpooning a specific fish (Spear Phishing) vs hunting a massive whale (Whaling).",
    level: "basic",
    codeExample: `// Phishing vs Spear Phishing vs Whaling:
// Broadcast Phishing : "Dear Customer, update your bank account."
// Spear Phishing     : "Hi Mamata, regarding the Salt Lake switch migration project..."
// Whaling            : "Confidential Subpoena: Supreme Court of India vs [Enterprise CEO]"`
  },
  {
    question: "How does In-Person Tailgating (Piggybacking) exploit Politeness and Social Norms in Physical Security?",
    shortAnswer: "An unauthorized person follows closely behind an authorized employee through a secure door, relying on the employee's polite instinct to hold the door open.",
    explanation: "Social conditioning dictates that closing a door in someone's face is rude. Attackers carry a box of coffee or heavy equipment, walking quickly behind an employee in Barrackpore. Rather than forcing the person to badge in, the employee holds the door open, allowing the attacker to bypass biometric access controls.",
    hint: "Holding the elevator door for someone running down the hallway.",
    level: "moderate",
    codeExample: `// Physical Tailgating Exploit:
// Authorized User badges through electronic access gate
// Attacker carrying heavy boxes says: "Thanks for holding that!" ➔ User holds door ➔ Physical Perimeter Breached!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Social Engineering Manipulation?",
    shortAnswer: "Deceiving a victim by pretending to be an authorized executive or vendor to fraudulently induce them to transfer funds or corporate assets, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.'",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for social engineering scams.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving accounting staff via spoofed CEO emails to transfer corporate funds
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is Smishing (SMS Phishing) and Vishing (Voice Phishing), and why do they achieve Higher Click Rates than Email Phishing?",
    shortAnswer: "Smishing uses SMS text messages and Vishing uses voice phone calls; they achieve higher response rates because mobile channels are perceived as more immediate and personal than email.",
    explanation: "Users have developed skepticism toward desktop emails, but treat SMS and phone calls with high trust. An attacker calls an employee posing as 'IT Support in Kolkata', instructing them to read aloud an SMS 2FA code. The real-time interactive nature of phone calls creates immense social pressure, resulting in conversion rates exceeding 40%.",
    hint: "Answering the telephone in your living room feels much more urgent and personal than reading a piece of junk mail in your mailbox.",
    level: "moderate",
    codeExample: `// Vishing (Voice Phishing) Attack Script:
// Attacker: "Hello Mahima, this is Sandeep from Central IT. We see an unauthorized login on your hospital terminal. I just sent a 6-digit verification code to your mobile—read it back to me to block the attacker."`
  },
  {
    question: "How does Gamified Phishing Training and 'Phish Champion' Recognition reduce Enterprise Click-Through Rates?",
    shortAnswer: "By rewarding employees who identify and report simulated phishing lures with badges, gift vouchers, and team recognition, replacing fear with positive security pride.",
    explanation: "Punitive security policies create resentment and concealment. Gamification introduces monthly leaderboards, department competitions, and 'Security Champion' badges. When employees are celebrated for reporting novel phishing lures within 60 seconds, security becomes a source of organizational pride, driving reporting rates up by over 400%.",
    hint: "Giving gold stars to students who clean the classroom rather than keeping the entire class in detention.",
    level: "moderate",
    codeExample: `// Gamified Human Risk Metric:
// Kolkata FinTech Department Leaderboard:
// 1st Place: Accounts Team (100% Reporting Rate | Average Response Time: 42s | 0 Fails) ➔ Award: ₹10,000 Team Lunch!`
  },
  {
    question: "What is Reverse Social Engineering, and how does the Attacker trick the Target into Initiating Contact?",
    shortAnswer: "The attacker first creates a problem (e.g. crashing a printer or corrupting a file), advertises themselves as the solution (leaving a fake 'IT Support' business card), and waits for the victim to call them.",
    explanation: "In traditional social engineering, the attacker initiates contact, which can arouse suspicion. In Reverse Social Engineering, the attacker saboutages a system and leaves a flyer: 'For emergency IT support, call ext. 4120'. When the frustrated victim calls the number, they treat the attacker as a trusted helper, voluntarily handing over passwords without hesitation.",
    hint: "Puncturing a car's tire and then pulling up in a tow truck offering help.",
    level: "expert",
    codeExample: `// Reverse Social Engineering Sequence:
// Phase 1 (Sabotage)  : Attacker sends corrupt file that freezes billing app.
// Phase 2 (Placement) : Leaves notice: "Billing App Helpline: call 033-2592-XXXX".
// Phase 3 (Exploit)   : Victim calls attacker asking for help; willingly reveals credentials!`
  },
  {
    question: "How does Deepfake Voice Cloning (AI Audio Synthesis) Supercharge Authority and Urgency Exploits in Vishing?",
    shortAnswer: "By training neural voice synthesis models on public executive speeches, generating real-time cloned audio that sounds 100% identical to the CEO on phone calls.",
    explanation: "Attackers download 3 minutes of CEO audio from public YouTube interviews or webinars. Using generative AI voice cloning (ElevenLabs), the attacker calls the finance manager in Kolkata, speaking in the CEO's exact voice, accent, and inflection: 'Mamata, I need you to wire ₹50 Lakhs to the vendor right now'. Human ears cannot differentiate the synthesized voice from the real person.",
    hint: "A perfect vocal impressionist using a disguise over the phone.",
    level: "expert",
    codeExample: `// AI Voice Cloning Vishing Attack:
// Input Audio : 3 Minutes of CEO's YouTube Keynote Speech
// Model Engine: Generative Diffusion Voice Synthesizer
// Execution   : Real-time cloned phone call demanding emergency fund transfer!`
  },
  {
    question: "Synthesize the mathematical relationship between Persuasion Vector Impact (I_persuasion), Psychological Vulnerability Susceptibility (S_psych), Verification Friction (R_verify), and Social Engineering Breach Probability (P_breach).",
    shortAnswer: "Breach probability is modeled as P_breach = 1 - e^(- (I_persuasion * S_psych) / R_verify); increasing verification friction (out-of-band protocols) drives breach probability to zero.",
    explanation: "Let $I_{\\text{persuasion}} = w_{\\text{auth}} A + w_{\\text{urg}} U + w_{\\text{scarc}} S$ represent the combined intensity of Cialdini's influence principles, $S_{\\text{psych}}$ represent the victim's cognitive susceptibility, and $R_{\\text{verify}}$ represent the verification friction (out-of-band voice confirmation, dual-authorization). The breach probability is: $P_{\\text{breach}} = 1 - e^{-\\frac{I_{\\text{persuasion}} \\times S_{\\text{psych}}}{R_{\\text{verify}}}}$. When organizations enforce strict out-of-band verification ($R_{\\text{verify}} \\to \\infty$), breach probability collapses to zero regardless of how persuasive the attacker is.",
    hint: "Mathematical formula proving that strong out-of-band verification (R_verify → infinity) reduces breach probability to zero.",
    level: "expert",
    codeExample: `// Persuasion Influence Mathematical Proof:
// I_persuasion = 4.5 (High Authority + Extreme Urgency) | S_psych = 2.0 (Fatigued User)
// Without Verification Friction (R=1.0)  ➔ P_breach = 1 - e^(-9.0) = 99.98% (BREACHED!)
// With Out-of-Band Friction (R=1000)     ➔ P_breach = 1 - e^(-0.009) = 0.89% (SECURED!)`
  }
];

export default questions;
