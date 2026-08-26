/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 6: Escape Analysis - Determining Object Confinement (JEP 106)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class EscapeAnalysisJep106Demo {

    public record LocalCoordinate(int x, int y) {}

    // 1. NO ESCAPE: Object is created and discarded entirely within this method
    public static int calculateDistanceNoEscape(int a, int b) {
        LocalCoordinate point = new LocalCoordinate(a, b); // NEVER escapes this method!
        return point.x() + point.y();
    }

    // 2. ARGUMENT ESCAPE (ArgEscape): Passed as parameter to another method
    public static void processEscape(LocalCoordinate point) {
        System.out.println("Point received: " + point);
    }

    // 3. GLOBAL ESCAPE: Assigned to static field or returned to caller
    public static LocalCoordinate GLOBAL_POINT;
    public static void makeGlobalEscape(int a, int b) {
        GLOBAL_POINT = new LocalCoordinate(a, b); // Escapes globally to Metaspace GC Root!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: ESCAPE ANALYSIS (JEP 106) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 ESCAPE STATES OF AN OBJECT:");
        System.out.println("  1. NoEscape     : Confined strictly within current method. Candidate for SCALAR REPLACEMENT!");
        System.out.println("  2. ArgEscape    : Escapes into another method as argument, but does not outlive thread.");
        System.out.println("  3. GlobalEscape : Escapes method/thread (returned, stored in field/collection, or published).\n");

        int dist = calculateDistanceNoEscape(10, 20);
        System.out.println(">>> NoEscape Calculation Output: " + dist);

        System.out.println("\n>>> ESCAPE ANALYSIS JVM FLAGS:");
        System.out.println("  - Enabled by Default : -XX:+DoEscapeAnalysis");
        System.out.println("==========================================================================");
    }
}
