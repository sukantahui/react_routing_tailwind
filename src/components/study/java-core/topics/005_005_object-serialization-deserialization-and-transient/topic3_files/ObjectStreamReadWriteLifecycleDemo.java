/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 3: ObjectOutputStream & ObjectInputStream: writeObject() and readObject() Lifecycle
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

class BatchLedger implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String branchCode;
    private final List<String> enrolledStudents = new ArrayList<>();

    public BatchLedger(String branch) {
        this.branchCode = branch;
    }

    public void addStudent(String name) { enrolledStudents.add(name); }

    @Override
    public String toString() {
        return "BatchLedger[Branch=" + branchCode + ", Students=" + enrolledStudents + "]";
    }
}

public class ObjectStreamReadWriteLifecycleDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: ObjectOutputStream & ObjectInputStream - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BatchLedger bkpLedger = new BatchLedger("BKP_NORTH_24_PGS");
        bkpLedger.addStudent("Swadeep Paul");
        bkpLedger.addStudent("Tuhina Das");
        bkpLedger.addStudent("Abhronila Das");

        // 1. Serialization with ObjectOutputStream:
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteBuffer)) {
            // Writing primitive metadata along with object graph:
            oos.writeInt(2026); // Writes 4-byte primitive int
            oos.writeUTF("ACCOTAX_SECRET_SALT_BKP"); // Writes UTF string
            oos.writeObject(bkpLedger); // Writes complete serialized object graph
            oos.flush();
        }

        byte[] payload = byteBuffer.toByteArray();
        System.out.println(">>> 1. Serialized Stream Created: " + payload.length + " bytes.");

        // 2. Deserialization with ObjectInputStream (MUST READ IN EXACT SAME ORDER!):
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(payload))) {
            int year = ois.readInt();
            String salt = ois.readUTF();
            BatchLedger restored = (BatchLedger) ois.readObject();

            System.out.println("\n>>> 2. Deserialized Stream Reconstructed:");
            System.out.println("  Year       : " + year);
            System.out.println("  Salt       : " + salt);
            System.out.println("  Restored   : " + restored);
        }

        System.out.println("\n>>> CRITICAL ORDERING RULE:");
        System.out.println("  Data in ObjectInputStream MUST be read in the EXACT same sequence it was written to ObjectOutputStream!");

        System.out.println("\n==========================================================================");
    }
}