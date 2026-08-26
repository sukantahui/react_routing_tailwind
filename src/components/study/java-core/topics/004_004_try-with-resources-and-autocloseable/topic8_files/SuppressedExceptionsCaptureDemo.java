/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 8: Suppressed Exceptions: Preserving Primary Business Exceptions in ARM
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

// A resource whose close() method also fails:
class FailingResource implements AutoCloseable {
    private final String id;

    public FailingResource(String id) { this.id = id; }

    public void doBusinessTask() {
        System.out.println("  [TASK EXECUTING] Executing primary calculation on " + id);
        throw new IllegalStateException("PRIMARY FAILURE: Calculation calculation formula invalid in Barrackpore!");
    }

    @Override
    public void close() {
        System.out.println("  [CLOSING...] Attempting to close " + id);
        throw new RuntimeException("SECONDARY FAILURE: Network socket crashed during close()!");
    }
}

public class SuppressedExceptionsCaptureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: SUPPRESSED EXCEPTIONS CAPTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Executing ARM where BOTH try-body AND close() throw exceptions:");
        try (FailingResource res = new FailingResource("RES_BKP_01")) {
            res.doBusinessTask();
        } catch (Exception primaryEx) {
            System.out.println("\n>>> 1. PRIMARY EXCEPTION PRESERVED:");
            System.out.println("  Class   : " + primaryEx.getClass().getSimpleName());
            System.out.println("  Message : " + primaryEx.getMessage());

            System.out.println("\n>>> 2. INSPECTING SUPPRESSED SECONDARY EXCEPTIONS (Throwable.getSuppressed()):");
            Throwable[] suppressedArray = primaryEx.getSuppressed();
            System.out.println("  Total Suppressed Exceptions Count: " + suppressedArray.length);

            for (Throwable sup : suppressedArray) {
                System.out.println("  - Suppressed Class   : " + sup.getClass().getSimpleName());
                System.out.println("  - Suppressed Message : " + sup.getMessage());
            }
        }

        System.out.println("\n>>> WHY SUPPRESSED EXCEPTIONS WIN OVER LEGACY FINALLY:");
        System.out.println("  In legacy finally, the secondary close() error ERASED the primary business error.");
        System.out.println("  In ARM, Java preserves the primary error and attaches secondary errors via addSuppressed()!");

        System.out.println("\n==========================================================================");
    }
}