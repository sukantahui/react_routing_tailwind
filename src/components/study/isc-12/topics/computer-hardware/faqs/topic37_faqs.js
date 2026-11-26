// Topic 37 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What size multiplexer is required to implement a 4-variable Boolean function using the implementation table method?",
    "answer": "An 8-to-1 multiplexer (2^(4-1) = 2^3 = 8) with 3 selection lines.",
    "explanation": "Because n=4, 2^(n-1) = 8 data inputs are required, and n-1 = 3 variables serve as selection lines."
  },
  {
    "id": 2,
    "question": "In Example 2.13 for F(a, b, c, d), which variable is singled out and which are selection lines?",
    "answer": "Leftmost variable 'a' is singled out; variables b, c, and d connect to select lines S2, S1, and S0.",
    "explanation": "Variable b (highest order of the remaining three) connects to S2; c connects to S1; d (lowest order) connects to S0."
  },
  {
    "id": 3,
    "question": "What are the 8 column pairings in the implementation table for 4 variables with 'a' singled out?",
    "answer": "I0(0,8), I1(1,9), I2(2,10), I3(3,11), I4(4,12), I5(5,13), I6(6,14), I7(7,15).",
    "explanation": "Row 1 (a') contains minterms 0-7; Row 2 (a) contains minterms 8-15. Each column I_k pairs minterm k with k+8."
  },
  {
    "id": 4,
    "question": "For F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), which columns have both minterms circled (Rule 2)?",
    "answer": "Columns I0 (minterms 0, 8) and I1 (minterms 1, 9).",
    "explanation": "Because both 0 and 8 are present in F, I0 = 1. Because both 1 and 9 are present in F, I1 = 1."
  },
  {
    "id": 5,
    "question": "For F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), which columns have neither minterm circled (Rule 1)?",
    "answer": "Columns I2 (2, 10), I5 (5, 13), and I6 (6, 14).",
    "explanation": "None of these minterms appear in the function, so inputs I2, I5, and I6 are tied to logic 0 (GND)."
  },
  {
    "id": 6,
    "question": "For F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), which columns have top minterms circled (Rule 4)?",
    "answer": "Columns I3 (minterm 3 circled) and I4 (minterm 4 circled).",
    "explanation": "Since top minterms (3, 4) are circled and bottom minterms (11, 12) are not, Rule 4 applies: I3 = a' and I4 = a'."
  },
  {
    "id": 7,
    "question": "For F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), which column has the bottom minterm circled (Rule 3)?",
    "answer": "Column I7 (minterm 15 circled, minterm 7 not circled).",
    "explanation": "Since 15 is in Row 'a' and 7 is not in F, Rule 3 applies: I7 = a (uncomplemented)."
  },
  {
    "id": 8,
    "question": "Summarize all 8 data inputs applied to the 8:1 MUX in Example 2.13.",
    "answer": "I0=1, I1=1, I2=0, I3=a', I4=a', I5=0, I6=0, I7=a.",
    "explanation": "These inputs, combined with select lines S2=b, S1=c, S0=d, completely synthesize the 4-variable function."
  },
  {
    "id": 9,
    "question": "How many external NOT gates (inverters) are needed to implement Example 2.13?",
    "answer": "Only ONE inverter gate.",
    "explanation": "A single NOT gate inverts variable 'a' to produce a', which is then connected to both input pins I3 and I4."
  },
  {
    "id": 10,
    "question": "How does the 8:1 MUX compare to discrete logic gate synthesis for Example 2.13?",
    "answer": "The 8:1 MUX replaces seven 4-input AND gates and one 7-input OR gate with a single 16-pin IC and one inverter.",
    "explanation": "Multiplexer synthesis dramatically reduces board space, trace routing, propagation delay, and IC package count."
  },
  {
    "id": 11,
    "question": "How are Don't Care conditions d(...) handled in an 8:1 MUX implementation table?",
    "answer": "A don't-care minterm is circled only if doing so simplifies the column input to a constant 1 (Rule 2).",
    "explanation": "If circling a don't care allows a column to change from 'a' or 'a'' to '1', it eliminates the need for wiring the variable or using an inverter."
  },
  {
    "id": 12,
    "question": "What happens if an unselected data input pin of an 8:1 MUX is left floating?",
    "answer": "In modern CMOS technology, floating inputs pick up noise and cause undefined logic states and high power draw; they must be tied to GND or VCC.",
    "explanation": "All unused or 0 inputs must be tied securely to ground, and 1 inputs to supply voltage."
  },
  {
    "id": 13,
    "question": "Can an 8:1 MUX implement a 5-variable Boolean function? Explain how.",
    "answer": "Yes, by connecting 3 variables to select lines and driving the 8 inputs with 2-variable sub-functions synthesized with external gates.",
    "explanation": "Shannon's expansion with 3 select lines leaves 2 residual variables; each input receives a sub-function of those two variables."
  },
  {
    "id": 14,
    "question": "What is the Boolean equation of the 8:1 MUX output F in Example 2.13?",
    "answer": "F = Σ (m_i · I_i) = b'c'd'(1) + b'c'd(1) + b'cd(a') + bc'd'(a') + bcd(a).",
    "explanation": "Substituting the derived input values into the 8:1 MUX expansion produces the exact sum-of-minterms for F."
  },
  {
    "id": 15,
    "question": "What are the key diagrams required by CISCE board examiners for Example 2.13?",
    "answer": "The 8-column implementation table with circled minterms, list of input equations with rule numbers, and the labeled 8:1 MUX block schematic.",
    "explanation": "Full marks require explicit demonstration of the implementation table, rule identification, and clear pin labeling."
  },
  {
    "id": 16,
    "question": "In Textbook Page 109 Example 2.13, what is the function to be realized?",
    "answer": "F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15) using an 8-to-1 Multiplexer.",
    "explanation": "A standard 4-variable textbook master problem."
  },
  {
    "id": 17,
    "question": "How are the 8 data input channels (I0 to I7) paired in Example 2.13?",
    "answer": "I0:(0,1), I1:(2,3), I2:(4,5), I3:(6,7), I4:(8,9), I5:(10,11), I6:(12,13), I7:(14,15).",
    "explanation": "Each channel I_k pairs minterms (2k, 2k+1) under singled-out variable d."
  },
  {
    "id": 18,
    "question": "Which minterms are circled in the implementation table for Example 2.13?",
    "answer": "Minterms 0, 1, 3, 4, 8, 9, and 15 are circled.",
    "explanation": "These correspond to the 1-outputs of the function F."
  },
  {
    "id": 19,
    "question": "Why is I0 = 1 in Example 2.13?",
    "answer": "Both minterms 0 (d' row) and 1 (d row) are circled; by Rule 2, when both are circled, the input is connected to logic 1 (+5V).",
    "explanation": "Output is 1 regardless of variable d."
  },
  {
    "id": 20,
    "question": "Why is I2 = d' in Example 2.13?",
    "answer": "Minterm 4 (d' row) is circled and minterm 5 (d row) is uncircled; by Rule 3, when only the d' cell is circled, Input = d'.",
    "explanation": "Output is 1 when d = 0."
  },
  {
    "id": 21,
    "question": "Why are inputs I3, I5, and I6 connected to logic 0 (GND)?",
    "answer": "None of the minterms in columns I3(6,7), I5(10,11), or I6(12,13) are present in the function; by Rule 1, Input = 0.",
    "explanation": "Output is 0 for both states of variable d."
  },
  {
    "id": 22,
    "question": "What are the final values of all 8 data inputs in Example 2.13?",
    "answer": "I0 = 1, I1 = d, I2 = d', I3 = 0, I4 = 1, I5 = 0, I6 = 0, I7 = d.",
    "explanation": "The complete set of derived inputs for the 8:1 MUX."
  },
  {
    "id": 23,
    "question": "How is the circuit drawn according to Example 2.13?",
    "answer": "8:1 MUX with S2=a, S1=b, S0=c. Inputs I0, I4 connected to Vcc (1); I3, I5, I6 connected to GND (0); I1, I7 connected to d; I2 connected to d via an inverter; Output Y = F.",
    "explanation": "Complete schematic diagram for Example 2.13."
  },
  {
    "id": 24,
    "question": "Verify the circuit output for minterm 15 (a=1, b=1, c=1, d=1).",
    "answer": "Select lines S2S1S0 = 111, routing input I7 to Y. Since I7 = d and d = 1, Output Y = 1. Matches minterm 15 = 1.",
    "explanation": "Verifies correct operation for input 1111."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for Example 2.13?",
    "answer": "Implement F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15) using an 8-to-1 MUX. Show the Implementation Table and draw the logic circuit diagram.",
    "explanation": "A classic 4-mark problem appearing in CISCE board question papers."
  }
];

export default faqs;
