/**
 * CsvToBinaryConverterDemo.c
 * Industrial Data Migration Engine: Ingests unstructured, human-readable
 * CSV log feeds and converts them into high-performance packed binary databases.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int id;
    char name[32];
    char city[24];
    float marks;
    int is_active;
} CompactStudent;

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - CSV TO BINARY MIGRATION ENGINE     \n");
    printf("========================================================\n\n");

    const char *csv_path = "raw_students.csv";
    const char *bin_path = "compact_students.bin";

    // 1. Create a sample CSV file with headers
    FILE *csv_fp = fopen(csv_path, "w");
    if (csv_fp == NULL) return 1;

    fprintf(csv_fp, "id,name,city,marks\n");
    fprintf(csv_fp, "201,Swadeep Sharma,Barrackpore,88.5\n");
    fprintf(csv_fp, "202,Tuhina Mukherjee,Shyamnagar,95.0\n");
    fprintf(csv_fp, "203,Debangshu Roy,Naihati,79.5\n");
    fprintf(csv_fp, "204,Abhronila Das,Ichapur,92.0\n");
    fclose(csv_fp);
    printf("  Created source raw CSV file '%s'.\n", csv_path);

    // 2. Ingest CSV, parse lines safely with fgets and sscanf, and write packed binary
    printf("\n--- 1. PARSING CSV & WRITING PACKED BINARY CHUNKS ---\n");
    csv_fp = fopen(csv_path, "r");
    FILE *bin_fp = fopen(bin_path, "wb");

    if (csv_fp == NULL || bin_fp == NULL) {
        perror("Error opening files for migration");
        return 1;
    }

    char line_buf[256];
    int converted_count = 0;

    // Skip CSV header line
    fgets(line_buf, sizeof(line_buf), csv_fp);

    while (fgets(line_buf, sizeof(line_buf), csv_fp) != NULL) {
        CompactStudent s;
        memset(&s, 0, sizeof(s));
        s.is_active = 1;

        // Parse comma-separated fields safely
        // Format: %d,%31[^,],%23[^,],%f
        if (sscanf(line_buf, "%d,%31[^,],%23[^,],%f",
                   &s.id, s.name, s.city, &s.marks) == 4) {
            // Write binary record to disk
            fwrite(&s, sizeof(CompactStudent), 1, bin_fp);
            converted_count++;
            printf("  [MIGRATED] ID: %d | Name: %-16s | City: %-12s | Marks: %.1f\n",
                   s.id, s.name, s.city, s.marks);
        }
    }

    fclose(csv_fp);
    fclose(bin_fp);
    printf("  Successfully migrated %d records to binary file '%s'.\n\n", converted_count, bin_path);

    // 3. Verify binary file reading
    printf("--- 2. VERIFYING BINARY PERSISTENCE STORAGE ---\n");
    bin_fp = fopen(bin_path, "rb");
    if (bin_fp != NULL) {
        CompactStudent read_s;
        int i = 1;
        while (fread(&read_s, sizeof(CompactStudent), 1, bin_fp) == 1) {
            printf("  Binary Record %d: ID=%d, Name=%s, Marks=%.1f\n",
                   i++, read_s.id, read_s.name, read_s.marks);
        }
        fclose(bin_fp);
    }

    // Cleanup
    remove(csv_path);
    remove(bin_path);
    printf("\n  Cleaned up temporary migration files.\n");
    printf("========================================================\n");

    return 0;
}
