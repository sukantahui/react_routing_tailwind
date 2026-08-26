/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 1: Anatomy of SQL Injection - String Concatenation Vulnerabilities
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class AnatomySqlInjectionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: ANATOMY OF SQL INJECTION ATTACK - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. INSECURE CODE WRITTEN BY NAIVE DEVELOPER:
        String userInputName = "admin' OR '1'='1"; // Malicious attacker payload
        String userPassword  = "any_password";

        // Insecure String Concatenation:
        String vulnerableSql = "SELECT * FROM users WHERE username = '" + userInputName + "' AND password = '" + userPassword + "'";

        System.out.println(">>> 1. VULNERABLE GENERATED SQL QUERY STRING:");
        System.out.println("  " + vulnerableSql + "\n");

        System.out.println(">>> 2. HOW THE DATABASE INTERPRETS THIS QUERY:");
        System.out.println("  - Because ('1'='1') is ALWAYS TRUE, the WHERE condition evaluates to TRUE for all rows!");
        System.out.println("  - The database returns the first user (System Administrator!) without checking password!");
        System.out.println("  - Attacker logs in with full administrative privileges! 🚨\n");

        System.out.println(">>> 3. WORSE ATTACK PAYLOAD (Destructive Data Drop):");
        String destructivePayload = "admin'; DROP TABLE students; --";
        String destructiveSql = "SELECT * FROM users WHERE username = '" + destructivePayload + "'";
        System.out.println("  " + destructiveSql);
        System.out.println("  - Attacker wipes out the entire students database table! 💥");

        System.out.println("\n==========================================================================");
    }
}
