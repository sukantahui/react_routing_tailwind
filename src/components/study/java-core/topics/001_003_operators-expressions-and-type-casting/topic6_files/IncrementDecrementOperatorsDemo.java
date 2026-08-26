/**
 * File: IncrementDecrementOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 6)
 * Description: Demonstrates Java increment (++) and decrement (--) operators,
 *              prefix (++x) vs postfix (x++) evaluation rules, JVM iinc bytecode mechanics,
 *              the famous 'x = x++' self-assignment trap, multi-step expression evaluation,
 *              and student serial roll number assignment in Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class IncrementDecrementOperatorsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 6 INCREMENT (++) & DECREMENT (--) OPERATORS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Prefix (++x, --x) vs Postfix (x++, x--) Fundamentals
        System.out.println("--- 1. PREFIX VS POSTFIX FUNDAMENTALS ---");
        int a = 10;
        int b = 10;

        int prefixResult = ++a; // a is incremented to 11 FIRST, then 11 is returned
        int postfixResult = b++; // b's old value (10) is returned, THEN b becomes 11

        System.out.printf("Prefix (++a)  : Evaluated Result = %d | Variable 'a' in memory = %d%n", prefixResult, a);
        System.out.printf("Postfix (b++) : Evaluated Result = %d | Variable 'b' in memory = %d%n%n", postfixResult, b);

        int c = 20;
        int d = 20;

        int prefixDec = --c; // c becomes 19 FIRST, then 19 returned
        int postfixDec = d--; // d returns 20, then d becomes 19

        System.out.printf("Prefix (--c)  : Evaluated Result = %d | Variable 'c' in memory = %d%n", prefixDec, c);
        System.out.printf("Postfix (d--) : Evaluated Result = %d | Variable 'd' in memory = %d%n%n", postfixDec, d);

        // 2. The Classic Java Interview Trap: 'x = x++'
        System.out.println("--- 2. THE INFAMOUS 'x = x++' SELF-ASSIGNMENT TRAP ---");
        int count = 5;
        count = count++; // Bytecode: iload pushes 5 to stack -> iinc increments memory to 6 -> istore overwrites memory with 5!

        System.out.printf("Initial count = 5 -> After executing 'count = count++' -> count = %d%n", count);
        System.out.println("Explanation: Postfix pushes old value 5 to stack, increments memory to 6, then assignment pops 5 and overwrites 6!\n");

        // 3. Multi-Step Expression Evaluation (Left-to-Right JLS Guarantee)
        System.out.println("--- 3. MULTI-STEP EXPRESSION EVALUATION (STEP-BY-STEP) ---");
        int x = 5;
        // Expression: ++x + x++ + ++x
        // Step 1: ++x -> x becomes 6, returns 6
        // Step 2: x++ -> returns 6, x becomes 7
        // Step 3: ++x -> x becomes 8, returns 8
        // Total: 6 + 6 + 8 = 20
        int complexSum = ++x + x++ + ++x;

        System.out.printf("For x = 5, expression '++x + x++ + ++x' evaluates to: %d (Final x in memory: %d)%n%n",
                complexSum, x);

        // 4. Incrementing Different Data Types (char, double, byte)
        System.out.println("--- 4. INCREMENTING CHARS, BYTES & FLOATS ---");
        char letter = 'A';
        letter++; // 'A' (65) -> 'B' (66). Implicit narrowing cast: letter = (char)(letter + 1);

        byte small = 127;
        small++; // Overflows to -128 without compile error! (small = (byte)(small + 1))

        double price = 99.5;
        price++; // Becomes 100.5

        System.out.printf("char 'A'++ : '%c'%n", letter);
        System.out.printf("byte 127++ : %d (Overflow wrap to Byte.MIN_VALUE)%n", small);
        System.out.printf("double 99.5++ : %.1f%n%n", price);

        // 5. Real-World Student Serial Roll & Ticket Turnstile Engine (Barrackpore Lab)
        System.out.println("--- 5. BARRACKPORE STUDENT ADMISSION ROLL NUMBER DISPATCHER ---");
        StudentRollDispatcher dispatcher = new StudentRollDispatcher(101);

        System.out.printf("Allocated: %-10s -> Roll #%d%n", "Swadeep", dispatcher.issueNextRoll());
        System.out.printf("Allocated: %-10s -> Roll #%d%n", "Tuhina", dispatcher.issueNextRoll());
        System.out.printf("Allocated: %-10s -> Roll #%d%n", "Abhronila", dispatcher.issueNextRoll());
        System.out.printf("Allocated: %-10s -> Roll #%d%n", "Debangshu", dispatcher.issueNextRoll());
        System.out.printf("Next Available Roll in Queue: Roll #%d%n", dispatcher.peekCurrentRoll());

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Prefix (++x) increments BEFORE value is returned to expression.");
        System.out.println("2. Postfix (x++) returns original value FIRST, then increments memory.");
        System.out.println("3. 'x = x++;' leaves x unchanged due to operand stack assignment overwrite.");
        System.out.println("4. '++' and '--' include implicit narrowing casts: byte b=127; b++; -> (byte)(b+1).");
        System.out.println("================================================================================");
    }

    private static class StudentRollDispatcher {
        private int currentRoll;

        public StudentRollDispatcher(int startRoll) {
            this.currentRoll = startRoll;
        }

        public int issueNextRoll() {
            // Postfix increment: returns current roll, then advances counter for the next student
            return currentRoll++;
        }

        public int peekCurrentRoll() {
            return currentRoll;
        }
    }
}
