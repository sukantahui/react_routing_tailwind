/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 3: Core Methods of java.io.Writer: write(), write(String), flush() & close()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.StringWriter;
import java.io.Writer;
import java.io.IOException;

public class WriterCoreMethodsDeepDiveDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: java.io.Writer CORE METHODS DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        try (Writer writer = new StringWriter()) {
            // 1. write(int c) -> Writes a single 16-bit character:
            writer.write('B');
            writer.write('K');
            writer.write('P');
            writer.write(' ');

            // 2. write(char[] cbuf, int offset, int len) -> Writes block of characters:
            char[] chars = "Java Core Mastery".toCharArray();
            writer.write(chars, 0, chars.length);

            // 3. write(String str) -> High-level String writing (Exclusive to Writer! OutputStream lacks this!):
            writer.write(" | Batch 2026");

            // 4. flush() -> Forces buffered characters to the underlying storage/network sink:
            writer.flush();

            System.out.println(">>> Formatted StringWriter Content:");
            System.out.println("  " + writer.toString());
        }

        System.out.println("\n>>> WHY WRITER IS SUPERIOR TO OUTPUTSTREAM FOR TEXT:");
        System.out.println("  - 'Writer.write(String)' allows writing Strings directly without calling 'str.getBytes()'.");
        System.out.println("  - 'Writer.append(CharSequence)' supports method chaining under the Appendable interface.");
        System.out.println("  - 'flush()' guarantees that memory buffers are physically committed.");

        System.out.println("\n==========================================================================");
    }
}