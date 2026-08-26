/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 8: Sealed Class Rules & Same-File Automatic Permits Inference
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class SealedRulesInferenceDemo {

    // 1. Same-File Permits Inference:
    // Notice NO 'permits' clause here! Because all subclasses are in this same file,
    // javac infers 'permits SuccessResponse, ErrorResponse' automatically!
    public sealed interface ApiResponse {}

    public record SuccessResponse(String payload, long timestamp) implements ApiResponse {}
    public record ErrorResponse(int errorCode, String errorMessage) implements ApiResponse {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: SAME-FILE PERMITS INFERENCE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        ApiResponse res1 = new SuccessResponse("Data loaded successfully", System.currentTimeMillis());
        ApiResponse res2 = new ErrorResponse(404, "Student record missing");

        System.out.println("1. Success Response: " + res1);
        System.out.println("2. Error Response  : " + res2);

        System.out.println("\n>>> SEALED INFERENCE RULES:");
        System.out.println("  - When subclasses are in the same .java file, 'permits' is optional.");
        System.out.println("  - Records can implement sealed interfaces directly (records are implicitly final!).");
        System.out.println("==========================================================================");
    }
}
