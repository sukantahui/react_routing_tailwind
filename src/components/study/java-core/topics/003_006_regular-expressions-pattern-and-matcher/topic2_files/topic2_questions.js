const topic2_questions = [
  {
    "question": "How do 'matcher.find()' and 'matcher.group()' work together in a while loop?",
    "shortAnswer": "'matcher.find()' scans the input sequence looking for the NEXT subsequence that matches the pattern and advances the internal match cursor (returns true if found, false when exhausted). Inside the loop, 'matcher.group()' returns the exact matched substring.",
    "explanation": "'matcher.start()' and 'matcher.end()' return the boundary character indices of the match.",
    "hint": "find() advances to the next matching subsequence; group() returns the matched text.",
    "level": "Beginner",
    "codeExample": "while (matcher.find()) { System.out.println(matcher.group()); }"
  }
];

export default topic2_questions;
