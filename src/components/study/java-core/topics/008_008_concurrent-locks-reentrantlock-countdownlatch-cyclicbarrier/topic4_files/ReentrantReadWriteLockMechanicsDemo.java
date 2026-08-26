/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 4: ReentrantReadWriteLock: Shared Read Locks vs Exclusive Write Locks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReentrantReadWriteLockMechanicsDemo {

    // 1. Instantiating ReadWriteLock:
    private static final ReadWriteLock RW_LOCK = new ReentrantReadWriteLock();
    private static final Lock READ_LOCK = RW_LOCK.readLock();    // SHARED LOCK (Multiple readers!)
    private static final Lock WRITE_LOCK = RW_LOCK.writeLock();  // EXCLUSIVE LOCK (Only 1 writer!)

    private static String systemConfig = "DEFAULT_GST_18%";

    // READ OPERATION: Shared non-blocking concurrent reads:
    public static String readConfig(String readerName) {
        READ_LOCK.lock();
        try {
            System.out.printf("[%s] Reading config: %s (SHARED READ)%n", readerName, systemConfig);
            return systemConfig;
        } finally {
            READ_LOCK.unlock();
        }
    }

    // WRITE OPERATION: Exclusive locking (blocks all readers and writers):
    public static void updateConfig(String writerName, String newConfig) {
        WRITE_LOCK.lock();
        try {
            System.out.printf(">>> [%s] UPDATING CONFIG TO: %s (EXCLUSIVE MUTEX)%n", writerName, newConfig);
            systemConfig = newConfig;
        } finally {
            WRITE_LOCK.unlock();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ReentrantReadWriteLock MECHANICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        readConfig("Reader-Swadeep");
        readConfig("Reader-Tuhina");
        updateConfig("Admin-Sukanta", "UPDATED_GST_28%");
        readConfig("Reader-Abhronila");

        System.out.println("\n==========================================================================");
    }
}