// InfixToPostfixAlgorithm.java
// Complete implementation of the infix‑to‑postfix algorithm.

import java.util.*;

public class InfixToPostfixAlgorithm {

    // Precedence map
    private static final Map<Character, Integer> PRECEDENCE = new HashMap<>();
    static {
        PRECEDENCE.put('+', 1);
        PRECEDENCE.put('-', 1);
        PRECEDENCE.put('*', 2);
        PRECEDENCE.put('/', 2);
        PRECEDENCE.put('^', 3);
    }

    // Associativity: true if left‑associative, false if right‑associative
    private static boolean isLeftAssociative(char op) {
        return op != '^'; // exponentiation is right‑associative
    }

    public static String infixToPostfix(String infix) {
        StringBuilder postfix = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char token : infix.toCharArray()) {
            // Skip whitespace
            if (Character.isWhitespace(token)) continue;

            // 1. Operand → output
            if (Character.isLetterOrDigit(token)) {
                postfix.append(token);
            }
            // 2. '(' → push
            else if (token == '(') {
                stack.push(token);
            }
            // 3. ')' → pop until '('
            else if (token == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    postfix.append(stack.pop());
                }
                if (!stack.isEmpty() && stack.peek() == '(') {
                    stack.pop(); // discard '('
                } else {
                    throw new IllegalArgumentException("Mismatched parentheses: extra ')'");
                }
            }
            // 4. Operator
            else if (PRECEDENCE.containsKey(token)) {
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       (PRECEDENCE.get(stack.peek()) > PRECEDENCE.get(token) ||
                        (PRECEDENCE.get(stack.peek()).equals(PRECEDENCE.get(token)) && isLeftAssociative(token)))) {
                    postfix.append(stack.pop());
                }
                stack.push(token);
            }
            else {
                throw new IllegalArgumentException("Invalid character: " + token);
            }
        }

        // 5. Pop remaining operators
        while (!stack.isEmpty()) {
            if (stack.peek() == '(') {
                throw new IllegalArgumentException("Mismatched parentheses: extra '('");
            }
            postfix.append(stack.pop());
        }

        return postfix.toString();
    }

    public static void main(String[] args) {
        String[] testExpressions = {
            "A+B",
            "A+B*C",
            "(A+B)*C",
            "A*B+C*D",
            "A+B*C+D",
            "A-B-C",
            "A^B^C",
            "(A+B)*(C-D)",
            "A*(B+C)-D/E"
        };

        for (String expr : testExpressions) {
            try {
                String postfix = infixToPostfix(expr);
                System.out.printf("Infix: %-15s → Postfix: %s%n", expr, postfix);
            } catch (IllegalArgumentException e) {
                System.out.printf("Infix: %-15s → Error: %s%n", expr, e.getMessage());
            }
        }
    }
}