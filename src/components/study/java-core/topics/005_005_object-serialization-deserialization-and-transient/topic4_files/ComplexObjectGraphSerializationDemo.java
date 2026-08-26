/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 4: Serializing Complex Object Graphs: Deep Traversal & Graph Cycles
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

// Nested Reference 1: Must implement Serializable!
class AcademicHub implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String hubName;
    private final String district;

    public AcademicHub(String name, String district) {
        this.hubName = name;
        this.district = district;
    }

    @Override
    public String toString() { return hubName + " (" + district + ")"; }
}

// Root Object Graph Node:
class EnrolledStudentProfile implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String studentName;
    private final AcademicHub assignedHub; // Nested object reference!

    public EnrolledStudentProfile(String name, AcademicHub hub) {
        this.studentName = name;
        this.assignedHub = hub;
    }

    @Override
    public String toString() {
        return "Student: " + studentName + " @ Hub: " + assignedHub;
    }
}

public class ComplexObjectGraphSerializationDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: COMPLEX OBJECT GRAPH SERIALIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademicHub bkpHub = new AcademicHub("Barrackpore Central Hub", "North 24 Parganas");
        EnrolledStudentProfile student = new EnrolledStudentProfile("Swadeep Paul", bkpHub);

        System.out.println(">>> 1. Original Deep Object Graph:");
        System.out.println("  " + student);

        // Serialize the root object:
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteBuffer)) {
            // JVM automatically traverses and serializes the entire nested object graph!
            oos.writeObject(student);
        }

        // Deserialize:
        EnrolledStudentProfile restored;
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(byteBuffer.toByteArray()))) {
            restored = (EnrolledStudentProfile) ois.readObject();
        }

        System.out.println("\n>>> 2. Restored Deep Object Graph:");
        System.out.println("  " + restored);

        System.out.println("\n>>> HOW OBJECT GRAPH SERIALIZATION WORKS:");
        System.out.println("  1. Deep Traversal: The JVM traverses all referenced fields recursively.");
        System.out.println("  2. Circular Reference Detection: The JVM maintains a handle table (back-references) to prevent infinite loops.");
        System.out.println("  3. Strict Rule: EVERY class in the object graph MUST implement 'Serializable'!");

        System.out.println("\n==========================================================================");
    }
}