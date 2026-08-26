/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 7: Restriction 2: Cannot Create Instances of Type Parameters (Why 'new T()' Fails)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

class FactoryContainer<T> {
    private T instance;

    // ILLEGAL CONSTRUCTOR (Will NOT compile):
    // public FactoryContainer() {
    //     this.instance = new T(); // COMPILE ERROR: Cannot instantiate the type T!
    // }

    // LEGAL WORKAROUND: Pass Class<T> token and use Reflection:
    public FactoryContainer(Class<T> clazz) throws Exception {
        this.instance = clazz.getDeclaredConstructor().newInstance();
    }

    public T getInstance() { return instance; }
}

class StudentBadge {
    public void display() { System.out.println("  [STUDENT BADGE INSTANTIATED] Barrackpore Central Hub"); }
}

public class Restriction2CannotInstantiateTypeParamDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: RESTRICTION 2 - NO 'new T()' - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Instantiating generic instance via Class<T> token workaround:
        FactoryContainer<StudentBadge> container = new FactoryContainer<>(StudentBadge.class);
        container.getInstance().display();

        System.out.println("\n>>> WHY 'new T()' IS FORBIDDEN:");
        System.out.println("  1. 'T' is erased to 'Object' during compilation.");
        System.out.println("  2. 'new T()' would translate to 'new Object()', which is completely wrong and useless.");
        System.out.println("  3. The compiler cannot know if 'T' has a no-arg constructor or is an interface/abstract class!");

        System.out.println("\n==========================================================================");
    }
}