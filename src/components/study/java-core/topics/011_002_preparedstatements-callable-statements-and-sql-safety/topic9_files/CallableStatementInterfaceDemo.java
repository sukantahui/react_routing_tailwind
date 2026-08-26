/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 9: The CallableStatement Interface - Stored Procedures & Functions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

public class CallableStatementInterfaceDemo {

    public static void executeStoredProcedure(Connection conn, int studentId) throws SQLException {
        // Standard JDBC escape syntax for Stored Procedures:
        String procedureSql = "{call get_student_fee_summary(?, ?, ?)}";

        try (CallableStatement cstmt = conn.prepareCall(procedureSql)) {
            // 1. Setting IN parameter (Parameter 1):
            cstmt.setInt(1, studentId);

            // 2. Registering OUT parameters (Parameters 2 and 3):
            cstmt.registerOutParameter(2, Types.VARCHAR); // Student Name (OUT)
            cstmt.registerOutParameter(3, Types.DOUBLE);  // Total Due (OUT)

            // 3. Executing the stored procedure:
            cstmt.execute();

            // 4. Reading OUT parameter values:
            String studentName = cstmt.getString(2);
            double totalDue    = cstmt.getDouble(3);

            System.out.println("   [PROCEDURE RESULT]: Student: " + studentName + " | Balance Due: ₹" + totalDue);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: THE CALLABLESTATEMENT INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 JDBC CALL ESCAPE SYNTAX VARIATIONS:");
        System.out.println("  1. Procedure with no return value : {call procedure_name(?, ?)}");
        System.out.println("  2. Function with return value     : {? = call function_name(?, ?)}");
        System.out.println("  3. Procedure with no arguments    : {call procedure_name}\n");

        System.out.println(">>> PARAMETER MODES:");
        System.out.println("  - IN    : Passed from Java into the stored procedure (bound via setInt/setString).");
        System.out.println("  - OUT   : Calculated by procedure and returned to Java (registered via registerOutParameter).");
        System.out.println("  - INOUT : Passed from Java, mutated by procedure, and returned to Java.");

        System.out.println("\n==========================================================================");
    }
}
