/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 1: What is Deserialization: Reconstructing Live Java Objects from Byte Streams
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class CourseEnrollment implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String courseName;
    private final int totalHours;

    public CourseEnrollment(String name, int hours) {
        this.courseName = name;
        this.totalHours = hours;
        System.out.println("  [CONSTRUCTOR CALLED] Initializing CourseEnrollment instance in memory.");
    }

    public String getCourseName() { return courseName; }
    public int getTotalHours() { return totalHours; }

    @Override
    public String toString() {
        return "CourseEnrollment{course='" + courseName + "', hours=" + totalHours + "}";
    }
}

public class DeserializationReconstructionDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: WHAT IS OBJECT DESERIALIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating and Serializing Original Instance:");
        CourseEnrollment original = new CourseEnrollment("Java Core & Spring Microservices", 120);

        ByteArrayOutputStream byteSink = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteSink)) {
            oos.writeObject(original);
        }
        byte[] serializedData = byteSink.toByteArray();

        System.out.println("\n>>> 2. Deserializing Object from Raw Bytes (ObjectInputStream):");
        CourseEnrollment restored;
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(serializedData))) {
            // DESERIALIZATION MAGIC: Notice that NO CONSTRUCTOR is called during readObject()!
            restored = (CourseEnrollment) ois.readObject();
        }

        System.out.println("  Restored Object State : " + restored);
        System.out.println("  Is Same Reference?    : " + (original == restored) + " (Completely independent heap clone!)");
        System.out.println("  Are Fields Identical? : " + (original.getCourseName().equals(restored.getCourseName()) && original.getTotalHours() == restored.getTotalHours()));

        System.out.println("\n>>> CRITICAL DESERIALIZATION FACT:");
        System.out.println("  The target class constructor is NEVER invoked during deserialization for Serializable classes!");
        System.out.println("  The JVM allocates uninitialized heap memory and directly injects field values via reflection/bytecode!");

        System.out.println("\n==========================================================================");
    }
}