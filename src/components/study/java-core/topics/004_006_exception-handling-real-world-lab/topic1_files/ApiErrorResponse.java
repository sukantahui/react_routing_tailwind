/**
 * Java Core Tutorial - Module 004_006: Exception Handling Real-World Lab
 * Topic 1: Designing a Unified Enterprise API Error Response Model (RFC 7807 Pattern)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

// Immutable Enterprise REST Error Payload DTO conforming to RFC 7807 Problem Details:
public class ApiErrorResponse {
    private final Instant timestamp;
    private final int status;
    private final String errorCode;
    private final String message;
    private final String path;
    private final Map<String, String> fieldErrors;

    public ApiErrorResponse(int status, String errorCode, String message, String path, Map<String, String> fieldErrors) {
        this.timestamp = Instant.now();
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
        this.path = path;
        this.fieldErrors = fieldErrors != null ? Collections.unmodifiableMap(new HashMap<>(fieldErrors)) : Collections.emptyMap();
    }

    public Instant getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public String getErrorCode() { return errorCode; }
    public String getMessage() { return message; }
    public String getPath() { return path; }
    public Map<String, String> getFieldErrors() { return fieldErrors; }

    public void printJsonPayload() {
        System.out.println("  {");
        System.out.println("    "timestamp": "" + timestamp + "",");
        System.out.println("    "status": " + status + ",");
        System.out.println("    "errorCode": "" + errorCode + "",");
        System.out.println("    "message": "" + message + "",");
        System.out.println("    "path": "" + path + "",");
        System.out.println("    "fieldErrors": " + fieldErrors);
        System.out.println("  }");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: UNIFIED API ERROR RESPONSE MODEL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Map<String, String> validationErrors = new HashMap<>();
        validationErrors.put("studentName", "Student name cannot be blank");
        validationErrors.put("admissionFee", "Deposit fee must be >= 5000 INR");

        ApiErrorResponse error = new ApiErrorResponse(
                400,
                "ERR_VALIDATION_FAILED",
                "Admission payload contained 2 invalid fields",
                "/api/v1/students/admissions",
                validationErrors
        );

        System.out.println(">>> Standardized Enterprise JSON Error Payload:");
        error.printJsonPayload();

        System.out.println("\n==========================================================================");
    }
}