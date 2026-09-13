/**
 * TextFileOperationsDemo.c
 * Demonstrates Text Stream Operations:
 * 1. Character I/O (fputc, fgetc)
 * 2. Line I/O (fputs, fgets)
 * 3. Formatted I/O (fprintf, fscanf)
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    const char *text_file = "text_records.txt";

    printf("========================================================\n");
    printf("   CODER & ACCOTAX - TEXT STREAM I/O OPERATIONS LAB     \n");
    printf("========================================================\n\n");

    // 1. Formatted Writing with fprintf()
    printf("--- 1. WRITING STRUCTURED TEXT (fprintf) ---\n");
    FILE *fp = fopen(text_file, "w");
    if (fp == NULL) {
        perror("Failed to create text_records.txt");
        return 1;
    }

    // Write formatted records: ID Name Score
    fprintf(fp, "%d %s %.2f\n", 101, "Swadeep", 94.5);
    fprintf(fp, "%d %s %.2f\n", 102, "Tuhina", 98.0);
    fprintf(fp, "%d %s %.2f\n", 103, "Abhronila", 96.5);
    
    // Write line with fputs() and characters with fputc()
    fputs("--- End of Student Marks ---\n", fp);
    fputc('#', fp);
    fputc('\n', fp);

    fclose(fp);
    fp = NULL;
    printf("  Formatted text successfully written to '%s'.\n\n", text_file);

    // 2. Line-by-Line Reading with fgets()
    printf("--- 2. SAFE LINE-BY-LINE READING (fgets) ---\n");
    fp = fopen(text_file, "r");
    if (fp == NULL) {
        perror("Failed to open text_records.txt for read");
        return 1;
    }

    char line_buffer[256];
    int line_num = 1;
    while (fgets(line_buffer, sizeof(line_buffer), fp) != NULL) {
        printf("  [Line %d]: %s", line_num++, line_buffer);
    }
    rewind(fp); // Reset file pointer to beginning for formatted read

    // 3. Formatted Parsing with fscanf()
    printf("\n--- 3. PARSING STRUCTURED DATA (fscanf) ---\n");
    int id;
    char name[50];
    float score;

    while (fscanf(fp, "%d %49s %f", &id, name, &score) == 3) {
        printf("  Parsed Record -> ID: %d | Name: %-10s | Score: %.2f\n", id, name, score);
    }

    fclose(fp);
    fp = NULL;

    // Clean up
    remove(text_file);
    printf("\n  Text file operations completed successfully.\n");
    printf("========================================================\n");

    return 0;
}
