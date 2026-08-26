/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 2: Extracting Column Data - 1-Based Index vs Column Label Name
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ColumnIndexVsLabelExtractionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: 1-BASED INDEX VS COLUMN LABEL EXTRACTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. EXTRACTION BY 1-BASED COLUMN INDEX (e.g. rs.getInt(1)):");
        System.out.println("  - PROS: Microsecond speed advantage (driver directly accesses column array index).");
        System.out.println("  - CONS: High Fragility! If SQL changes from 'SELECT id, name' to 'SELECT name, id',");
        System.out.println("          rs.getInt(1) will attempt to parse 'name' as int and throw SQLException!\n");

        System.out.println(">>> 2. EXTRACTION BY COLUMN LABEL / NAME (e.g. rs.getString("student_name")):");
        System.out.println("  - PROS: High Maintainability & Readability! Immune to SQL SELECT column ordering changes!");
        System.out.println("  - PROS: Works seamlessly with SQL column aliases (e.g. 'SELECT s_name AS student_name').");
        System.out.println("  - CONS: Microscopic overhead for driver's internal String-to-Index hash map lookup.\n");

        System.out.println(">>> INDUSTRY RECOMMENDATION:");
        System.out.println("  - Use COLUMN LABELS / NAMES in 99% of business code for maintainability and safety!");
        System.out.println("==========================================================================");
    }
}
