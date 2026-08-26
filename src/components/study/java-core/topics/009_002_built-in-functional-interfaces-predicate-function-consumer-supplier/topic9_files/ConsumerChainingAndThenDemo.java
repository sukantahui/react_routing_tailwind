/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 9: Consumer Chaining: andThen() Sequential Multi-Stage Processing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.Consumer;

class StudentRegistration {
    final String studentName;
    final String course;

    public StudentRegistration(String studentName, String course) {
        this.studentName = studentName;
        this.course = course;
    }
}

public class ConsumerChainingAndThenDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: Consumer CHAINING VIA andThen() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentRegistration student = new StudentRegistration("Swadeep Paul", "Java Core & Spring Boot");

        // Stage 1: Validate & Print Welcome Screen
        Consumer<StudentRegistration> stage1Welcome = s -> {
            System.out.println(">>> Stage 1: Welcome " + s.studentName + " to Coder & AccoTax!");
        };

        // Stage 2: Save record to Database
        Consumer<StudentRegistration> stage2SaveDb = s -> {
            System.out.println(">>> Stage 2: Saved registration for [" + s.course + "] to SQL Database.");
        };

        // Stage 3: Send Confirmation SMS
        Consumer<StudentRegistration> stage3SendSms = s -> {
            System.out.println(">>> Stage 3: SMS confirmation dispatched to " + s.studentName + ".");
        };

        // Chaining all 3 stages sequentially using andThen():
        Consumer<StudentRegistration> fullRegistrationPipeline = stage1Welcome
                .andThen(stage2SaveDb)
                .andThen(stage3SendSms);

        System.out.println(">>> Executing 3-Stage Registration Pipeline:");
        fullRegistrationPipeline.accept(student);

        System.out.println("\n==========================================================================");
    }
}