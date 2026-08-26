/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 7: Static Variables and Serialization: Class State vs Instance State
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class AcademicInstitution implements Serializable {
    private static final long serialVersionUID = 1L;

    // STATIC FIELD: Belongs to the Class in Metaspace, NOT individual heap instances!
    public static String centralHubBranch = "Barrackpore Hub 2026";

    // INSTANCE FIELD: Serialized normally
    private final String studentName;

    public AcademicInstitution(String name) {
        this.studentName = name;
    }

    @Override
    public String toString() {
        return "Student=" + studentName + " | CentralBranch=" + centralHubBranch;
    }
}

public class StaticVariablesSerializationBehaviorDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: STATIC VARIABLES & SERIALIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademicInstitution original = new AcademicInstitution("Abhronila Das");
        System.out.println(">>> 1. Original Instance State:");
        System.out.println("  " + original);

        // Serialize instance:
        ByteArrayOutputStream byteSink = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteSink)) {
            oos.writeObject(original);
        }

        // MODIFY STATIC VARIABLE IN MEMORY PRIOR TO DESERIALIZATION:
        System.out.println("\n>>> 2. Mutating static 'centralHubBranch' variable in current JVM...");
        AcademicInstitution.centralHubBranch = "Naihati Advanced Center (MODIFIED!)";

        // Deserialize:
        AcademicInstitution restored;
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(byteSink.toByteArray()))) {
            restored = (AcademicInstitution) ois.readObject();
        }

        System.out.println("\n>>> 3. Restored Instance State:");
        System.out.println("  " + restored);
        System.out.println("  [OBSERVATION] Notice that 'centralHubBranch' reflects the NEW static value, NOT the old one!");

        System.out.println("\n>>> WHY STATIC VARIABLES ARE NEVER SERIALIZED:");
        System.out.println("  1. 'Object Serialization' serializes the state of an OBJECT INSTANCE on the heap.");
        System.out.println("  2. Static variables belong to the Class template in Metaspace/Classloader, not instances.");
        System.out.println("  3. When an object is deserialized, static fields reflect whatever value the current JVM currently holds.");

        System.out.println("\n==========================================================================");
    }
}