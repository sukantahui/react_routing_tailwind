// StepByStepExample.java
// Demonstrates infix‑to‑postfix conversion with step‑by‑step tracing.

import java.util.*;

public class StepByStepExample {

    private static final Map<Character, Integer> PRECEDENCE = new HashMap<>();
    static {
        PRECEDENCE.put('+', 1);
        PRECEDENCE.put('-', 1);
        PRECEDENCE.put('*', 2);
        PRECEDENCE.put('/', 2);
        PRECEDENCE.put('^', 3);
    }

    private static boolean isLeftAssociative(char op) {
        return op != '^';
    }

    public static String infixToPostfixWithTrace(String infix) {
        StringBuilder postfix = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        System.out.println("Token\tAction\t\tStack\t\tOutput");
        System.out.println("-----------------------------------------------------");

        for (char token : infix.toCharArray()) {
            if (Character.isWhitespace(token)) continue;

            if (Character.isLetterOrDigit(token)) {
                postfix.append(token);
                System.out.println(token + "\tOperand → output\t" + stack + "\t\t" + postfix);
            }
            else if (token == '(') {
                stack.push(token);
                System.out.println(token + "\tPush (\t\t\t" + stack + "\t\t" + postfix);
            }
            else if (token == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    char op = stack.pop();
                    postfix.append(op);
                    System.out.println(")\tPop " + op + "\t\t\t" + stack + "\t\t" + postfix);
                }
                if (!stack.isEmpty() && stack.peek() == '(') {
                    stack.pop(); // discard '('
                    System.out.println(")\tDiscard (\t\t" + stack + "\t\t" + postfix);
                } else {
                    throw new IllegalArgumentException("Mismatched parentheses");
                }
            }
            else if (PRECEDENCE.containsKey(token)) {
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       (PRECEDENCE.get(stack.peek()) > PRECEDENCE.get(token) ||
                        (PRECEDENCE.get(stack.peek()).equals(PRECEDENCE.get(token)) && isLeftAssociative(token)))) {
                    char op = stack.pop();
                    postfix.append(op);
                    System.out.println(token + "\tPop " + op + "\t\t\t" + stack + "\t\t" + postfix);
                }
                stack.push(token);
                System.out.println(token + "\tPush " + token + "\t\t\t" + stack + "\t\t" + postfix);
            }
            else {
                throw new IllegalArgumentException("Invalid character: " + token);
            }
        }

        while (!stack.isEmpty()) {
            char op = stack.pop();
            if (op == '(') {
                throw new IllegalArgumentException("Mismatched parentheses: extra '('");
            }
            postfix.append(op);
            System.out.println("END\tPop " + op + "\t\t\t" + stack + "\t\t" + postfix);
        }

        return postfix.toString();
    }

    public static void main(String[] args) {
        String[] testExprs = {"A+B", "A+B*C", "(A+B)*C", "A*B+C*D"};
        for (String expr : testExprs) {
            System.out.println("\nInfix: " + expr);
            String postfix = infixToPostfixWithTrace(expr);
            System.out.println("Result: " + postfix);
            System.out.println("=============================================");
        }
    }
}