/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 10: Compiling and Running Packaged Java Files from Command Line ('javac -d .' & 'java')
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class CommandLinePackagingCompilationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: COMPILING & RUNNING PACKAGED JAVA CODE (CLI) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The '-d' (Destination) Flag with 'javac':");
        System.out.println("  Command: javac -d bin src/com/coderaccotax/academy/Main.java");
        System.out.println("  Effect : Automatically generates folder hierarchy 'bin/com/coderaccotax/academy/'");
        System.out.println("           and places 'Main.class' inside it!");
        System.out.println();
        System.out.println(">>> 2. Running Packaged Bytecode with 'java':");
        System.out.println("  Command: java -cp bin com.coderaccotax.academy.Main");
        System.out.println("  Rules  :");
        System.out.println("    ✔ '-cp bin' specifies the root classpath folder.");
        System.out.println("    ✔ MUST use the Fully Qualified Class Name ('com.coderaccotax.academy.Main').");
        System.out.println("    X Do NOT use slashes ('com/coderaccotax/academy/Main') or '.class' extension!");

        System.out.println("\n==========================================================================");
    }
}