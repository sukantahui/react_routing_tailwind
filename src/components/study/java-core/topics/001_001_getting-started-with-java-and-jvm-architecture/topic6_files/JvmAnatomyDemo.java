/**
 * File: JvmAnatomyDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 6 - Anatomy of the Java Virtual Machine (ClassLoader, Memory, JIT)
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class JvmAnatomyDemo {

    // Stored in Metaspace (Static field metadata)
    private static final String INSTITUTE = "Coder & AccoTax (Barrackpore)";

    public static void main(String[] args) {
        System.out.println("=== JVM Subsystems and Memory Anatomy ===");
        
        // Stack Frame Variable (Primitive)
        int localVariable = 42;
        
        // Heap Allocated Object
        String studentName = new String("Swadeep");
        
        // Inspecting ClassLoader of this class
        ClassLoader appClassLoader = JvmAnatomyDemo.class.getClassLoader();
        ClassLoader bootstrapClassLoader = String.class.getClassLoader(); // Native Bootstrap loader (returns null)
        
        System.out.println("Static Constant (Metaspace): " + INSTITUTE);
        System.out.println("Local Primitive (Thread Stack): " + localVariable);
        System.out.println("Object Reference (Heap): " + studentName);
        System.out.println("Application ClassLoader: " + (appClassLoader != null ? appClassLoader.getName() : "app"));
        System.out.println("Bootstrap ClassLoader (Core JVM): " + bootstrapClassLoader + " (Native C++ Core)");
    }
}
