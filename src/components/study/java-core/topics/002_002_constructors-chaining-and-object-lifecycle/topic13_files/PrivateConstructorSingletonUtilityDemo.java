/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 13: Private Constructors: Preventing Instantiation & Singleton/Utility Pattern
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class PrivateConstructorSingletonUtilityDemo {

    // 1. Utility Class (Zero Instantiation Allowed)
    public static final class AcademyMathUtil {
        // Private Constructor suppresses default constructor & blocks 'new'
        private AcademyMathUtil() {
            throw new UnsupportedOperationException("Utility class cannot be instantiated!");
        }

        public static double calculateGst(double grossAmount) {
            return grossAmount * 0.18;
        }

        public static double calculateScholarship(double marks, double maxAward) {
            return marks >= 90.0 ? maxAward : (marks >= 75.0 ? maxAward * 0.5 : 0.0);
        }
    }

    // 2. Thread-Safe Singleton Class (Bill Pugh Singleton Pattern)
    public static class CentralAcademicRegistry {

        // Private Constructor prevents external instantiation
        private CentralAcademicRegistry() {
            System.out.println("  [SINGLETON <init>] Central Academic Registry Instance Born (ONCE on Heap)!");
        }

        // Static Inner Helper Class (Loaded only when getInstance() is called)
        private static class SingletonHelper {
            private static final CentralAcademicRegistry INSTANCE = new CentralAcademicRegistry();
        }

        // Global Access Point
        public static CentralAcademicRegistry getInstance() {
            return SingletonHelper.INSTANCE;
        }

        public void logRegistration(String traineeName, String hub) {
            System.out.printf("  [REGISTRY] Registered: %s at %s\n", traineeName, hub);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: PRIVATE CONSTRUCTORS (UTILITY & SINGLETON) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Using Utility Class via Static Methods (No 'new' needed):");
        double gst = AcademyMathUtil.calculateGst(10000.0);
        double schol = AcademyMathUtil.calculateScholarship(92.0, 5000.0);
        System.out.printf("  GST on ₹10,000: ₹%.2f | Scholarship for 92%%: ₹%.2f\n", gst, schol);

        System.out.println("\n>>> 2. Accessing Singleton Registry from Multiple References:");
        CentralAcademicRegistry reg1 = CentralAcademicRegistry.getInstance();
        reg1.logRegistration("Swadeep Paul", "Barrackpore Hub");

        CentralAcademicRegistry reg2 = CentralAcademicRegistry.getInstance();
        reg2.logRegistration("Tuhina Das", "Naihati Hub");

        System.out.println("\n>>> 3. Verifying Singleton Identity (Both references point to exact same memory):");
        System.out.println("  Is reg1 == reg2? " + (reg1 == reg2) + " (HashCode: " + System.identityHashCode(reg1) + ")");

        System.out.println("\n==========================================================================");
    }
}