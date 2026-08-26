/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 0: Why Packages Are Required: Namespace Collision Prevention & Organization
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class WhyPackagesAreRequiredDemo {

    // Namespace collision prevention:
    // Without packages, having two classes named 'Student' would crash the compilation!
    // With packages, we can have:
    // 1. com.coderaccotax.admissions.Student
    // 2. com.coderaccotax.examinations.Student

    public static class PackageNamespaceExplanation {
        public void explainBenefits() {
            System.out.println("  [BENEFIT 1] Namespace Conflict Prevention: Multiple classes with same name can coexist.");
            System.out.println("  [BENEFIT 2] Modular Organization: Group related classes (e.g. controllers, services, models).");
            System.out.println("  [BENEFIT 3] Access Protection: Enables package-private (default) and protected encapsulation.");
            System.out.println("  [BENEFIT 4] Easy Maintenance: Matches directory layout on physical disk.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY PACKAGES ARE REQUIRED IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        PackageNamespaceExplanation explainer = new PackageNamespaceExplanation();
        explainer.explainBenefits();

        System.out.println("\n==========================================================================");
    }
}