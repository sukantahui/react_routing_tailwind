/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 2: Loading Properties from Disk: properties.load(InputStream / Reader) & UTF-8
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public class LoadingPropertiesFileDiskDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: properties.load(Reader) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        File configFile = new File("application.properties");

        // Write sample config with international UTF-8 characters:
        try (FileWriter fw = new FileWriter(configFile, StandardCharsets.UTF_8)) {
            fw.write("academy.hub=ব্যারাকপুর (Barrackpore)\n");
            fw.write("academy.mentor=Sukanta Hui\n");
            fw.write("academy.students.active=4\n");
        }

        // LOAD PROPERTIES WITH EXPLICIT UTF-8 READER:
        Properties appProps = new Properties();
        try (FileReader reader = new FileReader(configFile, StandardCharsets.UTF_8)) {
            appProps.load(reader); // Ingests and parses all key-values cleanly!
        }

        System.out.println(">>> Successfully Loaded Properties from File:");
        System.out.println("  academy.hub            : " + appProps.getProperty("academy.hub"));
        System.out.println("  academy.mentor         : " + appProps.getProperty("academy.mentor"));
        System.out.println("  academy.students.active: " + appProps.getProperty("academy.students.active"));

        // Cleanup:
        configFile.delete();

        System.out.println("\n>>> BEST PRACTICE NOTE:");
        System.out.println("  - Always use 'properties.load(Reader)' with explicit 'StandardCharsets.UTF_8'!");
        System.out.println("  - Legacy 'properties.load(InputStream)' assumes ISO-8859-1 encoding and corrupts non-English characters.");

        System.out.println("\n==========================================================================");
    }
}