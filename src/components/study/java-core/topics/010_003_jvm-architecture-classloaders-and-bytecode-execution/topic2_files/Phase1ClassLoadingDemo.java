/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 2: Phase 1 - Loading: Bytecode Ingestion & Metaspace Representation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

import java.io.InputStream;

public class Phase1ClassLoadingDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: PHASE 1 - CLASS LOADING - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // Inspecting raw bytecode ingestion of a compiled class file
        String resourcePath = Phase1ClassLoadingDemo.class.getName().replace('.', '/') + ".class";
        System.out.println(">>> 1. Ingesting raw bytecode stream for: " + resourcePath);

        try (InputStream is = Phase1ClassLoadingDemo.class.getClassLoader().getResourceAsStream(resourcePath)) {
            if (is != null) {
                byte[] header = new byte[4];
                is.read(header);

                // Java .class files ALWAYS start with the famous 4-byte magic number: 0xCAFEBABE!
                String hexMagic = String.format("%02X%02X%02X%02X", header[0], header[1], header[2], header[3]);
                System.out.println("  - First 4 Bytes (Magic Number) : 0x" + hexMagic);
                System.out.println("  - Is Valid Java Classfile?     : " + "CAFEBABE".equalsIgnoreCase(hexMagic) + " (0xCAFEBABE Verified!)");
            }
        }

        System.out.println("\n>>> WHAT HAPPENS IN METASPACE DURING PHASE 1:");
        System.out.println("  1. Binary stream is parsed into JVM internal Klass structures.");
        System.out.println("  2. 'java.lang.Class' mirror object is constructed on the Java heap/Metaspace.");
        System.out.println("  3. Method bytecode, constant pool tables, and field descriptors are mapped into Metaspace.");
        System.out.println("==========================================================================");
    }
}
