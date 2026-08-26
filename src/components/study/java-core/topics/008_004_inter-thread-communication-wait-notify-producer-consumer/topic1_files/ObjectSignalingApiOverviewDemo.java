/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 1: The Object Signaling API: wait(), wait(timeout), notify() & notifyAll()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ObjectSignalingApiOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 4 OBJECT SIGNALING METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 METHODS DECLARED IN java.lang.Object FOR THREAD SIGNALING:");
        System.out.println("+-----------------------+-------------------+---------------------------------------------------+");
        System.out.println("| Method Signature      | Throws Checked?   | Description & State Transition                    |");
        System.out.println("+-----------------------+-------------------+---------------------------------------------------+");
        System.out.println("| 1. void wait()        | InterruptedException| Releases monitor lock; waits indefinitely (WAITING)|");
        System.out.println("| 2. void wait(millis)  | InterruptedException| Releases monitor lock; waits with timeout (TIMED)  |");
        System.out.println("| 3. void notify()      | None              | Wakes up ONE arbitrary thread from Wait Set       |");
        System.out.println("| 4. void notifyAll()   | None              | Wakes up ALL threads from Wait Set (Recommended!) |");
        System.out.println("+-----------------------+-------------------+---------------------------------------------------+");

        System.out.println("\n>>> THE 2 PREREQUISITES FOR CALLING ANY OF THESE METHODS:");
        System.out.println("  1. The calling thread MUST OWN the intrinsic monitor lock of that exact object!");
        System.out.println("  2. Must be called inside a 'synchronized(targetObject) { ... }' block or synchronized method.");

        System.out.println("\n==========================================================================");
    }
}