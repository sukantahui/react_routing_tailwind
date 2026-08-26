/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 6: Custom Fields, Properties & Constructors in Enums (HttpStatus, ErrorCode)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class CustomEnumPropertiesDemo {

    // Advanced Enum with Custom Fields, Constructor & Getter Methods:
    public enum HttpResponseCode {
        OK(200, "Success"),
        CREATED(201, "Resource Created"),
        BAD_REQUEST(400, "Invalid Client Payload"),
        UNAUTHORIZED(401, "Authentication Required"),
        NOT_FOUND(404, "Requested Entity Missing"),
        INTERNAL_SERVER_ERROR(500, "Server Backend Crash");

        // Immutable instance properties:
        private final int statusCode;
        private final String description;

        // Enum constructor (Implicitly PRIVATE):
        HttpResponseCode(int code, String desc) {
            this.statusCode = code;
            this.description = desc;
        }

        public int getStatusCode() { return statusCode; }
        public String getDescription() { return description; }

        public boolean isSuccess() {
            return statusCode >= 200 && statusCode < 300;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: CUSTOM FIELDS & CONSTRUCTORS IN ENUMS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        HttpResponseCode response = HttpResponseCode.NOT_FOUND;

        System.out.println(">>> 1. Inspecting Custom Enum Attributes:");
        System.out.println("  Enum Constant Name : " + response.name());
        System.out.println("  HTTP Status Code   : " + response.getStatusCode());
        System.out.println("  Description        : " + response.getDescription());
        System.out.println("  Is Success Status? : " + response.isSuccess());

        System.out.println("\n>>> 2. Full HTTP Catalog Inspection:");
        for (HttpResponseCode code : HttpResponseCode.values()) {
            System.out.printf("  [%d] %-22s -> %s (Success? %s)%n",
                    code.getStatusCode(), code.name(), code.getDescription(), code.isSuccess());
        }

        System.out.println("\n==========================================================================");
    }
}