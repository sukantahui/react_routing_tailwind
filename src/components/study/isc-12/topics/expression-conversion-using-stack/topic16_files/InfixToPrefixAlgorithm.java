// InfixToPrefixAlgorithm.java
// Complete implementation of the infix‑to‑prefix algorithm.

import java.util.*;

public class InfixToPrefixAlgorithm {

    // Precedence map
    private static final Map<Character, Integer> PRECEDENCE = new HashMap<>();
    static {
        PRECEDENCE.put('+', 1);
        PRECEDENCE.put('-', 1);
        PRECEDENCE.put('*', 2);
        PRECEDENCE.put('/', 2);
        PRECEDENCE.put('^', 3);
    }

    // Helper: check if character is an operator
    private static boolean isOperator(char c) {
        return PRECEDENCE.containsKey(c);
    }

    // Helper: check if character is an operand (letter or digit)
    private static boolean isOperand(char c) {
        return Character.isLetterOrDigit(c);
    }

    // Helper: reverse a string
    private static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    // Helper: swap parentheses in a string
    private static String swapParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '(') sb.append(')');
            else if (c == ')') sb.append('(');
            else sb.append(c);
        }
        return sb.toString();
    }

    // Modified infix‑to‑postfix (does NOT pop equal precedence)
    private static String infixToPostfixModified(String expr) {
        StringBuilder output = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char token : expr.toCharArray()) {
            if (isOperand(token)) {
                output.append(token);
            } else if (token == '(') {
                stack.push(token);
            } else if (token == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    output.append(stack.pop());
                }
                if (!stack.isEmpty() && stack.peek() == '(') {
                    stack.pop(); // discard '('
                } else {
                    throw new IllegalArgumentException("Mismatched parentheses");
                }
            } else if (isOperator(token)) {
                // Important: only pop if precedence is STRICTLY greater
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       PRECEDENCE.get(stack.peek()) > PRECEDENCE.get(token)) {
                    output.append(stack.pop());
                }
                stack.push(token);
            } else {
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
        // Step 3: Apply modified postfix
        String postfixLike = infixToPostfixModified(swapped);
        // Step 4: Reverse the result
        return reverse(postfixLike);
    }

    // Trace version for debugging
    public static void infixToPrefixWithTrace(String infix) {
        System.out.println("=== Infix to Prefix Trace ===");
        System.out.println("Input: " + infix);

        String reversed = reverse(infix);
        System.out.println("1. Reverse: " + reversed);

        String swapped = swapParentheses(reversed);
        System.out.println("2. Swap parentheses: " + swapped);

        System.out.println("3. Apply modified postfix:");
        // We could implement a trace here, but for brevity we just call the method.
        String postfixLike = infixToPostfixModified(swapped);
        System.out.println("   Result: " + postfixLike);

        String prefix = reverse(postfixLike);
        System.out.println("4. Reverse output: " + prefix);
        System.out.println("Prefix: " + prefix);
        System.out.println("==============================");
    }

    public static void main(String[] args) {
        String[] testExpressions = {
            "A+B",
            "A+B*C",
            "(A+B)*C",
            "A*B+C*D",
            "A+B*C-D",
            "A^B^C",
            "(A+B)*(C-D)",
            "A*(B+C)-D/E"
        };

        for (String expr : testExpressions) {
            try {
                infixToPrefixWithTrace(expr);
                System.out.println();
            } catch (IllegalArgumentException e) {
                System.out.println("Error converting '" + expr + "': " + e.getMessage());
                System.out.println();
            }
        }
    }
}