/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 4: Path Manipulation Methods: normalize(), resolve(), relativize(), toAbsolutePath()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.nio.file.Path;

public class PathManipulationMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: Path MANIPULATION METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path rawPath = Path.of("projects", "accotax", "..", "barrackpore", "students", "roster.csv");

        // 1. Basic Path Components:
        System.out.println(">>> 1. Path Components:");
        System.out.println("  Raw Path        : " + rawPath);
        System.out.println("  getFileName()   : " + rawPath.getFileName());
        System.out.println("  getParent()     : " + rawPath.getParent());
        System.out.println("  getNameCount()  : " + rawPath.getNameCount());
        System.out.println("  getName(0)      : " + rawPath.getName(0));

        // 2. normalize() -> Cleans redundant elements like '.' and '..':
        Path cleanPath = rawPath.normalize();
        System.out.println("\n>>> 2. normalize() (Eliminates '..' and '.'):");
        System.out.println("  Cleaned Path    : " + cleanPath);

        // 3. toAbsolutePath() -> Converts relative path to full OS absolute path:
        System.out.println("\n>>> 3. toAbsolutePath():");
        System.out.println("  Absolute Path   : " + cleanPath.toAbsolutePath());

        // 4. resolve() -> Joining paths (like path concatenation):
        Path baseDir = Path.of("var", "data");
        Path childFile = baseDir.resolve("reports/audit.json");
        System.out.println("\n>>> 4. resolve() (Joining paths):");
        System.out.println("  base.resolve()  : " + childFile);

        // 5. relativize() -> Finding relative navigation between two paths:
        Path p1 = Path.of("var", "data", "reports");
        Path p2 = Path.of("var", "logs", "app.log");
        Path relativeNav = p1.relativize(p2);
        System.out.println("\n>>> 5. relativize() (How to get from p1 to p2):");
        System.out.println("  p1.relativize(p2): " + relativeNav);

        System.out.println("\n==========================================================================");
    }
}