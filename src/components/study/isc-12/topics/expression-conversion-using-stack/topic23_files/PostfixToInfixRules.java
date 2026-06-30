// PostfixToInfixRules.java
// Converts a postfix expression to infix using a stack.

import java.util.*;

public class PostfixToInfixRules {

    public static String postfixToInfix(String postfix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        for (String token : tokens) {
            // If operand, push onto stack
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else { // operator
                // Pop right and left operands
                String right = stack.pop();
                String left = stack.pop();
                // Build infix string with parentheses
                String infix = "(" + left + " " + token + " " + right + ")";
                stack.push(infix);
            }
        }
        return stack.pop();
    }

    public static void traceConversion(String postfix) {
        System.out.println("Postfix: " + postfix);
        System.out.println("Infix:   " + postfixToInfix(postfix));
        System.out.println();
    }

    public static void main(String[] args) {
        String[] examples = {
            "A B +",
            "A B C * +",
            "A B + C *",
            "A B * C D * +",
            "A B C * + D -",
            "A B C ^ ^",
            "A B + C D - *",
            "A B C + * D E / -"
        };

        for (String expr : examples) {
            traceConversion(expr);
        }
    }
}