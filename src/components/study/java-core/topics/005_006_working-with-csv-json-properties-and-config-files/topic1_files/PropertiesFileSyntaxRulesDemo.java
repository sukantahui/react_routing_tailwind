/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 1: Structure & Syntax Rules of .properties Files (Delimiters, Escapes, Comments)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.io.StringReader;
import java.util.Properties;

public class PropertiesFileSyntaxRulesDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: .properties FILE SYNTAX RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Raw .properties text content showing all standard syntax rules:
        String propertiesContent =
                "# =====================================================\n" +
                "# BARRACKPORE ACADEMY APPLICATION CONFIGURATION\n" +
                "# =====================================================\n" +
                "! Exclamation marks are also valid comment characters!\n" +
                "\n" +
                "# Standard key=value delimiter:\n" +
                "database.url=jdbc:postgresql://localhost:5432/accotax_db\n" +
                "\n" +
                "# Colon ':' is an equally valid delimiter:\n" +
                "database.username: postgres\n" +
                "\n" +
                "# Whitespace delimiter (space between key and value):\n" +
                "database.pool.size 25\n" +
                "\n" +
                "# Multi-line value using backslash '\\':\n" +
                "welcome.message=Welcome to Barrackpore Academy! \\\n" +
                "               Master Java Core and Spring Boot with Sukanta Hui.\n" +
                "\n" +
                "# Escaped special characters (colon in key):\n" +
                "tax\\:rate.gst=18.0";

        Properties props = new Properties();
        try (StringReader reader = new StringReader(propertiesContent)) {
            props.load(reader);
        }

        System.out.println(">>> Parsed Configuration Keys & Values:");
        System.out.println("  database.url     : " + props.getProperty("database.url"));
        System.out.println("  database.username: " + props.getProperty("database.username"));
        System.out.println("  database.pool.size: " + props.getProperty("database.pool.size"));
        System.out.println("  welcome.message  : " + props.getProperty("welcome.message"));
        System.out.println("  tax:rate.gst     : " + props.getProperty("tax:rate.gst"));

        System.out.println("\n==========================================================================");
    }
}