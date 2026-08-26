/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 0: Configuration File Management: java.util.Properties Class Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.util.Hashtable;
import java.util.Properties;

public class PropertiesClassArchitectureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.util.Properties ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Properties config = new Properties();

        // 1. Setting string key-value properties:
        config.setProperty("app.name", "AccoTax Ledger Pro");
        config.setProperty("app.hub.location", "Barrackpore, West Bengal");
        config.setProperty("server.port", "8080");
        config.setProperty("security.jwt.expiration.minutes", "60");

        System.out.println(">>> 1. Populated Properties Object:");
        System.out.println("  Total Key-Value Pairs : " + config.size());
        System.out.println("  Class Superclass      : " + Properties.class.getSuperclass().getName() + " (Extends Hashtable<Object, Object>)");

        System.out.println("\n>>> 2. Reading Configuration Settings:");
        System.out.println("  app.name             : " + config.getProperty("app.name"));
        System.out.println("  app.hub.location     : " + config.getProperty("app.hub.location"));
        System.out.println("  server.port          : " + config.getProperty("server.port"));

        System.out.println("\n>>> WHY Properties CLASS IS UBIQUITOUS:");
        System.out.println("  1. Key-Value Storage: Specifically tailored for String keys and String values.");
        System.out.println("  2. Built-in I/O: Native load() and store() methods for persistent .properties files.");
        System.out.println("  3. Thread-Safe: Inherits thread synchronization from Hashtable.");

        System.out.println("\n==========================================================================");
    }
}