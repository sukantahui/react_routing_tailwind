/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 3: The wasNull() Method - Handling SQL NULL in Primitives
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WasNullMethodDemo {

    public static Double extractNullableDouble(ResultSet rs, String columnLabel) throws SQLException {
        // Step 1: Read primitive double
        double value = rs.getDouble(columnLabel);

        // Step 2: Check wasNull() IMMEDIATELY after reading the column!
        if (rs.wasNull()) {
            return null; // Database column was genuinely SQL NULL!
        }
        return value;    // Database column had a valid numeric value!
    }

    public static Integer extractNullableInteger(ResultSet rs, String columnLabel) throws SQLException {
        int value = rs.getInt(columnLabel);
        return rs.wasNull() ? null : value;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: THE wasNull() METHOD - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE PRIMITIVE NULL DILEMMA IN JDBC:");
        System.out.println("  - Java primitive types ('int', 'double', 'boolean', 'long') CANNOT BE NULL.");
        System.out.println("  - When a database column is SQL NULL:");
        System.out.println("    * rs.getInt()     returns 0 (NOT null!).");
        System.out.println("    * rs.getDouble()  returns 0.0.");
        System.out.println("    * rs.getBoolean() returns false.\n");

        System.out.println(">>> THE SOLUTION: rs.wasNull():");
        System.out.println("  - 'boolean wasNull()' checks whether the LAST read column was SQL NULL.");
        System.out.println("  - Always call 'rs.wasNull()' immediately after reading the primitive getter!");

        System.out.println("\n==========================================================================");
    }
}
