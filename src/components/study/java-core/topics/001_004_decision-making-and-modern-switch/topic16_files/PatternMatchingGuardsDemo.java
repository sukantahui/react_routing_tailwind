/**
 * File: PatternMatchingGuardsDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 16)
 * Description: Demonstrates Pattern Matching for switch and Guard Conditions ('when' clauses)
 *              standardized in Java 21 (JEP 441, JLS §14.11), pattern dominance rules,
 *              explicit null handling (case null ->), type pattern deconstruction,
 *              and heterogeneous student fee audits in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class PatternMatchingGuardsDemo {

    public record StudentRecord(String name, int marks, double tuitionPaid) {}
    public record CorporateGrant(String company, double sanctionAmount) {}

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 16 PATTERN MATCHING & GUARD CONDITIONS (WHEN)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Type Pattern Matching with 'when' Guard Clauses
        System.out.println("--- 1. TYPE PATTERNS WITH 'WHEN' GUARDS ---");
        auditHeterogeneousPayload(new StudentRecord("Swadeep", 95, 15000.0));
        auditHeterogeneousPayload(new StudentRecord("Debangshu", 55, 12000.0));
        auditHeterogeneousPayload(new CorporateGrant("TCS Kolkata", 500000.0));
        auditHeterogeneousPayload("BARRACKPORE_SPECIAL_DISCOUNT");
        auditHeterogeneousPayload(42);
        auditHeterogeneousPayload(null);

        // 2. Pattern Dominance Ordering (Guarded Before Unguarded)
        System.out.println("\n--- 2. PATTERN DOMINANCE & STRING GUARDS ---");
        classifyStringMessage("SUPER_ADMIN");
        classifyStringMessage("Hello");
        classifyStringMessage("");

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Standardized in Java 21 (JEP 441), switch supports type pattern matching.");
        System.out.println("2. The 'when' clause refines pattern matches with boolean guard conditions.");
        System.out.println("3. Pattern Dominance: Guarded specific cases MUST precede unguarded general cases.");
        System.out.println("4. 'case null ->' enables safe handling of nulls without NullPointerException.");
        System.out.println("================================================================================");
    }

    private static void auditHeterogeneousPayload(Object payload) {
        // Pattern Matching switch with 'when' guards (Java 21):
        String report = switch (payload) {
            case null ->
                "-> [NULL PAYLOAD]: Received null token; bypass audit safely.";
            case StudentRecord s when s.marks() >= 90 ->
                String.format("-> [HONORS SCHOLAR]: %s (Score: %d%%) | Fee: ₹%,.2f -> 100%% Gold Medalist",
                        s.name(), s.marks(), s.tuitionPaid());
            case StudentRecord s when s.marks() >= 60 ->
                String.format("-> [REGULAR SCHOLAR]: %s (Score: %d%%) | Fee: ₹%,.2f -> Qualified",
                        s.name(), s.marks(), s.tuitionPaid());
            case StudentRecord s ->
                String.format("-> [REMEDIAL]: %s (Score: %d%%) -> Mandatory Mentorship with Sukanta Hui",
                        s.name(), s.marks());
            case CorporateGrant g when g.sanctionAmount() >= 100000.0 ->
                String.format("-> [MAJOR CORPORATE GRANT]: %s | Sanction: ₹%,.2f",
                        g.company(), g.sanctionAmount());
            case CorporateGrant g ->
                String.format("-> [STANDARD GRANT]: %s | Sanction: ₹%,.2f",
                        g.company(), g.sanctionAmount());
            case String str when str.startsWith("BARRACKPORE") ->
                "-> [CAMPUS CODE]: Recognized Barrackpore HQ Promotional Voucher!";
            case String str ->
                "-> [GENERIC STRING]: " + str;
            default ->
                "-> [UNRECOGNIZED OBJECT]: Type " + payload.getClass().getSimpleName();
        };

        System.out.println(report);
    }

    private static void classifyStringMessage(String msg) {
        String classification = switch (msg) {
            case String s when s.isEmpty() -> "Empty string payload";
            case String s when s.length() > 10 -> "Long message (" + s.length() + " chars)";
            case String s -> "Standard short message: " + s;
        };
        System.out.printf("Message: \"%-12s\" -> Classification: %s%n", msg, classification);
    }
}
