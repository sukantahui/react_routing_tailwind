/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 15: Creating a Custom ClassLoader - Dynamic Memory Bytecode (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

public class CustomClassLoaderCapstoneDemo {

    // Custom ClassLoader implementing parent delegation correctly by overriding findClass():
    public static class MemoryClassLoader extends ClassLoader {

        public MemoryClassLoader(ClassLoader parent) {
            super(parent); // Register parent classloader
        }

        @Override
        protected Class<?> findClass(String name) throws ClassNotFoundException {
            System.out.println("   [CUSTOM LOADER]: findClass() called for: " + name);

            // Read existing class bytecode from stream to simulate dynamic network/encrypted load:
            String resourcePath = name.replace('.', '/') + ".class";
            try (InputStream is = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
                if (is == null) {
                    throw new ClassNotFoundException("Class not found: " + name);
                }

                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                int bytesRead;
                byte[] data = new byte[1024];
                while ((bytesRead = is.read(data, 0, data.length)) != -1) {
                    buffer.write(data, 0, bytesRead);
                }
                byte[] rawBytecode = buffer.toByteArray();

                // defineClass() transforms raw byte[] into a live java.lang.Class in Metaspace!
                return defineClass(name, rawBytecode, 0, rawBytecode.length);
            } catch (Exception ex) {
                throw new ClassNotFoundException("Failed to load class: " + name, ex);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: CUSTOM CLASSLOADER CAPSTONE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        MemoryClassLoader customLoader = new MemoryClassLoader(CustomClassLoaderCapstoneDemo.class.getClassLoader());

        System.out.println(">>> 1. Loading class via Custom ClassLoader:");
        Class<?> loadedClass = customLoader.loadClass("com.coderaccotax.javatutorial.jvm.CustomClassLoaderCapstoneDemo$SampleStudent");

        System.out.println("\n>>> 2. Verified Loaded Class Metadata:");
        System.out.println("   - Class Name          : " + loadedClass.getName());
        System.out.println("   - Defining ClassLoader: " + loadedClass.getClassLoader());

        Object studentInstance = loadedClass.getDeclaredConstructor().newInstance();
        System.out.println("   - Instantiated Object : " + studentInstance);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 010_003 COMPLETE: JVM ARCHITECTURE & CLASSLOADERS MASTERED!");
        System.out.println("==========================================================================");
    }

    public static class SampleStudent {
        private final String name = "Swadeep Paul (Barrackpore Hub)";
        @Override public String toString() { return "SampleStudent[name=" + name + "]"; }
    }
}
