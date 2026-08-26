/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 3: Accessing Properties with Fallback Defaults: getProperty(key, defaultValue)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.util.Properties;

public class PropertiesDefaultFallbackDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: getProperty() WITH FALLBACK DEFAULTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Properties userConfig = new Properties();
        userConfig.setProperty("server.port", "9090");
        userConfig.setProperty("security.enabled", "true");

        // 1. Key exists:
        String port = userConfig.getProperty("server.port", "8080");
        System.out.println(">>> 1. Existing Key with Default Supplier:");
        System.out.println("  server.port (found) : " + port);

        // 2. Key is MISSING (Fallback default used):
        String timeout = userConfig.getProperty("server.timeout.seconds", "30");
        String maxThreads = userConfig.getProperty("threadpool.max", "100");
        String clusterName = userConfig.getProperty("cluster.name", "Barrackpore_Primary_Cluster");

        System.out.println("\n>>> 2. Missing Keys Falling Back to Safe Defaults:");
        System.out.println("  server.timeout.seconds : " + timeout + " (Fallback default)");
        System.out.println("  threadpool.max         : " + maxThreads + " (Fallback default)");
        System.out.println("  cluster.name           : " + clusterName + " (Fallback default)");

        // 3. Hierarchical Default Properties (Parent-Child Fallback):
        Properties defaultParent = new Properties();
        defaultParent.setProperty("environment", "DEVELOPMENT");
        defaultParent.setProperty("log.level", "DEBUG");

        Properties childEnvConfig = new Properties(defaultParent); // Chains parent as fallback!
        childEnvConfig.setProperty("environment", "PRODUCTION");   // Overrides parent

        System.out.println("\n>>> 3. Hierarchical Parent Fallback Pattern:");
        System.out.println("  environment (Overridden) : " + childEnvConfig.getProperty("environment"));
        System.out.println("  log.level   (Inherited)  : " + childEnvConfig.getProperty("log.level"));

        System.out.println("\n==========================================================================");
    }
}