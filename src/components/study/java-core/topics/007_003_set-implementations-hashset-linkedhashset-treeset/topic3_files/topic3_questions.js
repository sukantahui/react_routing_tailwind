const topic3_questions = [
  {
    "question": "Describe the exact 2-step process used by 'HashSet' to determine if an incoming element is a duplicate.",
    "shortAnswer": "1. 'Bucket Calculation (hashCode)': HashSet calls 'element.hashCode()' to compute the hash and identify the target bucket index. If the bucket is empty, the element is inserted immediately with zero collision. 2. 'Equality Verification (equals)': If the bucket already contains nodes with matching hash codes, HashSet calls 'existingElement.equals(newElement)'. If 'equals()' returns true, the element is rejected as a duplicate; if false, it is chained into the bucket.",
    "explanation": "Foundational hash bucket insertion algorithm in Java Collections.",
    "hint": "Step 1: hashCode() finds bucket. Step 2: equals() confirms if elements are identical.",
    "level": "Intermediate",
    "codeExample": "if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k)))) // Duplicate!"
  }
];

export default topic3_questions;