// PostfixToPrefixRules.java
// Converts a postfix expression to prefix using a stack.

import java.util.*;

public class PostfixToPrefixRules {

    public static String postfixToPrefix(String postfix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        // Scan from left to right
        for (String token : tokens) {
            // If operand, push onto stack
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else { // operator
                // Pop right and left operands (first popped is right, second is left)
                String right = stack.pop();
                String left = stack.pop();
                // Build prefix string: operator + left + right
                String prefix = token + " " + left + " " + right;
                stack.push(prefix);
            }
        }
        return stack.pop();
    }

    public static void traceConversion(String postfix) {
        System.out.println("Postfix: " + postfix);
        System.out.println("Prefix:  " + postfixToPrefix(postfix));
        System.out.println();
    }

    public static void main(String[] args) {
        String[] examples = {
            "A B +",
            "A B C * +",
            "A B + C *",
            "A B * C D * +",
            "A B C * + D -",
            "A B ^ C ^",
            "A B + C D - *",
            "A B C + * D E / -"
        };

        for (String expr : examples) {
            traceConversion(expr);
        }
    }
}