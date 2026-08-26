/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 11: java.io.Externalizable: Manual Total Control via writeExternal() & readExternal()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;

// Externalizable Entity (Gives programmer 100% manual control over every byte):
class FastStudentSummary implements Externalizable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int score;

    // MANDATORY REQUIREMENT: Externalizable classes MUST have a public no-arg constructor!
    public FastStudentSummary() {
        System.out.println("  [NO-ARG CONSTRUCTOR] Invoked during Externalizable deserialization!");
    }

    public FastStudentSummary(String name, int score) {
        this.name = name;
        this.score = score;
    }

    // Manual serialization:
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(name);
        out.writeInt(score);
        System.out.println("  [writeExternal] Manually wrote name and score.");
    }

    // Manual deserialization:
    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        this.name = in.readUTF();
        this.score = in.readInt();
        System.out.println("  [readExternal] Manually read name and score.");
    }

    @Override
    public String toString() { return "FastStudentSummary[name=" + name + ", score=" + score + "]"; }
}

public class ExternalizableManualControlDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: java.io.Externalizable MANUAL CONTROL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        FastStudentSummary summary = new FastStudentSummary("Tuhina Das", 98);

        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteBuffer)) {
            oos.writeObject(summary);
        }

        System.out.println("\n>>> Deserializing Externalizable Object:");
        FastStudentSummary restored;
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(byteBuffer.toByteArray()))) {
            restored = (FastStudentSummary) ois.readObject();
        }

        System.out.println("  Restored: " + restored);

        System.out.println("\n>>> COMPARISON: Serializable vs Externalizable:");
        System.out.println("  - Serializable : Automatic JVM reflection (slower, no constructor called, transient keyword honored).");
        System.out.println("  - Externalizable: Manual programmer code (faster, public no-arg constructor MANDATORY, ignores transient).");

        System.out.println("\n==========================================================================");
    }
}