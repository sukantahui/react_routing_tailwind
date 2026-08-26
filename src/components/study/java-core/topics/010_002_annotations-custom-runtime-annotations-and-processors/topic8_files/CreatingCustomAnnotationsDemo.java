/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 8: Creating Custom Annotations via @interface Syntax
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Annotation;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

public class CreatingCustomAnnotationsDemo {

    // Defining a Custom Annotation:
    @Retention(RetentionPolicy.RUNTIME)
    public @interface StudentAudit {
        String auditorName();
        String campus() default "Barrackpore";
        int reviewCycleDays() default 30;
    }

    // Applying Custom Annotation:
    @StudentAudit(auditorName = "Sukanta Hui", campus = "Barrackpore Hub", reviewCycleDays = 15)
    public static class FinalProjectSubmission {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CREATING CUSTOM ANNOTATIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Class<?> clazz = FinalProjectSubmission.class;
        StudentAudit audit = clazz.getAnnotation(StudentAudit.class);

        System.out.println(">>> 1. Inspecting Custom Annotation Instance:");
        System.out.println("   - Auditor Name       : " + audit.auditorName());
        System.out.println("   - Campus Center      : " + audit.campus());
        System.out.println("   - Review Cycle Days  : " + audit.reviewCycleDays() + " days");

        System.out.println("\n>>> 2. Verifying Annotation Superclass:");
        System.out.println("   - Is Annotation?     : " + audit.annotationType().isAnnotation());
        System.out.println("   - Base Interface     : " + Annotation.class.getName());

        System.out.println("\n>>> RULES FOR @INTERFACE ELEMENT METHODS:");
        System.out.println("  1. Methods must have ZERO parameters (no arguments).");
        System.out.println("  2. Methods cannot have a 'throws' clause.");
        System.out.println("  3. Methods can have default values using the 'default' keyword.");
        System.out.println("==========================================================================");
    }
}
