/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 16: Real-World Architecture: CloudStorageProvider Capstone (AWS S3, Azure Blob, Google Cloud)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class RealWorldCloudStorageProviderCapstoneDemo {

    public interface CloudStorageProvider {
        // Abstract Core API
        void storeObject(String bucket, String key, byte[] content);
        byte[] fetchObject(String bucket, String key);

        // Java 8 Default method: Health check
        default boolean pingHealthCheck() {
            System.out.println("  [CLOUD PING] Provider endpoint healthy & reachable.");
            return true;
        }

        // Java 8 Static method: Storage calculator
        static double bytesToMegaBytes(long bytes) {
            return bytes / (1024.0 * 1024.0);
        }
    }

    public static class AwsS3StorageProvider implements CloudStorageProvider {
        @Override
        public void storeObject(String bucket, String key, byte[] content) {
            System.out.printf("  [AWS S3] Uploaded key '%s' to S3 Bucket '%s' (%d bytes)\n", key, bucket, content.length);
        }

        @Override
        public byte[] fetchObject(String bucket, String key) {
            System.out.printf("  [AWS S3] GET request for key '%s' from bucket '%s'\n", key, bucket);
            return new byte[256];
        }
    }

    public static class AzureBlobStorageProvider implements CloudStorageProvider {
        @Override
        public void storeObject(String container, String blobName, byte[] content) {
            System.out.printf("  [AZURE BLOB] PutBlob '%s' in container '%s' (%d bytes)\n", blobName, container, content.length);
        }

        @Override
        public byte[] fetchObject(String container, String blobName) {
            System.out.printf("  [AZURE BLOB] GetBlob '%s' from container '%s'\n", blobName, container);
            return new byte[256];
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: CLOUD STORAGE PROVIDER CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CloudStorageProvider storage = new AwsS3StorageProvider();
        storage.pingHealthCheck();
        storage.storeObject("barrackpore-backups", "trainee_submissions.tar.gz", new byte[1048576]);
        storage.fetchObject("barrackpore-backups", "trainee_submissions.tar.gz");

        System.out.println("  File size in MB: " + CloudStorageProvider.bytesToMegaBytes(1048576) + " MB");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 002_008 INTERFACES & MULTIPLE INHERITANCE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}