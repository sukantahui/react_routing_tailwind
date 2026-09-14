/**
 * CharLineStreamsDemo.c
 * Demonstrates character-level I/O (fgetc, fputc) and
 * bounded safe line-level I/O (fgets, fputs) in C.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - CHARACTER & LINE STREAM I/O LAB    \n");
    printf("========================================================\n\n");

    const char *src_file = "source_text.txt";
    const char *upper_file = "uppercase_copy.txt";

    // 1. Create a sample text file using fputs
    printf("--- 1. CREATING SOURCE FILE USING fputs() ---\n");
    FILE *fp_out = fopen(src_file, "w");
    if (fp_out == NULL) {
        perror("Error creating source file");
        return 1;
    }

    fputs("Hello Coder & AccoTax Students!\n", fp_out);
    fputs("Learning C Programming in Barrackpore.\n", fp_out);
    fputs("Mastering systems programming and stream I/O.\n", fp_out);
    fclose(fp_out);
    printf("  Wrote 3 lines to '%s'.\n\n", src_file);

    // 2. Character-by-character transformation using fgetc() and fputc()
    printf("--- 2. CHARACTER-BY-CHARACTER COPY & UPPERCASE CONVERSION ---\n");
    FILE *fp_in = fopen(src_file, "r");
    fp_out = fopen(upper_file, "w");

    if (fp_in == NULL || fp_out == NULL) {
        perror("Error opening files for character stream");
        return 1;
    }

    // IMPORTANT: ch MUST be int, NOT char, because EOF is -1!
    int ch;
    int char_count = 0;
    while ((ch = fgetc(fp_in)) != EOF) {
        fputc(toupper(ch), fp_out);
        char_count++;
    }

    fclose(fp_in);
    fclose(fp_out);
    printf("  Converted and copied %d characters to '%s'.\n\n", char_count, upper_file);

    // 3. Line-by-line reading with fgets()
    printf("--- 3. READING LINES SAFELY WITH fgets() ---\n");
    fp_in = fopen(upper_file, "r");
    if (fp_in != NULL) {
        char line_buffer[128];
        int line_num = 1;
        while (fgets(line_buffer, sizeof(line_buffer), fp_in) != NULL) {
            printf("  [Line %d] %s", line_num++, line_buffer);
        }
        fclose(fp_in);
    }

    // Clean up temporary files
    remove(src_file);
    remove(upper_file);
    printf("\n  Cleaned up temporary demonstration files.\n");
    printf("========================================================\n");

    return 0;
}
