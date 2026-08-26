/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 0: What are Java Annotations? Structured Code Metadata
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

public class WhatAreAnnotationsDemo {

    // Custom Annotation Definition:
    @Retention(RetentionPolicy.RUNTIME)
    public @interface CourseDetails {
        String faculty() default "Sukanta Hui";
        String center() default "Barrackpore";
        int durationMonths() default 6;
    }

    // Applying metadata to a class:
    @CourseDetails(faculty = "Sukanta Hui", center = "Barrackpore (Main Hub)", durationMonths = 4)
    public static class FullStackJavaModule {
        public void executeSyllabus() {
            System.out.println("Executing Java Core to Pro syllabus at Barrackpore Academy...");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT ARE JAVA ANNOTATIONS? - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        FullStackJavaModule module = new FullStackJavaModule();
        module.executeSyllabus();

        // Reading the attached metadata at runtime via Reflection:
        Class<?> clazz = module.getClass();
        if (clazz.isAnnotationPresent(CourseDetails.class)) {
            CourseDetails details = clazz.getAnnotation(CourseDetails.class);
            System.out.println("\n>>> METADATA DISCOVERED ON CLASS:");
            System.out.println("   - Faculty         : " + details.faculty());
            System.out.println("   - Training Center : " + details.center());
            System.out.println("   - Duration        : " + details.durationMonths() + " months");
        }

        System.out.println("\n==========================================================================");
    }
}
