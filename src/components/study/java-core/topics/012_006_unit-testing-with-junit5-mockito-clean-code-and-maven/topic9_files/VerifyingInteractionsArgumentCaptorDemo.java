/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 9: Verifying Interactions & ArgumentCaptor
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class VerifyingInteractionsArgumentCaptorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: VERIFYING INTERACTIONS WITH MOCKITO - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. VERIFYING INVOCATION COUNTS:");
        System.out.println("  verify(emailService, times(1)).sendWelcomeMail("swadeep@example.com");");
        System.out.println("  verify(auditLogger, never()).logSecurityAlert(anyString());");
        System.out.println("  verify(smsService, atLeastOnce()).sendOTP(anyString());\n");

        System.out.println(">>> 2. VERIFYING CALL ORDER (InOrder):");
        System.out.println("  InOrder inOrder = inOrder(paymentRepo, auditLogger);");
        System.out.println("  inOrder.verify(paymentRepo).saveTransaction(any());");
        System.out.println("  inOrder.verify(auditLogger).logSuccess(any());\n");

        System.out.println(">>> 3. CAPTURING ARGUMENTS (ArgumentCaptor):");
        System.out.println("  ArgumentCaptor<EmailPayload> captor = ArgumentCaptor.forClass(EmailPayload.class);");
        System.out.println("  verify(emailService).send(captor.capture());");
        System.out.println("  assertEquals("Barrackpore Batch Confirmation", captor.getValue().getSubject());");

        System.out.println("\n==========================================================================");
    }
}
