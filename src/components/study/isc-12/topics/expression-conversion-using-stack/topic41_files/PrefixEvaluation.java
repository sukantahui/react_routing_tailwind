// PrefixEvaluation.java
// Evaluates prefix expressions with variable support.

import java.util.*;

public class PrefixEvaluation {

    // Evaluate prefix expression with variables
    public static double evaluatePrefix(String prefix, Map<String, Double> variables) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = prefix.split("\\s+");

        // Scan from RIGHT to LEFT
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];

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
                // Operator - first popped is LEFT operand
                double left = stack.pop();
                double right = stack.pop();
                double result;
                switch (token) {
                    case "+": result = left + right; break;
                    case "-": result = left - right; break;
                    case "*": result = left * right; break;
                    case "/": 
                        if (right == 0) throw new ArithmeticException("Division by zero");
                        result = left / right; 
                        break;
                    case "^": result = Math.pow(left, right); break;
                    default: throw new IllegalArgumentException("Unknown operator: " + token);
                }
                stack.push(result);
            }
        }
        return stack.pop();
    }

    // Trace version for debugging
    public static double tracePrefix(String prefix, Map<String, Double> variables) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = prefix.split("\\s+");

        System.out.println("Prefix: " + prefix);
        System.out.println("Step\tToken\tStack");
        System.out.println("----------------------------------------");

        int step = 1;
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];
            if (token.matches("[a-zA-Z]+")) {
                if (!variables.containsKey(token)) {
                    throw new IllegalArgumentException("Undefined variable: " + token);
                }
                stack.push(variables.get(token));
                System.out.println(step++ + "\t" + token + "\t" + stack);
            } else if (token.matches("-?\\d+(\\.\\d+)?")) {
                stack.push(Double.parseDouble(token));
                System.out.println(step++ + "\t" + token + "\t" + stack);
            } else {
                double left = stack.pop();
                double right = stack.pop();
                double result;
                switch (token) {
                    case "+": result = left + right; break;
                    case "-": result = left - right; break;
                    case "*": result = left * right; break;
                    case "/": 
                        if (right == 0) throw new ArithmeticException("Division by zero");
                        result = left / right; 
                        break;
                    case "^": result = Math.pow(left, right); break;
                    default: throw new IllegalArgumentException("Unknown operator: " + token);
                }
                stack.push(result);
                System.out.println(step++ + "\t" + token + "\t" + stack);
            }
        }
        System.out.println("----------------------------------------");
        double finalResult = stack.pop();
        System.out.println("Result: " + finalResult);
        return finalResult;
    }

    public static void main(String[] args) {
        Map<String, Double> vars = new HashMap<>();
        vars.put("A", 5.0);
        vars.put("B", 3.0);
        vars.put("C", 4.0);

        String[] examples = {
            "+ A B",
            "+ A * B C",
            "* + A B C",
            "+ * A B * C D",
            "- + A * B C D"
        };

        for (String expr : examples) {
            try {
                tracePrefix(expr, vars);
                System.out.println();
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
                System.out.println();
            }
        }
    }
}