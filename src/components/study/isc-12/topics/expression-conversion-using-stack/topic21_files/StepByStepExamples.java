// StepByStepExamples.java
// Demonstrates infix‑to‑prefix conversion with complete traces.

import java.util.*;

public class StepByStepExamples {

    private static final Map<Character, Integer> PRECEDENCE = new HashMap<>();
    static {
        PRECEDENCE.put('+', 1);
        PRECEDENCE.put('-', 1);
        PRECEDENCE.put('*', 2);
        PRECEDENCE.put('/', 2);
        PRECEDENCE.put('^', 3);
    }

    private static boolean isOperator(char c) { return PRECEDENCE.containsKey(c); }
    private static boolean isOperand(char c) { return Character.isLetterOrDigit(c); }
    private static String reverse(String s) { return new StringBuilder(s).reverse().toString(); }
    private static String swapParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '(') sb.append(')');
            else if (c == ')') sb.append('(');
            else sb.append(c);
        }
        return sb.toString();
    }

    // Modified postfix (no equal precedence pop)
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
                    stack.pop();
                }
            } else if (isOperator(token)) {
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       PRECEDENCE.get(stack.peek()) > PRECEDENCE.get(token)) {
                    output.append(stack.pop());
                }
                stack.push(token);
            }
        }

        while (!stack.isEmpty()) {
            output.append(stack.pop());
        }
        return output.toString();
    }

    public static String infixToPrefix(String infix) {
        String reversed = reverse(infix);
        String swapped = swapParentheses(reversed);
        String postfixLike = infixToPostfixModified(swapped);
        return reverse(postfixLike);
    }

    // Trace version with detailed output
    public static void traceConversion(String infix) {
        System.out.println("=== Tracing: " + infix + " ===");
        System.out.println("1. Reverse: " + reverse(infix));
        System.out.println("2. Swap parentheses: " + swapParentheses(reverse(infix)));
        String postfixLike = infixToPostfixModified(swapParentheses(reverse(infix)));
        System.out.println("3. Modified postfix result: " + postfixLike);
        System.out.println("4. Prefix: " + infixToPrefix(infix));
        System.out.println();
    }

    public static void main(String[] args) {
        String[] examples = {
            "A+B",
            "A+B*C",
            "(A+B)*C",
            "A*B+C*D",
            "A+B*C-D",
            "A^B^C",
            "(A+B)*(C-D)",
            "A*(B+C)-D/E"
        };

        for (String expr : examples) {
            traceConversion(expr);
        }
    }
}