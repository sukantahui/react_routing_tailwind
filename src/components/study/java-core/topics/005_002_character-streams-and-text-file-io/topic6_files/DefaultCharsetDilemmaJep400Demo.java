/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 6: The Default Charset Dilemma & Java 18 UTF-8 by Default (JEP 400)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class DefaultCharsetDilemmaJep400Demo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE DEFAULT CHARSET DILEMMA (JEP 400) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Charset defaultCharset = Charset.defaultCharset();
        System.out.println(">>> 1. Current JVM Active Default Charset:");
        System.out.println("  Charset.defaultCharset() : " + defaultCharset.displayName());

        System.out.println("\n>>> 2. The Pre-Java 18 Default Charset Dilemma:");
        System.out.println("  - In Java 1.0 to 17, default charset was determined by the Host Operating System!");
        System.out.println("  - Windows English : windows-1252 (Latin-1 variant).");
        System.out.println("  - Linux / macOS   : UTF-8.");
        System.out.println("  - Windows Asian   : GBK or Shift_JIS.");
        System.out.println("  - RESULT: Calling 'new FileReader(f)' created files that corrupted when shared across OSs!");

        System.out.println("\n>>> 3. The Java 18 Breakthrough (JEP 400):");
        System.out.println("  - Starting with Java 18, the default charset for ALL APIs is standardized to UTF-8 on ALL operating systems!");
        System.out.println("  - Best Practice: Even on modern Java, EXPLICITLY specify 'StandardCharsets.UTF_8' for 100% portable backward compatibility!");

        System.out.println("\n==========================================================================");
    }
}