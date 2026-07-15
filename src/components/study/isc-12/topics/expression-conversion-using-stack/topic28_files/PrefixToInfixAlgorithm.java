// PrefixToInfixAlgorithm.java
// Converts prefix to infix using a stack.

import java.util.*;

public class PrefixToInfixAlgorithm {

    public static String prefixToInfix(String prefix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = prefix.split("\\s+");

        // Scan from right to left
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];

            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else {
                String left = stack.pop();
                String right = stack.pop();
                String infix = "(" + left + " " + token + " " + right + ")";
                stack.push(infix);
            }
        }
        return stack.pop();
    }

    // Trace version with detailed output
    public static void traceConversion(String prefix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = prefix.split("\\s+");

        System.out.println("Prefix: " + prefix);
        System.out.println("Step\tToken\tStack");
        System.out.println("----------------------------------------");

        int step = 1;
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
                System.out.println(step++ + "\t" + token + "\t" + stack);
            } else {
                String left = stack.pop();
                String right = stack.pop();
                String infix = "(" + left + " " + token + " " + right + ")";
                stack.push(infix);
                System.out.println(step++ + "\t" + token + "\t" + stack);
            }
        }
        System.out.println("----------------------------------------");
        System.out.println("Result: " + stack.pop());
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