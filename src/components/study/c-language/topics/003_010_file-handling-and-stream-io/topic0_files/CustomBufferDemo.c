/**
 * CustomBufferDemo.c
 * Demonstrates stream buffer reconfiguration using setvbuf(),
 * comparing Full Buffering (_IOFBF), Line Buffering (_IOLBF),
 * and Unbuffered (_IONBF) modes with custom user memory blocks.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CUSTOM_BUF_SIZE 512

int main(void) {
    printf("========================================================\n");
    printf("     CODER & ACCOTAX - CUSTOM BUFFER TUNING LAB         \n");
    printf("========================================================\n\n");

    const char *log_filename = "custom_buffer_test.log";
    char user_buffer[CUSTOM_BUF_SIZE];

    // Open file stream for writing
    FILE *fp = fopen(log_filename, "w");
    if (fp == NULL) {
        perror("Error opening log file");
        return 1;
    }

    printf("--- 1. ASSIGNING CUSTOM USER BUFFER (_IOFBF) ---\n");
    // Attach our own 512-byte buffer with Full Buffering
    if (setvbuf(fp, user_buffer, _IOFBF, sizeof(user_buffer)) == 0) {
        printf("  [SUCCESS] Attached custom %d-byte buffer to stream.\n", CUSTOM_BUF_SIZE);
    } else {
        printf("  [FAILED] Could not set custom buffer.\n");
    }

    // Write some lines. Because it's _IOFBF, data stays in user_buffer until 512 bytes are filled or flushed!
    fprintf(fp, "[INFO] Server started at Barrackpore Lab.\n");
    fprintf(fp, "[INFO] Student Swadeep connected.\n");
    fprintf(fp, "[INFO] Student Tuhina connected.\n");
    printf("  Wrote 3 log records (currently residing inside RAM buffer).\n");

    // Manually force the buffer to commit to disk
    fflush(fp);
    printf("  [fflush] Flushed RAM buffer contents directly to disk.\n\n");

    // Reconfigure to Unbuffered (_IONBF)
    printf("--- 2. SWITCHING TO UNBUFFERED MODE (_IONBF) ---\n");
    setvbuf(fp, NULL, _IONBF, 0);
    fprintf(fp, "[CRITICAL] Immediate emergency alert: Disk threshold reached!\n");
    printf("  [UNBUFFERED] Message written immediately to physical file without caching.\n\n");

    fclose(fp);
    fp = NULL;

    // Read back and display file contents
    printf("--- 3. VERIFYING COMMITTED LOG FILE CONTENTS ---\n");
    fp = fopen(log_filename, "r");
    if (fp != NULL) {
        char line[128];
        while (fgets(line, sizeof(line), fp) != NULL) {
            printf("    > %s", line);
        }
        fclose(fp);
    }

    // Clean up temporary log
    remove(log_filename);
    printf("\n  Cleaned up temporary log file '%s'.\n", log_filename);
    printf("========================================================\n");

    return 0;
}
