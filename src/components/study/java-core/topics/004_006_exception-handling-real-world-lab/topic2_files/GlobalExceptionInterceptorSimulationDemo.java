/**
 * Java Core Tutorial - Module 004_006: Exception Handling Real-World Lab
 * Topic 2: Implementing a Global Exception Interceptor Simulation (@ControllerAdvice Pattern)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.util.Collections;

public class GlobalExceptionInterceptorSimulationDemo {

    // Simulated Global Exception Gateway (@ControllerAdvice / Interceptor):
    public static class GlobalExceptionHandlerGateway {

        public static ApiErrorResponse handleException(Throwable ex, String requestPath) {
            if (ex instanceof UserNotFoundException unfe) {
                return new ApiErrorResponse(404, "USER_NOT_FOUND", unfe.getMessage(), requestPath, null);
            }
            if (ex instanceof IllegalArgumentException iae) {
                return new ApiErrorResponse(400, "BAD_REQUEST_PARAM", iae.getMessage(), requestPath, null);
            }
            if (ex instanceof InsufficientBalanceException ibe) {
                return new ApiErrorResponse(422, "INSUFFICIENT_FUNDS", ibe.getMessage(), requestPath,
                        Collections.singletonMap("shortfall", String.valueOf(ibe.getShortfall())));
            }

            // Fallback for unexpected internal crashes (HTTP 500):
            return new ApiErrorResponse(500, "INTERNAL_SERVER_ERROR", "An unexpected system error occurred", requestPath, null);
        }
    }

    public static void simulateApiDispatch(String endpoint, Runnable action) {
        System.out.println("  [REQUEST INCOMING] " + endpoint);
        try {
            action.run();
            System.out.println("  [HTTP 200 OK] Request succeeded.\n");
        } catch (Throwable t) {
            ApiErrorResponse errorPayload = GlobalExceptionHandlerGateway.handleException(t, endpoint);
            System.out.println("  [INTERCEPTED & CONVERTED TO REST PAYLOAD]");
            errorPayload.printJsonPayload();
            System.out.println();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: GLOBAL EXCEPTION INTERCEPTOR - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Simulating 404 Not Found:");
        simulateApiDispatch("/api/v1/students/USR_99", () -> {
            throw new UserNotFoundException("USR_99");
        });

        System.out.println(">>> 2. Simulating 422 Unprocessable Entity (Insufficient Balance):");
        simulateApiDispatch("/api/v1/payments/pay", () -> {
            try {
                throw new InsufficientBalanceException(2000.0, 5000.0);
            } catch (InsufficientBalanceException e) {
                throw new RuntimeException(e); // Propagates to interceptor
            }
        });

        System.out.println("==========================================================================");
    }
}