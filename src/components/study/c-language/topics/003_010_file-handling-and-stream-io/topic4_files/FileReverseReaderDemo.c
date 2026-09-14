/**
 * FileReverseReaderDemo.c
 * Demonstrates random-access seeking from the end of a file (SEEK_END)
 * using negative byte offsets with fseek() to read characters and lines in reverse.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - REVERSE FILE SEEKING LAB           \n");
    printf("========================================================\n\n");

    const char *text_file = "reverse_sample.txt";

    // 1. Create a sample text file
    FILE *fp = fopen(text_file, "w");
    if (fp == NULL) {
        perror("Error creating file");
        return 1;
    }

    fputs("BARRACKPORE_SYSTEMS_LAB_2026", fp);
    fclose(fp);

    // 2. Open and inspect total file size using ftell and SEEK_END
    fp = fopen(text_file, "r");
    if (fp == NULL) {
        perror("Error opening file for reverse reading");
        return 1;
    }

    // Seek to the end of the file
    fseek(fp, 0, SEEK_END);
    long file_size = ftell(fp);
    printf("--- 1. FILE SIZE INSPECTION ---\n");
    printf("  Target File : '%s'\n", text_file);
    printf("  Total Size  : %ld bytes\n\n", file_size);

    // 3. Read backward character by character
    printf("--- 2. READING CHARACTERS IN REVERSE ORDER ---\n");
    printf("  Reverse Output: ");

    for (long offset = 1; offset <= file_size; offset++) {
        // Move backward from SEEK_END
        fseek(fp, -offset, SEEK_END);
        int ch = fgetc(fp);
        if (ch != EOF) {
            putchar(ch);
        }
    }
    printf("\n\n");

    // 4. Demonstrate rewind()
    printf("--- 3. RESETTING TO START WITH rewind() ---\n");
    rewind(fp);
    printf("  After rewind(), ftell() position = %ld (Byte 0)\n", ftell(fp));
    char first_ten[11] = {0};
    fread(first_ten, sizeof(char), 10, fp);
    printf("  First 10 characters: \"%s\"\n", first_ten);

    fclose(fp);

    // Cleanup
    remove(text_file);
    printf("\n  Cleaned up temporary file '%s'.\n", text_file);
    printf("========================================================\n");

    return 0;
}
