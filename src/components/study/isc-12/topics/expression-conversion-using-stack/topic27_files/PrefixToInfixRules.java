// PrefixToInfixRules.java
// Converts a prefix expression to infix using a stack.

import java.util.*;

public class PrefixToInfixRules {

    public static String prefixToInfix(String prefix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = prefix.split("\\s+");

        // Scan from right to left
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];

            // If operand, push onto stack
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else { // operator
                // Pop left and right operands (first popped is left, second is right)
                String left = stack.pop();
                String right = stack.pop();
                // Build infix string with parentheses
                String infix = "(" + left + " " + token + " " + right + ")";
                stack.push(infix);
            }
        }
        return stack.pop();
    }

    public static void traceConversion(String prefix) {
        System.out.println("Prefix: " + prefix);
        System.out.println("Infix:   " + prefixToInfix(prefix));
        System.out.println();
    }

    public static void main(String[] args) {
        String[] examples = {
            "+ A B",
            "+ A * B C",
            "* + A B C",
            "+ * A B * C D",
            "- + A * B C D",
            "^ ^ A B C",
            "* + A B - C D",
            "- * A + B C / D E"
        };

        for (String expr : examples) {
            traceConversion(expr);
        }
    }
}