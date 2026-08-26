/**
 * Java Core Tutorial - Module 005_005: Object Serialization & The transient Keyword
 * Topic 10: Customizing Serialization: private writeObject() & readObject() Protocols
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.serialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Base64;

class EncryptedCredentials implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    // Transient field with custom encrypted serialization protocol:
    private transient String rawPassword;

    public EncryptedCredentials(String user, String pass) {
        this.username = user;
        this.rawPassword = pass;
    }

    // 1. CUSTOM writeObject PROTOCOL (Must be private void!):
    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject(); // Serializes non-transient fields (username) automatically!

        // Custom encryption transformation for transient password:
        String obfuscated = Base64.getEncoder().encodeToString(rawPassword.getBytes());
        oos.writeUTF(obfuscated); // Writes encrypted password manually
        System.out.println("  [CUSTOM writeObject] Encrypted and wrote transient password.");
    }

    // 2. CUSTOM readObject PROTOCOL (Must be private void!):
    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
        ois.defaultReadObject(); // Rehydrates non-transient fields automatically!

        // Custom decryption transformation:
        String obfuscated = ois.readUTF();
        this.rawPassword = new String(Base64.getDecoder().decode(obfuscated));
        System.out.println("  [CUSTOM readObject] Decrypted and restored transient password.");
    }

    @Override
    public String toString() {
        return "EncryptedCredentials[user=" + username + ", password=" + rawPassword + "]";
    }
}

public class CustomWriteObjectReadObjectProtocolDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: CUSTOM writeObject & readObject - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EncryptedCredentials creds = new EncryptedCredentials("Swadeep Paul", "SecretPass2026");
        System.out.println(">>> 1. Original Credentials: " + creds);

        // Serialize:
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(byteBuffer)) {
            oos.writeObject(creds);
        }

        // Deserialize:
        EncryptedCredentials restored;
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(byteBuffer.toByteArray()))) {
            restored = (EncryptedCredentials) ois.readObject();
        }

        System.out.println("\n>>> 2. Restored Credentials: " + restored);

        System.out.println("\n>>> 3 RULES OF CUSTOM writeObject/readObject:");
        System.out.println("  1. Visibility MUST be 'private' (invoked by JVM reflection).");
        System.out.println("  2. Always call 'defaultWriteObject()' / 'defaultReadObject()' first.");
        System.out.println("  3. Used for encrypting sensitive fields and recalculating transient caches on load.");

        System.out.println("\n==========================================================================");
    }
}