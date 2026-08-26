/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 8: The serialVersionUID Field: Versioning Contract & Unique Hash Calculation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ObjectStreamClass;
import java.io.Serializable;

// Class with EXPLICIT serialVersionUID (Recommended Best Practice):
class VersionedTaxReport implements Serializable {
    // Explicit Version UID: Declares compatibility contract across versions
    private static final long serialVersionUID = 1001L;

    private final String reportId;
    private final double totalTaxCollected;

    public VersionedTaxReport(String id, double tax) {
        this.reportId = id;
        this.totalTaxCollected = tax;
    }
}

// Class with NO serialVersionUID (JVM auto-generates SHA-1 hash at compile time):
class UnversionedClass implements Serializable {
    private String name;
    private int score;
}

public class SerialVersionUIDContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: serialVersionUID CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Querying serialVersionUID using ObjectStreamClass:
        ObjectStreamClass explicitMeta = ObjectStreamClass.lookup(VersionedTaxReport.class);
        ObjectStreamClass autoMeta     = ObjectStreamClass.lookup(UnversionedClass.class);

        System.out.println(">>> 1. Comparing Explicit vs Auto-Calculated serialVersionUID:");
        System.out.println("  VersionedTaxReport UID (Explicit) : " + explicitMeta.getSerialVersionUID() + "L");
        System.out.println("  UnversionedClass UID (Auto SHA-1) : " + autoMeta.getSerialVersionUID() + "L");

        System.out.println("\n>>> WHY YOU MUST ALWAYS EXPLICITLY DECLARE serialVersionUID:");
        System.out.println("  1. Compiler Sensitivity: If omitted, the compiler computes a SHA-1 hash based on class structure, fields, methods, and interfaces.");
        System.out.println("  2. Incompatibility Risk: Adding a single private helper method changes the SHA-1 hash, making previously saved files unreadable!");
        System.out.println("  3. Cross-Compiler Stability: Different Java compilers (Oracle javac vs Eclipse ECJ) can generate different hashes for the same class!");

        System.out.println("\n==========================================================================");
    }
}