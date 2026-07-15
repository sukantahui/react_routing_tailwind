// PostfixToInfixExamples.java
// Converts postfix to infix with trace output.

import java.util.*;

public class PostfixToInfixExamples {

    public static String postfixToInfix(String postfix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        for (String token : tokens) {
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else {
                String right = stack.pop();
                String left = stack.pop();
                stack.push("(" + left + " " + token + " " + right + ")");
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
                String infix = "(" + left + " " + token + " " + right + ")";
                stack.push(infix);
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
            "A B C ^ ^",
            "A B + C D - *",
            "A B C + * D E / -"
        };

        for (String expr : examples) {
            trace(expr);
        }
    }
}