// InfixToPostfixRules.java
// Demonstrates the rules for converting infix to postfix using a stack.

import java.util.Stack;

public class InfixToPostfixRules {
    // Returns precedence of an operator
    public static int precedence(char op) {
        switch (op) {
            case '+': case '-': return 1;
            case '*': case '/': return 2;
            case '^': return 3; // exponentiation (right‑associative)
            default: return -1;
        }
    }

    // Returns true if operator is left‑associative
    public static boolean isLeftAssociative(char op) {
        return op != '^'; // exponentiation is right‑associative
    }

    // Converts infix to postfix
    public static String infixToPostfix(String infix) {
        StringBuilder postfix = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char ch : infix.toCharArray()) {
            // Rule 1: Operand → output
            if (Character.isLetterOrDigit(ch)) {
                postfix.append(ch);
            }
            // Rule 2: '(' → push
            else if (ch == '(') {
                stack.push(ch);
            }
            // Rule 3: ')' → pop until '('
            else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    postfix.append(stack.pop());
                }
                if (!stack.isEmpty() && stack.peek() == '(') {
                    stack.pop(); // discard '('
                } else {
                    throw new IllegalArgumentException("Mismatched parentheses");
                }
            }
            // Rule 4: Operator
            else {
                // Precedence handling
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       (precedence(stack.peek()) > precedence(ch) ||
                        (precedence(stack.peek()) == precedence(ch) && isLeftAssociative(ch)))) {
                    postfix.append(stack.pop());
                }
                stack.push(ch);
            }
        }

        // Rule 5: Pop remaining operators
        while (!stack.isEmpty()) {
            if (stack.peek() == '(') {
                throw new IllegalArgumentException("Mismatched parentheses");
            }
            postfix.append(stack.pop());
        }

        return postfix.toString();
    }

    public static void main(String[] args) {
        String[] tests = {
            "A+B",
            "A+B*C",
            "(A+B)*C",
            "A*B+C",
            "A+B*C+D",
            "A+B*C-D",
            "(A+B)*(C-D)",
            "A+B^C" // exponentiation is right‑associative
        };

        for (String expr : tests) {
            String postfix = infixToPostfix(expr);
            System.out.println("Infix: " + expr + " → Postfix: " + postfix);
        }
    }
}