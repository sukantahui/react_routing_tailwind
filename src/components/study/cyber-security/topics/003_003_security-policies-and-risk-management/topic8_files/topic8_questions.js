const questions = [
  {
    question: "What is Single Loss Expectancy (SLE), and how is it calculated from Asset Value (AV) and Exposure Factor (EF)?",
    shortAnswer: "Single Loss Expectancy (SLE) is the monetary loss expected each time a specific risk incident occurs; calculated as $$SLE = Asset Value (AV) \\times Exposure Factor (EF)$$.",
    explanation: "If an enterprise database containing customer payment ledgers is valued at ₹10 Crores ($AV = ₹10,00,00,000$) and a ransomware infection compromises 30% of the data and operations ($EF = 0.30$), the Single Loss Expectancy is: $$SLE = 10,00,00,000 \\times 0.30 = ₹3,00,00,000$$ (₹3 Crores per incident).",
    hint: "SLE = Asset Value x Exposure Factor (in percentage).",
    level: "basic",
    codeExample: `// Single Loss Expectancy (SLE) Calculation:
const assetValue = 100000000;    // ₹10 Crores
const exposureFactor = 0.30;     // 30% Damage
const sle = assetValue * exposureFactor; // ₹3 Crores per event`
  },
  {
    question: "What is Exposure Factor (EF), and how is it determined during quantitative risk analysis?",
    shortAnswer: "Exposure Factor (EF) is a percentage (0% to 100%) representing the proportion of an asset's total value that will be lost or destroyed during a specific threat event.",
    explanation: "Not every cyber incident results in the total destruction of an asset. For example, if a web server experiences a 2-hour DDoS attack, the hardware is undamaged ($EF = 0\\%$ for hardware), but 10% of daily transaction revenue is lost ($EF = 0.10$). Conversely, a physical fire destroying a data center without backups has an $EF = 1.0$ (100% total loss).",
    hint: "EF is the percentage of the asset destroyed or lost in a single breach.",
    level: "basic",
    codeExample: `// Exposure Factor (EF) Examples:
Minor Web Defacement:        EF = 0.02 (2% of brand value temporarily impaired)
Ransomware Partial Lockout:  EF = 0.40 (40% of operations halted)
Catastrophic Data Center Fire:EF = 1.00 (100% total physical and data destruction)`
  },
  {
    question: "What is Annual Rate of Occurrence (ARO), and how is fractional frequency represented mathematically?",
    shortAnswer: "ARO is the estimated number of times a specific threat event is expected to occur within a single year; fractional values represent events occurring less frequently than once a year (e.g. once every 10 years = 0.1).",
    explanation: "ARO translates historical breach frequency and threat intelligence into annual probability: 1. If an organization experiences 4 phishing breaches per year, $ARO = 4.0$; 2. If a major data center power outage happens once every 2 years, $ARO = 0.5$; 3. If a 100-year earthquake or extreme disaster is modeled, $ARO = 0.01$.",
    hint: "ARO = Expected number of incidents per year. Once every 5 years = 0.2.",
    level: "basic",
    codeExample: `// Annual Rate of Occurrence (ARO) Examples:
Phishing Credential Stuffing: ARO = 12.0 (Occurs monthly)
Ransomware Attack Attempt:    ARO = 1.5  (Occurs 3 times every 2 years)
Major Regional Power Blackout:ARO = 0.1  (Occurs once every 10 years)`
  },
  {
    question: "What is Annual Loss Expectancy (ALE), and why is it the cornerstone of enterprise security budgeting?",
    shortAnswer: "ALE is the total expected monetary loss from a specific risk over the course of an entire year; calculated as $$ALE = SLE \\times ARO$$.",
    explanation: "ALE aggregates single-event impact with annual frequency, providing the Chief Financial Officer (CFO) and Board with an annualized cost of doing business with unmitigated risks. For example, if $SLE = ₹50 Lakhs$ and $ARO = 3.0$ times per year, $ALE = 50,00,000 \\times 3.0 = ₹1.5 Crores$ per year.",
    hint: "ALE = SLE x ARO.",
    level: "basic",
    codeExample: `// Annual Loss Expectancy (ALE) Calculation:
const sle = 5000000;  // ₹50 Lakhs per incident
const aro = 3.0;      // 3 incidents per year
const ale = sle * aro; // ₹1.5 Crores / year`
  },
  {
    question: "How is Cost-Benefit Analysis conducted using the ALE Reduction Formula?",
    shortAnswer: "A security countermeasure is cost-effective if the net annual savings from reducing the ALE exceed the annual operational cost of the control: $$\\text{Cost-Effectiveness} = (ALE_{\\text{before}} - ALE_{\\text{after}}) - \\text{Annual Control Cost (CC)} > 0$$.",
    explanation: "Enterprises must never spend more on a lock than the value of the property it protects. If an unmitigated risk has an $ALE_{\\text{before}} = ₹80 Lakhs$, and deploying a Next-Gen Firewall reduces $ALE_{\\text{after}}$ to ₹10 Lakhs while costing ₹20 Lakhs/year, the net annual benefit is: $$(80 - 10) - 20 = ₹50 Lakhs$$ saved per year.",
    hint: "Annual Savings = (ALE Before - ALE After) - Control Cost. Must be positive!",
    level: "moderate",
    codeExample: `// Cost-Benefit Analysis Formula:
const aleBefore = 8000000;    // ₹80 Lakhs
const aleAfter = 1000000;     // ₹10 Lakhs (Mitigated)
const controlCost = 2000000;  // ₹20 Lakhs / year
const netSavings = (aleBefore - aleAfter) - controlCost; // ₹50 Lakhs / year (APPROVED!)`
  },
  {
    question: "What is Return on Security Investment (ROSI), and what formula calculates the percentage return?",
    shortAnswer: "ROSI measures the percentage return generated by investing in a security countermeasure; calculated as $$ROSI = \\frac{(ALE_{\\text{before}} - ALE_{\\text{after}}) - \\text{Annual Control Cost (CC)}}{\\text{Annual Control Cost (CC)}} \\times 100$$.",
    explanation: "ROSI translates cybersecurity risk reduction into standard financial ROI percentages used by executive boards. Using the previous example: Net Benefit = ₹50 Lakhs, Control Cost = ₹20 Lakhs. $$ROSI = \\frac{50,00,000}{20,00,000} \\times 100 = 250\\%$$. A 250% return on investment proves that the security tool pays for itself 2.5 times over in avoided losses.",
    hint: "ROSI % = (Net Annual Savings / Control Cost) * 100.",
    level: "moderate",
    codeExample: `// ROSI Calculation Example:
const netSavings = 5000000;   // ₹50 Lakhs
const controlCost = 2000000;  // ₹20 Lakhs
const rosi = (netSavings / controlCost) * 100; // 250% ROSI`
  },
  {
    question: "Under the Indian DPDP Act 2023, why must Secondary Statutory Liabilities be included in Asset Value (AV) and SLE calculations?",
    shortAnswer: "Because Section 33 establishes statutory penalty caps up to ₹250 Crores per personal data breach; excluding statutory penalties results in massive underestimation of true Single Loss Expectancy.",
    explanation: "If an organization only counts direct incident response costs (e.g. ₹10 Lakhs) when calculating SLE for a patient healthcare database breach, it creates a fatal false sense of security. Under the DPDP Act 2023, a failure to safeguard 100,000 citizen records carries potential statutory fines up to ₹250 Crores, elevating the true SLE to over ₹250.1 Crores.",
    hint: "Statutory fines under DPDP Act must be included in the SLE financial equation.",
    level: "basic",
    codeExample: `// DPDP Statutory SLE Calculation:
Primary Loss:      ₹15,00,000 (Forensic response + Server restoration)
Secondary Loss:    ₹250,00,00,000 (DPDP Act Section 33 statutory penalty cap)
True SLE:          ₹250.15 Crores per breach incident!`
  },
  {
    question: "How does Reserve Bank of India (RBI) Cyber Security Guidelines mandate ALE Stress Testing for Payment Switches?",
    shortAnswer: "RBI mandates that scheduled commercial banks and payment operators must perform quantitative financial loss forecasting on core UPI/RTGS switches, maintaining capital reserves proportional to quantified cyber loss expectancies.",
    explanation: "Financial regulators require proof that banks can survive catastrophic cyber incidents. By calculating ALE for UPI payment switches processing ₹120 Crores daily, banks determine the required capital buffer and cyber insurance policy limits needed to absorb potential transaction fraud and regulatory penalties without insolvency.",
    hint: "Banks calculate ALE to size cyber insurance and maintain regulatory capital reserves.",
    level: "moderate",
    codeExample: `// RBI Cyber Stress Test ALE Model:
Asset: UPI Payment Switch (₹120 Cr/day throughput)
SLE:   ₹15 Crores (4-Hour outage + settlement failure)
ARO:   0.2 (Once every 5 years)
ALE:   ₹3.0 Crores / year ➔ Requires ₹3 Cr dedicated escrow cyber reserve fund`
  },
  {
    question: "If Asset Value = ₹4 Crores, Exposure Factor = 25%, and ARO = 0.5, what is the Single Loss Expectancy (SLE) and Annual Loss Expectancy (ALE)?",
    shortAnswer: "$$SLE = ₹1,00,00,000$$ (₹1 Crore) and $$ALE = ₹50,00,000$$ (₹50 Lakhs / year).",
    explanation: "Step 1: Calculate Single Loss Expectancy: $$SLE = AV \\times EF = 4,00,00,000 \\times 0.25 = ₹1,00,00,000$$ (₹1 Crore); Step 2: Calculate Annual Loss Expectancy: $$ALE = SLE \\times ARO = 1,00,00,000 \\times 0.5 = ₹50,00,000$$ (₹50 Lakhs per year).",
    hint: "Multiply AV by EF to get SLE (1 Crore), then multiply by ARO (0.5) to get ALE (50 Lakhs).",
    level: "basic",
    codeExample: `// Step-by-Step Calculation:
AV  = 40000000 (₹4 Crores)
EF  = 0.25 (25%)
SLE = 40000000 * 0.25 = 10000000 (₹1 Crore)
ARO = 0.5 (Once every 2 years)
ALE = 10000000 * 0.5  = 5000000  (₹50 Lakhs / year)`
  },
  {
    question: "What happens if a proposed security control costs ₹30 Lakhs per year, but only reduces ALE by ₹18 Lakhs per year?",
    shortAnswer: "The control has a negative Return on Security Investment (ROSI = -40%) and must be rejected or redesigned, as it costs more than the financial loss it prevents.",
    explanation: "Using the cost-benefit formula: Net Benefit = (ALE Before - ALE After) - Control Cost = ₹18 Lakhs - ₹30 Lakhs = -₹12 Lakhs loss. $$ROSI = \\frac{-12,00,000}{30,00,000} \\times 100 = -40\\%$$. Spending ₹30 Lakhs to save ₹18 Lakhs is financially irresponsible; the team should seek alternative countermeasures (e.g. cloud WAF, insurance, or process changes) with lower annual overhead.",
    hint: "If the control costs more than the loss it prevents, reject it!",
    level: "basic",
    codeExample: `// Negative ROSI Rejection Example:
Annual Loss Reduction: ₹18,00,000
Annual Tooling Cost:   ₹30,00,000
Net Annual Deficit:    -₹12,00,000 (ROSI: -40%)
CFO Decision:          REJECTED! "This security tool costs ₹12 Lakhs more than the risk it mitigates."`
  },
  {
    question: "How does Cyber Insurance policy sizing rely directly on Single Loss Expectancy (SLE) and ALE calculations?",
    shortAnswer: "Enterprises size their cyber insurance coverage limits to match their maximum Single Loss Expectancy (SLE) for catastrophic tail-risk events, while policy deductibles are aligned with baseline ALE.",
    explanation: "When negotiating cyber insurance policies in India, companies cannot guess their coverage limits. If quantitative modeling reveals that a worst-case ransomware breach carrying DPDP Act liabilities has an $SLE = ₹50 Crores$, the company purchases a ₹50 Crore insurance policy. The annual insurance premium is evaluated against ALE reduction.",
    hint: "Coverage limit matches maximum SLE; deductible matches acceptable ALE.",
    level: "moderate",
    codeExample: `// Cyber Insurance Sizing Model:
Maximum Modelled SLE: ₹50 Crores (Worst-case DPDP breach + Ransomware)
Insurance Policy Limit: ₹50 Crores coverage
Annual Policy Premium:  ₹12 Lakhs / year
ALE Risk Transferred:   ₹48 Crores financial liability transferred to underwriter!`
  },
  {
    question: "Why must Exposure Factor (EF) and ARO be re-calibrated annually in enterprise risk models?",
    shortAnswer: "Because changes in cloud architecture, threat actor capabilities, software patching velocity, and automated backups continuously alter the percentage of damage (EF) and frequency of attacks (ARO).",
    explanation: "If an organization implements immutable S3 backups, the Exposure Factor for a ransomware event might drop from 60% down to 5%. Conversely, if a new zero-day is disclosed, the ARO might spike from 0.1 to 3.0. Annual calibration ensures that ALE and budget allocations accurately reflect the current threat reality.",
    hint: "New defenses lower EF; emerging threats raise ARO. Update both annually.",
    level: "basic",
    codeExample: `// Annual Re-calibration Example:
Before Immutable Backups: EF = 0.60 (60% data lost) ➔ SLE = ₹6 Crores ➔ ALE = ₹1.2 Crores
After Immutable Backups:  EF = 0.05 (5% data lost)  ➔ SLE = ₹50 Lakhs ➔ ALE = ₹10 Lakhs
Annual Savings:           ₹1.10 Crores in reduced risk exposure!`
  },
  {
    question: "Synthesizing Single Loss Expectancy (SLE) and Annual Loss Expectancy (ALE): what is the master equation of Financial Cyber Defensibility?",
    shortAnswer: "$$\\text{Capital Optimization} = \\frac{(AV \\times EF \\times ARO)_{\\text{unmitigated}} - (AV \\times EF \\times ARO)_{\\text{mitigated}} - CC}{CC} \\times 100 \\ge \\text{Target ROSI (\\%)} > 0$$ with continuous ISO 27005 quantitative calibration.",
    explanation: "This master financial relationship proves that quantitative cyber risk management is the ultimate bridge between security engineering and corporate balance sheets. Calculating SLE ($AV \\times EF$) and ALE ($SLE \\times ARO$) allows security leaders to scientifically prove positive Return on Security Investment (ROSI), justifying multi-lakh budgets and guaranteeing total statutory safe harbor under global and Indian cyber laws.",
    hint: "Conclude by reviewing how SLE, ALE, and ROSI prove the exact financial return of security controls.",
    level: "expert",
    codeExample: `// Master Equation of Quantitative Cyber Defense:
SLE = Asset_Value * Exposure_Factor;
ALE = SLE * Annual_Rate_of_Occurrence;
ROSI = ((ALE_Before - ALE_After) - Control_Cost) / Control_Cost * 100;
Outcome: 100% Board Financial Approval, Mathematically Defensible Budgets & Total Statutory Compliance!`
  }
];

export default questions;
