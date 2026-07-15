// ExpressionEvaluation.java
// Evaluates postfix and prefix expressions using a stack, with variable support.

import java.util.*;

public class ExpressionEvaluation {

    // Evaluate postfix expression with variables
    public static double evaluatePostfix(String postfix, Map<String, Double> variables) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        for (String token : tokens) {
            if (token.matches("[a-zA-Z]+")) {
                // Variable
                if (!variables.containsKey(token)) {
                    throw new IllegalArgumentException("Undefined variable: " + token);
                }
                stack.push(variables.get(token));
            } else if (token.matches("-?\\d+(\\.\\d+)?")) {
                // Number literal
                stack.push(Double.parseDouble(token));
            } else {
                // Operator
                double right = stack.pop();
                double left = stack.pop();
                double result;
                switch (token) {
                    case "+": result = left + right; break;
                    case "-": result = left - right; break;
                    case "*": result = left * right; break;
                    case "/": result = left / right; break;
                    case "^": result = Math.pow(left, right); break;
                    default: throw new IllegalArgumentException("Unknown operator: " + token);
                }
                stack.push(result);
            }
        }
        return stack.pop();
    }

    // Evaluate prefix expression with variables
    public static double evaluatePrefix(String prefix, Map<String, Double> variables) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = prefix.split("\\s+");

        // Scan from right to left
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];
            if (token.matches("[a-zA-Z]+")) {
                if (!variables.containsKey(token)) {
                    throw new IllegalArgumentException("Undefined variable: " + token);
                }
                stack.push(variables.get(token));
            } else if (token.matches("-?\\d+(\\.\\d+)?")) {
                stack.push(Double.parseDouble(token));
            } else {
                double left = stack.pop();
                double right = stack.pop();
                double result;
                switch (token) {
                    case "+": result = left + right; break;
                    case "-": result = left - right; break;
                    case "*": result = left * right; break;
                    case "/": result = left / right; break;
                    case "^": result = Math.pow(left, right); break;
                    default: throw new IllegalArgumentException("Unknown operator: " + token);
                }
                stack.push(result);
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        // Example postfix: 2 3 + 4 *
        Map<String, Double> vars = new HashMap<>();
        vars.put("A", 5.0);
        vars.put("B", 3.0);
        vars.put("C", 4.0);

        String postfix = "A B C * +";
        System.out.println("Postfix: " + postfix);
        System.out.println("Result: " + evaluatePostfix(postfix, vars));

        String prefix = "* + A B C";
        System.out.println("\nPrefix: " + prefix);
        System.out.println("Result: " + evaluatePrefix(prefix, vars));
    }
}