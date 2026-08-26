/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 0: How Spring Works Under The Hood - IoC & DI Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

public class IoCDIMechanicsUnderTheHoodDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" CAPSTONE 3: CUSTOM DEPENDENCY INJECTION & ANNOTATION FRAMEWORK");
        System.out.println(" EDUCATOR: SUKANTA HUI | ACADEMIC HUB: BARRACKPORE, WB");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. TRADITIONAL TIGHTLY-COUPLED CODE (BAD):");
        System.out.println("  class OrderService {");
        System.out.println("      private PaymentDao dao = new PaymentDaoImpl(); // Hardcoded dependency!");
        System.out.println("  }\n");

        System.out.println(">>> 2. INVERSION OF CONTROL (IoC) WITH OUR MINI-SPRING (CLEAN):");
        System.out.println("  @Component");
        System.out.println("  class OrderService {");
        System.out.println("      @Autowired");
        System.out.println("      private PaymentDao dao; // Framework injects singleton automatically!");
        System.out.println("  }\n");

        System.out.println(">>> 3. INTERNAL 4-STEP FRAMEWORK PIPELINE:");
        System.out.println("  1. Package Scan  : Discover all classes with @Component / @Service.");
        System.out.println("  2. Bean Registry : Instantiate singletons via Reflection Constructor.newInstance().");
        System.out.println("  3. Dependency Graph: Resolve @Autowired fields and inject references.");
        System.out.println("  4. AOP Proxies   : Wrap @Transactional methods in java.lang.reflect.Proxy.");

        System.out.println("\n==========================================================================");
    }
}
