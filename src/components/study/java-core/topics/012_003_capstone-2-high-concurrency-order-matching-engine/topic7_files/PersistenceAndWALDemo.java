/**
 * Java Core Tutorial - Module 012_003: High-Concurrency Order Matching Engine
 * Topic 7: Persistence & Write-Ahead Logging - Java NIO FileChannel
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exchange;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class PersistenceAndWALDemo {

    public static class WriteAheadJournal implements AutoCloseable {
        private final FileChannel channel;
        private final ByteBuffer writeBuffer = ByteBuffer.allocateDirect(1024); // Direct OS buffer

        public WriteAheadJournal(Path journalPath) throws IOException {
            this.channel = FileChannel.open(journalPath,
                StandardOpenOption.CREATE,
                StandardOpenOption.WRITE,
                StandardOpenOption.APPEND);
        }

        public synchronized void logOrder(long orderId, long priceMicros, long qty) throws IOException {
            writeBuffer.clear();
            writeBuffer.putLong(orderId);
            writeBuffer.putLong(priceMicros);
            writeBuffer.putLong(qty);
            writeBuffer.flip();

            while (writeBuffer.hasRemaining()) {
                channel.write(writeBuffer);
            }
            channel.force(false); // Flush OS page cache to physical disk!
        }

        @Override
        public void close() throws IOException {
            channel.close();
        }
    }

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: HIGH-SPEED WRITE-AHEAD LOGGING (WAL) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path journalFile = Files.createTempFile("trade_journal_", ".wal");

        try (WriteAheadJournal wal = new WriteAheadJournal(journalFile)) {
            wal.logOrder(1001L, 3500000000L, 100);
            wal.logOrder(1002L, 3520000000L, 50);
            System.out.println("   [WAL]: Appended binary orders to physical journal at: " + journalFile.toAbsolutePath());
        }

        Files.deleteIfExists(journalFile);
        System.out.println("\n==========================================================================");
    }
}
