/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 1: The Abstract Base Classes: java.io.Reader and java.io.Writer Hierarchy
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

public class ReaderWriterHierarchyTaxonomyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: java.io.Reader & java.io.Writer TAXONOMY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CHARACTER STREAM HIERARCHY TREE:");
        System.out.println();
        System.out.println("                     AutoCloseable / Closeable");
        System.out.println("                            /         \\");
        System.out.println("                           /           \\");
        System.out.println("              java.io.Reader          java.io.Writer (Flushable)");
        System.out.println("              /    |    \\               /    |     \\");
        System.out.println("             /     |     \\             /     |      \\");
        System.out.println("   BufferedReader  |   StringReader  BufferedWriter | StringWriter");
        System.out.println("   (Line reading)  |                 (Line writing) |");
        System.out.println("         InputStreamReader                 OutputStreamWriter");
        System.out.println("                 |                                  |");
        System.out.println("             FileReader                         FileWriter");

        System.out.println("\n>>> 3 CORE ARCHITECTURAL INVARIANTS:");
        System.out.println("  1. 'Reader' and 'Writer' are abstract base classes operating on 16-bit 'char' units.");
        System.out.println("  2. 'Writer' implements 'java.io.Flushable' in addition to AutoCloseable/Closeable.");
        System.out.println("  3. Both classes provide single-character, array-buffered, and offset-length read/write methods.");

        System.out.println("\n==========================================================================");
    }
}