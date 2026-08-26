/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 1: ResultSet Cursor Mechanics - Navigating Tabular Data
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ResultSetCursorMechanicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: RESULTSET CURSOR MECHANICS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE RESULTSET CURSOR PROGRESSION TIMELINE:");
        System.out.println("  [State 1: Initial]      -> Cursor is at 'BEFORE FIRST' position (isBeforeFirst() = true).");
        System.out.println("  [State 2: 1st rs.next()] -> Moves to Row 1 (getRow() = 1, returns true).");
        System.out.println("  [State 3: 2nd rs.next()] -> Moves to Row 2 (getRow() = 2, returns true).");
        System.out.println("  [State 4: 3rd rs.next()] -> Moves to Row 3 (getRow() = 3, returns true).");
        System.out.println("  [State 5: 4th rs.next()] -> No more rows -> Moves to 'AFTER LAST' (isAfterLast() = true, returns false!).\n");

        System.out.println(">>> THE CANONICAL IDIOMS:");
        System.out.println("  1. Multi-Row Iteration   : while (rs.next()) { ... }");
        System.out.println("  2. Single-Row / PK Fetch : if (rs.next()) { ... } else { throw new NotFoundException(); }");

        System.out.println("\n==========================================================================");
    }
}
