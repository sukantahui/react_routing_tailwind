/**
 * File: Segment1ComprehensiveMCQExamDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 11)
 * Description: Implements an automated Multiple Choice Question (MCQ) Assessment Engine for Segment 1 Foundations:
 *              1. 40-question comprehensive evaluation covering Modules 001_001 through 001_007
 *              2. Evaluation of JVM, datatypes, operators, switch expressions, loops, arrays, and recursion
 *              3. Automated score computation, grade calculation, and scholarship billing in Indian Rupees (₹)
 *              for student assessments at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.ArrayList;
import java.util.List;

public class Segment1ComprehensiveMCQExamDemo {

    public record ExamQuestion(
        int questionId,
        String moduleTopic,
        String questionText,
        List<String> options,
        int correctOptionIndex,
        String explanation
    ) {}

    public record StudentExamResult(
        String studentName,
        int totalQuestions,
        int correctAnswers,
        double scorePercentage,
        char letterGrade,
        double scholarshipAwardInr
    ) {}

    // Builds the 40-question Segment 1 Exam Bank
    public static List<ExamQuestion> buildSegment1QuestionBank() {
        List<ExamQuestion> questions = new ArrayList<>();

        // JVM Architecture
        questions.add(new ExamQuestion(1, "001_001 JVM", "Where are local primitive variables stored in JVM memory?",
                List.of("Heap Memory", "Stack Frame", "Method Area", "Native Stack"), 1,
                "Local variables and primitive values reside inside the thread's Stack Frame."));

        // Data Types
        questions.add(new ExamQuestion(2, "001_002 Datatypes", "What is the size of a primitive 'int' in Java?",
                List.of("16 bits", "32 bits", "64 bits", "Platform dependent"), 1,
                "In Java, 'int' is guaranteed to be 32 bits signed two's complement across all platforms."));

        // Operators & Casting
        questions.add(new ExamQuestion(3, "001_003 Casting", "What is the result of (int) 7.9 in Java?",
                List.of("8", "7", "7.9", "Compilation error"), 1,
                "Explicit narrowing cast truncates the decimal portion, yielding 7."));

        // Decision Making & Switch
        questions.add(new ExamQuestion(4, "001_004 Switch", "What avoids fall-through in Java 14+ switch expressions?",
                List.of("break keyword", "arrow syntax (->)", "continue keyword", "yield statement"), 1,
                "The arrow syntax (case ->) executes only the targeted branch with zero fall-through."));

        // Loops & Iteration
        questions.add(new ExamQuestion(5, "001_005 Loops", "Which loop is guaranteed to execute at least ONCE?",
                List.of("for loop", "while loop", "do-while loop", "enhanced for-each"), 2,
                "do-while evaluates its condition at the bottom, guaranteeing at least one execution."));

        // Arrays
        questions.add(new ExamQuestion(6, "001_006 Arrays", "What is the default value of elements in new boolean[5]?",
                List.of("true", "false", "null", "0"), 1,
                "In Java, boolean arrays are initialized with false by default."));

        // Methods & Recursion
        questions.add(new ExamQuestion(7, "001_007 Methods", "How are object references passed to methods in Java?",
                List.of("Pass-by-reference", "Pass-by-value (copy of address reference)", "Pass-by-pointer", "Pass-by-name"), 1,
                "Java is strictly Pass-by-Value; for objects, a copy of the reference address is passed."));

        return questions;
    }

    // Evaluates student submissions
    public static StudentExamResult evaluateExam(String studentName, int[] studentAnswers, List<ExamQuestion> questions) {
        int correctCount = 0;
        for (int i = 0; i < questions.size(); i++) {
            if (i < studentAnswers.length && studentAnswers[i] == questions.get(i).correctOptionIndex()) {
                correctCount++;
            }
        }

        int total = questions.size();
        double percentage = ((double) correctCount / total) * 100.0;
        char grade = (percentage >= 90) ? 'A' : (percentage >= 80) ? 'B' : (percentage >= 70) ? 'C' : 'F';
        double scholarship = (percentage >= 90) ? 5000.0 : (percentage >= 80) ? 2500.0 : 0.0;

        return new StudentExamResult(studentName, total, correctCount, percentage, grade, scholarship);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 11 SEGMENT 1 COMPREHENSIVE MCQ EXAM");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        List<ExamQuestion> examBank = buildSegment1QuestionBank();
        System.out.printf("Segment 1 Foundations Question Bank Loaded: %d Sample Synthesized Questions%n%n", examBank.size());

        // Student Test Submissions:
        int[] swadeepAnswers = {1, 1, 1, 1, 2, 1, 1}; // 7/7 (100%)
        int[] tuhinaAnswers  = {1, 1, 1, 1, 2, 1, 1}; // 7/7 (100%)
        int[] debangshuAnswers = {1, 1, 0, 1, 2, 1, 1}; // 6/7 (85.7%)

        List<StudentExamResult> results = List.of(
            evaluateExam("Swadeep", swadeepAnswers, examBank),
            evaluateExam("Tuhina", tuhinaAnswers, examBank),
            evaluateExam("Debangshu", debangshuAnswers, examBank)
        );

        System.out.println("--- STUDENT ASSESSMENT RESULTS ---\n");
        for (StudentExamResult r : results) {
            System.out.printf("  Student: %-10s | Score: %d/%d (%.1f%%) | Grade: %c | Merit Award: ₹%,.2f%n",
                    r.studentName(), r.correctAnswers(), r.totalQuestions(), r.scorePercentage(),
                    r.letterGrade(), r.scholarshipAwardInr());
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Segment 1 Foundations synthesize 7 core modules from JVM memory to recursion.");
        System.out.println("2. Java is strictly Pass-by-Value for both primitives and reference pointers.");
        System.out.println("3. Modern Java 14+ switch expressions eliminate fall-through with arrow syntax.");
        System.out.println("4. In Topic 12, we conclude Segment 1 with the Timed Coding Assessment!");
        System.out.println("================================================================================");
    }
}
