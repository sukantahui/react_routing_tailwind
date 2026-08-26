/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 10: Registering OUT Parameters - registerOutParameter() & Types Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

public class RegisteringOutParametersCapstoneDemo {

    public static void executeInOutParameterDemo(Connection conn) throws SQLException {
        // Procedure with INOUT parameter (Parameter 1 acts as both input and output):
        String sql = "{call apply_barrackpore_gst_and_rebate(?)}";

        try (CallableStatement cstmt = conn.prepareCall(sql)) {
            // 1. Bind input value:
            cstmt.setDouble(1, 5000.0);

            // 2. Register output SQL type on the SAME parameter index:
            cstmt.registerOutParameter(1, Types.DOUBLE);

            // 3. Execute:
            cstmt.execute();

            // 4. Retrieve mutated output:
            double finalAmount = cstmt.getDouble(1);
            System.out.println("   [INOUT RESULT]: Initial: ₹5000.0 -> Mutated Output: ₹" + finalAmount);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: REGISTERING OUT PARAMETERS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE COMPLETE 4-STEP CALLABLESTATEMENT OUT PARAMETER WORKFLOW:");
        System.out.println("  1. Prepare Call            : CallableStatement cs = conn.prepareCall("{call proc(?, ?)}");");
        System.out.println("  2. Set IN parameters       : cs.setInt(1, 101);");
        System.out.println("  3. Register OUT parameters : cs.registerOutParameter(2, java.sql.Types.VARCHAR);");
        System.out.println("  4. Execute & Read OUT      : cs.execute(); String output = cs.getString(2);\n");

        System.out.println("==========================================================================");
        System.out.println(" MODULE 011_002 COMPLETE: PREPAREDSTATEMENTS & SQL SAFETY MASTERED!");
        System.out.println("==========================================================================");
    }
}
