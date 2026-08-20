const questions = [
  {
    question: "What is the objective function in the advertising example?",
    shortAnswer: "Maximize Z = 10000x + 5000y.",
    explanation: "Each TV ad reaches 10,000 people, each Radio ad reaches 5,000 people.",
    hint: "Z = 10000x + 5000y.",
    level: "basic",
    codeExample: "Z = 10000x + 5000y"
  },
  {
    question: "What are the constraints in the advertising example?",
    shortAnswer: "2000x+1000y≤40000 (budget), 10000x+5000y≥150000 (reach), x≥5 (contract).",
    explanation: "Budget: ₹40,000. Reach: at least 150,000 people. Contract: at least 5 TV ads.",
    hint: "Budget, reach, contract.",
    level: "basic",
    codeExample: "2000x+1000y≤40000, 10000x+5000y≥150000, x≥5."
  },
  {
    question: "What are the simplified constraints?",
    shortAnswer: "2x + y ≤ 40, 2x + y ≥ 30, x ≥ 5.",
    explanation: "Divide budget constraint by 1000, reach constraint by 5000.",
    hint: "2x+y≤40, 2x+y≥30, x≥5.",
    level: "intermediate",
    codeExample: "2x+y≤40, 2x+y≥30, x≥5."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "Multiple optimal solutions with Z = 200,000.",
    explanation: "B(5,30), C(15,10), and D(20,0) all give reach of 200,000 people.",
    hint: "Multiple optima.",
    level: "intermediate",
    codeExample: "B(5,30), C(15,10), D(20,0) all give Z=200,000."
  },
  {
    question: "What is the reach at (5,20)?",
    shortAnswer: "150,000 people.",
    explanation: "At (5,20), Z = 10000(5) + 5000(20) = 50,000 + 100,000 = 150,000.",
    hint: "Z = 150,000.",
    level: "basic",
    codeExample: "(5,20) gives Z=150,000."
  },
  {
    question: "What is the reach at (5,30)?",
    shortAnswer: "200,000 people.",
    explanation: "At (5,30), Z = 10000(5) + 5000(30) = 50,000 + 150,000 = 200,000.",
    hint: "Z = 200,000.",
    level: "basic",
    codeExample: "(5,30) gives Z=200,000."
  },
  {
    question: "What is the reach at (15,10)?",
    shortAnswer: "200,000 people.",
    explanation: "At (15,10), Z = 10000(15) + 5000(10) = 150,000 + 50,000 = 200,000.",
    hint: "Z = 200,000.",
    level: "basic",
    codeExample: "(15,10) gives Z=200,000."
  },
  {
    question: "What is the reach at (20,0)?",
    shortAnswer: "200,000 people.",
    explanation: "At (20,0), Z = 10000(20) + 5000(0) = 200,000.",
    hint: "Z = 200,000.",
    level: "basic",
    codeExample: "(20,0) gives Z=200,000."
  },
  {
    question: "Why are there multiple optimal solutions?",
    shortAnswer: "Because the objective line is parallel to the budget constraint.",
    explanation: "Both have slope -2, so the objective line overlaps the budget constraint edge.",
    hint: "Parallel lines.",
    level: "intermediate",
    codeExample: "Z/5000 = 2x + y, budget: 2x + y = 40."
  },
  {
    question: "What is the budget constraint?",
    shortAnswer: "2000x + 1000y ≤ 40000 or simplified: 2x + y ≤ 40.",
    explanation: "TV ads cost ₹2000, Radio ads cost ₹1000, total budget ₹40,000.",
    hint: "2x + y ≤ 40.",
    level: "basic",
    codeExample: "2x + y ≤ 40."
  },
  {
    question: "What is the reach constraint?",
    shortAnswer: "10000x + 5000y ≥ 150000 or simplified: 2x + y ≥ 30.",
    explanation: "Need to reach at least 150,000 people.",
    hint: "2x + y ≥ 30.",
    level: "basic",
    codeExample: "2x + y ≥ 30."
  },
  {
    question: "What is the contract requirement?",
    shortAnswer: "x ≥ 5 (at least 5 TV ads).",
    explanation: "The company must run at least 5 TV ads due to a contract.",
    hint: "x ≥ 5.",
    level: "basic",
    codeExample: "x ≥ 5."
  },
  {
    question: "What is the cost of a TV ad?",
    shortAnswer: "₹2000.",
    explanation: "Each TV ad costs ₹2000.",
    hint: "₹2000.",
    level: "basic",
    codeExample: "TV ad: ₹2000."
  },
  {
    question: "What is the cost of a Radio ad?",
    shortAnswer: "₹1000.",
    explanation: "Each Radio ad costs ₹1000.",
    hint: "₹1000.",
    level: "basic",
    codeExample: "Radio ad: ₹1000."
  },
  {
    question: "What is the reach of a TV ad?",
    shortAnswer: "10,000 people.",
    explanation: "Each TV ad reaches 10,000 people.",
    hint: "10,000.",
    level: "basic",
    codeExample: "TV: 10,000 reach."
  },
  {
    question: "What is the reach of a Radio ad?",
    shortAnswer: "5,000 people.",
    explanation: "Each Radio ad reaches 5,000 people.",
    hint: "5,000.",
    level: "basic",
    codeExample: "Radio: 5,000 reach."
  },
  {
    question: "What is the total budget available?",
    shortAnswer: "₹40,000.",
    explanation: "The company has ₹40,000 to spend on advertising.",
    hint: "₹40,000.",
    level: "basic",
    codeExample: "Budget = ₹40,000."
  },
  {
    question: "What is the minimum reach requirement?",
    shortAnswer: "150,000 people.",
    explanation: "The company wants to reach at least 150,000 people.",
    hint: "150,000.",
    level: "basic",
    codeExample: "Reach ≥ 150,000."
  },
  {
    question: "Which media has higher reach per ad?",
    shortAnswer: "TV (10,000 vs 5,000 for Radio).",
    explanation: "TV ads reach more people per ad.",
    hint: "TV reaches more.",
    level: "basic",
    codeExample: "TV: 10,000, Radio: 5,000."
  },
  {
    question: "Which media has higher cost per ad?",
    shortAnswer: "TV (₹2000 vs ₹1000 for Radio).",
    explanation: "TV ads cost more per ad.",
    hint: "TV costs more.",
    level: "basic",
    codeExample: "TV: ₹2000, Radio: ₹1000."
  },
  {
    question: "What is the reach per rupee for TV?",
    shortAnswer: "5 people per rupee (10,000/2000).",
    explanation: "TV gives 5 people reached per rupee spent.",
    hint: "5 people/rupee.",
    level: "intermediate",
    codeExample: "10,000/2000 = 5."
  },
  {
    question: "What is the reach per rupee for Radio?",
    shortAnswer: "5 people per rupee (5,000/1000).",
    explanation: "Radio also gives 5 people reached per rupee spent.",
    hint: "5 people/rupee.",
    level: "intermediate",
    codeExample: "5,000/1000 = 5."
  },
  {
    question: "Why do TV and Radio have the same reach per rupee?",
    shortAnswer: "Because the objective line is parallel to the budget constraint.",
    explanation: "Both media have the same efficiency (5 people per rupee), so any combination on the budget line is optimal.",
    hint: "Same efficiency.",
    level: "intermediate",
    codeExample: "Both give 5 people/rupee."
  },
  {
    question: "What happens if the budget increases?",
    shortAnswer: "The optimal reach would increase.",
    explanation: "With more budget, the company can run more ads and reach more people.",
    hint: "More budget → more reach.",
    level: "intermediate",
    codeExample: "If budget = 50,000, new optimum may be higher."
  },
  {
    question: "What is the maximum reach?",
    shortAnswer: "200,000 people.",
    explanation: "The maximum reach is 200,000 people.",
    hint: "200,000.",
    level: "basic",
    codeExample: "Z = 200,000."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "Multiple optimal solutions can exist when the objective is parallel to a constraint.",
    explanation: "This gives flexibility in decision-making.",
    hint: "Multiple optima.",
    level: "basic",
    codeExample: "Parallel lines = multiple optima."
  },
  {
    question: "How many optimal solutions are there?",
    shortAnswer: "Infinitely many along the edge 2x + y = 40.",
    explanation: "Any point on the budget line between B and D is optimal.",
    hint: "Infinite optima.",
    level: "expert",
    codeExample: "All points on 2x+y=40 between (5,30) and (20,0)."
  },
  {
    question: "What is the slope of the objective function?",
    shortAnswer: "-2 (since Z/5000 = 2x + y).",
    explanation: "The objective line has slope -2.",
    hint: "Slope = -2.",
    level: "intermediate",
    codeExample: "2x + y = Z/5000 → slope = -2."
  },
  {
    question: "What is the slope of the budget constraint?",
    shortAnswer: "-2 (2x + y = 40).",
    explanation: "The budget constraint has slope -2.",
    hint: "Slope = -2.",
    level: "intermediate",
    codeExample: "2x + y = 40 → slope = -2."
  },
  {
    question: "Why is (0,30) not optimal?",
    shortAnswer: "Because it violates the contract requirement x ≥ 5.",
    explanation: "At (0,30), x=0 which is less than 5.",
    hint: "x=0 < 5.",
    level: "intermediate",
    codeExample: "(0,30) has x=0, violates x≥5."
  },
  {
    question: "What is the shadow price of the budget?",
    shortAnswer: "The amount reach increases with one more rupee.",
    explanation: "Shadow price tells the value of an additional unit of budget.",
    hint: "Value of extra budget.",
    level: "expert",
    codeExample: "Shadow price of budget = 5 (people per rupee)."
  }
];

export default questions;