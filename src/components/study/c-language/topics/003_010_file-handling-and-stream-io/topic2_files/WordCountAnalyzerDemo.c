/**
 * WordCountAnalyzerDemo.c
 * Industrial CLI Text Analyzer: Counts total lines, words, characters,
 * and alphanumeric frequency from a text file stream.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

typedef struct {
    long lines;
    long words;
    long characters;
    long digits;
    long alphabets;
} FileStats;

void analyze_text_stream(FILE *fp, FileStats *stats) {
    int ch;
    bool in_word = false;

    while ((ch = fgetc(fp)) != EOF) {
        stats->characters++;

        if (ch == '\n') {
            stats->lines++;
        }

        if (isdigit(ch)) {
            stats->digits++;
        } else if (isalpha(ch)) {
            stats->alphabets++;
        }

        if (isspace(ch)) {
            in_word = false;
        } else {
            if (!in_word) {
                in_word = true;
                stats->words++;
            }
        }
    }
}

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - CLI TEXT FILE ANALYZER LAB         \n");
    printf("========================================================\n\n");

    const char *doc_file = "sample_document.txt";

    // 1. Create a multi-line test document
    FILE *fp = fopen(doc_file, "w");
    if (fp == NULL) {
        perror("Error creating sample document");
        return 1;
    }

    fprintf(fp, "Coder and AccoTax institute is located in Barrackpore 700120.\n");
    fprintf(fp, "Sukanta Hui teaches C systems programming and memory management.\n");
    fprintf(fp, "Swadeep, Tuhina, and Debangshu scored 100 in the lab evaluation.\n");
    fprintf(fp, "File stream I/O enables persistent database operations.\n");
    fclose(fp);

    // 2. Perform stream analysis
    fp = fopen(doc_file, "r");
    if (fp == NULL) {
        perror("Error opening document for analysis");
        return 1;
    }

    FileStats stats = {0, 0, 0, 0, 0};
    analyze_text_stream(fp, &stats);
    fclose(fp);

    // 3. Display summary metrics
    printf("--- FILE ANALYSIS REPORT: '%s' ---\n", doc_file);
    printf("  Total Lines       : %ld\n", stats.lines);
    printf("  Total Words       : %ld\n", stats.words);
    printf("  Total Characters  : %ld bytes\n", stats.characters);
    printf("  Alphabet Letters  : %ld\n", stats.alphabets);
    printf("  Numeric Digits    : %ld\n", stats.digits);
    printf("--------------------------------------------------------\n");

    // Cleanup
    remove(doc_file);
    printf("  Cleaned up temporary document '%s'.\n", doc_file);
    printf("========================================================\n");

    return 0;
}
