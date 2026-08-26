/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 11: Real-World Architecture: Building SQL, JSON & HTML Templates (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class RealWorldTemplateBuilderCapstoneDemo {

    public static class EnterpriseReportGenerator {

        // 1. Dynamic SQL Query Generator
        public static String buildAdmissionQuery(String hubCity, double minGpa) {
            return """
                    SELECT
                        t.id,
                        t.name,
                        t.gpa,
                        t.email
                    FROM trainees t
                    INNER JOIN academy_hubs h ON t.hub_id = h.id
                    WHERE h.city_name = '%s'
                      AND t.gpa >= %.2f
                    ORDER BY t.gpa DESC;
                    """.formatted(hubCity, minGpa);
        }

        // 2. REST API JSON Payload Generator
        public static String buildApiResponseJson(String status, int count, String location) {
            return """
                    {
                      "meta": {
                        "status": "%s",
                        "timestamp": %d
                      },
                      "data": {
                        "totalEnrolled": %d,
                        "primaryHub": "%s"
                      }
                    }
                    """.formatted(status, System.currentTimeMillis(), count, location);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: REAL-WORLD TEMPLATE BUILDER CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Generated Enterprise SQL Statement:");
        String sql = EnterpriseReportGenerator.buildAdmissionQuery("Barrackpore", 9.0);
        System.out.println(sql);

        System.out.println(">>> 2. Generated REST API JSON Payload:");
        String json = EnterpriseReportGenerator.buildApiResponseJson("SUCCESS", 125, "Barrackpore Hub");
        System.out.println(json);

        System.out.println("==========================================================================");
        System.out.println(" MODULE 003_002 STRINGBUILDER & FORMATTING 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}