/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 5: Automatic Resource Teardown Sequence: Reverse Order of Declaration
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

class InstrumentedResource implements AutoCloseable {
    private final String name;

    public InstrumentedResource(String name) {
        this.name = name;
        System.out.println("  [INITIALIZED 1st/2nd/3rd] Opened: " + name);
    }

    @Override
    public void close() {
        System.out.println("  [CLOSED IN REVERSE ORDER] Closed: " + name);
    }
}

public class ReverseOrderTeardownSequenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: REVERSE ORDER OF DECLARATION CLOSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Initializing 3 Resources in Order: A -> B -> C:");
        try (
            InstrumentedResource resA = new InstrumentedResource("Resource_A_DatabaseConnection");
            InstrumentedResource resB = new InstrumentedResource("Resource_B_StatementQuery");
            InstrumentedResource resC = new InstrumentedResource("Resource_C_ResultSetCursor")
        ) {
            System.out.println("\n  [INSIDE TRY BODY] Performing business logic with A, B, and C...\n");
        }

        System.out.println("\n>>> WHY REVERSE ORDER (LIFO: C -> B -> A)?");
        System.out.println("  - Resource C (ResultSet) depends on Resource B (Statement), which depends on Resource A (Connection).");
        System.out.println("  - Closing in REVERSE order ensures dependent child resources close cleanly BEFORE parent dependencies terminate!");

        System.out.println("\n==========================================================================");
    }
}