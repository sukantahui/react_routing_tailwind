/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 1: Survey of 11 Object Class Methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class ElevenObjectMethodsSurveyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: SURVEY OF THE 11 METHODS IN java.lang.Object - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The Complete 11 Universal Methods in java.lang.Object:");
        System.out.println("  1. public final Class<?> getClass()       -> Returns runtime class reflection metadata.");
        System.out.println("  2. public int hashCode()                  -> Returns memory hash integer for hash collections.");
        System.out.println("  3. public boolean equals(Object obj)      -> Tests logical equality (defaults to reference '==').");
        System.out.println("  4. protected Object clone()               -> Creates field-by-field copy (requires Cloneable).");
        System.out.println("  5. public String toString()               -> Returns human-readable string representation.");
        System.out.println("  6. public final void notify()             -> Wakes one waiting thread on object monitor.");
        System.out.println("  7. public final void notifyAll()          -> Wakes all waiting threads on object monitor.");
        System.out.println("  8. public final void wait()               -> Releases monitor & waits indefinitely.");
        System.out.println("  9. public final void wait(long timeout)   -> Releases monitor & waits up to millis.");
        System.out.println(" 10. public final void wait(long t, int n)  -> Releases monitor & waits up to nanos.");
        System.out.println(" 11. protected void finalize()              -> Deprecated legacy GC cleanup hook.");

        System.out.println("\n==========================================================================");
    }
}