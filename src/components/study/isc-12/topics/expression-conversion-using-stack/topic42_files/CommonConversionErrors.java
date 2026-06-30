// CommonConversionErrors.java
// Demonstrates common mistakes and their fixes in expression conversion and evaluation.

import java.util.*;

public class CommonConversionErrors {

    // ---------- INFIX TO POSTFIX (with a common bug: forgetting associativity for ^) ----------
    // Buggy version: treats ^ as left-associative (incorrect)
    public static String infixToPostfixBuggy(String infix) {
        Map<Character, Integer> prec = new HashMap<>();
        prec.put('+', 1); prec.put('-', 1);
        prec.put('*', 2); prec.put('/', 2);
        prec.put('^', 3); // but associativity not handled

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
            } else if (prec.containsKey(ch)) {
                // BUG: pops equal precedence (treats ^ as left-assoc)
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       prec.get(stack.peek()) >= prec.get(ch)) {
                    output.append(stack.pop());
                }
                stack.push(ch);
            }
        }
        while (!stack.isEmpty()) output.append(stack.pop());
        return output.toString();
    }

    // Fixed version: handles associativity correctly (^ is right-assoc)
    public static String infixToPostfixFixed(String infix) {
        Map<Character, Integer> prec = new HashMap<>();
        prec.put('+', 1); prec.put('-', 1);
        prec.put('*', 2); prec.put('/', 2);
        prec.put('^', 3);

        Set<Character> rightAssoc = new HashSet<>();
        rightAssoc.add('^');

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
            } else if (prec.containsKey(ch)) {
                while (!stack.isEmpty() && stack.peek() != '(' &&
                       (prec.get(stack.peek()) > prec.get(ch) ||
                        (prec.get(stack.peek()) == prec.get(ch) && !rightAssoc.contains(ch)))) {
                    output.append(stack.pop());
                }
                stack.push(ch);
            }
        }
        while (!stack.isEmpty()) output.append(stack.pop());
        return output.toString();
    }

    // ---------- POSTFIX EVALUATION (with a common bug: wrong operand order) ----------
    // Buggy version: pops left then right (incorrect)
    public static double evaluatePostfixBuggy(String postfix) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");
        for (String token : tokens) {
            if (token.matches("-?\\d+(\\.\\d+)?")) {
                stack.push(Double.parseDouble(token));
            } else {
                // BUG: pops left then right (should be right then left)
                double left = stack.pop();
                double right = stack.pop();
                double result = 0;
                switch (token) {
                    case "+": result = left + right; break;
                    case "-": result = left - right; break;
                    case "*": result = left * right; break;
                    case "/": result = left / right; break;
                }
                stack.push(result);
            }
        }
        return stack.pop();
    }

    // Fixed version: pops right then left
    public static double evaluatePostfixFixed(String postfix) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");
        for (String token : tokens) {
            if (token.matches("-?\\d+(\\.\\d+)?")) {
                stack.push(Double.parseDouble(token));
            } else {
                double right = stack.pop();
                double left = stack.pop();
                double result = 0;
                switch (token) {
                    case "+": result = left + right; break;
                    case "-": result = left - right; break;
                    case "*": result = left * right; break;
                    case "/": result = left / right; break;
                }
                stack.push(result);
            }
        }
        return stack.pop();
    }

    // ---------- MAIN ----------
    public static void main(String[] args) {
        // Infix to Postfix: A^B^C
        String infix = "A^B^C";
        System.out.println("Infix: " + infix);
        System.out.println("Buggy Postfix: " + infixToPostfixBuggy(infix));   // AB^C^ (wrong, left-assoc)
        System.out.println("Fixed Postfix: " + infixToPostfixFixed(infix));   // ABC^^ (correct, right-assoc)

        // Postfix Evaluation: 2 3 - (should be 2-3=-1)
        String postfix = "2 3 -";
        System.out.println("\nPostfix: " + postfix);
        System.out.println("Buggy Evaluation: " + evaluatePostfixBuggy(postfix));   // 1 (wrong: 3-2)
        System.out.println("Fixed Evaluation: " + evaluatePostfixFixed(postfix));   // -1 (correct)
    }
}