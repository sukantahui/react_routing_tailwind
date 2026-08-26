/**
 * Java Core Tutorial - Module 005_007: File Handling & I/O Hands-On Capstone Lab
 * Topic 4: Comprehensive File I/O Multiple Choice Question Assessment Exam
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io.lab;

import java.util.List;

public class FileIoComprehensiveMcqExamDemo {

    public static class ExamQuestion {
        public final int number;
        public final String question;
        public final List<String> options;
        public final int correctIndex;
        public final String rationale;

        public ExamQuestion(int num, String q, List<String> opts, int correct, String reason) {
            this.number = num;
            this.question = q;
            this.options = opts;
            this.correctIndex = correct;
            this.rationale = reason;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: COMPREHENSIVE FILE I/O MCQ ASSESSMENT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<ExamQuestion> exam = List.of(
                new ExamQuestion(
                        1,
                        "What is the default buffer size in BufferedReader and BufferedInputStream?",
                        List.of("A) 1024 bytes", "B) 4096 bytes", "C) 8192 bytes (8 KB)", "D) 16384 bytes"),
                        2,
                        "Java uses a default buffer array of 8192 chars/bytes to match standard OS disk sectors."
                ),
                new ExamQuestion(
                        2,
                        "Which method in Java NIO.2 is recommended for lazily streaming gigabyte log files?",
                        List.of("A) Files.readAllLines(path)", "B) Files.readString(path)", "C) Files.lines(path)", "D) Files.readAllBytes(path)"),
                        2,
                        "Files.lines(path) returns a lazy Stream<String> that reads on demand with O(1) memory."
                ),
                new ExamQuestion(
                        3,
                        "What happens to fields marked with 'transient' during deserialization?",
                        List.of("A) They throw NotSerializableException", "B) They receive Java default values (null / 0)", "C) They retain pre-serialization values", "D) They are encrypted"),
                        1,
                        "Transient fields are skipped during serialization and rehydrated to default values (null, 0, false)."
                )
        );

        for (ExamQuestion q : exam) {
            System.out.println("Q" + q.number + ": " + q.question);
            for (String opt : q.options) {
                System.out.println("   " + opt);
            }
            System.out.println("   -> Correct: Option " + (char)('A' + q.correctIndex));
            System.out.println("   -> Rationale: " + q.rationale + "\n");
        }

        System.out.println("==========================================================================");
    }
}