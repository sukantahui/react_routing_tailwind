/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 3: Synthetic Bridge Methods: Preserving Polymorphism in Inherited Generics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.lang.reflect.Method;

// Generic Base Node:
class BaseNode<T> {
    public void setData(T data) {
        System.out.println("  BaseNode.setData(Object)");
    }
}

// Subclass binding 'T' to concrete 'String':
class StringNode extends BaseNode<String> {
    // Overridden method in source code:
    @Override
    public void setData(String data) {
        System.out.println("  StringNode.setData(String) -> Received: " + data);
    }

    // THE COMPILER SYNTHESIZES A HIDDEN BRIDGE METHOD IN BYTECODE:
    // public void setData(Object data) {
    //     setData((String) data); // Bridges raw Object call to our String method!
    // }
}

public class SyntheticBridgeMethodPolymorphismDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: SYNTHETIC BRIDGE METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StringNode stringNode = new StringNode();
        BaseNode rawRef = stringNode; // Polymorphic reference

        System.out.println(">>> 1. Invoking setData via Polymorphic BaseNode Reference:");
        rawRef.setData("Swadeep Paul (Barrackpore)");

        System.out.println("\n>>> 2. Reflecting on StringNode Declared Methods to Find Bridge Method:");
        Method[] methods = StringNode.class.getDeclaredMethods();
        for (Method m : methods) {
            if (m.getName().equals("setData")) {
                System.out.printf("  Method: %-25s | Parameter: %-18s | Is Bridge? %b%n",
                        m.getName(), m.getParameterTypes()[0].getSimpleName(), m.isBridge());
            }
        }

        System.out.println("\n>>> WHY BRIDGE METHODS ARE MANDATORY:");
        System.out.println("  1. In BaseNode, type erasure erases 'setData(T)' to 'setData(Object)'.");
        System.out.println("  2. In StringNode, our method is 'setData(String)', which does NOT match 'setData(Object)' signature!");
        System.out.println("  3. To preserve method overriding and polymorphism, javac generates a synthetic 'setData(Object)' bridge method!");

        System.out.println("\n==========================================================================");
    }
}