/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 12: Deserialization Security Vulnerabilities (OWASP Top 10) & Modern ObjectInputFilter (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InvalidClassException;
import java.io.ObjectInputFilter;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class SecureStudentBadge implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String studentId = "STU_BKP_101";
}

class MaliciousPayloadObject implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String exploitCommand = "rm -rf /";
}

public class DeserializationSecurityFilterCapstoneDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: DESERIALIZATION SECURITY & ObjectInputFilter - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. OWASP TOP 10 SECURITY WARNING (CWE-502: Insecure Deserialization):");
        System.out.println("  - Deserializing untrusted byte streams from the network is one of the most dangerous vulnerabilities in Java history.");
        System.out.println("  - Attackers craft gadget chains (e.g. Apache Commons Collections) that trigger Remote Code Execution (RCE) during readObject()!");

        // Java 9+ Defense: ObjectInputFilter:
        System.out.println("\n>>> 2. Java 9+ Defense: Configuring ObjectInputFilter (Allowlist Pattern):");

        // Create serialized malicious payload:
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteBuffer)) {
            oos.writeObject(new MaliciousPayloadObject());
        }
        byte[] payloadBytes = byteBuffer.toByteArray();

        // Safe Deserialization with strict Allowlist Filter:
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(payloadBytes))) {
            // STRICT ALLOWLIST: Only allow SecureStudentBadge; reject everything else!
            ObjectInputFilter filter = ObjectInputFilter.Config.createFilter(
                    "com.coderaccotax.javatutorial.serialization.SecureStudentBadge;!*"
            );
            ois.setObjectInputFilter(filter);

            System.out.println("  [FILTER APPLIED] Allowlist: SecureStudentBadge ONLY. Rejecting all other classes.");
            ois.readObject(); // Blocked by filter!
        } catch (InvalidClassException e) {
            System.out.println("  [SECURITY DEFENSE ACTIVATED] Filter REJECTED untrusted class: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 005_005 OBJECT SERIALIZATION & TRANSIENT 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}