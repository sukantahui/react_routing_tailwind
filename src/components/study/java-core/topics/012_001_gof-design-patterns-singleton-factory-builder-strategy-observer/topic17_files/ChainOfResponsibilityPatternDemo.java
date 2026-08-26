/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 17: Chain of Responsibility Pattern - Pipeline Request Handlers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class ChainOfResponsibilityPatternDemo {

    public record EnrollmentRequest(String studentName, boolean authenticated, boolean feePaid) {}

    // 1. Handler Abstract Base:
    public static abstract class Handler {
        private Handler next;

        public Handler linkWith(Handler nextHandler) {
            this.next = nextHandler;
            return nextHandler;
        }

        public abstract boolean handle(EnrollmentRequest request);

        protected boolean checkNext(EnrollmentRequest request) {
            if (next == null) return true; // Reached end of pipeline successfully!
            return next.handle(request);
        }
    }

    // Concrete Handler 1: Authentication Check
    public static class AuthHandler extends Handler {
        @Override
        public boolean handle(EnrollmentRequest req) {
            if (!req.authenticated()) {
                System.err.println("   [PIPELINE REJECTED]: User " + req.studentName() + " is NOT authenticated! ❌");
                return false;
            }
            System.out.println("   [STEP 1 AUTH]: Passed for " + req.studentName());
            return checkNext(req);
        }
    }

    // Concrete Handler 2: Fee Verification Check
    public static class FeeCheckHandler extends Handler {
        @Override
        public boolean handle(EnrollmentRequest req) {
            if (!req.feePaid()) {
                System.err.println("   [PIPELINE REJECTED]: Fee payment pending for " + req.studentName() + "! ❌");
                return false;
            }
            System.out.println("   [STEP 2 FEE ]: Payment verified for " + req.studentName());
            return checkNext(req);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: CHAIN OF RESPONSIBILITY PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Construct pipeline chain:
        Handler pipeline = new AuthHandler();
        pipeline.linkWith(new FeeCheckHandler());

        System.out.println("1. Processing Valid Request:");
        EnrollmentRequest validReq = new EnrollmentRequest("Swadeep Paul", true, true);
        boolean success = pipeline.handle(validReq);
        System.out.println("Pipeline Final Result: " + (success ? "APPROVED ✅" : "REJECTED ❌") + "
");

        System.out.println("2. Processing Request with Unpaid Fee:");
        EnrollmentRequest unpaidReq = new EnrollmentRequest("Tuhina Das", true, false);
        pipeline.handle(unpaidReq);

        System.out.println("\n==========================================================================");
    }
}
