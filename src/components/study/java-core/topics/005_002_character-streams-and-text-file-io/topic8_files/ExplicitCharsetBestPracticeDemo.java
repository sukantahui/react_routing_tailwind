/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 8: Specifying Explicit Charset: StandardCharsets.UTF_8 Best Practices
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

public class ExplicitCharsetBestPracticeDemo {

    public static String readStreamWithGuaranteedUtf8(InputStream in) throws Exception {
        // ALWAYS pass 'StandardCharsets.UTF_8' explicitly as the 2nd constructor argument:
        try (Reader reader = new InputStreamReader(in, StandardCharsets.UTF_8)) {
            StringBuilder sb = new StringBuilder();
            char[] buf = new char[128];
            int read;
            while ((read = reader.read(buf)) != -1) {
                sb.append(buf, 0, read);
            }
            return sb.toString();
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: EXPLICIT StandardCharsets.UTF_8 - BARRACKPORE");
        System.out.println("==========================================================================\n");

        byte[] payload = "Barrackpore Academy: Trainee Swadeep Paul registered 100% attendance 🌟".getBytes(StandardCharsets.UTF_8);
        InputStream inputStream = new ByteArrayInputStream(payload);

        String decodedResult = readStreamWithGuaranteedUtf8(inputStream);
        System.out.println(">>> Decoded Content: " + decodedResult);

        System.out.println("\n>>> WHY USE StandardCharsets.UTF_8 INSTEAD OF "UTF-8"?");
        System.out.println("  1. Type Safety: Constant of type 'java.nio.charset.Charset' (no misspelled strings).");
        System.out.println("  2. Performance: Pre-allocated static instance (avoids runtime Charset.forName() lookups).");
        System.out.println("  3. No Checked Exception: Does not throw UnsupportedEncodingException!");

        System.out.println("\n==========================================================================");
    }
}