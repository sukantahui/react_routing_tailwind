/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 4: Storing Properties to Disk: properties.store(Writer, comments) & UTF-8
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public class StoringPropertiesFileDiskDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: properties.store(Writer) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Properties runtimeConfig = new Properties();

        // 1. Setting runtime properties:
        runtimeConfig.setProperty("hub.name", "Barrackpore Central Academy");
        runtimeConfig.setProperty("hub.lead.instructor", "Sukanta Hui");
        runtimeConfig.setProperty("hub.capacity.seats", "45");
        runtimeConfig.setProperty("hub.status", "ACTIVE_ACCREDITED");

        File destination = new File("hub_runtime_config.properties");

        // 2. Storing to disk with header comments and UTF-8 Writer:
        System.out.println(">>> 1. Writing configuration to disk with properties.store():");
        try (FileWriter writer = new FileWriter(destination, StandardCharsets.UTF_8)) {
            runtimeConfig.store(writer, "ACCOTAX ENTERPRISE HUB CONFIGURATION - AUTO-GENERATED");
        }

        System.out.println("  Saved to: " + destination.getName() + " (" + destination.length() + " bytes)");

        // 3. Inspecting generated file contents:
        System.out.println("\n>>> 2. Physical File Content on Disk:");
        try (FileReader reader = new FileReader(destination, StandardCharsets.UTF_8)) {
            char[] buffer = new char[256];
            int read;
            while ((read = reader.read(buffer)) != -1) {
                System.out.print(new String(buffer, 0, read));
            }
        }

        // Cleanup:
        destination.delete();

        System.out.println("\n\n>>> CRITICAL store() BEHAVIOR:");
        System.out.println("  1. Automatically prepends the header comment supplied in the 2nd argument (prefixed with '#').");
        System.out.println("  2. Automatically appends a timestamp comment (e.g. '#Tue Aug 27 01:15:00 IST 2026').");
        System.out.println("  3. Always use 'store(Writer, comments)' with UTF-8 for cross-platform international safety.");

        System.out.println("\n==========================================================================");
    }
}