/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 1: How Frameworks Use Reflection - Mini Dependency Injection Engine
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Field;

public class HowFrameworksUseReflectionDemo {

    // Custom Annotation: Simulating Spring's @Autowired
    @Retention(RetentionPolicy.RUNTIME)
    public @interface MiniAutowired {}

    // Service Dependency
    public static class PaymentGateway {
        public void processFee(String studentName, double amount) {
            System.out.println("   💳 [PAYMENT GATEWAY]: Processing ₹" + amount + " for " + studentName);
        }
    }

    // Client Component with Injected Dependency
    public static class AcademyEnrollmentService {
        @MiniAutowired
        private PaymentGateway paymentGateway; // Injected via Reflection!

        public void enrollStudent(String name, double fee) {
            System.out.println("1. Enrolling student: " + name);
            paymentGateway.processFee(name, fee);
            System.out.println("2. Enrollment completed successfully at Barrackpore!");
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: HOW FRAMEWORKS USE REFLECTION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // Simulating Spring IoC Container Initialization:
        AcademyEnrollmentService service = new AcademyEnrollmentService();
        PaymentGateway gatewayInstance = new PaymentGateway();

        System.out.println(">>> SIMULATING SPRING IOC CONTAINER DEPENDENCY INJECTION:");

        // Scan all fields for @MiniAutowired and inject instance via Reflection:
        for (Field field : service.getClass().getDeclaredFields()) {
            if (field.isAnnotationPresent(MiniAutowired.class)) {
                System.out.println("  - Discovered @MiniAutowired on field: " + field.getName());
                field.setAccessible(true); // Bypass private encapsulation
                field.set(service, gatewayInstance); // Inject dependency bean!
                System.out.println("  - Successfully injected PaymentGateway bean into " + field.getName());
            }
        }

        // Running service with injected dependency:
        System.out.println("\n>>> RUNNING SERVICE WITH INJECTED DEPENDENCY:");
        service.enrollStudent("Swadeep Paul", 4500.0);

        System.out.println("\n==========================================================================");
    }
}
