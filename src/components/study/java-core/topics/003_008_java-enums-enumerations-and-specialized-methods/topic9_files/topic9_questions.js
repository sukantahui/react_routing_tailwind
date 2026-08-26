const topic9_questions = [
  {
    "question": "Why are Java Enums uniquely suited for implementing Finite State Machines (FSM)?",
    "shortAnswer": "Because enums represent a closed, finite set of discrete states where transitions can be modeled cleanly as constant-specific method overrides (e.g. 'state = state.nextState()'). This prevents invalid state transitions at compile time without bulky state classes.",
    "explanation": "Widely used for order management (PLACED -> PAID -> SHIPPED) and payment gateways.",
    "hint": "Enums model discrete states and enforce valid transitions via polymorphic methods.",
    "level": "Intermediate",
    "codeExample": "OrderState current = OrderState.CREATED; current = current.nextState();"
  }
];

export default topic9_questions;