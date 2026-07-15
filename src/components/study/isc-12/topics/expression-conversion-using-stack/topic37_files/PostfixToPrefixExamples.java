// PostfixToPrefixExamples.java
// Converts postfix to prefix with trace output.

import java.util.*;

public class PostfixToPrefixExamples {

    public static String postfixToPrefix(String postfix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

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

    public static void trace(String postfix) {
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
            trace(expr);
        }
    }
}