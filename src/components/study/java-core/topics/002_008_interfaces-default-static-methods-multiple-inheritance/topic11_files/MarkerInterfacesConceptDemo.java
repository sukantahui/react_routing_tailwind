/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 11: Marker / Tagging Interfaces: Concept and JVM Metadata Flags
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

import java.io.Serializable;

public class MarkerInterfacesConceptDemo {

    // CUSTOM MARKER INTERFACE: Completely EMPTY (0 fields, 0 methods)!
    // Purpose: Acts as a TYPE TAG / PERMISSION BADGE for runtime reflection / JVM checks.
    public interface SensitiveAuditRecord {}

    public static class PublicNotice {
        public String title = "Barrackpore Lab Timings";
    }

    // Tagged with Marker Interface
    public static class ConfidentialFinancialReport implements SensitiveAuditRecord, Serializable {
        private static final long serialVersionUID = 1L;
        public double quarterlyRevenue = 4500000.0;
    }

    public static void auditObjectSecurity(Object obj) {
        // Runtime type inspection using 'instanceof':
        if (obj instanceof SensitiveAuditRecord) {
            System.out.println("  [CONFIDENTIAL ALERT] Object is tagged with SensitiveAuditRecord! Applying AES-256 encryption.");
        } else {
            System.out.println("  [STANDARD NOTICE] Public record. No special encryption needed.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: MARKER (TAGGING) INTERFACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        PublicNotice notice = new PublicNotice();
        ConfidentialFinancialReport report = new ConfidentialFinancialReport();

        System.out.println(">>> 1. Auditing PublicNotice:");
        auditObjectSecurity(notice);

        System.out.println("\n>>> 2. Auditing ConfidentialFinancialReport:");
        auditObjectSecurity(report);

        System.out.println("\n>>> Classic Java Built-in Marker Interfaces:");
        System.out.println("  - java.lang.Cloneable       -> Authorizes Object.clone()");
        System.out.println("  - java.io.Serializable      -> Authorizes ObjectOutputStream serialization");
        System.out.println("  - java.rmi.Remote           -> Tags RMI distributed remote services");

        System.out.println("\n==========================================================================");
    }
}