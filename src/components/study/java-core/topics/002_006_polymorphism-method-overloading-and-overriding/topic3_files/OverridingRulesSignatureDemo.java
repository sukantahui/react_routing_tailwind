/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 3: Rules of Method Overriding: Identical Method Signature
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class OverridingRulesSignatureDemo {

    public static class ParentService {
        // Method to override
        public void processTransaction(int transactionId, double amount) {
            System.out.printf("  [PARENT] Base processing of TXN #%d: ₹%.2f\n", transactionId, amount);
        }
    }

    public static class ChildService extends ParentService {
        // 1. MUST have identical method name: 'processTransaction'
        // 2. MUST have identical parameter types in identical order: '(int, double)'
        @Override
        public void processTransaction(int transactionId, double amount) {
            System.out.printf("  [CHILD SPECIALIZED] Verified & encrypted processing of TXN #%d: ₹%.2f\n",
                    transactionId, amount);
        }

        // Overloaded, NOT Overridden (Different parameter types):
        public void processTransaction(String transactionCode) {
            System.out.println("  [OVERLOADED] Processed via String code: " + transactionCode);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: METHOD OVERRIDING SIGNATURE RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ParentService service = new ChildService();
        service.processTransaction(9901, 15000.0); // Dispatches overridden method!

        System.out.println("\n==========================================================================");
    }
}