/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 10: Building a Unified Enterprise Application Configuration Loader (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.io.StringReader;
import java.util.Properties;

public class UnifiedApplicationConfigLoaderCapstoneDemo {

    // Unified Enterprise Config Manager:
    public static class AppConfigManager {
        private final Properties properties = new Properties();

        public AppConfigManager(String rawProperties) throws Exception {
            // Load base properties from stream:
            try (StringReader reader = new StringReader(rawProperties)) {
                properties.load(reader);
            }
        }

        // Type-Safe Property Getters with Defaults & Validation:
        public String getString(String key, String defaultVal) {
            return properties.getProperty(key, defaultVal);
        }

        public int getInt(String key, int defaultVal) {
            String val = properties.getProperty(key);
            if (val == null) return defaultVal;
            try {
                return Integer.parseInt(val.trim());
            } catch (NumberFormatException e) {
                System.err.println("Warning: Invalid int for key '" + key + "', using default: " + defaultVal);
                return defaultVal;
            }
        }

        public boolean getBoolean(String key, boolean defaultVal) {
            String val = properties.getProperty(key);
            return val != null ? Boolean.parseBoolean(val.trim()) : defaultVal;
        }

        public double getDouble(String key, double defaultVal) {
            String val = properties.getProperty(key);
            if (val == null) return defaultVal;
            try {
                return Double.parseDouble(val.trim());
            } catch (NumberFormatException e) {
                return defaultVal;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: UNIFIED CONFIG LOADER CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String simulatedConfigFile =
                "server.port=9090\n" +
                "server.host=127.0.0.1\n" +
                "security.jwt.enabled=true\n" +
                "tax.rate.gst=18.5\n" +
                "hub.location=Barrackpore Central";

        AppConfigManager config = new AppConfigManager(simulatedConfigFile);

        System.out.println(">>> 1. Extracting Strongly-Typed Configuration Properties:");
        int port = config.getInt("server.port", 8080);
        String host = config.getString("server.host", "localhost");
        boolean jwtEnabled = config.getBoolean("security.jwt.enabled", false);
        double gstRate = config.getDouble("tax.rate.gst", 18.0);
        String hub = config.getString("hub.location", "Kolkata");
        int timeout = config.getInt("server.timeout.ms", 5000); // Fallback used!

        System.out.printf("  Server Host:Port   : %s:%d%n", host, port);
        System.out.printf("  JWT Enabled        : %b%n", jwtEnabled);
        System.out.printf("  GST Rate Applied   : %.1f%%%n", gstRate);
        System.out.printf("  Operating Hub      : %s%n", hub);
        System.out.printf("  Network Timeout    : %d ms (Default)%n", timeout);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 005_006 WORKING WITH CSV, JSON & CONFIG FILES 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}