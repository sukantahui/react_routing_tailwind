/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 6: Why the Multi-Catch Exception Parameter is Implicitly Final
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.IOException;
import java.sql.SQLException;

public class MultiCatchImplicitlyFinalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: MULTI-CATCH IMPLICITLY FINAL PARAMETER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Traditional Single-Catch: The parameter is NOT final (reassignment is allowed, though discouraged):
        try {
            throw new IOException("Original I/O Exception");
        } catch (IOException singleEx) {
            System.out.println(">>> 1. Single-Catch parameter reassignment:");
            singleEx = new IOException("Reassigned I/O Exception"); // Legal in single-catch!
            System.out.println("  singleEx: " + singleEx.getMessage());
        }

        // 2. Java 7 Multi-Catch: The parameter is strictly and implicitly FINAL:
        try {
            if (System.currentTimeMillis() > 0) throw new SQLException("Database connection dropped!");
            else throw new IOException("Disk failure!");
        } catch (IOException | SQLException multiEx) {
            System.out.println("\n>>> 2. Multi-Catch parameter is IMPLICITLY FINAL:");
            System.out.println("  multiEx: " + multiEx.getMessage());

            // COMPILE ERROR if we attempt reassignment:
            // multiEx = new SQLException("Another SQL error"); // Error: Cannot assign a value to final variable multiEx!
        }

        System.out.println("\n>>> WHY IS MULTI-CATCH PARAMETER FINAL?");
        System.out.println("  Because 'multiEx' has a union type (IOException | SQLException).");
        System.out.println("  If reassignment were permitted, you could assign an IOException into a variable that was actually handling an SQLException, destroying type safety!");

        System.out.println("\n==========================================================================");
    }
}