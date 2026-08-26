/**
 * File: CompilationPipelineDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 7 - Java source code (.java) to Bytecode (.class) compilation process
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class CompilationPipelineDemo {

    public static void main(String[] args) {
        System.out.println("=== Java Source (.java) to Bytecode (.class) Pipeline ===");
        
        // Simulating the compilation steps inside javac
        String[] compilerPhases = {
            "1. Lexical Analysis (Scanner converts source characters into Tokens)",
            "2. Syntax Analysis (Parser builds Abstract Syntax Tree - AST)",
            "3. Semantic Analysis (Symbol Table, Type Checking, Flow Analysis)",
            "4. Desugaring (Eliminates syntactic sugar like enhanced for loops)",
            "5. Bytecode Generation (Generates .class file starting with 0xCAFEBABE)"
        };
        
        for (String phase : compilerPhases) {
            System.out.println(phase);
        }
        
        // Local educational context
        String student = "Tuhina";
        String lab = "Shyamnagar Lab";
        System.out.println("\n" + student + " is analyzing bytecode disassembly via 'javap -c' in " + lab + ".");
    }
}
