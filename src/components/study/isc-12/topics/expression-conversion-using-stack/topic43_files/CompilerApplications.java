// CompilerApplications.java
// Demonstrates a simple compiler pipeline for expressions.

import java.util.*;

public class CompilerApplications {

    // Infix to postfix conversion
    public static String infixToPostfix(String infix) {
        Map<Character, Integer> precedence = new HashMap<>();
        precedence.put('+', 1); precedence.put('-', 1);
        precedence.put('*', 2); precedence.put('/', 2);
        precedence.put('^', 3);

        StringBuilder output = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char ch : infix.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                output.append(ch);
            } else if (ch == '(') {
                stack.push(ch);
            } else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    output.append(stack.pop());
                }
                stack.pop();
            } else if (precedence.containsKey(ch)) {
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       precedence.get(stack.peek()) >= precedence.get(ch)) {
                    output.append(stack.pop());
                }
                stack.push(ch);
            }
        }
        while (!stack.isEmpty()) output.append(stack.pop());
        return output.toString();
    }

    // Generate assembly-like code (hypothetical stack machine)
    public static String generateAssembly(String postfix) {
        Stack<String> stack = new Stack<>();
        for (char ch : postfix.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                stack.push("LOAD " + ch);
            } else {
                String right = stack.pop();
                String left = stack.pop();
                stack.push(ch + " " + left + " " + right);
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        String infix = "a+b*c";
        System.out.println("Infix: " + infix);
        String postfix = infixToPostfix(infix);
        System.out.println("Postfix: " + postfix);
        String assembly = generateAssembly(postfix);
        System.out.println("Assembly: " + assembly);

        // More examples
        String[] examples = {"a+b*c-d", "(a+b)*c", "a*b+c*d"};
        for (String expr : examples) {
            System.out.println("\nInfix: " + expr);
            String pf = infixToPostfix(expr);
            System.out.println("Postfix: " + pf);
            System.out.println("Assembly: " + generateAssembly(pf));
        }
    }
}