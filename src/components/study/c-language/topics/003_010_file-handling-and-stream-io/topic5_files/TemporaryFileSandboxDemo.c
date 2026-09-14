/**
 * TemporaryFileSandboxDemo.c
 * Demonstrates anonymous temporary file sandbox creation with tmpfile(),
 * error clearing with clearerr(), and system diagnostic inspection with perror().
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

int main(void) {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - TMPFILE SANDBOX & DIAGNOSTICS LAB   \n");
    printf("========================================================\n\n");

    // 1. Create an anonymous temporary binary stream (tmpfile)
    // tmpfile() creates a unique temporary file in binary update mode ("wb+")
    // that is AUTOMATICALLY deleted from disk when closed or program exits!
    printf("--- 1. CREATING ANONYMOUS SECURE TEMPORARY STREAM ---\n");
    FILE *tmp_fp = tmpfile();
    if (tmp_fp == NULL) {
        perror("Error creating temporary sandbox stream");
        return 1;
    }
    printf("  [SUCCESS] Anonymous temporary stream created in RAM/Disk sandbox.\n");

    // Write transient scratch calculation data
    for (int i = 1; i <= 5; i++) {
        fprintf(tmp_fp, "SCRATCH_INDEX_%03d: %d\n", i, i * 100);
    }

    // Rewind to inspect scratch contents
    rewind(tmp_fp);
    printf("\n--- 2. READING SCRATCH DATA FROM TEMPORARY STREAM ---\n");
    char line[64];
    while (fgets(line, sizeof(line), tmp_fp) != NULL) {
        printf("    > %s", line);
    }

    // 2. Deliberately trigger a stream error to test clearerr() and ferror()
    printf("\n--- 3. TESTING ERROR DETECTION & clearerr() ---\n");
    // Open a read-only file
    FILE *read_only_fp = fopen("ro_sample.txt", "w");
    if (read_only_fp != NULL) {
        fputs("Sample data\n", read_only_fp);
        fclose(read_only_fp);
    }

    read_only_fp = fopen("ro_sample.txt", "r"); // READ-ONLY MODE!
    if (read_only_fp != NULL) {
        // Attempting to WRITE to a read-only stream will trigger an error!
        fputs("Illegal write attempt!\n", read_only_fp);

        if (ferror(read_only_fp)) {
            printf("  [ferror DETECTED] Illegal write operation on read-only stream!\n");
            perror("  [perror Message]");

            // Clear the error flag
            clearerr(read_only_fp);
            printf("  [clearerr] Error flag reset. ferror() status = %d\n", ferror(read_only_fp));
        }
        fclose(read_only_fp);
        remove("ro_sample.txt");
    }

    // Closing the temporary file automatically purges it from the operating system
    fclose(tmp_fp);
    printf("\n  Temporary sandbox closed and automatically purged from disk.\n");
    printf("========================================================\n");

    return 0;
}
