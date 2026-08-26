/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 8: Stubbing Method Behavior - when().thenReturn() & doThrow()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class StubbingMethodsWhenThenReturnDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: STUBBING METHOD BEHAVIOR - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. BASIC STUBBING WITH when().thenReturn():");
        System.out.println("  when(studentRepo.findById(101))");
        System.out.println("      .thenReturn(Optional.of(new Student("Swadeep Paul", "Barrackpore")));\n");

        System.out.println(">>> 2. STUBBING CONSECUTIVE CALLS:");
        System.out.println("  when(tokenService.generateToken())");
        System.out.println("      .thenReturn("token-1")");
        System.out.println("      .thenReturn("token-2");\n");

        System.out.println(">>> 3. STUBBING EXCEPTIONS:");
        System.out.println("  when(paymentGateway.charge(anyDouble()))");
        System.out.println("      .thenThrow(new PaymentFailedException("Insufficient Funds"));\n");

        System.out.println(">>> 4. VOID METHODS STUBBING:");
        System.out.println("  doThrow(new RuntimeException("Disk Full"))");
        System.out.println("      .when(fileLogger).log(anyString());");

        System.out.println("\n==========================================================================");
    }
}
