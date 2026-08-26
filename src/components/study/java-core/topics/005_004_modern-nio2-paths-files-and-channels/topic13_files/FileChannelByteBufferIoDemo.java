/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 13: java.nio.channels.FileChannel: High-Performance Buffer Channel I/O
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class FileChannelByteBufferIoDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: FileChannel & ByteBuffer - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path channelFile = Files.createTempFile("channel_demo_", ".dat");

        // 1. Writing via FileChannel:
        System.out.println(">>> 1. Writing Data via FileChannel:");
        try (FileChannel writeChannel = FileChannel.open(channelFile, StandardOpenOption.CREATE, StandardOpenOption.WRITE)) {
            byte[] data = "Barrackpore High-Performance Channel Architecture 2026".getBytes(StandardCharsets.UTF_8);
            ByteBuffer writeBuf = ByteBuffer.wrap(data);
            int bytesWritten = writeChannel.write(writeBuf);
            System.out.println("  Bytes Written via Channel: " + bytesWritten);
        }

        // 2. Reading via FileChannel:
        System.out.println("\n>>> 2. Reading Data via FileChannel & ByteBuffer:");
        try (FileChannel readChannel = FileChannel.open(channelFile, StandardOpenOption.READ)) {
            ByteBuffer readBuf = ByteBuffer.allocate(128); // Allocates direct RAM buffer
            int bytesRead = readChannel.read(readBuf);

            readBuf.flip(); // FLIP: Switches buffer mode from Writing to Reading!
            byte[] raw = new byte[readBuf.remaining()];
            readBuf.get(raw);

            System.out.println("  Read Output : "" + new String(raw, StandardCharsets.UTF_8) + """);
        }

        // Cleanup:
        Files.deleteIfExists(channelFile);

        System.out.println("\n>>> THE 3 BUFFER POINTERS (Capacity, Limit, Position):");
        System.out.println("  1. 'capacity' : Total fixed size of buffer memory.");
        System.out.println("  2. 'position' : Current cursor index.");
        System.out.println("  3. 'limit'    : Maximum index that can be read or written.");
        System.out.println("  4. 'flip()'   : Sets limit = position, then position = 0 (prep for reading).");

        System.out.println("\n==========================================================================");
    }
}