/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 10: Multi-Tier Architecture in Core Java - Model -> DAO -> Service -> Controller
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class MultiTierArchitectureCoreJavaDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: MULTI-TIER APPLICATION ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4-TIER ENTERPRISE JAVA BLUEPRINT:");
        System.out.println("  1. PRESENTATION / CONTROLLER LAYER (CLI / Web / REST / Swing GUI):");
        System.out.println("     - Accepts user input, validates request format, renders views/JSON responses.\n");

        System.out.println("  2. SERVICE LAYER (Business Logic):");
        System.out.println("     - Orchestrates business rules, fee calculations, discount validations, transaction boundaries.\n");

        System.out.println("  3. DATA ACCESS LAYER (DAO Interface + JDBC Implementation):");
        System.out.println("     - Executes SQL queries, binds PreparedStatement parameters, maps ResultSets to Models.\n");

        System.out.println("  4. DOMAIN / MODEL LAYER (Java Records / Entities):");
        System.out.println("     - Pure immutable data carriers shared across all layers.\n");

        System.out.println(">>> DEPENDENCY DIRECTION (Strictly Unidirectional):");
        System.out.println("  [Controller] ---> [Service] ---> [DAO Interface] <--- [DAO Implementation]");
        System.out.println("       |                 |               |");
        System.out.println("       +-----------------+---------------+-----> [Domain Model]");

        System.out.println("\n==========================================================================");
    }
}
