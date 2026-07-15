// PostfixToInfixAlgorithm.java
// Converts postfix to infix using a stack.

import java.util.*;

public class PostfixToInfixAlgorithm {

    public static String postfixToInfix(String postfix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        for (String token : tokens) {
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else {
                String right = stack.pop();
                String left = stack.pop();
                String infix = "(" + left + " " + token + " " + right + ")";
                stack.push(infix);
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