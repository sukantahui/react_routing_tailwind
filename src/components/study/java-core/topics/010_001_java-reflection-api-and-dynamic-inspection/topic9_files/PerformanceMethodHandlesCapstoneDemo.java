/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 9: Reflection Performance, Security & MethodHandles - Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.lang.reflect.Method;

public class PerformanceMethodHandlesCapstoneDemo {

    public static class Calculator {
        public int square(int x) { return x * x; }
    }

    public static void main(String[] args) throws Throwable {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: REFLECTION PERFORMANCE & METHODHANDLES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Calculator calc = new Calculator();
        int iterations = 10_000_000;

        // 1. Direct Method Invocation (Baseline - JIT Inlined)
        long start = System.currentTimeMillis();
        long sumDirect = 0;
        for (int i = 0; i < iterations; i++) {
            sumDirect += calc.square(i % 100);
        }
        long directTime = System.currentTimeMillis() - start;
        System.out.println("1. Direct Call (10,000,000 runs)       : " + directTime + " ms");

        // 2. Reflection Method.invoke() (Boxing + Access Checks + JIT barriers)
        Method reflectionMethod = Calculator.class.getMethod("square", int.class);
        start = System.currentTimeMillis();
        long sumReflection = 0;
        for (int i = 0; i < iterations; i++) {
            sumReflection += (Integer) reflectionMethod.invoke(calc, i % 100);
        }
        long reflectionTime = System.currentTimeMillis() - start;
        System.out.println("2. Reflection invoke() (10,000,000 runs): " + reflectionTime + " ms (Slow due to boxing & checks)");

        // 3. MethodHandle (Java 7+ High-Performance Bytecode Invocation)
        MethodHandles.Lookup lookup = MethodHandles.lookup();
        MethodType methodType = MethodType.methodType(int.class, int.class);
        MethodHandle methodHandle = lookup.findVirtual(Calculator.class, "square", methodType);

        start = System.currentTimeMillis();
        long sumHandle = 0;
        for (int i = 0; i < iterations; i++) {
            sumHandle += (int) methodHandle.invokeExact(calc, i % 100);
        }
        long handleTime = System.currentTimeMillis() - start;
        System.out.println("3. MethodHandle invokeExact()           : " + handleTime + " ms (Near direct speed!)");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 010_001 COMPLETE: JAVA REFLECTION API FULLY MASTERED!");
        System.out.println("==========================================================================");
    }
}
