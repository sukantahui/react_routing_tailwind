/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 4: Generic Static Methods: Why Static Methods Cannot Access Class-Level <T>
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

// Generic Class parameterized with type parameter <T>:
class RepositoryContainer<T> {
    private T entity;

    public RepositoryContainer(T entity) { this.entity = entity; }

    // 1. Instance Method: CAN use class-level type <T>:
    public T getEntity() { return entity; }

    // 2. STATIC METHOD: CANNOT use class-level <T>!
    // Compiler Error if written: 'public static T findInvalid()' -> Non-static type T cannot be referenced from static context!
    // MUST declare its own method-level generic parameter <E>:
    public static <E> RepositoryContainer<E> of(E item) {
        return new RepositoryContainer<>(item);
    }
}

public class GenericStaticMethodScopingRulesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: GENERIC STATIC METHOD SCOPING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Using Static Factory Generic Method:
        RepositoryContainer<String> stringRepo = RepositoryContainer.of("Trainee: Swadeep Paul");
        RepositoryContainer<Integer> integerRepo = RepositoryContainer.of(101);

        System.out.println(">>> 1. Containers Created via Generic Static Factory:");
        System.out.println("  String Repo Value  : " + stringRepo.getEntity());
        System.out.println("  Integer Repo Value : " + integerRepo.getEntity());

        System.out.println("\n>>> WHY STATIC METHODS CANNOT USE CLASS TYPE <T>:");
        System.out.println("  1. Instance Bound: Class-level <T> is only determined when an OBJECT is instantiated (new RepositoryContainer<String>()).");
        System.out.println("  2. Static Context: Static methods belong to the Class template and exist before any object is created.");
        System.out.println("  3. Independent Declaration: Therefore, any static method requiring generics MUST declare its own '<E>' before the return type!");

        System.out.println("\n==========================================================================");
    }
}