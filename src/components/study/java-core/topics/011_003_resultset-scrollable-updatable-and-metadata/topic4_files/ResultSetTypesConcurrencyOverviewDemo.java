/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 4: ResultSet Types & Concurrency - Scrollability & Mutability
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ResultSetTypesConcurrencyOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: RESULTSET TYPES & CONCURRENCY OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. THE 3 RESULTSET TYPES (Scrollability):");
        System.out.println("  - ResultSet.TYPE_FORWARD_ONLY        : Moves forward only with rs.next() (Default / Fastest / Lowest RAM).");
        System.out.println("  - ResultSet.TYPE_SCROLL_INSENSITIVE  : Can scroll backward and jump; snapshot is insensitive to DB changes.");
        System.out.println("  - ResultSet.TYPE_SCROLL_SENSITIVE    : Can scroll backward and jump; reflects live updates made by other transactions.\n");

        System.out.println(">>> 2. THE 2 CONCURRENCY MODES (Updatability):");
        System.out.println("  - ResultSet.CONCUR_READ_ONLY         : Data rows cannot be updated via the ResultSet (Default).");
        System.out.println("  - ResultSet.CONCUR_UPDATABLE         : Rows can be mutated directly via rs.updateString() and rs.updateRow()!\n");

        System.out.println(">>> CREATING A CUSTOM STATEMENT WITH SPECIFIC TYPE & CONCURRENCY:");
        System.out.println("  Statement stmt = conn.createStatement(");
        System.out.println("      ResultSet.TYPE_SCROLL_INSENSITIVE,");
        System.out.println("      ResultSet.CONCUR_READ_ONLY);");

        System.out.println("\n==========================================================================");
    }
}
