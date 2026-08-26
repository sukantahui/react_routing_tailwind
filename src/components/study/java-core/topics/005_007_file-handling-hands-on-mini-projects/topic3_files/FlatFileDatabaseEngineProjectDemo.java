/**
 * Java Core Tutorial - Module 005_007: File Handling & I/O Hands-On Capstone Lab
 * Topic 3: Project 3: Flat-File Database Storage Engine with RandomAccessFile Indexing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io.lab;

import java.io.File;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class FlatFileDatabaseEngineProjectDemo {

    public static class FlatFileDatabase {
        private static final int RECORD_SIZE = 64; // Fixed 64-byte record slot
        private final RandomAccessFile dbFile;
        private final Map<Integer, Long> primaryIndex = new HashMap<>(); // In-Memory Primary Key -> Byte Offset Index

        public FlatFileDatabase(File file) throws Exception {
            this.dbFile = new RandomAccessFile(file, "rw");
        }

        // Insert Record:
        public void insert(int id, String studentName, double fees) throws Exception {
            long offset = dbFile.length(); // Append at end of file
            dbFile.seek(offset);

            dbFile.writeInt(id); // 4 bytes

            // Fixed-width 40-character name (padded with spaces):
            byte[] nameBytes = new byte[40];
            byte[] rawName = studentName.getBytes(StandardCharsets.UTF_8);
            System.arraycopy(rawName, 0, nameBytes, 0, Math.min(rawName.length, 40));
            dbFile.write(nameBytes); // 40 bytes

            dbFile.writeDouble(fees); // 8 bytes

            // Pad remaining bytes to make exactly 64 bytes:
            dbFile.write(new byte[12]); // 12 padding bytes

            primaryIndex.put(id, offset); // Store offset in memory index
            System.out.printf("  [INSERTED] ID=%d | Offset=%d bytes%n", id, offset);
        }

        // Fast O(1) Index Lookup:
        public String findById(int id) throws Exception {
            Long offset = primaryIndex.get(id);
            if (offset == null) return "Record Not Found";

            dbFile.seek(offset);
            int recId = dbFile.readInt();
            byte[] nameBuf = new byte[40];
            dbFile.readFully(nameBuf);
            String name = new String(nameBuf, StandardCharsets.UTF_8).trim();
            double fees = dbFile.readDouble();

            return String.format("Found -> ID: %d | Name: %s | Fees: ₹%.2f", recId, name, fees);
        }

        public void close() throws Exception { dbFile.close(); }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: PROJECT 3 - FLAT-FILE DATABASE STORAGE ENGINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        File tempDb = File.createTempFile("accotax_db_", ".db");
        FlatFileDatabase db = new FlatFileDatabase(tempDb);

        System.out.println(">>> 1. Ingesting Fixed-Width Records into Database Engine:");
        db.insert(101, "Swadeep Paul", 8500.0);
        db.insert(102, "Tuhina Das", 9200.0);
        db.insert(103, "Abhronila Das", 9800.0);
        db.insert(104, "Debangshu Mukherjee", 8500.0);

        System.out.println("\n>>> 2. Executing Direct O(1) Index-Based Lookups via seek():");
        System.out.println("  Lookup ID 103: " + db.findById(103));
        System.out.println("  Lookup ID 101: " + db.findById(101));
        System.out.println("  Lookup ID 999: " + db.findById(999));

        db.close();
        tempDb.delete();

        System.out.println("\n==========================================================================");
    }
}