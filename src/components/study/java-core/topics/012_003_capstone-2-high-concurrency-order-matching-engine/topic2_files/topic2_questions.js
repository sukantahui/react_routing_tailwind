const topic2_questions = [
  {
    "question": "Why is the execution price of a matched trade determined by the resting Maker order rather than the incoming Taker order?",
    "shortAnswer": "Because the resting order was placed earlier in time and advertised a firm commitment at that price; the incoming taker accepted that resting liquidity, so the trade settles at the resting limit price.",
    "explanation": "Fundamental pricing rule in continuous double auctions.",
    "hint": "Settles at the resting maker's price because that liquidity was posted first.",
    "level": "Intermediate",
    "codeExample": "BigDecimal tradePrice = restingOrder.getPrice();"
  },
  {
    "question": "What happens to the remaining unfilled quantity of a Limit Order after all crossing orders are exhausted?",
    "shortAnswer": "The remaining quantity is inserted as a resting limit order into the matching book at its designated price level, providing liquidity for future incoming orders.",
    "explanation": "Transitions from active taker to passive resting maker.",
    "hint": "Enters the order book as a resting order.",
    "level": "Beginner",
    "codeExample": "if (order.getRemainingQty() > 0) book.addOrder(order);"
  }
];

export default topic2_questions;
