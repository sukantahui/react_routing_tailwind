/**
 * Java Core Tutorial - Module 005_007: File Handling & I/O Hands-On Capstone Lab
 * Topic 2: Project 2: Encrypted File Vault (XOR/AES Cryptographic Stream Filter)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io.lab;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class EncryptedFileVaultProjectDemo {

    private static final byte SECRET_VAULT_KEY = (byte) 0x5A; // XOR Stream Key

    // Encrypt / Decrypt Stream Processor (Symmetric Stream Filter):
    public static void transformStream(InputStream in, OutputStream out, byte key) throws Exception {
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) != -1) {
            // Apply byte transformation:
            for (int i = 0; i < bytesRead; i++) {
                buffer[i] ^= key; // XOR encryption/decryption toggle
            }
            out.write(buffer, 0, bytesRead);
        }
        out.flush();
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: PROJECT 2 - ENCRYPTED FILE VAULT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path plainFile = Files.createTempFile("plain_ledger_", ".txt");
        Path vaultFile = Files.createTempFile("encrypted_vault_", ".vault");
        Path restoredFile = Files.createTempFile("restored_ledger_", ".txt");

        String sensitiveData = "CONFIDENTIAL: Barrackpore AccoTax GST Secret Ledger ₹1,50,000";
        Files.writeString(plainFile, sensitiveData, StandardCharsets.UTF_8);

        // 1. ENCRYPTION PHASE: Plaintext -> Encrypted Vault File:
        System.out.println(">>> 1. Encrypting File into Vault Storage:");
        try (InputStream in = new FileInputStream(plainFile.toFile());
             OutputStream out = new FileOutputStream(vaultFile.toFile())) {
            transformStream(in, out, SECRET_VAULT_KEY);
        }
        System.out.println("  Vault File Generated: " + vaultFile.getFileName() + " (" + Files.size(vaultFile) + " bytes)");

        // 2. DECRYPTION PHASE: Encrypted Vault File -> Restored Plaintext:
        System.out.println("\n>>> 2. Decrypting Vault Storage back to Plaintext:");
        try (InputStream in = new FileInputStream(vaultFile.toFile());
             OutputStream out = new FileOutputStream(restoredFile.toFile())) {
            transformStream(in, out, SECRET_VAULT_KEY);
        }

        String decryptedPayload = Files.readString(restoredFile, StandardCharsets.UTF_8);
        System.out.println("  Decrypted Content : " + decryptedPayload);
        System.out.println("  Integrity Match   : " + sensitiveData.equals(decryptedPayload));

        // Cleanup:
        Files.deleteIfExists(plainFile);
        Files.deleteIfExists(vaultFile);
        Files.deleteIfExists(restoredFile);

        System.out.println("\n==========================================================================");
    }
}