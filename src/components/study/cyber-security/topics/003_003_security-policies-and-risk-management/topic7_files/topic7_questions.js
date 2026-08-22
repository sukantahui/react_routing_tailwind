const questions = [
  {
    question: "What is the primary difference between Qualitative and Quantitative Risk Analysis in Information Security Management?",
    shortAnswer: "Qualitative analysis uses subjective descriptive scales (Low, Medium, High, Critical or 1–5 ratings) based on expert consensus; Quantitative analysis uses objective numerical and monetary values (₹, %, probabilities) to calculate concrete financial loss expectancies (SLE, ALE).",
    explanation: "Both methodologies assess risk, but through different lenses: 1. Qualitative: Fast, intuitive, and uses tools like 5x5 Heatmap matrices or the Delphi technique—ideal for initial prioritization; 2. Quantitative: Rigorous, calculates exact financial metrics (such as ₹4.5 Crores ALE) using methodologies like FAIR (Factor Analysis of Information Risk)—essential for justifying multi-lakh security budgets to the CFO.",
    hint: "Qualitative = Colors and descriptive labels; Quantitative = Concrete numbers and Rupees.",
    level: "basic",
    codeExample: `// Qualitative vs Quantitative Risk Statements:
Qualitative:  "The risk of ransomware on our payment switch is HIGH." (Subjective)
Quantitative: "The Single Loss Expectancy (SLE) is ₹3.2 Crores with an Annual Loss Expectancy (ALE) of ₹64 Lakhs." (Objective)`
  },
  {
    question: "What are the main advantages and disadvantages of Qualitative Risk Analysis?",
    shortAnswer: "Advantages: Fast execution, low resource cost, easy for non-technical stakeholders to understand; Disadvantages: Subjective bias, ambiguous rating definitions ('What is High?'), inability to perform cost-benefit analysis for security spending.",
    explanation: "Qualitative analysis is widely used because it can be completed quickly without complex actuarial data. However, its primary weakness is subjectivity: one engineer's 'Medium' risk might be considered 'Critical' by another. Furthermore, saying a risk is 'High' does not tell the Chief Financial Officer whether spending ₹25 Lakhs on a WAF is financially justified.",
    hint: "Qualitative is fast and simple, but subjective and hard to justify financially.",
    level: "basic",
    codeExample: `// Qualitative Heatmap Rating Matrix:
Likelihood (4 - Likely) x Impact (4 - Major) = Risk Score 16 (HIGH RISK)
Limitation: Does not specify the exact rupee loss or return on investment (ROSI).`
  },
  {
    question: "What are the main advantages and disadvantages of Quantitative Risk Analysis?",
    shortAnswer: "Advantages: Objective financial precision (₹), direct cost-benefit justification (ROSI), seamless alignment with corporate finance; Disadvantages: Time-consuming, requires extensive historical data, difficult to estimate probabilities for rare zero-day events.",
    explanation: "Quantitative analysis speaks the language of business (money). By calculating Annual Loss Expectancy (ALE), security leaders can prove to the Board that spending ₹10 Lakhs on MFA saves ₹40 Lakhs annually in fraud losses. However, accurately determining the Annual Rate of Occurrence (ARO) for a brand-new zero-day vulnerability can be challenging and requires statistical modeling.",
    hint: "Quantitative gives exact financial ROI, but requires complex statistical data.",
    level: "moderate",
    codeExample: `// Quantitative Cost-Benefit Justification:
ALE_Before_Control: ₹50,00,000 / year
Control_Cost:       ₹10,00,000 / year
ALE_After_Control:  ₹5,00,000 / year
Net Annual Savings: ₹35,00,00,000 ➔ Approved immediately by the Board!`
  },
  {
    question: "What is the 'Delphi Technique', and how is it applied in Qualitative Risk Assessments?",
    shortAnswer: "A structured, anonymous expert consensus methodology where a panel of specialists answers questionnaires across multiple rounds, converging toward an unbiased qualitative risk rating without dominant personalities skewing results.",
    explanation: "In traditional brainstorming meetings, junior engineers often defer to the loudest or most senior person in the room. The Delphi technique eliminates this bias: experts independently and anonymously submit their likelihood and impact scores; a facilitator summarizes the responses and recirculates them until a statistical consensus is achieved.",
    hint: "Anonymous multi-round expert voting that eliminates peer pressure and bias.",
    level: "moderate",
    codeExample: `// Delphi Technique Execution Workflow:
Round 1: 5 Senior Architects submit anonymous likelihood ratings (Scores: 4, 4, 3, 5, 4)
Round 2: Facilitator shares anonymous summary and rationale
Round 3: Final converged consensus achieved ➔ Threat Likelihood agreed at 4.2 (High)`
  },
  {
    question: "What is the Factor Analysis of Information Risk (FAIR) framework, and why is it the gold standard for Quantitative Cyber Risk Analysis?",
    shortAnswer: "FAIR is the premier open international standard (Open Group) for quantifying information risk; it decomposes risk into Loss Event Frequency (Threat Event Frequency x Vulnerability) and Loss Magnitude (Primary x Secondary Loss) using Monte Carlo simulations.",
    explanation: "Unlike arbitrary guess-work, FAIR provides a mathematically rigorous taxonomy. It breaks risk down into: 1. Loss Event Frequency (LEF): How often an attack will succeed, based on Contact Frequency and Threat Capability vs Control Strength; 2. Loss Magnitude (LM): Tangible financial losses, including response costs, replacement costs, competitive disadvantages, and statutory fines under DPDP Act Section 33.",
    hint: "FAIR translates cyber threats into financial loss distributions using probability modeling.",
    level: "expert",
    codeExample: `// FAIR Framework Decomposition:
Risk = Loss Event Frequency (LEF) x Loss Magnitude (LM)
   ├── LEF = Threat Event Frequency (TEF) x Vulnerability (Threat Capability vs Resistance)
   └── LM  = Primary Loss (Asset replacement + Outage) + Secondary Loss (DPDP Fines + Lawsuits)`
  },
  {
    question: "What is a 'Semi-Quantitative Risk Analysis', and how does it bridge Qualitative and Quantitative methods?",
    shortAnswer: "A hybrid methodology that assigns numerical scoring bins (e.g. CVSS v3.1 scores 0.0–10.0 or 1–100 scales) with predefined mathematical formulas and financial ranges, providing more granularity than qualitative labels while avoiding full financial modeling.",
    explanation: "Semi-quantitative analysis is popular in enterprise risk management. For example, rather than simply labeling a vulnerability as 'High', it is assigned a CVSS score of 8.8 based on a defined algorithm, and mapped to a financial impact bracket (e.g. Tier 4 = ₹1 Crore to ₹10 Crores loss). This reduces subjective bias without requiring months of actuarial data collection.",
    hint: "Using numerical scales and formulas to provide more precision than simple Low/Med/High labels.",
    level: "moderate",
    codeExample: `// Semi-Quantitative Hybrid Model:
Risk Score = (CVSS_Exploitability_Score * 10) + (Asset_Criticality_Level * 5)
Formula:     (8.8 * 10) + (5 * 5) = 88 + 25 = 113 / 150 (HIGH PRIORITY TIER 1)`
  },
  {
    question: "When should an enterprise choose Qualitative over Quantitative Risk Analysis?",
    shortAnswer: "Choose Qualitative for rapid initial risk screening, low-budget projects, assessing non-financial risks (e.g. employee morale), or when historical statistical data is unavailable; choose Quantitative for major capital expenditures, cyber insurance sizing, and board financial reporting.",
    explanation: "Organizations should not waste months conducting full FAIR quantitative studies on every minor internal script. Use qualitative 5x5 heatmaps for broad, initial threat screening across 1,000 assets. For the top 10 critical assets (e.g. core payment switches or healthcare patient databases), conduct rigorous quantitative ALE/FAIR modeling.",
    hint: "Qualitative for broad fast triage; Quantitative for high-stakes financial decisions.",
    level: "basic",
    codeExample: `// Strategic Analysis Decision Matrix:
Scenario 1: Triage 500 minor Jira security tickets ➔ Qualitative 5x5 Heatmap Matrix
Scenario 2: Justify ₹2.5 Crore budget for Enterprise XDR ➔ Quantitative ALE & ROSI Financial Modeling`
  },
  {
    question: "Under the Indian DPDP Act 2023, why is a hybrid risk analysis necessary during a Data Protection Impact Assessment (DPIA)?",
    shortAnswer: "Qualitative analysis evaluates the subjective harm and constitutional privacy impact on individual citizens; Quantitative analysis calculates corporate exposure to Section 33 statutory penalties (up to ₹250 Crores) and remediation costs.",
    explanation: "Under DPDP Act Section 8, assessing risk to citizens requires qualitative evaluation (loss of dignity, discrimination, unauthorized profiling). Simultaneously, the corporate board requires quantitative financial loss modeling to measure statutory fine exposure (up to ₹250 Crores per breach) to allocate appropriate cryptographic defense budgets.",
    hint: "Qualitative measures citizen privacy harm; Quantitative measures corporate financial fine exposure.",
    level: "moderate",
    codeExample: `// DPDP DPIA Dual-Mode Analysis:
Citizen Privacy Harm (Qualitative): HIGH (Risk of Aadhaar biometric identity theft)
Corporate Liability (Quantitative):  ₹250,00,00,000 (Section 33 statutory fine cap)
Action:                             Mandatory FIPS 140-3 HSM encryption deployed immediately!`
  },
  {
    question: "What is 'Monte Carlo Simulation' in quantitative cyber risk modeling?",
    shortAnswer: "A computational statistical algorithm that runs tens of thousands of simulated trials using probability distributions (instead of static point estimates) to model the full range of potential financial loss outcomes.",
    explanation: "In the real world, an attacker's arrival rate or the exact cost of a breach is never a single fixed number. Monte Carlo simulations take probability ranges (e.g. 'Attacks occur between 2 to 6 times per year; breach costs range from ₹50 Lakhs to ₹5 Crores') and run 50,000 iterations to generate a 95th-percentile Value at Risk (VaR) curve for the Board of Directors.",
    hint: "Running thousands of randomized computer simulations to find the most probable financial loss range.",
    level: "expert",
    codeExample: `// Monte Carlo Risk Simulation Output:
Simulated Trials: 50,000 Iterations
Most Likely Loss: ₹1.2 Crores / year
95th Percentile:  ₹4.8 Crores / year (Worst-case tail risk for Cyber Insurance policy sizing)`
  },
  {
    question: "Why do Chief Financial Officers (CFOs) struggle to approve security budgets based solely on Qualitative Risk Heatmaps?",
    shortAnswer: "Because qualitative heatmaps lack financial metrics, return on investment (ROI), or quantifiable loss comparisons; a CFO cannot determine whether spending ₹50 Lakhs will prevent a ₹10 Lakh or ₹10 Crore loss from a red 'High Risk' box alone.",
    explanation: "To a CFO, every investment must demonstrate return or risk reduction. Showing a PowerPoint slide with a red box labeled 'High Risk' fails to answer basic financial questions: What is our probable annual loss? How much does this tool reduce that loss? What is the payback period? Quantitative analysis provides the exact numbers needed for capital allocation.",
    hint: "Executives cannot write cheques based on the color red; they need Rupee numbers and ROI.",
    level: "basic",
    codeExample: `// Communicating with the CFO:
Weak Pitch:   "Ransomware is in the RED box on our heatmap, so we need ₹1 Crore for EDR." (Rejected!)
Strong Pitch: "Our current ALE is ₹3.5 Crores. Investing ₹60 Lakhs in EDR reduces our ALE to ₹20 Lakhs, yielding a 450% ROSI in Year 1." (Approved!)`
  },
  {
    question: "What is the '5x5 Risk Heatmap Matrix', and how are Likelihood and Impact scales defined under ISO 27005?",
    shortAnswer: "A 5x5 grid plotting Likelihood (1: Rare to 5: Almost Certain) against Impact (1: Insignificant to 5: Catastrophic), multiplying scores (1–25) to categorize risks into Low (1–4), Medium (5–9), High (10–16), and Critical (20–25).",
    explanation: "ISO 27005 uses the 5x5 matrix to standardize qualitative analysis: 1. Likelihood: 1 (Once in 10 years) to 5 (Multiple times per month); 2. Impact: 1 (< ₹50k loss) to 5 (> ₹10 Crores / regulatory shutdown). Cells with scores >= 15 are classified as Critical/High, triggering mandatory executive treatment.",
    hint: "A 5-row by 5-column grid where Likelihood x Impact generates scores from 1 to 25.",
    level: "basic",
    codeExample: `// 5x5 Qualitative Matrix Scoring:
Score 1 - 4:   LOW RISK      ➔ Acceptable / Monitor periodically
Score 5 - 9:   MEDIUM RISK   ➔ Standard operational remediation SLA (< 30 days)
Score 10 - 16: HIGH RISK     ➔ Priority remediation SLA (< 14 days)
Score 20 - 25: CRITICAL RISK ➔ Immediate escalation to CISO (< 24 hours)`
  },
  {
    question: "How does Reserve Bank of India (RBI) Cyber Security Guidelines mandate Quantitative Risk Forecasting for payment systems?",
    shortAnswer: "RBI mandates that scheduled commercial banks and payment operators must perform quantitative financial impact modeling on core transaction ledgers, determining maximum tolerable financial loss and business interruption costs.",
    explanation: "Under the RBI Cyber Security Framework for Banks, qualitative opinions are insufficient for core banking switches. Financial institutions must quantitatively model cyber fraud losses, maintain capital reserves proportional to quantified cyber risk exposures, and conduct stress testing against systemic ransomware scenarios.",
    hint: "Banking regulators mandate hard financial numbers to guarantee financial stability.",
    level: "moderate",
    codeExample: `// RBI Quantitative Cyber Stress Test:
Scenario: Complete outage of RTGS/NEFT payment gateway in Kolkata for 4 hours
Quantified Loss: ₹12.5 Crores in direct settlement penalties + ₹8.2 Crores in merchant damages
Regulatory Mandate: Maintain dedicated Cyber Capital Reserve Fund in escrow`
  },
  {
    question: "Synthesizing Qualitative vs Quantitative Risk Analysis: what is the master equation of Risk Analysis Optimization?",
    shortAnswer: "$$\\text{Analysis Precision} = \\frac{\\text{Qualitative Triage Speed} \\times \\text{Quantitative Financial Rigor (ALE/FAIR)}}{\\text{Subjective Bias} + \\text{Un-modeled Tail Uncertainty}}$$ yielding 100% board defensibility and optimal security budget allocation.",
    explanation: "This master governance relationship proves that modern enterprise risk management achieves maximum effectiveness when high-speed qualitative 5x5 heatmaps triage broad threats, while quantitative FAIR financial loss modeling calculates exact Rupee exposures and ROSI for top-tier critical assets. This eliminates subjective bias, guarantees CFO alignment, and ensures total regulatory safe harbor.",
    hint: "Conclude by reviewing how combining qualitative triage with quantitative financial modeling optimizes risk decisions.",
    level: "expert",
    codeExample: `// Master Equation of Risk Analysis Integrity:
Precision = (Qualitative_Speed * Quantitative_FAIR_Rigor) / (Subjective_Bias + Tail_Uncertainty);
Outcome: 100% CFO Budget Defensibility, Zero Unjustified Expenditures & Total Regulatory Safe Harbor!`
  }
];

export default questions;
