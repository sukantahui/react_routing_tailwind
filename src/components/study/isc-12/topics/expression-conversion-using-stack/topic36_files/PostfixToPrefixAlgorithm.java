// PostfixToPrefixAlgorithm.java
// Converts postfix to prefix using a stack.

import java.util.*;

public class PostfixToPrefixAlgorithm {

    public static String postfixToPrefix(String postfix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        // Scan from left to right
        for (String token : tokens) {
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else {
                String right = stack.pop();
                String left = stack.pop();
                String prefix = token + " " + left + " " + right;
                stack.push(prefix);
            }
        }
        return stack.pop();
    }

    // Trace version with detailed output
    public static void traceConversion(String postfix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        System.out.println("Postfix: " + postfix);
        System.out.println("Step\tToken\tStack");
        System.out.println("----------------------------------------");

        int step = 1;
        for (String token : tokens) {
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
                System.out.println(step++ + "\t" + token + "\t" + stack);
            } else {
                String right = stack.pop();
                String left = stack.pop();
                String prefix = token + " " + left + " " + right;
                stack.push(prefix);
                System.out.println(step++ + "\t" + token + "\t" + stack);
            }
        }
        System.out.println("----------------------------------------");
        System.out.println("Result: " + stack.pop());
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