/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 8: Decomposing Fat Interfaces into Focused Role-Specific Interfaces (Case Study)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class DecomposingFatInterfacesDemo {

    // Segregated Worker Interfaces:
    public interface Workable {
        void performTask();
    }

    public interface Feedable {
        void takeLunchBreak();
    }

    public interface Rechargeable {
        void rechargeBattery();
    }

    // 1. Human Trainee Developer needs work + lunch:
    public static class HumanTrainee implements Workable, Feedable {
        public void performTask() {
            System.out.println("  [HUMAN TRAINEE] Writing Java Core code @ Barrackpore Hub.");
        }
        public void takeLunchBreak() {
            System.out.println("  [HUMAN TRAINEE] Having lunch break.");
        }
    }

    // 2. Automated AI / Robotic Server needs work + recharge (No lunch!):
    public static class AiBuildBot implements Workable, Rechargeable {
        public void performTask() {
            System.out.println("  [AI BOT] Running automated Gradle unit tests.");
        }
        public void rechargeBattery() {
            System.out.println("  [AI BOT] Connected to 240V power station.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: ROLE INTERFACE DECOMPOSITION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Workable human = new HumanTrainee();
        Workable robot = new AiBuildBot();

        human.performTask();
        robot.performTask();

        System.out.println("\n==========================================================================");
    }
}