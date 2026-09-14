/**
 * FileUpdateModesDemo.c
 * Demonstrates C file update modes ("r+", "w+", "a+"),
 * showing how to read and modify data within the same stream.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    printf("========================================================\n");
    printf("    CODER & ACCOTAX - FILE UPDATE MODES LAB (\"+\")       \n");
    printf("========================================================\n\n");

    const char *data_file = "update_modes_demo.dat";

    // 1. Initial creation with "w+" (Write + Read, truncates existing)
    printf("--- 1. CREATING INITIAL FILE WITH \"w+\" MODE ---\n");
    FILE *fp = fopen(data_file, "w+");
    if (fp == NULL) {
        perror("Failed to create file");
        return 1;
    }

    // Write initial header and records
    fprintf(fp, "RECORD001:Swadeep:85\n");
    fprintf(fp, "RECORD002:Tuhina:92\n");
    fprintf(fp, "RECORD003:Debangshu:78\n");
    printf("  Created file and wrote 3 initial student records.\n");

    // Rewind stream pointer back to beginning for reading
    rewind(fp);
    printf("\n--- 2. READING BACK WITH SAME STREAM HANDLE ---\n");
    char line[128];
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("    > %s", line);
    }
    fclose(fp);

    // 2. Open in "r+" mode to modify existing record in place
    printf("\n--- 3. MODIFYING RECORD IN PLACE WITH \"r+\" MODE ---\n");
    fp = fopen(data_file, "r+");
    if (fp == NULL) {
        perror("Failed to open in r+ mode");
        return 1;
    }

    // Seek directly to record 2 (Tuhina's marks update from 92 to 99)
    // RECORD001:Swadeep:85\n is 20 bytes
    fseek(fp, 20, SEEK_SET);
    fprintf(fp, "RECORD002:Tuhina:99\n"); // Overwrite line in place!
    printf("  Updated RECORD002 in-place without touching other records.\n");

    fclose(fp);

    // 3. Open in "a+" mode to append new records while still being able to read
    printf("\n--- 4. APPENDING WITH \"a+\" MODE ---\n");
    fp = fopen(data_file, "a+");
    if (fp == NULL) {
        perror("Failed to open in a+ mode");
        return 1;
    }

    fprintf(fp, "RECORD004:Abhronila:95\n");
    printf("  Appended RECORD004 to end of file.\n");

    // In a+ mode, writes always jump to the end, but reads can rewind to start!
    rewind(fp);
    printf("\n--- 5. FINAL FILE SNAPSHOT ---\n");
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("    > %s", line);
    }
    fclose(fp);

    // Clean up demo file
    remove(data_file);
    printf("\n  Cleaned up temporary file '%s'.\n", data_file);
    printf("========================================================\n");

    return 0;
}
