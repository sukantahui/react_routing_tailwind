/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 7: Bridging Byte Streams to Character Streams: InputStreamReader & OutputStreamWriter
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

public class ByteToCharacterBridgeStreamDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: BRIDGING BYTE & CHARACTER STREAMS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();

        // 1. OutputStreamWriter (Bridge: Writes characters to an underlying Byte stream):
        System.out.println(">>> 1. OutputStreamWriter Bridge (Characters -> UTF-8 Bytes):");
        try (Writer bridgeWriter = new OutputStreamWriter(byteBuffer, StandardCharsets.UTF_8)) {
            bridgeWriter.write("AccoTax GST Master Ledger: ₹45,000 Paid (Barrackpore)");
            bridgeWriter.flush();
        }

        byte[] rawBytes = byteBuffer.toByteArray();
        System.out.println("  Produced Raw Byte Array Length: " + rawBytes.length + " bytes");

        // 2. InputStreamReader (Bridge: Reads UTF-8 bytes and decodes into characters):
        System.out.println("\n>>> 2. InputStreamReader Bridge (UTF-8 Bytes -> Characters):");
        try (Reader bridgeReader = new InputStreamReader(new ByteArrayInputStream(rawBytes), StandardCharsets.UTF_8)) {
            StringBuilder textBuffer = new StringBuilder();
            int ch;
            while ((ch = bridgeReader.read()) != -1) {
                textBuffer.append((char) ch);
            }
            System.out.println("  Decoded Text: " + textBuffer.toString());
        }

        System.out.println("\n>>> THE BRIDGE ARCHITECTURE:");
        System.out.println("  - InputStreamReader:  InputStream  (Bytes) -> Reader (Chars) with explicit Charset.");
        System.out.println("  - OutputStreamWriter: Writer (Chars)      -> OutputStream (Bytes) with explicit Charset.");
        System.out.println("  - Indispensable for reading HTTP response streams, network sockets, and System.in!");

        System.out.println("\n==========================================================================");
    }
}