/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 2: Core Methods of java.io.Reader: read(), read(char[]), ready() & close()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.StringReader;
import java.io.Reader;
import java.io.IOException;

public class ReaderCoreMethodsDeepDiveDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: java.io.Reader CORE METHODS DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String syllabusSnippet = "Barrackpore Java Academy: Module 005 Character Streams Deep Dive";

        try (Reader reader = new StringReader(syllabusSnippet)) {
            // 1. ready() -> Non-blocking check if stream is ready to be read:
            System.out.println(">>> 1. reader.ready() : " + reader.ready());

            // 2. read() -> Reads a single character (Returned as int [0-65535], or -1 for EOF):
            int firstChar = reader.read();
            System.out.println(">>> 2. First Char     : '" + (char) firstChar + "' (Unicode Code: " + firstChar + ")");

            // 3. read(char[] cbuf, int offset, int len) -> Fast buffer block reading:
            char[] buffer = new char[16];
            int charsRead = reader.read(buffer, 0, buffer.length);
            System.out.println(">>> 3. Block Read     : Read " + charsRead + " characters -> "" + new String(buffer, 0, charsRead) + """);

            // 4. Reading the remaining stream until -1 (EOF):
            System.out.print(">>> 4. Remaining Stream: "");
            int ch;
            while ((ch = reader.read()) != -1) {
                System.out.print((char) ch);
            }
            System.out.println(""");
        }

        System.out.println("\n>>> SUMMARY OF READER RETURN VALUES:");
        System.out.println("  - 'read()' returns 'int' (0 to 65535) or '-1' at EOF (End of File).");
        System.out.println("  - 'read(char[])' returns number of chars read or '-1' if no more chars exist.");

        System.out.println("\n==========================================================================");
    }
}