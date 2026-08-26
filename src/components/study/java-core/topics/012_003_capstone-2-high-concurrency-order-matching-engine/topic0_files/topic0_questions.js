const topic0_questions = [
  {
    "question": "What does 'Price-Time Priority' (FIFO matching) mean in an exchange order book?",
    "shortAnswer": "Orders with better prices (highest bid for buyers, lowest ask for sellers) are always matched first; if multiple orders share the exact same price, the order that was placed earliest in time is filled first.",
    "explanation": "The global standard matching algorithm for financial exchanges (NSE, NASDAQ, LSE).",
    "hint": "Better price matches first; earlier timestamp breaks ties.",
    "level": "Beginner",
    "codeExample": "Comparator.comparing(Order::price).reversed().thenComparing(Order::timestamp)"
  },
  {
    "question": "What is the Bid-Ask Spread?",
    "shortAnswer": "The difference between the lowest asking price (Best Ask) from sellers and the highest bidding price (Best Bid) from buyers in the market.",
    "explanation": "A key indicator of market liquidity.",
    "hint": "Lowest Ask minus Highest Bid.",
    "level": "Beginner",
    "codeExample": "BigDecimal spread = bestAsk.getPrice().subtract(bestBid.getPrice());"
  }
];

export default topic0_questions;
