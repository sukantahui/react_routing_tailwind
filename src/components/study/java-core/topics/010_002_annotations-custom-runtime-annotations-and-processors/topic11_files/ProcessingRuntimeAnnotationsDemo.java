/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 11: Processing Runtime Annotations via Reflection - Mini Test Runner
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Method;

public class ProcessingRuntimeAnnotationsDemo {

    // 1. Custom Test Annotation
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface AcademyTest {
        String description();
        boolean enabled() default true;
    }

    // 2. Test Suite Class
    public static class StudentValidationTestSuite {

        @AcademyTest(description = "Verify Swadeep's Barrackpore Enrollment")
        public void testSwadeepEnrollment() {
            System.out.println("   --> Running Swadeep Enrollment Test: PASSED ✅");
        }

        @AcademyTest(description = "Verify Disabled Test Behavior", enabled = false)
        public void testDisabledFeature() {
            System.out.println("   --> Running Disabled Test (Should NOT run!)");
        }

        public void helperMethodNotAnnotated() {
            System.out.println("   --> Unannotated helper method");
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: PROCESSING RUNTIME ANNOTATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentValidationTestSuite suite = new StudentValidationTestSuite();
        Class<?> clazz = suite.getClass();

        System.out.println(">>> RUNNING MINI JUNIT-STYLE TEST RUNNER FOR: " + clazz.getSimpleName());

        int passed = 0, skipped = 0;
        for (Method m : clazz.getDeclaredMethods()) {
            if (m.isAnnotationPresent(AcademyTest.class)) {
                AcademyTest testAnn = m.getAnnotation(AcademyTest.class);
                System.out.println("\nDiscovered Test Method: " + m.getName() + "()");
                System.out.println(" - Description : " + testAnn.description());
                System.out.println(" - Enabled     : " + testAnn.enabled());

                if (testAnn.enabled()) {
                    m.invoke(suite); // Execute test method dynamically!
                    passed++;
                } else {
                    System.out.println("   --> Test SKIPPED ⏸️ (enabled = false)");
                    skipped++;
                }
            }
        }

        System.out.println("\n>>> TEST RUNNER SUMMARY: " + passed + " Passed, " + skipped + " Skipped.");
        System.out.println("==========================================================================");
    }
}
