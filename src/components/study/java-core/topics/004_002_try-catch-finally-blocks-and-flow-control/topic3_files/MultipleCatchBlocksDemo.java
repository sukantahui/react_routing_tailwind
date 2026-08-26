/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 3: Multiple Catch Blocks: Handling Diverse Failure Scenarios Independently
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class MultipleCatchBlocksDemo {

    public static void executeMultiScenario(String[] rawInputs, int index) {
        System.out.printf("  [INVOCATION] Array Length: %d, Accessing Index: %d%n", rawInputs.length, index);

        try {
            // Risky Operation 1: Array access (May throw ArrayIndexOutOfBoundsException)
            String targetElement = rawInputs[index];

            // Risky Operation 2: String length on potential null (May throw NullPointerException)
            int len = targetElement.length();

            // Risky Operation 3: Number parsing (May throw NumberFormatException)
            int parsedScore = Integer.parseInt(targetElement);

            // Risky Operation 4: Division (May throw ArithmeticException)
            int bonus = 100 / parsedScore;

            System.out.println("  [SUCCESS] Calculated Bonus: " + bonus);

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("  [HANDLER 1] Invalid array index provided: " + e.getMessage());
        } catch (NullPointerException e) {
            System.out.println("  [HANDLER 2] Found null element at index " + index);
        } catch (NumberFormatException e) {
            System.out.println("  [HANDLER 3] Cannot parse string to integer: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("  [HANDLER 4] Cannot divide bonus by zero score!");
        }

        System.out.println("  [STATUS] Finished handling scenario.\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: MULTIPLE CATCH BLOCKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String[] batchData = { "50", "0", "Naihati", null };

        System.out.println(">>> Scenario 1 (Valid calculation):");
        executeMultiScenario(batchData, 0); // 100 / 50 = 2

        System.out.println(">>> Scenario 2 (ArithmeticException):");
        executeMultiScenario(batchData, 1); // 100 / 0

        System.out.println(">>> Scenario 3 (NumberFormatException):");
        executeMultiScenario(batchData, 2); // parse "Naihati"

        System.out.println(">>> Scenario 4 (NullPointerException):");
        executeMultiScenario(batchData, 3); // null.length()

        System.out.println(">>> Scenario 5 (ArrayIndexOutOfBoundsException):");
        executeMultiScenario(batchData, 99); // index 99 out of bounds

        System.out.println("==========================================================================");
    }
}