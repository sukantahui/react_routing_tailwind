// PostfixEvaluation.java
// Evaluates postfix expressions with variable support.

import java.util.*;

public class PostfixEvaluation {

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
    public static double tracePostfix(String postfix, Map<String, Double> variables) {
        Stack<Double> stack = new Stack<>();
        String[] tokens = postfix.split("\\s+");

        System.out.println("Postfix: " + postfix);
        System.out.println("Step\tToken\tStack");
        System.out.println("----------------------------------------");

        int step = 1;
        for (String token : tokens) {
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
                double right = stack.pop();
                double left = stack.pop();
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
            "A B +",
            "A B C * +",
            "2 3 + 4 *",
            "5 6 * 7 +"
        };

        for (String expr : examples) {
            try {
                tracePostfix(expr, vars);
                System.out.println();
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
                System.out.println();
            }
        }
    }
}