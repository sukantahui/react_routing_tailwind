/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 3: The java.lang.AutoCloseable Interface: Single Method 'void close() throws Exception'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

// Custom class implementing the core Java AutoCloseable contract:
class BarrackporeLabTerminal implements AutoCloseable {

    private final String terminalId;

    public BarrackporeLabTerminal(String id) {
        this.terminalId = id;
        System.out.println("  [ACQUIRED] Lab terminal initialized: " + id);
    }

    public void runCodingSession(String student) {
        System.out.println("  [RUNNING] " + student + " is compiling Java Core modules on " + terminalId);
    }

    @Override
    public void close() throws Exception {
        System.out.println("  [AUTOCLOSE] Lab terminal " + terminalId + " session closed & resources freed.");
    }
}

public class AutoCloseableInterfaceContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: java.lang.AutoCloseable CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Executing ARM with Custom AutoCloseable Resource:");
        try (BarrackporeLabTerminal terminal = new BarrackporeLabTerminal("TERM_BKP_01")) {
            terminal.runCodingSession("Swadeep Paul");
        } catch (Exception e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("\n>>> THE AutoCloseable CONTRACT RULES:");
        System.out.println("  1. Located in 'java.lang' (No import needed).");
        System.out.println("  2. Single method: 'void close() throws Exception;'.");
        System.out.println("  3. Implementations should make close() IDEMPOTENT (safe to invoke multiple times).");

        System.out.println("\n==========================================================================");
    }
}