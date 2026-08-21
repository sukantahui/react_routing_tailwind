const questions = [
  {
    question: "What is supply in a transportation problem?",
    shortAnswer: "Supply is the quantity of goods available at each source, representing the maximum amount that can be shipped.",
    explanation: "Supply (Sᵢ) represents the amount of goods available at source i. It is limited by production capacity, storage capacity, or availability. In transportation problems, supply must be distributed among destinations to meet demand.",
    hint: "Think about how much is available at each source.",
    level: "basic",
    codeExample: "S₁ = 100 units available at Source 1"
  },
  {
    question: "What is demand in a transportation problem?",
    shortAnswer: "Demand is the quantity of goods required at each destination, representing the exact amount that must be received.",
    explanation: "Demand (Dⱼ) represents the amount of goods needed at destination j. It is determined by consumption requirements, orders, or needs. In transportation problems, demand must be exactly met by shipments from sources.",
    hint: "Think about how much is needed at each destination.",
    level: "basic",
    codeExample: "D₁ = 80 units needed at Destination 1"
  },
  {
    question: "What is the balance condition in transportation problems?",
    shortAnswer: "The balance condition requires total supply to equal total demand: ΣSᵢ = ΣDⱼ.",
    explanation: "The balance condition ensures that all goods from sources exactly meet all demands at destinations. If supply equals demand, the problem is balanced and can be solved directly. If not, the problem is unbalanced and requires dummy sources or destinations.",
    hint: "Total supply must equal total demand.",
    level: "intermediate",
    codeExample: "If ΣSᵢ = 500 and ΣDⱼ = 500, the problem is balanced."
  },
  {
    question: "What happens when supply is greater than demand?",
    shortAnswer: "When supply exceeds demand, there is surplus supply that must be handled by adding a dummy destination.",
    explanation: "If ΣSᵢ > ΣDⱼ, there is excess supply. A dummy destination is added with demand equal to the surplus and zero transportation costs from all sources. This represents supply that doesn't need to be shipped, effectively balancing the problem.",
    hint: "Surplus supply needs a dummy destination.",
    level: "intermediate",
    codeExample: "Supply = 600, Demand = 500 → Add dummy destination with demand = 100"
  },
  {
    question: "What happens when demand is greater than supply?",
    shortAnswer: "When demand exceeds supply, there is unmet demand that must be handled by adding a dummy source.",
    explanation: "If ΣDⱼ > ΣSᵢ, there is excess demand. A dummy source is added with supply equal to the deficit and zero transportation costs to all destinations. This represents unmet demand that can't be fulfilled, effectively balancing the problem.",
    hint: "Excess demand needs a dummy source.",
    level: "intermediate",
    codeExample: "Demand = 600, Supply = 500 → Add dummy source with supply = 100"
  },
  {
    question: "Why is it important to verify supply and demand balance?",
    shortAnswer: "Balance verification ensures the problem is feasible and determines if dummy adjustments are needed.",
    explanation: "Checking balance is crucial because: 1) It identifies if the problem is feasible, 2) It determines if dummy sources or destinations are needed, 3) It prevents incorrect solutions, 4) It ensures all constraints can be satisfied, and 5) It guides the solution approach.",
    hint: "Always check balance before solving.",
    level: "intermediate",
    codeExample: "Check ΣSᵢ vs ΣDⱼ before any solution method."
  },
  {
    question: "What are the sources of supply in real-world problems?",
    shortAnswer: "Supply comes from factories, warehouses, farms, collection centers, and other production or storage points.",
    explanation: "Real-world supply sources include: 1) Manufacturing facilities (production capacity), 2) Warehouses (storage capacity), 3) Farms (agricultural production), 4) Collection centers (gathered goods), 5) Distribution centers (redistributed goods), 6) Suppliers (external sources), and 7) Inventory (stocked goods).",
    hint: "Any place that has goods available is a supply source.",
    level: "intermediate",
    codeExample: "Factory A (produces), Warehouse B (stores), Farm C (agriculture)"
  },
  {
    question: "What are the sources of demand in real-world problems?",
    shortAnswer: "Demand comes from retail stores, consumers, hospitals, schools, and other points of consumption.",
    explanation: "Real-world demand sources include: 1) Retail stores (consumer sales), 2) End consumers (direct use), 3) Hospitals (medical needs), 4) Schools (educational needs), 5) Manufacturing plants (raw material needs), 6) Distribution centers (redistribution), and 7) Government (public needs).",
    hint: "Any place that needs goods is a demand source.",
    level: "intermediate",
    codeExample: "Store A (retail), Hospital B (medical), School C (educational)"
  },
  {
    question: "How does seasonality affect supply and demand?",
    shortAnswer: "Seasonality causes supply and demand to fluctuate throughout the year, requiring dynamic transportation planning.",
    explanation: "Seasonal effects include: 1) Agricultural supply varies with harvest seasons, 2) Consumer demand changes with seasons (e.g., winter coats, summer drinks), 3) Holiday seasons increase demand, 4) Weather affects supply availability, 5) Production cycles affect supply capacity, and 6) Tourist seasons affect local demand.",
    hint: "Supply and demand change with seasons.",
    level: "expert",
    codeExample: "Summer: higher demand for cold drinks, winter: higher demand for heating fuel."
  },
  {
    question: "What is the difference between fixed and variable supply?",
    shortAnswer: "Fixed supply is constant and known, while variable supply changes based on conditions like production or availability.",
    explanation: "Fixed supply is predetermined and constant (e.g., warehouse capacity). Variable supply changes due to: 1) Production schedules, 2) Resource availability, 3) Weather conditions, 4) Equipment breakdowns, 5) Supplier reliability, and 6) Market conditions.",
    hint: "Fixed supply is known, variable supply changes.",
    level: "expert",
    codeExample: "Fixed: warehouse always has 1000 units. Variable: factory production varies."
  },
  {
    question: "What is the difference between fixed and variable demand?",
    shortAnswer: "Fixed demand is constant and known, while variable demand changes based on conditions like consumer behavior.",
    explanation: "Fixed demand is predetermined and constant (e.g., regular orders). Variable demand changes due to: 1) Consumer preferences, 2) Seasonal changes, 3) Economic conditions, 4) Promotional activities, 5) Competition, and 6) Emergency needs.",
    hint: "Fixed demand is known, variable demand changes.",
    level: "expert",
    codeExample: "Fixed: regular weekly orders. Variable: changing consumer demand."
  },
  {
    question: "How do you handle changing supply and demand in practice?",
    shortAnswer: "Changing supply and demand requires dynamic planning, regular monitoring, and flexible transportation models.",
    explanation: "Handling changes involves: 1) Regular monitoring of supply and demand, 2) Updating transportation models frequently, 3) Using forecasting tools, 4) Building flexibility into plans, 5) Maintaining safety stock, 6) Developing contingency plans, and 7) Using real-time data for adjustments.",
    hint: "Stay flexible and adapt to changes.",
    level: "expert",
    codeExample: "Monthly review and adjustment of transportation plans."
  },
  {
    question: "What is the role of forecasting in supply and demand?",
    shortAnswer: "Forecasting predicts future supply and demand to enable proactive transportation planning.",
    explanation: "Forecasting helps: 1) Predict future demand patterns, 2) Plan supply accordingly, 3) Optimize transportation resources, 4) Reduce uncertainty, 5) Improve efficiency, 6) Minimize costs, and 7) Ensure customer satisfaction. Accurate forecasting is essential for effective transportation planning.",
    hint: "Forecast to plan ahead.",
    level: "expert",
    codeExample: "Use historical data and trends to forecast future demand."
  },
  {
    question: "How does supply chain disruption affect supply and demand?",
    shortAnswer: "Disruptions can reduce supply availability or change demand patterns, requiring rapid adjustments.",
    explanation: "Disruption impacts: 1) Supply may decrease due to production issues, 2) Demand may change due to panic buying or substitution, 3) Transportation routes may be affected, 4) Costs may increase, 5) Priorities may shift, 6) Contingency plans become critical, and 7) Flexible models are needed.",
    hint: "Plan for disruptions in supply and demand.",
    level: "expert",
    codeExample: "Natural disaster reduces supply, alternative sources needed."
  },
  {
    question: "What is the relationship between supply and inventory?",
    shortAnswer: "Supply determines available inventory, while inventory management helps balance supply and demand.",
    explanation: "The relationship: 1) Supply adds to inventory, 2) Demand reduces inventory, 3) Inventory buffers between supply and demand, 4) Safety stock protects against fluctuations, 5) Lead times affect inventory needs, 6) Inventory holding costs affect decisions, and 7) Just-in-time systems minimize inventory.",
    hint: "Inventory is the bridge between supply and demand.",
    level: "expert",
    codeExample: "Inventory level = Beginning inventory + Supply - Demand."
  },
  {
    question: "How does demand forecasting improve transportation planning?",
    shortAnswer: "Demand forecasting allows proactive planning of transportation resources to meet future needs efficiently.",
    explanation: "Forecasting improves planning by: 1) Predicting future shipment requirements, 2) Optimizing fleet utilization, 3) Reducing empty miles, 4) Planning driver schedules, 5) Managing warehouse capacity, 6) Coordinating with suppliers, and 7) Improving customer satisfaction.",
    hint: "Forecasting enables proactive transportation planning.",
    level: "expert",
    codeExample: "Forecast demand for next quarter to plan transportation capacity."
  },
  {
    question: "What is the economic interpretation of supply and demand in transportation?",
    shortAnswer: "Supply and demand represent the allocation of scarce resources to meet needs, with transportation as the connecting mechanism.",
    explanation: "Economically: 1) Supply represents available resources, 2) Demand represents wants and needs, 3) Transportation connects them, 4) Prices reflect scarcity and value, 5) Balance represents equilibrium, 6) Imbalance requires adjustment, and 7) Efficiency maximizes economic value.",
    hint: "Transportation balances scarce resources with wants and needs.",
    level: "expert",
    codeExample: "Supply of goods at sources meets demand at destinations through transportation."
  },
  {
    question: "How does technology help manage supply and demand?",
    shortAnswer: "Technology enables real-time tracking, forecasting, and optimization of supply and demand.",
    explanation: "Technology applications: 1) IoT sensors for real-time data, 2) AI for demand forecasting, 3) ERP systems for integration, 4) Analytics for insights, 5) Cloud platforms for collaboration, 6) Blockchain for transparency, and 7) Optimization software for planning.",
    hint: "Technology improves visibility and decision-making.",
    level: "expert",
    codeExample: "AI-powered demand forecasting integrated with transportation planning."
  },
  {
    question: "What are the challenges in balancing supply and demand?",
    shortAnswer: "Challenges include demand uncertainty, supply variability, long lead times, and coordination complexity.",
    explanation: "Key challenges: 1) Demand uncertainty (forecast errors), 2) Supply variability (production issues), 3) Long lead times (planning horizon), 4) Coordination complexity (multiple stakeholders), 5) Cost pressures (efficiency requirements), 6) Customer expectations (service levels), and 7) Global disruptions (unforeseen events).",
    hint: "Balancing supply and demand is complex and challenging.",
    level: "expert",
    codeExample: "Demand spikes require rapid supply response."
  },
  {
    question: "How do you measure supply and demand effectiveness?",
    shortAnswer: "Effectiveness is measured by metrics like fill rate, stockout rate, and service level performance.",
    explanation: "Key metrics: 1) Fill rate (percentage of demand met), 2) Stockout rate (demand not met), 3) Service level (customer satisfaction), 4) Inventory turns (efficiency), 5) Lead time (speed), 6) Cost efficiency, and 7) Supply chain resilience.",
    hint: "Measure how well supply meets demand.",
    level: "expert",
    codeExample: "Fill rate = (Demand met / Total demand) × 100%"
  },
  {
    question: "What is the bullwhip effect in supply and demand?",
    shortAnswer: "The bullwhip effect is the amplification of demand variability up the supply chain, causing supply instability.",
    explanation: "The bullwhip effect: 1) Small changes in demand at retail level, 2) Amplify as they move up the supply chain, 3) Cause supply fluctuations, 4) Lead to inefficiencies, 5) Increase costs, 6) Create uncertainty, and 7) Require demand smoothing strategies.",
    hint: "Small demand changes create large supply fluctuations.",
    level: "expert",
    codeExample: "10% retail demand increase → 30% wholesale demand increase."
  },
  {
    question: "How do you smooth supply and demand fluctuations?",
    shortAnswer: "Fluctuations are smoothed through inventory buffers, demand management, and flexible supply.",
    explanation: "Smoothing techniques: 1) Maintain safety stock, 2) Use flexible supply sources, 3) Implement demand management, 4) Use lead time management, 5) Apply forecasting, 6) Use postponement strategies, 7) Collaborate with partners, and 8) Use technology for real-time adjustments.",
    hint: "Use buffers and flexibility to smooth fluctuations.",
    level: "expert",
    codeExample: "Safety stock absorbs unexpected demand or supply changes."
  },
  {
    question: "What is the role of safety stock in supply and demand?",
    shortAnswer: "Safety stock is extra inventory held to protect against uncertainty in supply and demand.",
    explanation: "Safety stock: 1) Buffers against demand variability, 2) Protects against supply disruptions, 3) Ensures customer service levels, 4) Reduces stockout risk, 5) Balances inventory costs with risk, 6) Depends on uncertainty levels, and 7) Requires careful calculation.",
    hint: "Safety stock protects against uncertainties.",
    level: "expert",
    codeExample: "Safety stock = (Maximum daily demand - Average daily demand) × Lead time"
  },
  {
    question: "How does globalization affect supply and demand?",
    shortAnswer: "Globalization expands supply sources and demand markets, creating more complex and interconnected networks.",
    explanation: "Globalization effects: 1) Access to global supply sources, 2) Global demand markets, 3) Complex global supply chains, 4) Increased transportation needs, 5) Diverse regulations, 6) Currency effects, 7) Cultural considerations, 8) Global risk factors, and 9) Sustainability concerns.",
    hint: "Globalization creates complex supply-demand networks.",
    level: "expert",
    codeExample: "Global supply chain with suppliers in Asia and customers in Europe."
  },
  {
    question: "What is the relationship between supply and price?",
    shortAnswer: "Supply and price are inversely related - higher supply leads to lower prices, lower supply leads to higher prices.",
    explanation: "The relationship: 1) Increased supply reduces prices (surplus), 2) Decreased supply increases prices (scarcity), 3) Price signals guide supply decisions, 4) Demand affects this relationship, 5) Market equilibrium balances supply and demand, 6) Transportation affects effective supply, and 7) Global factors influence prices.",
    hint: "More supply = lower prices, less supply = higher prices.",
    level: "expert",
    codeExample: "Supply surplus → prices decrease, supply shortage → prices increase."
  },
  {
    question: "What is the relationship between demand and price?",
    shortAnswer: "Demand and price are inversely related - higher prices reduce demand, lower prices increase demand.",
    explanation: "The relationship: 1) High prices reduce demand (substitution), 2) Low prices increase demand (affordability), 3) Price affects consumption decisions, 4) Demand elasticity varies by product, 5) Transportation costs affect effective price, 6) Global factors influence demand, and 7) Income affects demand patterns.",
    hint: "Higher price = lower demand, lower price = higher demand.",
    level: "expert",
    codeExample: "Price increase → demand decreases, price decrease → demand increases."
  },
  {
    question: "How do you forecast demand for transportation planning?",
    shortAnswer: "Demand forecasting uses historical data, trends, and predictive models to estimate future transportation needs.",
    explanation: "Forecasting methods: 1) Time series analysis, 2) Trend projection, 3) Seasonal adjustment, 4) Regression analysis, 5) Machine learning models, 6) Qualitative methods, 7) Scenario analysis, 8) Collaborative forecasting, and 9) Demand sensing.",
    hint: "Use data and models to predict future demand.",
    level: "expert",
    codeExample: "Use historical shipping data and trends to forecast next month's demand."
  },
  {
    question: "What is the impact of just-in-time (JIT) on supply and demand?",
    shortAnswer: "JIT reduces inventory but requires precise coordination between supply and demand.",
    explanation: "JIT impacts: 1) Reduced inventory holding costs, 2) Lower safety stock, 3) More frequent deliveries, 4) Strong supplier relationships, 5) Demand-driven production, 6) Increased transportation importance, 7) Higher coordination requirements, 8) Less buffer for disruptions, and 9) Requires reliable supply.",
    hint: "JIT needs accurate and reliable supply-demand coordination.",
    level: "expert",
    codeExample: "JIT: small frequent deliveries based on real-time demand."
  },
  {
    question: "What is supply chain integration in transportation?",
    shortAnswer: "Supply chain integration coordinates all aspects of supply and demand management across the entire network.",
    explanation: "Integration includes: 1) Collaborative planning, 2) Shared information, 3) Coordinated transportation, 4) Integrated inventory management, 5) Joint forecasting, 6) Supplier collaboration, 7) Customer integration, 8) Technology integration, and 9) Performance alignment.",
    hint: "Integration improves supply-demand coordination.",
    level: "expert",
    codeExample: "Integrated system connecting suppliers, transportation, and customers."
  }
];

export default questions;