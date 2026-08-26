/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 16: The Command Pattern - Action Objects & Undo Queues
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

import java.util.ArrayDeque;
import java.util.Deque;

public class CommandPatternDemo {

    // 1. Command Interface:
    public interface Command {
        void execute();
        void undo();
    }

    // 2. Receiver (The business domain state):
    public static class BankLedger {
        private double balance = 10000.0;

        public void deposit(double amt) { balance += amt; System.out.println("   [LEDGER]: Deposited ₹" + amt + " | Balance: ₹" + balance); }
        public void withdraw(double amt) { balance -= amt; System.out.println("   [LEDGER]: Withdrawn ₹" + amt + " | Balance: ₹" + balance); }
        public double getBalance() { return balance; }
    }

    // 3. Concrete Command:
    public static class DepositCommand implements Command {
        private final BankLedger ledger;
        private final double amount;

        public DepositCommand(BankLedger ledger, double amount) {
            this.ledger = ledger;
            this.amount = amount;
        }

        @Override public void execute() { ledger.deposit(amount); }
        @Override public void undo() {
            System.out.print("   [UNDO OPERATION]: ");
            ledger.withdraw(amount); // Reverse operation!
        }
    }

    // 4. Invoker with Undo Stack:
    public static class TransactionManager {
        private final Deque<Command> history = new ArrayDeque<>();

        public void executeCommand(Command cmd) {
            cmd.execute();
            history.push(cmd);
        }

        public void undoLast() {
            if (!history.isEmpty()) {
                Command last = history.pop();
                last.undo();
            } else {
                System.out.println("   [HISTORY]: Nothing to undo!");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: COMMAND PATTERN & UNDO STACKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BankLedger ledger = new BankLedger();
        TransactionManager tm = new TransactionManager();

        System.out.println("1. Executing Deposit of ₹5,000:");
        tm.executeCommand(new DepositCommand(ledger, 5000.0));

        System.out.println("
2. Executing Deposit of ₹2,500:");
        tm.executeCommand(new DepositCommand(ledger, 2500.0));

        System.out.println("
3. Performing Undo (Ctrl+Z):");
        tm.undoLast();

        System.out.println("
Final Ledger Balance: ₹" + ledger.getBalance());
        System.out.println("==========================================================================");
    }
}
