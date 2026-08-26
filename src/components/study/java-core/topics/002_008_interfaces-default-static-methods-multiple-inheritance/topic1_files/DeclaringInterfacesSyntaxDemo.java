/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 1: Declaring Interfaces Using the 'interface' Keyword
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class DeclaringInterfacesSyntaxDemo {

    // Interface declaration syntax:
    // 'public interface InterfaceName { ... }'
    public interface CloudStorageService {
        // Constant (Implicitly: public static final)
        String DEFAULT_REGION = "ap-south-1 (Mumbai / Kolkata DC)";

        // Abstract method (Implicitly: public abstract)
        void uploadFile(String bucketName, String fileName, byte[] data);
        byte[] downloadFile(String bucketName, String fileName);
    }

    public static class LocalAwsStorage implements CloudStorageService {
        @Override
        public void uploadFile(String bucket, String file, byte[] data) {
            System.out.printf("  [UPLOAD] Uploaded %s (%d bytes) to bucket '%s' in %s\n",
                    file, data.length, bucket, DEFAULT_REGION);
        }

        @Override
        public byte[] downloadFile(String bucket, String file) {
            System.out.printf("  [DOWNLOAD] Fetched %s from bucket '%s'\n", file, bucket);
            return new byte[]{1, 2, 3};
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: DECLARING INTERFACES IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CloudStorageService storage = new LocalAwsStorage();
        storage.uploadFile("barrackpore-trainee-vault", "swadeep_project.zip", new byte[1024]);
        storage.downloadFile("barrackpore-trainee-vault", "swadeep_project.zip");

        System.out.println("\n==========================================================================");
    }
}