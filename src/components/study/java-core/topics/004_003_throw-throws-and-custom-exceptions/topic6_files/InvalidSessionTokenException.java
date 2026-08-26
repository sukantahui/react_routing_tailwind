/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 6: Creating Custom Unchecked Exceptions: Extending java.lang.RuntimeException
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

// Custom Unchecked Exception (Extends RuntimeException):
public class InvalidSessionTokenException extends RuntimeException {

    public InvalidSessionTokenException(String message) {
        super(message);
    }

    public InvalidSessionTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}

class SessionValidatorDemo {

    public static void authenticateTraineeSession(String token) {
        // No 'throws' declaration needed in signature because it is UNCHECKED!
        if (token == null || !token.startsWith("CODER_ACCOTAX_")) {
            throw new InvalidSessionTokenException("Session token is invalid or expired! Token: " + token);
        }
        System.out.println("  [AUTHENTICATED] Session verified for token: " + token);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: CUSTOM UNCHECKED EXCEPTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Successful Authentication:");
        authenticateTraineeSession("CODER_ACCOTAX_98765_BARRACKPORE");

        System.out.println("\n>>> 2. Handling Custom Unchecked Exception:");
        try {
            authenticateTraineeSession("INVALID_TOKEN_XYZ");
        } catch (InvalidSessionTokenException e) {
            System.out.println("  [CAUGHT UNCHECKED] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}