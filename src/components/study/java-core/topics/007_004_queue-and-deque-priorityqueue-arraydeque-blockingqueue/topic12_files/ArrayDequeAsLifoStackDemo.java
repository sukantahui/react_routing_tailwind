/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 12: Using ArrayDeque as a High-Speed LIFO Stack: Expression Evaluation & Undo-Redo
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Deque;

public class ArrayDequeAsLifoStackDemo {

    // Classic Stack Algorithm: Validating Balanced Parentheses in a Source String:
    public static boolean isBalanced(String expression) {
        Deque<Character> bracketStack = new ArrayDeque<>();

        for (char ch : expression.toCharArray()) {
            if (ch == '(' || ch == '{' || ch == '[') {
                bracketStack.push(ch); // LIFO push
            } else if (ch == ')' || ch == '}' || ch == ']') {
                if (bracketStack.isEmpty()) return false;
                char top = bracketStack.pop(); // LIFO pop
                if ((ch == ')' && top != '(') ||
                    (ch == '}' && top != '{') ||
                    (ch == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return bracketStack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: ArrayDeque AS LIFO STACK (EXPRESSION PARSER) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String validExpression = "{ [ ( Swadeep + Tuhina ) * 10 ] + Abhronila }";
        String invalidExpression = "{ [ ( Debangshu ) } ]"; // Mismatched closing order

        System.out.println(">>> Testing Expression 1: " + validExpression);
        System.out.println("  Is Balanced? : " + isBalanced(validExpression));

        System.out.println("\n>>> Testing Expression 2: " + invalidExpression);
        System.out.println("  Is Balanced? : " + isBalanced(invalidExpression));

        System.out.println("\n>>> LIFO STACK CONVENTIONS IN ArrayDeque:");
        System.out.println("  1. 'push(e)' : Equivalent to 'addFirst(e)' (Inserts at stack top).");
        System.out.println("  2. 'pop()'   : Equivalent to 'removeFirst()' (Removes from stack top).");
        System.out.println("  3. 'peek()'  : Equivalent to 'peekFirst()' (Inspects stack top).");

        System.out.println("\n==========================================================================");
    }
}