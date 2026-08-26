/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 8: Restriction 3: No Static Fields of Generic Type Parameter T
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

class SharedRepository<T> {
    // ILLEGAL DECLARATION (Will NOT compile):
    // private static T sharedItem; // COMPILE ERROR: Cannot make a static reference to the non-static type T!

    // LEGAL: Instance fields can use type parameter T:
    private T instanceItem;

    public SharedRepository(T item) { this.instanceItem = item; }
    public T getItem() { return instanceItem; }
}

public class Restriction3NoStaticGenericFieldsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: RESTRICTION 3 - NO STATIC FIELDS OF TYPE T - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SharedRepository<String> stringRepo = new SharedRepository<>("Swadeep Paul");
        SharedRepository<Integer> intRepo = new SharedRepository<>(101);

        System.out.println(">>> 1. Independent Instance Repositories:");
        System.out.println("  String Repo: " + stringRepo.getItem());
        System.out.println("  Int Repo   : " + intRepo.getItem());

        System.out.println("\n>>> WHY STATIC FIELDS CANNOT USE TYPE PARAMETER <T>:");
        System.out.println("  1. Single Shared Metaspace Slot: Only ONE copy of a static variable exists for the entire class.");
        System.out.println("  2. Type Conflict: If 'static T sharedItem' existed, what type would it hold?");
        System.out.println("     - 'new SharedRepository<String>()' expects it to be String.");
        System.out.println("     - 'new SharedRepository<Integer>()' expects it to be Integer!");
        System.out.println("  3. Because there is only ONE static variable shared by all instances, having multiple types is impossible.");

        System.out.println("\n==========================================================================");
    }
}