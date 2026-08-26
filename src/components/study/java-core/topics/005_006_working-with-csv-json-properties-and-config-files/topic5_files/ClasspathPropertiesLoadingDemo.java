/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 5: Loading Properties from Application Classpath via ClassLoader.getResourceAsStream()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public class ClasspathPropertiesLoadingDemo {

    public static Properties loadConfigFromClasspathSimulation(String resourcePath) throws Exception {
        Properties props = new Properties();

        // 1. Simulating ClassLoader.getResourceAsStream() stream:
        // In real apps: InputStream is = MyClass.class.getClassLoader().getResourceAsStream(resourcePath);
        String embeddedClasspathContent =
                "app.environment=PRODUCTION\n" +
                "app.datacenter.region=ap-south-1-kolkata\n" +
                "app.batch.mentor=Sukanta Hui (Barrackpore)\n";

        try (InputStream is = new ByteArrayInputStream(embeddedClasspathContent.getBytes(StandardCharsets.UTF_8))) {
            if (is == null) {
                throw new IllegalArgumentException("Resource file not found on classpath: " + resourcePath);
            }
            // Load via UTF-8 Reader:
            try (InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8)) {
                props.load(isr);
            }
        }
        return props;
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: CLASSPATH PROPERTIES LOADING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Properties classpathConfig = loadConfigFromClasspathSimulation("config/application.properties");

        System.out.println(">>> Successfully Loaded Embedded Classpath Properties:");
        System.out.println("  Environment       : " + classpathConfig.getProperty("app.environment"));
        System.out.println("  Datacenter Region : " + classpathConfig.getProperty("app.datacenter.region"));
        System.out.println("  Lead Mentor       : " + classpathConfig.getProperty("app.batch.mentor"));

        System.out.println("\n>>> WHY CLASSPATH LOADING IS MANDATORY FOR PACKAGED APPS (JAR / WAR):");
        System.out.println("  1. Inside a packaged JAR file, files are NOT physical disk files (new File() fails!).");
        System.out.println("  2. 'ClassLoader.getResourceAsStream()' reads resources packaged directly inside the JAR archive.");
        System.out.println("  3. Always check if the returned InputStream is 'null' to handle missing resource errors gracefully.");

        System.out.println("\n==========================================================================");
    }
}