/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 6: Partial Abstraction: Mixing Implemented Methods with Abstract Contracts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class PartialAbstractionConceptDemo {

    // PARTIAL ABSTRACTION: 50% concrete, 50% abstract
    public abstract static class CloudDeploymentPipeline {

        // Concrete Step 1: Shared validation
        public void validateSourceCode() {
            System.out.println("  [STEP 1] Running SonarQube static code analysis & security scan...");
        }

        // Abstract Step 2: Specialized packaging (WAR vs Docker Image)
        public abstract void buildArtifact();

        // Concrete Step 3: Shared notification
        public void notifyDevOpsTeam() {
            System.out.println("  [STEP 3] Dispatching deployment confirmation webhook to Slack.");
        }

        // Orchestration Workflow
        public void executePipeline() {
            validateSourceCode();
            buildArtifact();
            notifyDevOpsTeam();
        }
    }

    public static class KubernetesPipeline extends CloudDeploymentPipeline {
        @Override
        public void buildArtifact() {
            System.out.println("  [STEP 2] Building multi-arch Docker image & pushing to AWS ECR!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: PARTIAL ABSTRACTION PIPELINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CloudDeploymentPipeline pipeline = new KubernetesPipeline();
        pipeline.executePipeline();

        System.out.println("\n==========================================================================");
    }
}