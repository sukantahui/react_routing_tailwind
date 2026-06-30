// InfixToPrefixRules.java
// Demonstrates the rules for converting infix to prefix using a stack.

import java.util.*;

public class InfixToPrefixRules {

    // Precedence map
    private static final Map<Character, Integer> PRECEDENCE = new HashMap<>();
    static {
        PRECEDENCE.put('+', 1);
        PRECEDENCE.put('-', 1);
        PRECEDENCE.put('*', 2);
        PRECEDENCE.put('/', 2);
        PRECEDENCE.put('^', 3);
    }

    // Helper to check if char is an operator
    private static boolean isOperator(char c) {
        return PRECEDENCE.containsKey(c);
    }

    // Helper to reverse a string
    private static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    // Helper to swap parentheses
    private static String swapParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '(') sb.append(')');
            else if (c == ')') sb.append('(');
            else sb.append(c);
        }
        return sb.toString();
    }

    // Infix to postfix (with a twist: not popping equal precedence)
    private static String infixToPostfixModified(String infix) {
        StringBuilder output = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char token : infix.toCharArray()) {
            if (Character.isLetterOrDigit(token)) {
                output.append(token);
            }
            else if (token == '(') {
                stack.push(token);
            }
            else if (token == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    output.append(stack.pop());
                }
                if (!stack.isEmpty() && stack.peek() == '(') {
                    stack.pop(); // discard '('
                } else {
                    throw new IllegalArgumentException("Mismatched parentheses");
                }
            }
            else if (isOperator(token)) {
                // Important: Do NOT pop equal precedence (prefix is right‑associative)
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       PRECEDENCE.get(stack.peek()) > PRECEDENCE.get(token)) {
                    output.append(stack.pop());
                }
                stack.push(token);
            }
            else {
                throw new IllegalArgumentException("Invalid character: " + token);
            }
        }

        while (!stack.isEmpty()) {
            if (stack.peek() == '(') {
                throw new IllegalArgumentException("Mismatched parentheses: extra '('");
            }
            output.append(stack.pop());
        }

        return output.toString();
    }

    // Main conversion function
    public static String infixToPrefix(String infix) {
        // Step 1: Reverse
        String reversed = reverse(infix);
        // Step 2: Swap parentheses
        String swapped = swapParentheses(reversed);
        // Step 3: Apply modified postfix algorithm (no equal precedence popping)
        String postfixLike = infixToPostfixModified(swapped);
        // Step 4: Reverse the result
        return reverse(postfixLike);
    }

    public static void main(String[] args) {
        String[] testExpressions = {
            "A+B",
            "A+B*C",
            "(A+B)*C",
            "A*B+C*D",
            "A+B*C-D",
            "A^B^C",
            "(A+B)*(C-D)"
        };

        for (String expr : testExpressions) {
            try {
                String prefix = infixToPrefix(expr);
                System.out.printf("Infix: %-15s → Prefix: %s%n", expr, prefix);
            } catch (IllegalArgumentException e) {
                System.out.printf("Infix: %-15s → Error: %s%n", expr, e.getMessage());
            }
        }
    }
}