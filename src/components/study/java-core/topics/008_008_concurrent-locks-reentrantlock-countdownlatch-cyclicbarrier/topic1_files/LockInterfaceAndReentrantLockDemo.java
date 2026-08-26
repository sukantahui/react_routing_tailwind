/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 1: The Lock Interface & ReentrantLock: The Mandatory lock()/unlock() Idiom
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class LockInterfaceAndReentrantLockDemo {

    // 1. Instantiating explicit ReentrantLock:
    private static final Lock LOCK = new ReentrantLock();
    private static int balance = 1000;

    public static void safeDeposit(int amount) {
        // MANDATORY IDIOM: Call lock.lock() BEFORE the try block:
        LOCK.lock();
        try {
            // Critical Section:
            balance += amount;
            System.out.printf("[%s] Deposited ₹%d | Current Balance: ₹%d%n",
                    Thread.currentThread().getName(), amount, balance);
        } finally {
            // MANDATORY IDIOM: ALWAYS call lock.unlock() inside the 'finally' block!
            LOCK.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE Lock INTERFACE & ReentrantLock IDIOM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread t1 = new Thread(() -> safeDeposit(500), "Swadeep-Thread");
        Thread t2 = new Thread(() -> safeDeposit(300), "Tuhina-Thread");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.printf("\n>>> Final Safe Account Balance: ₹%d (100%% INTACT!)%n", balance);

        System.out.println("\n==========================================================================");
    }
}