/**
 * BinaryHeaderProtocolDemo.c
 * Demonstrates designing a custom binary container file format with
 * Magic Number validation, schema versioning, and record chunk payloads.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

#define FILE_MAGIC 0x434F4445 // ASCII "CODE"
#define CURRENT_VERSION 2

// Binary File Header (Fixed 16-byte metadata preamble)
typedef struct {
    uint32_t magic;         // 4 bytes: Identifier ("CODE")
    uint16_t version;       // 2 bytes: Schema version
    uint16_t record_count;  // 2 bytes: Total payload records
    uint32_t checksum;      // 4 bytes: Integrity check
    uint32_t reserved;      // 4 bytes: Future expansion padding
} __attribute__((packed)) FileHeader;

// Payload Record
typedef struct {
    uint32_t id;
    char name[32];
    float marks;
} __attribute__((packed)) StudentRecord;

int main(void) {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - BINARY FILE PROTOCOL & HEADER LAB   \n");
    printf("========================================================\n\n");

    const char *custom_bin = "students_v2.db";

    // 1. Prepare records
    StudentRecord students[2] = {
        {101, "Swadeep Sharma", 91.5f},
        {102, "Tuhina Mukherjee", 96.0f}
    };

    // Calculate simple checksum
    uint32_t chk = 101 + 102 + (uint32_t)students[0].marks + (uint32_t)students[1].marks;

    FileHeader header = {
        .magic = FILE_MAGIC,
        .version = CURRENT_VERSION,
        .record_count = 2,
        .checksum = chk,
        .reserved = 0
    };

    printf("--- 1. WRITING STRUCTURED BINARY PROTOCOL FILE ---\n");
    FILE *fp = fopen(custom_bin, "wb");
    if (fp == NULL) {
        perror("Failed to create binary protocol file");
        return 1;
    }

    // Step A: Write 16-byte Header
    fwrite(&header, sizeof(FileHeader), 1, fp);

    // Step B: Write Student Record Chunks
    fwrite(students, sizeof(StudentRecord), 2, fp);
    fclose(fp);
    printf("  Wrote Header (%zu bytes) + Payload (%zu bytes) to '%s'.\n\n",
           sizeof(FileHeader), sizeof(students), custom_bin);

    // 2. Reading back with validation
    printf("--- 2. READING & VALIDATING BINARY HEADER ---\n");
    fp = fopen(custom_bin, "rb");
    if (fp == NULL) {
        perror("Failed to read binary protocol file");
        return 1;
    }

    FileHeader read_hdr;
    if (fread(&read_hdr, sizeof(FileHeader), 1, fp) != 1) {
        fprintf(stderr, "Failed to read header\n");
        fclose(fp);
        return 1;
    }

    // Verify Magic identifier
    if (read_hdr.magic != FILE_MAGIC) {
        fprintf(stderr, "[ERROR] Corrupted file! Magic 0x%X does not match expected 0x%X\n",
                read_hdr.magic, FILE_MAGIC);
        fclose(fp);
        return 1;
    }

    printf("  [HEADER OK] Magic: 0x%08X (\"CODE\") | Version: %u | Records: %u\n",
           read_hdr.magic, read_hdr.version, read_hdr.record_count);

    // Read payload records
    StudentRecord read_students[read_hdr.record_count];
    fread(read_students, sizeof(StudentRecord), read_hdr.record_count, fp);
    fclose(fp);

    printf("\n--- 3. DECODED PAYLOAD RECORDS ---\n");
    for (int i = 0; i < read_hdr.record_count; i++) {
        printf("  [Record %d] ID: %u | Name: %-18s | Marks: %.1f\n",
               i + 1, read_students[i].id, read_students[i].name, read_students[i].marks);
    }

    // Cleanup
    remove(custom_bin);
    printf("\n  Cleaned up custom protocol file '%s'.\n", custom_bin);
    printf("========================================================\n");

    return 0;
}
