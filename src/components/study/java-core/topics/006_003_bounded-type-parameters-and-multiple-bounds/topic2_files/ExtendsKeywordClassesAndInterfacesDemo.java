/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 2: Why 'extends' is Used for Both Classes AND Interfaces in Generics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.io.Serializable;

// Custom Interface:
interface Identifiable {
    String getId();
}

// Notice: In Java Generics, 'extends' is used for INTERFACES as well (NEVER write 'implements')!
class EntityRegistry<T extends Identifiable & Serializable> {
    public void logId(T entity) {
        System.out.println("  Entity Registered with ID : " + entity.getId());
    }
}

class RegisteredStudent implements Identifiable, Serializable {
    private static final long serialVersionUID = 1L;
    private final String id;

    public RegisteredStudent(String id) { this.id = id; }
    @Override public String getId() { return id; }
}

public class ExtendsKeywordClassesAndInterfacesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: 'extends' FOR CLASSES & INTERFACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EntityRegistry<RegisteredStudent> registry = new EntityRegistry<>();
        registry.logId(new RegisteredStudent("STU_BKP_2026_001"));

        System.out.println("\n>>> WHY JAVA USES 'extends' INSTEAD OF 'implements':");
        System.out.println("  1. Keyword Economy: The Java language designers chose not to add a new keyword or overload 'implements' in generic declarations.");
        System.out.println("  2. Subtyping Relationship: In type theory, 'extends' represents the universal 'is-a-subtype-of' relationship.");
        System.out.println("  3. Syntax Rule: '<T implements MyInterface>' is a COMPILATION ERROR! Always write '<T extends MyInterface>'!");

        System.out.println("\n==========================================================================");
    }
}