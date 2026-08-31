// topic13_questions.js
// 30 Structured Questions covering the Multi-Criteria Customer Segmentation Practice Lab

const questions = [
  {
    question: "What is the primary business goal of the Customer Segmentation Engine in this practice lab?",
    shortAnswer: "To dynamically categorize customer accounts into tiered cohorts (Platinum, Gold, Silver, Bronze) based on multi-criteria metrics without helper columns.",
    explanation: "The segmentation engine evaluates multi-variable thresholds (Quarter Sales and Customer Rating) in memory and spills complete classified customer rosters dynamically.",
    hint: "Think of an automated customer tier classification model.",
    level: "basic",
    codeExample: "=LET(raw, Data, spend, CHOOSECOLS(raw, 4), IFS(...))"
  },
  {
    question: "How does HSTACK augment the raw dataset with a newly calculated tier classification column?",
    shortAnswer: "HSTACK horizontally appends the tier array as a new column to the right of the raw data matrix in memory.",
    explanation: "`=HSTACK(RawTable, TierArray)` creates an expanded matrix with the new classification column without modifying the source worksheet table.",
    hint: "HSTACK joins arrays side by side horizontally.",
    level: "basic",
    codeExample: "=HSTACK(Table1[#Data], ComputedTiers)"
  },
  {
    question: "How do you enforce multi-condition logic (Spend >= 12L AND Rating >= 4.8) inside the IFS segmentation formula?",
    shortAnswer: "Multiply the boolean arrays: (Spend >= 1200000) * (Rating >= 4.8).",
    explanation: "Boolean multiplication converts TRUE/FALSE into 1/0. A customer qualifies for Platinum only if both spend and rating conditions equal 1.",
    hint: "Use boolean multiplication (*) inside IFS.",
    level: "moderate",
    codeExample: "IFS((Spend >= 1200000) * (Rating >= 4.8), \"Platinum VIP\", ...)"
  },
  {
    question: "How do you extract and spill only the 'Platinum VIP' cohort sorted by revenue descending?",
    shortAnswer: "Use =SORT(FILTER(AugmentedTable, TierCol=\"Platinum VIP\"), 4, -1).",
    explanation: "`FILTER` isolates the Platinum rows from the augmented matrix, and `SORT` orders them from highest to lowest revenue.",
    hint: "Combine FILTER for the tier with SORT on revenue descending.",
    level: "moderate",
    codeExample: "=SORT(FILTER(HSTACK(Data, Tiers), Tiers=\"Platinum VIP\"), 4, -1)"
  },
  {
    question: "How do you calculate the percentage of total corporate revenue contributed by the Platinum tier?",
    shortAnswer: "Use =SUM(FILTER(RevenueCol, TierCol=\"Platinum VIP\")) / SUM(RevenueCol).",
    explanation: "Divides the filtered cohort's total revenue by the entire dataset's gross revenue to determine share of wallet.",
    hint: "Divide cohort sum by grand total sum.",
    level: "moderate",
    codeExample: "=SUM(FILTER(G2:G20, TierCol=\"Platinum VIP\")) / SUM(G2:G20)"
  },
  {
    question: "How do you count the number of active clients in each customer tier dynamically?",
    shortAnswer: "Use COUNTIF against the spilled tier array: =COUNTIF(TierArray#, J2#).",
    explanation: "If `J2#` lists the distinct tiers, `COUNTIF` evaluates the frequency of each tier across the customer base.",
    hint: "Use COUNTIF with spilled tier ranges.",
    level: "basic",
    codeExample: "=COUNTIF(TierColumn#, \"Platinum VIP\")"
  },
  {
    question: "How do you create an interactive cohort drill-down dropdown (Platinum, Gold, Silver, Bronze)?",
    shortAnswer: "Place distinct tiers in cell J2 (=UNIQUE(TierColumn#)) and set Data Validation to =$J$2#.",
    explanation: "Users can select any tier from the dropdown to dynamically spill that specific cohort's member list.",
    hint: "Feed Data Validation with UNIQUE(Tiers#).",
    level: "moderate",
    codeExample: "Data Validation > Source: =$J$2#"
  },
  {
    question: "What is RFM analysis in customer analytics, and how do dynamic arrays streamline it?",
    shortAnswer: "Recency, Frequency, and Monetary value analysis; dynamic arrays calculate 3D score matrices in a single formula without helper sheets.",
    explanation: "Using `LET` and array arithmetic, RFM scores (1 to 5) are computed and assigned to accounts in sub-millisecond memory passes.",
    hint: "RFM evaluates Recency, Frequency, and Monetary spend.",
    level: "expert",
    codeExample: "=LET(m, SpendCol, r, DateCol, f, OrderCount, HSTACK(Data, r, f, m))"
  },
  {
    question: "How do you handle customers who do not meet any upper tier criteria in the IFS function?",
    shortAnswer: "Supply `TRUE, \"Bronze Tier\"` as the final default condition in IFS.",
    explanation: "The `TRUE` argument acts as a universal catch-all fallback for standard accounts.",
    hint: "Use TRUE as the final fallback condition in IFS.",
    level: "basic",
    codeExample: "IFS(Cond1, \"Platinum\", Cond2, \"Gold\", TRUE, \"Bronze\")"
  },
  {
    question: "How do you extract the Top 3 highest spending customers within a selected cohort?",
    shortAnswer: "Wrap the filtered cohort formula in TAKE: =TAKE(SORT(FILTER(Data, TierCol=J1), 4, -1), 3).",
    explanation: "`TAKE(..., 3)` extracts strictly the top 3 accounts from the ranked cohort array.",
    hint: "Combine TAKE with SORT and FILTER.",
    level: "moderate",
    codeExample: "=TAKE(SORT(FILTER(AugmentedTable, TierCol=J1), 4, -1), 3)"
  },
  {
    question: "How do you calculate the average customer rating for each segmented tier?",
    shortAnswer: "Use =AVERAGE(FILTER(RatingCol, TierCol=TierName)).",
    explanation: "`FILTER` isolates the ratings for that specific tier, and `AVERAGE` computes the mean score.",
    hint: "Pass FILTER directly into AVERAGE().",
    level: "moderate",
    codeExample: "=AVERAGE(FILTER(E2:E20, TierCol=\"Gold Tier\"))"
  },
  {
    question: "What happens if a new transaction increases a customer's total spend past the ₹12,00,000 threshold?",
    shortAnswer: "The segmentation engine recalculates immediately, promoting the customer to Platinum VIP automatically.",
    explanation: "Because dynamic arrays participate in Excel's live calculation graph, cohort migration is 100% automated.",
    hint: "Account tier upgrades happen automatically in real time.",
    level: "basic",
    codeExample: "// Customer spend updated → Tier changes instantly to Platinum"
  },
  {
    question: "How do you return only Customer Name, Region, and Computed Tier in the drill-down view?",
    shortAnswer: "Use CHOOSECOLS: =CHOOSECOLS(FILTER(AugmentedTable, TierCol=J1), 2, 3, 7).",
    explanation: "`CHOOSECOLS` extracts designated columns 2, 3, and 7, suppressing unnecessary detail.",
    hint: "Wrap the filtered array in CHOOSECOLS.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(FILTER(AugmentedTable, TierCol=J1), 2, 3, 7)"
  },
  {
    question: "Can you assign customer tiers using XLOOKUP approximate match instead of IFS?",
    shortAnswer: "Yes, by passing spend into XLOOKUP against a tiered threshold table with match_mode = -1.",
    explanation: "`=XLOOKUP(SpendCol, SpendThresholds, TierLabels, , -1)` performs table-driven tier classification.",
    hint: "Use XLOOKUP with match_mode = -1 against a threshold table.",
    level: "advanced",
    codeExample: "=XLOOKUP(SpendCol, {0;800000;1000000;1200000}, {\"Bronze\";\"Silver\";\"Gold\";\"Platinum\"}, , -1)"
  },
  {
    question: "How do you create an executive summary matrix showing (Tier, Count, Total Spend, Avg Rating) in one formula?",
    shortAnswer: "Use LET with BYROW or MAP across the unique tier array.",
    explanation: "Iterating through `UNIQUE(Tiers#)` dynamically computes row counts, sum totals, and averages for all tiers in a single spilled summary grid.",
    hint: "Use BYROW/MAP to compute multi-metric summary tables.",
    level: "expert",
    codeExample: "=LET(u, UNIQUE(Tiers#), HSTACK(u, COUNTIF(Tiers#, u), SUMIF(Tiers#, u, Revenue)))"
  },
  {
    question: "What error occurs if an IFS condition lacks a matching result or encounters #N/A?",
    shortAnswer: "Excel returns a #N/A error.",
    explanation: "Ensure all condition expressions evaluate to valid booleans and always supply `TRUE, \"Default\"` at the end.",
    hint: "Always provide a final TRUE fallback in IFS.",
    level: "basic",
    codeExample: "// Prevent #N/A by including TRUE, 'Default' in IFS"
  },
  {
    question: "How do you identify customers at risk of tier demotion (e.g. Rating < 4.5)?",
    shortAnswer: "Filter for low ratings within top tiers: =FILTER(AugmentedTable, (Spend>=1000000) * (Rating<4.5)).",
    explanation: "Highlights high-spending accounts with declining satisfaction scores for proactive management outreach.",
    hint: "Filter for high spend combined with low satisfaction rating.",
    level: "advanced",
    codeExample: "=FILTER(CustomerTable, (SpendCol>=1000000) * (RatingCol<4.5))"
  },
  {
    question: "How do you export all Platinum VIP customer contacts for an email marketing campaign?",
    shortAnswer: "Extract email addresses using =FILTER(EmailCol, TierCol=\"Platinum VIP\") and join with =TEXTJOIN(\"; \", TRUE, ...).",
    explanation: "`TEXTJOIN` creates a ready-to-paste semicolon-separated recipient list for Outlook in one cell.",
    hint: "Use TEXTJOIN with FILTER for email distribution lists.",
    level: "moderate",
    codeExample: "=TEXTJOIN(\"; \", TRUE, FILTER(EmailList, TierCol=\"Platinum VIP\"))"
  },
  {
    question: "How do you sort customers within each segment alphabetically while keeping segments grouped?",
    shortAnswer: "Use SORTBY: =SORTBY(AugmentedTable, TierCol, 1, NameCol, 1).",
    explanation: "Orders primary records by Tier, then breaks ties alphabetically by customer name.",
    hint: "Sort by Tier ascending, then Name ascending in SORTBY.",
    level: "moderate",
    codeExample: "=SORTBY(AugmentedTable, TierCol, 1, NameCol, 1)"
  },
  {
    question: "What is the memory and performance advantage of computing tiers in memory with LET vs physical helper columns?",
    shortAnswer: "It prevents workbook file size expansion, avoids broken column references during audit reviews, and recalculates in CPU RAM.",
    explanation: "Virtual column augmentation via `HSTACK` keeps raw data tables clean, lightweight, and strictly compliant with database normalization.",
    hint: "Keeps master tables normalized and clean without helper columns.",
    level: "expert",
    codeExample: "// In-memory HSTACK avoids creating physical helper columns"
  },
  {
    question: "How do you highlight Platinum VIP rows with green fills using Conditional Formatting?",
    shortAnswer: "Apply a formula rule: =$G2=\"Platinum VIP\" across the table range.",
    explanation: "Locks column G so entire table rows receive dynamic color highlights based on tier status.",
    hint: "Use =$TierCell=\"Platinum VIP\" in Conditional Formatting.",
    level: "basic",
    codeExample: "=$G2=\"Platinum VIP\""
  },
  {
    question: "How do you build a multi-tier commission calculation engine based on customer segment?",
    shortAnswer: "Multiply spend by tier-specific rates: Spend * XLOOKUP(Tier, TierNames, CommissionRates).",
    explanation: "Dynamically calculates sales consultant commissions based on the tier classification of their closed deals.",
    hint: "Multiply spend by XLOOKUP rate multiplier.",
    level: "advanced",
    codeExample: "=SpendCol * XLOOKUP(TierCol, {\"Bronze\",\"Silver\",\"Gold\",\"Platinum\"}, {0.02, 0.04, 0.06, 0.08})"
  },
  {
    question: "How do you filter for customers who were promoted to a higher tier this quarter?",
    shortAnswer: "Compare Current Tier against Previous Tier: =FILTER(CustomerTable, CurrentTierRank > PreviousTierRank).",
    explanation: "Isolates fast-growing customer accounts for executive recognition.",
    hint: "Compare current tier index against previous period index.",
    level: "advanced",
    codeExample: "=FILTER(CustomerTable, CurrentRank > PrevRank)"
  },
  {
    question: "Can dynamic customer segmentation engines handle 100,000 corporate client records?",
    shortAnswer: "Yes, vectorized IFS and HSTACK calculate across 100,000 rows in less than 30 milliseconds in Excel 365.",
    explanation: "Native multi-threaded C++ evaluation guarantees enterprise-scale performance.",
    hint: "Calculates 100,000 records in sub-30ms time.",
    level: "expert",
    codeExample: "// 100,000 customer records segmented in < 30ms"
  },
  {
    question: "How do you calculate the median spend for the Gold tier cohort?",
    shortAnswer: "Use =MEDIAN(FILTER(SpendCol, TierCol=\"Gold Tier\")).",
    explanation: "Passes the filtered spend array into `MEDIAN` to calculate the exact statistical midpoint.",
    hint: "Pass FILTER directly into MEDIAN().",
    level: "moderate",
    codeExample: "=MEDIAN(FILTER(SpendCol, TierCol=\"Gold Tier\"))"
  },
  {
    question: "How do you create a dynamic cohort summary bar chart connected to the segmentation engine?",
    shortAnswer: "Bind chart series to the spilled summary table origin cells (#).",
    explanation: "As customers migrate across tiers, the chart bars adjust dynamically to reflect updated cohort revenues.",
    hint: "Bind chart series to the dynamic spilled summary matrix.",
    level: "moderate",
    codeExample: "// Chart Source: =SummarySheet!$A$2#"
  },
  {
    question: "What happens if a customer has spend > ₹12,00,000 but rating < 4.8?",
    shortAnswer: "They fail the Platinum condition and fall back to Gold Tier (if rating >= 4.6) or Silver Tier.",
    explanation: "Boolean multiplication strictly enforces both spend and quality rating standards for Platinum VIP status.",
    hint: "Both conditions must be met for Platinum VIP qualification.",
    level: "basic",
    codeExample: "// Spend: 14L, Rating: 4.5 → Classified as Gold Tier or Silver Tier"
  },
  {
    question: "How do you format the segmented customer roster for executive board presentation?",
    shortAnswer: "Use dark slate containers (#0f172a), emerald/cyan badges (#34d399, #38bdf8), and clear currency headers (₹).",
    explanation: "Professional visual design ensures maximum data clarity and executive credibility.",
    hint: "Apply modern high-contrast executive formatting.",
    level: "basic",
    codeExample: "// Executive Theme: Slate-950 + Emerald Badges"
  },
  {
    question: "How do you prevent #SPILL! errors when displaying multiple cohort tables side-by-side?",
    shortAnswer: "Space cohort tables in separate column blocks (e.g. Columns A:D for Platinum, F:I for Gold) with clear rightward margins.",
    explanation: "Ensuring horizontal independence prevents expanding arrays from colliding.",
    hint: "Place side-by-side cohort tables in distinct column blocks.",
    level: "moderate",
    codeExample: "// Platinum in Col A:D | Gold in Col F:I"
  },
  {
    question: "Why is the Customer Segmentation Lab considered the capstone demonstration of dynamic array mastery?",
    shortAnswer: "It unites HSTACK, LET, IFS, FILTER, SORT, XLOOKUP, and dynamic validation into a complete commercial analytics engine.",
    explanation: "Completing this lab proves full end-to-end fluency in modern formula-driven spreadsheet engineering, empowering analysts across Barrackpore and Kolkata to build high-impact enterprise applications.",
    hint: "It unifies all module competencies into an end-to-end commercial analytics system.",
    level: "expert",
    codeExample: "// Capstone Pipeline: Raw Data → In-Memory Segmentation → HSTACK → FILTER → Drill-Down UI"
  }
];

export default questions;
