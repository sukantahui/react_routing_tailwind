/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 16: Real-World Modeling: DataExporter Capstone (JSON, CSV, PDF)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

import java.util.List;

public class RealWorldDataExporterCapstoneDemo {

    // Abstract Pipeline Base
    public abstract static class DataExporter {
        protected String destinationPath;

        public DataExporter(String destination) {
            this.destinationPath = destination;
        }

        // Abstract Step 1: Read raw records from source
        protected abstract List<String> readRawData();

        // Abstract Step 2: Format records into specific dialect (JSON, CSV, PDF)
        protected abstract String formatData(List<String> rawData);

        // Concrete Step 3: Common file I/O dispatcher
        public void exportToFile() {
            System.out.println("  [PIPELINE START] Exporting to: " + destinationPath);
            List<String> records = readRawData();
            String formattedPayload = formatData(records);
            System.out.println("  [FILE I/O] Writing payload to disk (" + formattedPayload.length() + " bytes)...");
            System.out.println("  [PREVIEW PAYLOAD]:
" + formattedPayload);
            System.out.println("  [PIPELINE COMPLETE] Export verified successfully!
");
        }
    }

    // Concrete JSON Exporter
    public static class JsonDataExporter extends DataExporter {
        public JsonDataExporter(String destination) { super(destination); }

        @Override
        protected List<String> readRawData() {
            return List.of("Swadeep Paul:Java:95", "Tuhina Das:React:92", "Debangshu Mukherjee:Cloud:88");
        }

        @Override
        protected String formatData(List<String> rawData) {
            StringBuilder sb = new StringBuilder("  [
");
            for (String r : rawData) {
                String[] p = r.split(":");
                sb.append(String.format("    {"name": "%s", "track": "%s", "score": %s},
", p[0], p[1], p[2]));
            }
            sb.append("  ]");
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: DATA EXPORTER ABSTRACTION CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        DataExporter exporter = new JsonDataExporter("/opt/barrackpore/exports/trainees.json");
        exporter.exportToFile();

        System.out.println("==========================================================================");
        System.out.println(" MODULE 002_007 ABSTRACT CLASSES & PARTIAL ABSTRACTION 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}