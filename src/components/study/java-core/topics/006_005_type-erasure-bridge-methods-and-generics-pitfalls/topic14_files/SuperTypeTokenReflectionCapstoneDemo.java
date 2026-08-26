/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 14: Super Type Tokens & The TypeToken Pattern (Neal Gafter / Gson / Jackson) (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

// NEAL GAFTER'S SUPER TYPE TOKEN PATTERN:
// By creating an anonymous subclass, the generic type information is preserved in the Class Signature attribute!
abstract class SuperTypeToken<T> {
    private final Type type;

    protected SuperTypeToken() {
        Type superclass = getClass().getGenericSuperclass();
        if (superclass instanceof Class) {
            throw new RuntimeException("Missing type parameter.");
        }
        this.type = ((ParameterizedType) superclass).getActualTypeArguments()[0];
    }

    public Type getType() { return type; }
}

public class SuperTypeTokenReflectionCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: SUPER TYPE TOKENS & TypeToken PATTERN (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Capturing exact generic collection type (List<String>) at runtime:
        SuperTypeToken<List<String>> stringListToken = new SuperTypeToken<List<String>>() {};
        SuperTypeToken<List<Integer>> integerListToken = new SuperTypeToken<List<Integer>>() {};

        System.out.println(">>> 1. Inspecting Recovered Generic Types via Super Type Tokens:");
        System.out.println("  Token 1 Recovered Type : " + stringListToken.getType());
        System.out.println("  Token 2 Recovered Type : " + integerListToken.getType());

        System.out.println("\n>>> HOW GSON, JACKSON & SPRING RECOVER PARAMETERIZED TYPES:");
        System.out.println("  1. Standard variables erase types ('List<String>' becomes raw 'List').");
        System.out.println("  2. HOWEVER: When a class extends a generic class (e.g. 'new TypeToken<List<String>>() {}'), the JVM preserves the generic signature in the class metadata!");
        System.out.println("  3. Reflection ('getGenericSuperclass()') retrieves the exact parameterized type argument!");

        System.out.println("\n==========================================================================");
        System.out.println(" CONGRATULATIONS! SEGMENT 6 (JAVA GENERICS & TYPE SAFETY)");
        System.out.println(" IS 100% COMPLETE AND FULLY CERTIFIED!");
        System.out.println("==========================================================================");
    }
}