/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 10: Implementing DIP in Pure Java Using Constructor Dependency Injection
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class ConstructorDependencyInjectionDemo {

    // 1. Dependency Contract
    public interface PaymentProcessor {
        boolean charge(String trainee, double amount);
    }

    // 2. Production Implementation
    public static class ProductionRazorpayProcessor implements PaymentProcessor {
        public boolean charge(String trainee, double amount) {
            System.out.printf("  [LIVE GATEWAY] Charged ₹%.2f to %s via Razorpay Gateway.\n", amount, trainee);
            return true;
        }
    }

    // 3. Mock Test Implementation (For Instant Unit Testing with Zero Network Calls!)
    public static class MockTestPaymentProcessor implements PaymentProcessor {
        public boolean charge(String trainee, double amount) {
            System.out.printf("  [MOCK TEST] Simulated ₹%.2f charge for %s (Success: True)\n", amount, trainee);
            return true;
        }
    }

    // 4. Client Service utilizing Constructor Dependency Injection
    public static class CourseCheckoutService {
        private final PaymentProcessor processor; // Immutable injected dependency

        // PURE JAVA CONSTRUCTOR DEPENDENCY INJECTION:
        public CourseCheckoutService(PaymentProcessor processor) {
            if (processor == null) throw new IllegalArgumentException("Processor cannot be null!");
            this.processor = processor;
        }

        public void enrollInCourse(String student, double fee) {
            System.out.println(">>> Processing Enrollment for: " + student);
            boolean success = processor.charge(student, fee);
            if (success) System.out.println("  [ACADEMY] Enrollment Confirmed @ Barrackpore Hub!
");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: CONSTRUCTOR DEPENDENCY INJECTION IN PURE JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Executing Unit Test with Mock Dependency:");
        CourseCheckoutService testService = new CourseCheckoutService(new MockTestPaymentProcessor());
        testService.enrollInCourse("Swadeep Paul", 12000.0);

        System.out.println(">>> 2. Executing Production App with Real Razorpay Dependency:");
        CourseCheckoutService prodService = new CourseCheckoutService(new ProductionRazorpayProcessor());
        prodService.enrollInCourse("Tuhina Das", 15000.0);

        System.out.println("==========================================================================");
    }
}