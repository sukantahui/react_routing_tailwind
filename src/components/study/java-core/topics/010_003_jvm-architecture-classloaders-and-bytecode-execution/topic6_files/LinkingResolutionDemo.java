/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 6: Linking Step 3 - Resolution of Symbolic References
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class LinkingResolutionDemo {

    public static class StudentService {
        public void printCenter() {
            System.out.println("Center: Barrackpore Main Campus");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: LINKING STEP 3 - RESOLUTION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // When javac compiles this line, it writes a symbolic reference in the Constant Pool:
        // Symbolic Reference: Methodref #com/coderaccotax/.../StudentService.printCenter()V
        StudentService service = new StudentService();

        // During Resolution: The JVM locates StudentService in Metaspace and replaces
        // the symbolic string with a direct memory offset/pointer in the vtable!
        service.printCenter();

        System.out.println("\n>>> SYMBOLIC VS DIRECT REFERENCES:");
        System.out.println("  - Symbolic Reference : Stored in bytecode constant pool as text names/descriptors.");
        System.out.println("  - Direct Reference   : Pointer to Metaspace memory, vtable offset, or field memory offset.");
        System.out.println("==========================================================================");
    }
}
