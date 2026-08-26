/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 4: Multiple Bounds Syntax: <T extends ClassA & InterfaceB & InterfaceC>
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.io.Serializable;

// Superclass Bound:
abstract class AcademicPerson {
    private final String fullName;
    public AcademicPerson(String name) { this.fullName = name; }
    public String getFullName() { return fullName; }
}

// Interface Bound 1:
interface Auditable {
    String getAuditTimestamp();
}

// Interface Bound 2:
interface Scoreable {
    double getFinalScore();
}

// Concrete class satisfying ALL THREE bounds:
class CertifiedTrainee extends AcademicPerson implements Auditable, Scoreable, Serializable {
    private static final long serialVersionUID = 1L;
    private final double score;

    public CertifiedTrainee(String name, double score) {
        super(name);
        this.score = score;
    }

    @Override public String getAuditTimestamp() { return "2026-08-27T01:20:00Z"; }
    @Override public double getFinalScore() { return score; }
}

// Generic Evaluator enforcing MULTIPLE BOUNDS:
class MultiBoundCertifier<T extends AcademicPerson & Auditable & Scoreable> {
    public void generateCertificate(T entity) {
        System.out.println("  [CERTIFICATE ISSUED]");
        System.out.println("    Candidate : " + entity.getFullName());
        System.out.println("    Score     : " + entity.getFinalScore());
        System.out.println("    Audit Log : " + entity.getAuditTimestamp());
    }
}

public class MultipleBoundsSyntaxDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: MULTIPLE BOUNDS SYNTAX (&) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CertifiedTrainee trainee = new CertifiedTrainee("Swadeep Paul (Barrackpore)", 98.5);

        MultiBoundCertifier<CertifiedTrainee> certifier = new MultiBoundCertifier<>();
        certifier.generateCertificate(trainee);

        System.out.println("\n>>> MULTIPLE BOUNDS SYNTAX RULES:");
        System.out.println("  1. Bounds are joined with the ampersand '&' symbol: '<T extends ClassA & InterfaceB & InterfaceC>'.");
        System.out.println("  2. The type 'T' is guaranteed to possess methods from ClassA, InterfaceB, and InterfaceC simultaneously!");

        System.out.println("\n==========================================================================");
    }
}