/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 0: What is Serialization: Converting In-Memory Object Graphs into Byte Streams
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

// 1. Serializable Entity:
class StudentTrainee implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String name;
    private final String academicHub;
    private final double gpa;

    public StudentTrainee(String name, String hub, double gpa) {
        this.name = name;
        this.academicHub = hub;
        this.gpa = gpa;
    }

    @Override
    public String toString() {
        return "StudentTrainee{name='" + name + "', hub='" + academicHub + "', gpa=" + gpa + "}";
    }
}

public class SerializationFundamentalsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS OBJECT SERIALIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentTrainee student = new StudentTrainee("Swadeep Paul", "Barrackpore", 9.85);

        System.out.println(">>> 1. Live In-Memory Java Object:");
        System.out.println("  " + student);

        // 2. Serializing Object Graph into Raw Byte Stream:
        ByteArrayOutputStream byteSink = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteSink)) {
            oos.writeObject(student); // FLATTENS object graph into Java binary wire format!
            oos.flush();
        }

        byte[] serializedBytes = byteSink.toByteArray();
        System.out.println("\n>>> 2. Serialized Binary Byte Stream Representation:");
        System.out.println("  Total Serialized Wire Size : " + serializedBytes.length + " bytes");
        System.out.print("  Magic Header (First 4 bytes): ");
        System.out.printf("0x%02X 0x%02X 0x%02X 0x%02X%n",
                serializedBytes[0], serializedBytes[1], serializedBytes[2], serializedBytes[3]);
        System.out.println("  (0xAC 0xED = STREAM_MAGIC; 0x00 0x05 = STREAM_VERSION 5)");

        System.out.println("\n>>> WHY SERIALIZATION IS ESSENTIAL:");
        System.out.println("  1. Persistence: Saving live object state to disk across application restarts.");
        System.out.println("  2. Remote Communication: Sending objects across networks (RMI, HTTP, Message Queues).");
        System.out.println("  3. Deep Cloning: Creating exact in-memory clones of complex object graphs.");

        System.out.println("\n==========================================================================");
    }
}