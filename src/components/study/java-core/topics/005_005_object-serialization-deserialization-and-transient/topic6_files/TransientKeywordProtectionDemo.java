/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 6: The 'transient' Keyword: Protecting Passwords, SSNs & Runtime State
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class BankAccountCredentials implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String accountHolder;
    private final String accountNumber;

    // TRANSIENT FIELDS: Skipped during serialization; restored to default value (null / 0) upon deserialization:
    private final transient String secretPin;
    private final transient double cachedSessionBalance;

    public BankAccountCredentials(String holder, String accNum, String pin, double balance) {
        this.accountHolder = holder;
        this.accountNumber = accNum;
        this.secretPin = pin;
        this.cachedSessionBalance = balance;
    }

    @Override
    public String toString() {
        return "BankAccount[Holder=" + accountHolder + ", Acc=" + accountNumber +
                ", PIN=" + secretPin + ", SessionBalance=" + cachedSessionBalance + "]";
    }
}

public class TransientKeywordProtectionDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE 'transient' KEYWORD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BankAccountCredentials account = new BankAccountCredentials(
                "Tuhina Das", "ACCOTAX_BKP_8899", "SECRET_PIN_7721", 75000.00
        );

        System.out.println(">>> 1. Original Live Object State (Prior to Serialization):");
        System.out.println("  " + account);

        // Serialize:
        ByteArrayOutputStream byteSink = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteSink)) {
            oos.writeObject(account);
        }

        // Deserialize:
        BankAccountCredentials restored;
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(byteSink.toByteArray()))) {
            restored = (BankAccountCredentials) ois.readObject();
        }

        System.out.println("\n>>> 2. Restored Object State (After Deserialization):");
        System.out.println("  " + restored);
        System.out.println("  Notice that 'secretPin' became 'null' and 'cachedSessionBalance' became '0.0'!");

        System.out.println("\n>>> 3 USE CASES FOR THE 'transient' KEYWORD:");
        System.out.println("  1. Security: Preventing sensitive credentials (passwords, PINs, tokens) from being written to disk/wire.");
        System.out.println("  2. Performance: Skipping transient computational caches or intermediate calculation buffers.");
        System.out.println("  3. System Resources: Skipping non-serializable OS resources (Sockets, FileStreams, Threads, DB connections).");

        System.out.println("\n==========================================================================");
    }
}