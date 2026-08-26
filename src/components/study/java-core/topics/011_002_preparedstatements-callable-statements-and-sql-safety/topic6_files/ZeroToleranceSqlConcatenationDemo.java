/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 6: Why String Concatenation is Forbidden - OWASP Security Guidelines
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ZeroToleranceSqlConcatenationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: ZERO TOLERANCE FOR SQL STRING CONCATENATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 FATAL RISKS OF SQL STRING CONCATENATION:");
        System.out.println("  1. TOTAL VULNERABILITY TO SQLi  : OWASP Top 10 Security Vulnerability #1.");
        System.out.println("  2. DATABASE PLAN CACHE FLOODING : Every unique string creates a new un-reusable query plan, exhausting database RAM!");
        System.out.println("  3. DATE / TIMEZONE FORMAT BUGS  : String formatted dates ('2026-08-27') break across international database locales!\n");

        System.out.println(">>> ENTERPRISE STATIC ANALYSIS & COMPLIANCE:");
        System.out.println("  - SonarQube Rule: 'java:S2077 - SQL queries should not be vulnerable to injection attacks'");
        System.out.println("  - PCI-DSS & HIPAA Compliance explicitly mandate parameterized queries for all financial and medical data.");

        System.out.println("\n==========================================================================");
    }
}
