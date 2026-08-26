/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 1: Standard Built-in Annotations (@Override, @Deprecated, @SuppressWarnings)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.util.ArrayList;
import java.util.List;

public class StandardBuiltinAnnotationsDemo {

    public interface StudentEvaluator {
        void evaluate(String studentName);
    }

    public static class AcademyManager implements StudentEvaluator {

        // 1. @Override: Compile-time check verifying method exists in interface/parent
        @Override
        public void evaluate(String studentName) {
            System.out.println("Evaluating student: " + studentName + " at Barrackpore Center.");
        }

        // 2. @Deprecated (since, forRemoval) [Java 9+ Enhanced]:
        @Deprecated(since = "9.0", forRemoval = true)
        public void legacyOfflineRegistration(String studentName) {
            System.out.println("⚠️ [DEPRECATED METHOD]: Registering offline (Will be removed in future release!)");
        }

        // 3. @SuppressWarnings: Suppresses specific compiler warning categories
        @SuppressWarnings({"rawtypes", "unchecked"})
        public void processLegacyList() {
            List legacyRawList = new ArrayList(); // Raw type warning suppressed!
            legacyRawList.add("Swadeep Paul");
            legacyRawList.add(101);
            System.out.println("Processed raw list without compiler warnings: " + legacyRawList);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: STANDARD BUILT-IN ANNOTATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademyManager manager = new AcademyManager();
        manager.evaluate("Swadeep Paul");
        manager.legacyOfflineRegistration("Tuhina Das");
        manager.processLegacyList();

        System.out.println("\n==========================================================================");
    }
}
