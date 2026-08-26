/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 7: Sealed Hierarchy Modifiers - final, sealed, non-sealed
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class SealedHierarchyModifiersDemo {

    // Root Sealed Class
    public abstract static sealed class AcademicCourse permits JavaCoreCourse, WebCourse, OpenCourse {}

    // Option 1: FINAL - Completely closed (No further subclassing allowed)
    public static final class JavaCoreCourse extends AcademicCourse {}

    // Option 2: SEALED - Cascaded restriction (Permits only specific sub-subclasses)
    public static sealed class WebCourse extends AcademicCourse permits ReactCourse, AngularCourse {}
    public static final class ReactCourse extends WebCourse {}
    public static final class AngularCourse extends WebCourse {}

    // Option 3: NON-SEALED - Re-opened (Anyone can extend OpenCourse freely!)
    public static non-sealed class OpenCourse extends AcademicCourse {}
    public static class CommunityCourse extends OpenCourse {} // Legal!

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: SEALED HIERARCHY MODIFIERS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 MANDATORY SUBCLASS MODIFIERS:");
        System.out.println("  1. 'final'      : Prevents any further inheritance (JavaCoreCourse).");
        System.out.println("  2. 'sealed'     : Continues restricted inheritance down another level (WebCourse).");
        System.out.println("  3. 'non-sealed' : Unlocks the hierarchy; any class can extend it (OpenCourse).");

        System.out.println("\n==========================================================================");
    }
}
