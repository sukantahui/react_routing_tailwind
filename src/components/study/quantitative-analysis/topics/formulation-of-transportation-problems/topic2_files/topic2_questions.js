const questions = [
  {
    question: "What are sources in a transportation problem?",
    shortAnswer: "Sources are supply points where goods originate, with limited capacity to supply goods.",
    explanation: "Sources (also called origins or supply points) are locations where goods are available for shipment. Each source has a supply capacity (Sᵢ) representing the maximum amount of goods available. Sources can be factories, warehouses, farms, or any location that produces or stores goods.",
    hint: "Think about where goods come from - that's your source.",
    level: "basic",
    codeExample: "S₁ = 100 units (Factory A has 100 units available)"
  },
  {
    question: "What are destinations in a transportation problem?",
    shortAnswer: "Destinations are demand points where goods are needed, with specific demand requirements.",
    explanation: "Destinations (also called sinks or demand points) are locations where goods are required. Each destination has a demand value (Dⱼ) representing the exact amount needed. Destinations can be retail stores, customers, markets, or any location that consumes goods.",
    hint: "Think about where goods go - that's your destination.",
    level: "basic",
    codeExample: "D₁ = 80 units (Store 1 needs 80 units)"
  },
  {
    question: "What is the difference between sources and destinations?",
    shortAnswer: "Sources supply goods (outgoing), while destinations receive goods (incoming).",
    explanation: "Sources are origins with supply capacity (outgoing flow). Destinations are endpoints with demand requirements (incoming flow). Sources provide goods, destinations consume goods. This is the fundamental distinction in transportation problems.",
    hint: "Sources supply, destinations demand.",
    level: "basic",
    codeExample: "Source: Factory → Destination: Store"
  },
  {
    question: "How do you identify sources in a real-world problem?",
    shortAnswer: "Sources are locations where goods are produced, stored, or collected, with limited supply capacity.",
    explanation: "To identify sources: 1) Look for locations that have goods available, 2) Determine their supply capacity, 3) Consider factors like production capacity, storage limits, and availability. Common sources include factories, warehouses, farms, and distribution centers.",
    hint: "Ask: Where are the goods coming from?",
    level: "intermediate",
    codeExample: "Source: Warehouse with 1000 units available"
  },
  {
    question: "How do you identify destinations in a real-world problem?",
    shortAnswer: "Destinations are locations where goods are needed or consumed, with specific demand requirements.",
    explanation: "To identify destinations: 1) Look for locations that need goods, 2) Determine their demand requirements, 3) Consider factors like consumption rates, order quantities, and delivery schedules. Common destinations include stores, customers, hospitals, and schools.",
    hint: "Ask: Where are the goods going?",
    level: "intermediate",
    codeExample: "Destination: Store with demand for 500 units"
  },
  {
    question: "What is the relationship between sources and destinations?",
    shortAnswer: "Sources and destinations are connected through transportation routes with associated costs and shipment quantities.",
    explanation: "Each source can ship to each destination (subject to constraints). The relationship is defined by: 1) Transportation costs (cᵢⱼ) per unit, 2) Decision variables (xᵢⱼ) representing quantities shipped, 3) Supply and demand constraints, and 4) The objective to minimize total cost.",
    hint: "Sources and destinations are connected by shipping routes.",
    level: "intermediate",
    codeExample: "x₁₂ = 50 units shipped from Source 1 to Destination 2"
  },
  {
    question: "Why is it important to correctly identify sources and destinations?",
    shortAnswer: "Correct identification ensures accurate modeling and optimal solutions to the transportation problem.",
    explanation: "Proper identification is crucial because: 1) Wrong identification leads to incorrect formulations, 2) It affects supply and demand balance, 3) It impacts cost calculations, 4) It determines the feasibility of the solution, and 5) It affects the accuracy of the shipping plan.",
    hint: "Accuracy in identification leads to accuracy in solutions.",
    level: "intermediate",
    codeExample: "If S₁ is actually D₁, the problem becomes completely wrong."
  },
  {
    question: "What are the characteristics of sources in transportation problems?",
    shortAnswer: "Sources have limited supply capacity, specific locations, storage capabilities, and may have additional operational constraints.",
    explanation: "Source characteristics include: 1) Supply capacity (maximum units available), 2) Geographic location, 3) Storage and handling capabilities, 4) Production or collection rates, 5) Operating hours and constraints, and 6) Cost structures (production, handling).",
    hint: "Each source is unique with its own capabilities.",
    level: "intermediate",
    codeExample: "Source: Factory A, Supply: 1000 units, Location: Kolkata"
  },
  {
    question: "What are the characteristics of destinations in transportation problems?",
    shortAnswer: "Destinations have specific demand requirements, locations, receiving capacities, and may have time constraints.",
    explanation: "Destination characteristics include: 1) Demand requirements (exact units needed), 2) Geographic location, 3) Receiving and handling capabilities, 4) Storage capacity, 5) Time constraints (delivery windows), and 6) Consumption patterns.",
    hint: "Each destination has unique requirements.",
    level: "intermediate",
    codeExample: "Destination: Store B, Demand: 500 units, Location: Barrackpore"
  },
  {
    question: "What is the total number of possible routes in a transportation problem?",
    shortAnswer: "The total number of possible routes is m × n, where m is the number of sources and n is the number of destinations.",
    explanation: "If there are m sources and n destinations, every source can potentially ship to every destination, giving m × n possible routes. This is represented by the decision variables xᵢⱼ, where i = 1,...,m and j = 1,...,n.",
    hint: "Multiply number of sources by number of destinations.",
    level: "basic",
    codeExample: "3 sources × 4 destinations = 12 possible routes"
  },
  {
    question: "How does the number of sources affect the transportation problem?",
    shortAnswer: "More sources increase complexity, with more decision variables and constraints to consider.",
    explanation: "Increasing sources: 1) Adds more supply constraints, 2) Creates more decision variables (m × n), 3) Increases computational complexity, 4) Provides more flexibility in shipping, and 5) May lead to more efficient solutions if properly utilized.",
    hint: "More sources = more complex but potentially better solutions.",
    level: "intermediate",
    codeExample: "Adding a source adds supply constraints and variables."
  },
  {
    question: "How does the number of destinations affect the transportation problem?",
    shortAnswer: "More destinations add complexity with more demand constraints and decision variables.",
    explanation: "Increasing destinations: 1) Adds more demand constraints, 2) Creates more decision variables (m × n), 3) Increases computational requirements, 4) Provides more granular distribution, and 5) May lead to better matching of supply to demand.",
    hint: "More destinations = more detailed but more complex.",
    level: "intermediate",
    codeExample: "Adding a destination adds demand constraints and variables."
  },
  {
    question: "What is a dummy source and when is it used?",
    shortAnswer: "A dummy source is added when total demand exceeds total supply to balance the problem.",
    explanation: "When demand > supply (ΣDⱼ > ΣSᵢ), a dummy source is added with supply equal to the deficit. The dummy source has zero transportation costs to all destinations. This balances the problem and allows standard solution methods to be applied.",
    hint: "Dummy source supplies the gap when demand is greater than supply.",
    level: "expert",
    codeExample: "Add dummy source S_{m+1} with supply = ΣDⱼ - ΣSᵢ"
  },
  {
    question: "What is a dummy destination and when is it used?",
    shortAnswer: "A dummy destination is added when total supply exceeds total demand to balance the problem.",
    explanation: "When supply > demand (ΣSᵢ > ΣDⱼ), a dummy destination is added with demand equal to the surplus. The dummy destination has zero transportation costs from all sources. This balances the problem and allows standard solution methods to be applied.",
    hint: "Dummy destination absorbs excess supply.",
    level: "expert",
    codeExample: "Add dummy destination D_{n+1} with demand = ΣSᵢ - ΣDⱼ"
  },
  {
    question: "How do sources and destinations relate to supply chain management?",
    shortAnswer: "Sources and destinations represent the nodes in a supply chain, connecting suppliers to customers.",
    explanation: "In supply chain management: 1) Sources are upstream nodes (suppliers, manufacturers), 2) Destinations are downstream nodes (distribution centers, retailers, customers), 3) The transportation problem optimizes the flow between these nodes, 4) This integration is crucial for supply chain efficiency.",
    hint: "Supply chains are networks of sources and destinations.",
    level: "expert",
    codeExample: "Sources: suppliers → Destinations: distribution centers → retail stores"
  },
  {
    question: "What are the types of sources in real-world applications?",
    shortAnswer: "Sources include factories, warehouses, distribution centers, farms, and collection centers.",
    explanation: "Common source types: 1) Manufacturing factories (produce goods), 2) Warehouses (store goods), 3) Distribution centers (redistribute goods), 4) Farms (agricultural products), 5) Collection centers (gather goods from multiple points), 6) Suppliers (provide raw materials or finished goods).",
    hint: "Any place that has goods available is a potential source.",
    level: "intermediate",
    codeExample: "Factory A (produces), Warehouse B (stores), Farm C (agriculture)"
  },
  {
    question: "What are the types of destinations in real-world applications?",
    shortAnswer: "Destinations include retail stores, consumers, hospitals, schools, and other demand points.",
    explanation: "Common destination types: 1) Retail stores (sell to consumers), 2) End consumers (use products), 3) Hospitals (need medical supplies), 4) Schools (need educational materials), 5) Manufacturing plants (need raw materials), 6) Distribution centers (redistribute further).",
    hint: "Any place that needs goods is a potential destination.",
    level: "intermediate",
    codeExample: "Store A (retail), Hospital B (medical), School C (educational)"
  },
  {
    question: "What is the balance condition between sources and destinations?",
    shortAnswer: "The balance condition requires total supply from sources to equal total demand from destinations.",
    explanation: "The balance condition is Σᵢ Sᵢ = Σⱼ Dⱼ. This ensures that all goods from sources exactly satisfy all demands at destinations. If not balanced, the problem requires dummy sources or destinations to balance it before solving.",
    hint: "Total supply must equal total demand.",
    level: "intermediate",
    codeExample: "If ΣSᵢ = 500 and ΣDⱼ = 500, problem is balanced."
  },
  {
    question: "What happens when a source has insufficient supply?",
    shortAnswer: "When supply is insufficient, demand cannot be fully met, requiring dummy sources or alternative arrangements.",
    explanation: "If supply is less than demand: 1) Some destinations will not receive full demand, 2) A dummy source must be added to balance, 3) The dummy source represents unmet demand, 4) Real-world solutions may require prioritizing demand or finding alternative suppliers.",
    hint: "Insufficient supply creates unmet demand.",
    level: "expert",
    codeExample: "If S_total = 400 and D_total = 500, deficit of 100 units."
  },
  {
    question: "What happens when a destination has excess demand?",
    shortAnswer: "Excess demand cannot be met with current sources, requiring additional supply or demand reduction.",
    explanation: "When demand exceeds supply: 1) The problem is infeasible without additional sources, 2) A dummy source is needed for balance, 3) The dummy source represents unmet demand, 4) Real-world solutions may require prioritizing which destinations to supply fully.",
    hint: "Excess demand requires additional supply or reducing demand.",
    level: "expert",
    codeExample: "Demand exceeds supply by 50 units → add dummy source."
  },
  {
    question: "How do transportation costs vary between different source-destination pairs?",
    shortAnswer: "Costs vary based on distance, mode of transportation, handling requirements, and other factors.",
    explanation: "Transportation costs differ because: 1) Distance between source and destination varies, 2) Different shipping modes have different costs, 3) Handling requirements may differ, 4) Some routes may have tolls or fees, 5) Perishable goods may have special requirements, 6) Fuel costs vary by route.",
    hint: "Not all routes cost the same.",
    level: "intermediate",
    codeExample: "c₁₂ = ₹10/km, c₁₃ = ₹15/km (different costs for different routes)."
  },
  {
    question: "What is the significance of source-destination matrix in transportation?",
    shortAnswer: "The source-destination matrix organizes all transportation costs and decisions in a compact format.",
    explanation: "The matrix: 1) Has sources as rows and destinations as columns, 2) Contains costs (cᵢⱼ) in each cell, 3) Shows supply and demand totals, 4) Organizes decision variables (xᵢⱼ), 5) Provides a clear visual representation of the problem, and 6) Facilitates solving and analysis.",
    hint: "The matrix is the central tool for transportation problems.",
    level: "intermediate",
    codeExample: "Matrix with 3 sources × 4 destinations showing all costs."
  },
  {
    question: "How do seasonal changes affect sources and destinations?",
    shortAnswer: "Seasonal changes can affect supply availability at sources and demand patterns at destinations.",
    explanation: "Seasonal effects include: 1) Agricultural sources have seasonal supply, 2) Consumer demand varies by season, 3) Holiday seasons increase demand, 4) Weather affects transportation and availability, 5) Production cycles affect source capacity, and 6) Seasonal products have different demand patterns.",
    hint: "Seasonality changes both supply and demand.",
    level: "expert",
    codeExample: "Winter: higher heating oil demand, summer: higher agricultural supply."
  },
  {
    question: "What is the role of technology in managing sources and destinations?",
    shortAnswer: "Technology helps track, monitor, and optimize the flow between sources and destinations in real-time.",
    explanation: "Technology applications: 1) GPS tracking for real-time location, 2) IoT sensors for monitoring conditions, 3) AI for demand forecasting, 4) Optimization software for routing, 5) Blockchain for transparency, 6) Data analytics for performance monitoring, and 7) Cloud platforms for coordination.",
    hint: "Technology improves visibility and optimization.",
    level: "expert",
    codeExample: "Real-time tracking systems for monitoring shipments."
  },
  {
    question: "What are the challenges in managing multiple sources and destinations?",
    shortAnswer: "Challenges include coordination, data accuracy, dynamic changes, and optimization complexity.",
    explanation: "Key challenges: 1) Coordinating multiple sources and destinations, 2) Maintaining accurate data, 3) Handling dynamic changes in supply and demand, 4) Optimizing large-scale networks, 5) Managing transportation costs, 6) Ensuring timely delivery, and 7) Dealing with disruptions.",
    hint: "Large networks are complex to manage.",
    level: "expert",
    codeExample: "Managing 50 sources and 200 destinations requires sophisticated systems."
  },
  {
    question: "How does globalization affect sources and destinations?",
    shortAnswer: "Globalization expands sources and destinations globally, creating more complex transportation networks.",
    explanation: "Globalization effects: 1) Sources can be anywhere in the world, 2) Destinations can be international, 3) Complex global supply chains, 4) Different regulations and costs, 5) Longer shipping distances, 6) Diverse transportation modes, 7) Cultural and language considerations, and 8) Global risk management.",
    hint: "Global networks are more complex but offer more opportunities.",
    level: "expert",
    codeExample: "Global supply chains with sources in Asia and destinations in Europe."
  },
  {
    question: "What is the relationship between sources and inventory management?",
    shortAnswer: "Sources are closely linked to inventory management, affecting stock levels and replenishment decisions.",
    explanation: "The relationship: 1) Sources supply inventory at destinations, 2) Inventory levels determine replenishment needs, 3) Transportation planning considers inventory holding costs, 4) Safety stock at destinations affects demand, 5) Lead times from sources affect inventory decisions, and 6) Integrated planning optimizes both transportation and inventory.",
    hint: "Transportation and inventory are closely connected.",
    level: "expert",
    codeExample: "Inventory at destinations requires regular replenishment from sources."
  },
  {
    question: "How do sources and destinations relate to facility location decisions?",
    shortAnswer: "Facility location decisions determine where sources and destinations should be located to minimize total costs.",
    explanation: "Facility location: 1) Determines where sources (production facilities) should be located, 2) Influences destination (customer) access, 3) Affects transportation costs, 4) Balances production and distribution costs, 5) Considers proximity to customers and suppliers, and 6) Optimizes the entire network.",
    hint: "Location decisions optimize the source-destination network.",
    level: "expert",
    codeExample: "Choosing warehouse locations to minimize transportation costs."
  },
  {
    question: "What is the impact of disruptions on sources and destinations?",
    shortAnswer: "Disruptions can affect supply at sources or demand at destinations, requiring contingency planning.",
    explanation: "Disruption impacts: 1) Source disruptions (e.g., production issues, natural disasters), 2) Destination disruptions (e.g., demand changes, access problems), 3) Transportation disruptions (e.g., weather, strikes), 4) Ripple effects through the network, 5) Need for contingency plans, and 6) Supply chain resilience considerations.",
    hint: "Plan for disruptions at both sources and destinations.",
    level: "expert",
    codeExample: "Natural disaster at source factory, alternative sources needed."
  },
  {
    question: "How do sources and destinations evolve in dynamic environments?",
    shortAnswer: "Sources and destinations change over time due to market conditions, business strategies, and external factors.",
    explanation: "Evolution factors: 1) New sources added as business grows, 2) Existing sources may close or change capacity, 3) New destinations emerge as markets expand, 4) Demand patterns shift over time, 5) Technology changes source capabilities, 6) Competition affects source and destination dynamics, and 7) Regulatory changes impact operations.",
    hint: "Transportation networks are dynamic and evolve.",
    level: "expert",
    codeExample: "Opening new warehouses (sources) as retail network (destinations) expands."
  },
  {
    question: "What are the future trends in source-destination management?",
    shortAnswer: "Future trends include AI optimization, real-time coordination, sustainability focus, and automated logistics.",
    explanation: "Emerging trends: 1) AI and machine learning for optimization, 2) Real-time dynamic routing, 3) Sustainable and green logistics, 4) Automated and autonomous vehicles, 5) IoT and sensor integration, 6) Predictive analytics for demand and supply, 7) Blockchain for transparency, and 8) Integration with smart city infrastructure.",
    hint: "Technology is transforming how we manage sources and destinations.",
    level: "expert",
    codeExample: "AI-powered dynamic routing for last-mile delivery optimization."
  }
];

export default questions;