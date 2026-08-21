const questions = [
  {
    question: "What is a transportation cost matrix?",
    shortAnswer: "A transportation cost matrix is a rectangular array that contains the unit transportation costs between each source-destination pair.",
    explanation: "The cost matrix C has m rows (sources) and n columns (destinations), where entry cᵢⱼ represents the cost of shipping one unit from source i to destination j. It is the primary input that determines the optimal shipping plan in transportation problems.",
    hint: "Think of it as a table of all shipping costs.",
    level: "basic",
    codeExample: "C = [cᵢⱼ]ₘₓₙ where cᵢⱼ is cost from source i to destination j."
  },
  {
    question: "What are the dimensions of a transportation cost matrix?",
    shortAnswer: "The cost matrix has dimensions m × n, where m is the number of sources and n is the number of destinations.",
    explanation: "If there are m sources and n destinations, the cost matrix will have m rows (one for each source) and n columns (one for each destination). The total number of cost entries is m × n.",
    hint: "Sources × Destinations = Matrix dimensions.",
    level: "basic",
    codeExample: "3 sources × 4 destinations = 3×4 cost matrix with 12 entries."
  },
  {
    question: "What does cᵢⱼ represent in a transportation cost matrix?",
    shortAnswer: "cᵢⱼ represents the cost of shipping one unit of goods from source i to destination j.",
    explanation: "Each entry cᵢⱼ in the cost matrix is a specific cost value. It includes all costs associated with shipping one unit from source i to destination j, such as transportation, handling, and any other variable costs.",
    hint: "cᵢⱼ = cost from source i to destination j.",
    level: "basic",
    codeExample: "c₁₂ = ₹10 means shipping one unit from Source 1 to Destination 2 costs ₹10."
  },
  {
    question: "What are the properties of a transportation cost matrix?",
    shortAnswer: "The cost matrix has properties: non-negative entries, real values, asymmetry, fixed values, and linear cost structure.",
    explanation: "Properties include: 1) All costs cᵢⱼ ≥ 0 (non-negative), 2) Costs can be integers or decimals, 3) Generally cᵢⱼ ≠ cⱼᵢ (asymmetric), 4) Costs are fixed and known in basic problems, and 5) Total cost is linear: Σ(cᵢⱼ × xᵢⱼ).",
    hint: "Costs are non-negative, real, asymmetric, fixed, and linear.",
    level: "intermediate",
    codeExample: "c₁₂ = ₹10, c₂₁ = ₹12 (different due to direction)."
  },
  {
    question: "What factors affect transportation costs in the matrix?",
    shortAnswer: "Factors include distance, mode of transport, volume, product type, seasonality, fuel prices, labor costs, and infrastructure.",
    explanation: "Transportation costs are affected by: 1) Distance between locations, 2) Transportation mode (air, rail, truck, ship), 3) Shipment volume (economies of scale), 4) Product characteristics (perishable, hazardous), 5) Seasonal variations, 6) Fuel price fluctuations, 7) Labor costs, and 8) Infrastructure quality.",
    hint: "Many factors influence transportation costs.",
    level: "intermediate",
    codeExample: "Higher fuel prices increase all transportation costs."
  },
  {
    question: "Why is the cost matrix important in transportation problems?",
    shortAnswer: "The cost matrix is the primary input that determines the optimal shipping plan and total cost.",
    explanation: "The cost matrix is critical because: 1) It provides all cost data needed for optimization, 2) It directly affects the objective function, 3) It determines the optimal shipping plan, 4) It influences all transportation decisions, and 5) Its accuracy determines solution quality.",
    hint: "Garbage in = garbage out. Accurate costs lead to accurate solutions.",
    level: "intermediate",
    codeExample: "Objective: Minimize ΣᵢΣⱼ cᵢⱼ × xᵢⱼ using the cost matrix."
  },
  {
    question: "How do you read a transportation cost matrix?",
    shortAnswer: "Read the matrix with sources as rows, destinations as columns, and each cell as cost from that source to that destination.",
    explanation: "To read the cost matrix: 1) Identify the source (row) and destination (column), 2) Find the cell at their intersection, 3) The value is the cost per unit, 4) For example, row 2, column 3 gives c₂₃ (cost from source 2 to destination 3).",
    hint: "Row = source, Column = destination, Cell = cost.",
    level: "basic",
    codeExample: "c₂₃ = cost from Source 2 to Destination 3."
  },
  {
    question: "What is the difference between direct and indirect transportation costs?",
    shortAnswer: "Direct costs are directly related to shipping (fuel, freight), while indirect costs are overhead costs (admin, inventory holding).",
    explanation: "Direct costs include: 1) Fuel and distance-based costs, 2) Freight charges, 3) Handling fees, 4) Loading/unloading costs, and 5) Insurance. Indirect costs include: 1) Administrative overhead, 2) Inventory holding costs, 3) Delay costs, 4) Storage costs, and 5) Opportunity costs.",
    hint: "Direct = shipping-specific costs, Indirect = support costs.",
    level: "intermediate",
    codeExample: "Direct: ₹50 fuel, Indirect: ₹10 administrative overhead."
  },
  {
    question: "How do economies of scale affect the cost matrix?",
    shortAnswer: "Economies of scale mean unit costs may decrease with larger shipment volumes, making the cost matrix non-linear.",
    explanation: "Basic transportation models assume linear costs (cᵢⱼ is constant per unit). However, in reality, larger shipments often have lower per-unit costs due to: 1) Better utilization of capacity, 2) Volume discounts from carriers, 3) Reduced handling per unit, and 4) More efficient loading.",
    hint: "Larger shipments can reduce per-unit costs.",
    level: "expert",
    codeExample: "1-100 units: ₹10/unit, 101-500 units: ₹8/unit (volume discount)."
  },
  {
    question: "How often should the cost matrix be updated?",
    shortAnswer: "The cost matrix should be updated regularly, at least monthly or whenever significant cost changes occur.",
    explanation: "Regular updates are needed because: 1) Fuel prices fluctuate, 2) Labor costs change, 3) Route conditions vary, 4) Seasonal factors affect costs, 5) Contract rates change, 6) New routes or carriers become available, and 7) Exchange rates change (for international shipping).",
    hint: "Costs change over time - keep your matrix current.",
    level: "expert",
    codeExample: "Monthly review of all transportation costs and matrix updates."
  },
  {
    question: "What is the role of the cost matrix in the objective function?",
    shortAnswer: "The cost matrix provides the coefficients (cᵢⱼ) in the objective function that is minimized in transportation problems.",
    explanation: "The objective function Z = ΣᵢΣⱼ cᵢⱼ × xᵢⱼ uses the cost matrix cᵢⱼ as coefficients. Each decision variable xᵢⱼ is multiplied by its corresponding cost from the matrix. This linear combination gives the total transportation cost to be minimized.",
    hint: "Cost matrix values multiply with decision variables in the objective.",
    level: "intermediate",
    codeExample: "Z = c₁₁x₁₁ + c₁₂x₁₂ + ... + cₘₙxₘₙ"
  },
  {
    question: "How do you handle missing costs in the cost matrix?",
    shortAnswer: "Missing costs are typically assigned very high values (M) or estimated using available data and assumptions.",
    explanation: "When costs are unknown: 1) Use the largest known cost plus a penalty (big M method), 2) Estimate based on similar routes, 3) Use cost functions (e.g., distance × rate), 4) Seek actual data from carriers, and 5) Document assumptions carefully.",
    hint: "Use high values or estimates for unknown costs.",
    level: "expert",
    codeExample: "Unknown cost assigned M = 9999 (very high) to prevent use."
  },
  {
    question: "What is the significance of zero costs in the cost matrix?",
    shortAnswer: "Zero costs typically represent dummy sources or destinations that don't require actual shipping.",
    explanation: "Zero costs appear when: 1) Dummy sources or destinations are added to balance the problem, 2) The cost of not shipping (unused supply or unmet demand) is zero, and 3) They help balance the transportation problem without affecting the objective.",
    hint: "Zero costs usually mean dummy or balancing entries.",
    level: "expert",
    codeExample: "Dummy destination with zero costs represents unused supply."
  },
  {
    question: "How does the cost matrix affect the optimal shipping plan?",
    shortAnswer: "The cost matrix determines which routes are used and in what quantities in the optimal shipping plan.",
    explanation: "The cost matrix guides optimization: 1) Lower costs lead to more shipments on those routes, 2) Higher costs may be avoided, 3) The optimal plan balances cost minimization with supply and demand constraints, and 4) Changes in costs can significantly alter the shipping plan.",
    hint: "Cheaper routes get more shipments in the optimal plan.",
    level: "intermediate",
    codeExample: "If c₁₂ decreases, more units may be shipped from Source 1 to Destination 2."
  },
  {
    question: "What are the components of transportation costs in the matrix?",
    shortAnswer: "Components include distance-based costs, handling fees, freight charges, insurance, and administrative overhead.",
    explanation: "Transportation costs include: 1) Distance-based (fuel, wear and tear), 2) Freight charges (carrier fees), 3) Handling fees (loading/unloading), 4) Insurance (risk coverage), 5) Administrative costs (paperwork, coordination), 6) Storage costs (if applicable), and 7) Customs duties (for international).",
    hint: "Costs include many components beyond just distance.",
    level: "intermediate",
    codeExample: "Total cost = Fuel (₹20) + Freight (₹30) + Handling (₹10) = ₹60/unit."
  },
  {
    question: "How do you validate the accuracy of a cost matrix?",
    shortAnswer: "Validate by cross-checking with multiple sources, historical data, and expert review.",
    explanation: "Validation methods: 1) Compare with industry benchmarks, 2) Review historical cost data, 3) Consult with logistics experts, 4) Check consistency across similar routes, 5) Verify with actual invoice data, 6) Use statistical analysis for outliers, and 7) Perform sensitivity analysis to test robustness.",
    hint: "Cross-check costs with multiple sources.",
    level: "expert",
    codeExample: "Compare current costs with previous month's data for consistency."
  },
  {
    question: "What is the impact of currency exchange rates on international cost matrices?",
    shortAnswer: "Exchange rate fluctuations directly affect international transportation costs and require regular matrix updates.",
    explanation: "Currency impacts: 1) Changes in exchange rates affect costs denominated in foreign currencies, 2) Regular updates needed to reflect current rates, 3) Hedging strategies may be needed, 4) Multi-currency considerations add complexity, and 5) Exchange rate volatility creates uncertainty.",
    hint: "Currency changes affect international shipping costs.",
    level: "expert",
    codeExample: "1 USD = ₹83 → costs in rupees change when exchange rate changes."
  },
  {
    question: "How does the cost matrix handle multiple transportation modes?",
    shortAnswer: "Multiple modes can be represented by having separate cost matrices or by using the minimum cost option.",
    explanation: "For multiple modes: 1) Create separate cost matrices for each mode, 2) Use the lowest cost option between each source-destination pair, 3) Consider mode-specific characteristics (time, reliability), 4) Account for different cost structures, and 5) Handle mode constraints separately.",
    hint: "Different modes may require different cost treatments.",
    level: "expert",
    codeExample: "Air: ₹500, Rail: ₹300, Truck: ₹400 → choose rail as cheapest."
  },
  {
    question: "What is the role of historical data in developing cost matrices?",
    shortAnswer: "Historical data provides the basis for estimating current costs and identifying cost patterns.",
    explanation: "Historical data helps by: 1) Providing baseline costs for estimation, 2) Identifying seasonal patterns, 3) Detecting cost trends (inflation, fuel prices), 4) Benchmarking current costs, 5) Supporting forecasting, and 6) Validating current cost estimates.",
    hint: "Past costs inform current cost estimates.",
    level: "expert",
    codeExample: "Average of last 6 months' costs used as baseline estimate."
  },
  {
    question: "How do contract rates affect the cost matrix?",
    shortAnswer: "Contract rates provide fixed or tiered costs that should be incorporated into the cost matrix.",
    explanation: "Contract rates: 1) Provide stable cost structure, 2) May offer volume discounts, 3) Create fixed cost elements, 4) Require contract terms (duration, volume commitments), 5) Can reduce cost uncertainty, and 6) Need regular review at contract renewal.",
    hint: "Contract rates provide stable, negotiated costs.",
    level: "expert",
    codeExample: "Carrier contract: ₹100/unit for up to 1000 units, ₹90/unit above."
  },
  {
    question: "What is the impact of fuel price fluctuations on the cost matrix?",
    shortAnswer: "Fuel price changes directly affect transportation costs and require regular updates to the cost matrix.",
    explanation: "Fuel impacts: 1) Direct effect on shipping costs, 2) Fuel surcharges may apply, 3) Need for frequent cost updates, 4) Hedging strategies for fuel costs, 5) Impact on different transportation modes varies, and 6) Fuel efficiency considerations.",
    hint: "Fuel prices change often, update costs accordingly.",
    level: "expert",
    codeExample: "Fuel price increase of 10% → transportation cost increase of ~5-8%."
  },
  {
    question: "How does the cost matrix handle seasonal variations?",
    shortAnswer: "Seasonal variations require separate cost matrices or adjustment factors for different seasons.",
    explanation: "Seasonal handling: 1) Create season-specific cost matrices, 2) Apply adjustment factors to base costs, 3) Account for peak season surcharges, 4) Consider supply and demand changes, 5) Plan for seasonal fluctuations, and 6) Update costs as seasons change.",
    hint: "Costs vary with seasons - plan accordingly.",
    level: "expert",
    codeExample: "Summer rates: +10% due to higher demand and fuel costs."
  },
  {
    question: "What is the relationship between the cost matrix and transportation routes?",
    shortAnswer: "The cost matrix is directly linked to transportation routes, with each cell representing a specific route's cost.",
    explanation: "Relationship: 1) Each cᵢⱼ corresponds to a specific route, 2) Routes determine available costs, 3) Route changes require cost matrix updates, 4) Multiple routes between locations may exist, 5) Route characteristics affect costs, and 6) Route selection is guided by cost matrix.",
    hint: "Each cost in the matrix is for a specific route.",
    level: "intermediate",
    codeExample: "c₁₂ = cost on route from Source 1 to Destination 2."
  },
  {
    question: "How do you handle capacity constraints in the cost matrix?",
    shortAnswer: "Capacity constraints are not directly in the cost matrix but are handled as separate constraints in the transportation model.",
    explanation: "Capacity handling: 1) Add capacity constraints to the model, 2) Use modified cost matrices for different capacity tiers, 3) Consider penalty costs for exceeding capacity, 4) Use variable costs based on capacity utilization, and 5) Separate route capacity constraints from cost matrix.",
    hint: "Capacity constraints are separate from cost matrix.",
    level: "expert",
    codeExample: "Route capacity: max 1000 units, cost = ₹10/unit up to capacity."
  },
  {
    question: "What is the impact of infrastructure on transportation costs?",
    shortAnswer: "Infrastructure quality affects transportation costs through road quality, port efficiency, and other factors.",
    explanation: "Infrastructure impacts: 1) Poor roads increase wear and fuel costs, 2) Efficient ports reduce handling costs, 3) Infrastructure investment can reduce costs, 4) Route availability affects options, 5) Maintenance issues can cause delays and costs, and 6) Infrastructure affects mode choice.",
    hint: "Better infrastructure = lower transportation costs.",
    level: "expert",
    codeExample: "Poor roads: +15% fuel costs, +20% maintenance costs."
  },
  {
    question: "How does the cost matrix handle emergency shipping costs?",
    shortAnswer: "Emergency shipping costs are significantly higher and can be represented by higher values or separate matrices.",
    explanation: "Emergency costs: 1) Expedited shipping costs more, 2) Create separate cost matrix for emergency scenarios, 3) Use premium rates, 4) Account for time-sensitive requirements, 5) Consider limited capacity for emergency shipments, and 6) Balance cost with urgency.",
    hint: "Emergency shipping = higher costs.",
    level: "expert",
    codeExample: "Normal: ₹100/unit, Emergency: ₹200/unit + rush fee."
  },
  {
    question: "What is the role of technology in managing cost matrices?",
    shortAnswer: "Technology enables real-time cost data collection, automated updates, and dynamic optimization.",
    explanation: "Technology applications: 1) ERP systems for cost tracking, 2) Automated data collection, 3) Real-time cost updates, 4) Integration with carriers, 5) AI for cost prediction, 6) Analytics for pattern detection, and 7) Optimization software using cost matrices.",
    hint: "Technology makes cost matrices more accurate and dynamic.",
    level: "expert",
    codeExample: "Real-time cost updates from integrated carrier systems."
  },
  {
    question: "How do you perform sensitivity analysis on the cost matrix?",
    shortAnswer: "Sensitivity analysis examines how changes in cost values affect the optimal solution.",
    explanation: "Sensitivity analysis: 1) Vary individual costs, 2) Analyze effect on total cost, 3) Identify critical cost values, 4) Determine cost ranges, 5) Understand solution stability, 6) Test different scenarios, and 7) Prepare contingency plans.",
    hint: "Test how cost changes affect the optimal solution.",
    level: "expert",
    codeExample: "What if c₁₂ increases by 20%? How does the shipping plan change?"
  },
  {
    question: "What are the future trends in transportation cost management?",
    shortAnswer: "Future trends include AI-driven cost optimization, real-time dynamic pricing, and blockchain for transparency.",
    explanation: "Emerging trends: 1) AI for cost prediction and optimization, 2) Real-time dynamic pricing, 3) Blockchain for cost transparency, 4) IoT for real-time tracking and cost data, 5) Predictive analytics for cost trends, 6) Sustainable logistics cost optimization, and 7) Integrated cost management systems.",
    hint: "Technology is transforming transportation cost management.",
    level: "expert",
    codeExample: "AI-powered dynamic cost matrix that updates in real-time."
  }
];

export default questions;