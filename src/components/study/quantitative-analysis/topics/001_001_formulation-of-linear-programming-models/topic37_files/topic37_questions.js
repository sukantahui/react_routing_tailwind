// topic37_files/topic37_questions.js

const questions = [
  {
    question: "What are the main business applications of LP?",
    shortAnswer: "Manufacturing, logistics, finance, and marketing.",
    explanation: "LP is used across all business functions to optimize decisions.",
    hint: "Think about where optimization is needed.",
    level: "basic"
  },
  {
    question: "How is LP used in manufacturing?",
    shortAnswer: "Production planning, product mix, and capacity planning.",
    explanation: "Manufacturers use LP to decide what to produce and how much.",
    hint: "Think about factory decisions.",
    level: "basic"
  },
  {
    question: "How is LP used in logistics?",
    shortAnswer: "Transportation, route optimization, and warehouse location.",
    explanation: "Logistics companies use LP to minimize shipping costs.",
    hint: "Think about moving goods.",
    level: "basic"
  },
  {
    question: "How is LP used in finance?",
    shortAnswer: "Portfolio optimization, asset allocation, and risk management.",
    explanation: "Financial institutions use LP to maximize returns and minimize risk.",
    hint: "Think about investing money.",
    level: "basic"
  },
  {
    question: "How is LP used in healthcare?",
    shortAnswer: "Staff scheduling, resource allocation, and patient scheduling.",
    explanation: "Hospitals use LP to optimize staffing and resource use.",
    hint: "Think about hospital operations.",
    level: "basic"
  },
  {
    question: "How is LP used in education?",
    shortAnswer: "School budgeting, teacher assignment, and course scheduling.",
    explanation: "Schools use LP to allocate resources and schedule classes.",
    hint: "Think about school operations.",
    level: "basic"
  },
  {
    question: "How is LP used in government?",
    shortAnswer: "Public resource allocation, infrastructure planning, and social programs.",
    explanation: "Governments use LP to allocate budgets and plan services.",
    hint: "Think about government services.",
    level: "basic"
  },
  {
    question: "How is LP used in agriculture?",
    shortAnswer: "Crop selection, land allocation, and water management.",
    explanation: "Farmers use LP to choose crops and allocate resources.",
    hint: "Think about farming decisions.",
    level: "basic"
  },
  {
    question: "How is LP used in environmental applications?",
    shortAnswer: "Pollution control, waste management, and renewable energy.",
    explanation: "Environmental agencies use LP to minimize environmental impact.",
    hint: "Think about environmental protection.",
    level: "basic"
  },
  {
    question: "What is a real-world case study of LP in airlines?",
    shortAnswer: "Crew scheduling and aircraft assignment.",
    explanation: "Airlines use LP to assign crews to flights to minimize costs.",
    hint: "Think about airline operations.",
    level: "moderate"
  },
  {
    question: "What is a real-world case study of LP in healthcare?",
    shortAnswer: "Nurse scheduling in hospitals.",
    explanation: "Hospitals use LP to schedule nurses to meet patient needs.",
    hint: "Think about hospital staffing.",
    level: "moderate"
  },
  {
    question: "What is a real-world case study of LP in agriculture?",
    shortAnswer: "Crop rotation planning.",
    explanation: "Farmers use LP to plan crop rotations for maximum profit.",
    hint: "Think about crop planning.",
    level: "moderate"
  },
  {
    question: "What is a common mistake in applying LP?",
    shortAnswer: "Overlooking real-world constraints.",
    explanation: "Real-world problems have many constraints that must be included.",
    hint: "Don't simplify too much.",
    level: "moderate"
  },
  {
    question: "Why is LP so widely used?",
    shortAnswer: "Because it's versatile and can be applied to many problems.",
    explanation: "LP can model a wide range of optimization problems.",
    hint: "Think about its flexibility.",
    level: "basic"
  },
  {
    question: "What is the role of LP in supply chain management?",
    shortAnswer: "Optimizing production, inventory, and distribution.",
    explanation: "LP helps supply chains run more efficiently.",
    hint: "Think about the entire supply chain.",
    level: "moderate"
  },
  {
    question: "How does LP help in decision-making?",
    shortAnswer: "By providing quantitative, optimal solutions.",
    explanation: "LP gives decision-makers the best possible solution.",
    hint: "Think about making better decisions.",
    level: "moderate"
  },
  {
    question: "What is a non-profit application of LP?",
    shortAnswer: "Donation allocation and volunteer scheduling.",
    explanation: "Non-profits use LP to allocate resources effectively.",
    hint: "Think about non-profit operations.",
    level: "moderate"
  },
  {
    question: "How is LP used in marketing?",
    shortAnswer: "Advertising budget allocation and media mix optimization.",
    explanation: "Marketers use LP to maximize reach with limited budgets.",
    hint: "Think about marketing decisions.",
    level: "moderate"
  },
  {
    question: "What is the most common LP application?",
    shortAnswer: "Resource allocation.",
    explanation: "LP is most often used to allocate limited resources.",
    hint: "Think about what LP does best.",
    level: "basic"
  },
  {
    question: "How does LP help with sustainability?",
    shortAnswer: "By optimizing resource use and reducing waste.",
    explanation: "LP can minimize environmental impact while meeting goals.",
    hint: "Think about environmental goals.",
    level: "moderate"
  },
  {
    question: "What is a transportation application of LP?",
    shortAnswer: "Route planning and fleet scheduling.",
    explanation: "Transportation companies use LP to optimize routes.",
    hint: "Think about transportation operations.",
    level: "moderate"
  },
  {
    question: "How is LP used in public policy?",
    shortAnswer: "Resource allocation and program evaluation.",
    explanation: "Policymakers use LP to allocate resources to programs.",
    hint: "Think about government programs.",
    level: "moderate"
  },
  {
    question: "What is the key to successful LP application?",
    shortAnswer: "Understanding the problem and constraints.",
    explanation: "A well-formulated model is essential for success.",
    hint: "Think about what makes LP work.",
    level: "moderate"
  },
  {
    question: "How is LP used in emergency response?",
    shortAnswer: "Resource allocation and logistics planning.",
    explanation: "Emergency services use LP to allocate resources during crises.",
    hint: "Think about emergency management.",
    level: "moderate"
  },
  {
    question: "What is a common application of LP in retail?",
    shortAnswer: "Inventory management and staffing.",
    explanation: "Retailers use LP to optimize inventory levels and staff schedules.",
    hint: "Think about retail operations.",
    level: "moderate"
  },
  {
    question: "How does LP help in project management?",
    shortAnswer: "Resource allocation and scheduling.",
    explanation: "Project managers use LP to allocate resources to tasks.",
    hint: "Think about managing projects.",
    level: "moderate"
  },
  {
    question: "What is the future of LP applications?",
    shortAnswer: "Growing with AI and data analytics.",
    explanation: "LP is increasingly combined with machine learning for better decisions.",
    hint: "Think about technology trends.",
    level: "expert"
  },
  {
    question: "Why should students learn LP?",
    shortAnswer: "Because it's a powerful decision-making tool used everywhere.",
    explanation: "LP skills are valuable in almost any career.",
    hint: "Think about career applications.",
    level: "basic"
  },
  {
    question: "What is a social application of LP?",
    shortAnswer: "Social program optimization and resource allocation.",
    explanation: "LP helps social programs reach more people with limited resources.",
    hint: "Think about social services.",
    level: "moderate"
  },
  {
    question: "How does LP contribute to economic development?",
    shortAnswer: "By optimizing resource allocation and efficiency.",
    explanation: "LP helps economies grow by using resources better.",
    hint: "Think about economic growth.",
    level: "expert"
  }
];

export default questions;