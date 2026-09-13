#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#define SAMPLE_FILE "diagnostics_sample.txt"

/* Function demonstrating why while(!feof(fp)) is a dangerous antipattern */
void demonstrateFeofBug(void) {
    printf("-----------------------------------------------------\n");
    printf("1. THE DANGEROUS 'while (!feof(fp))' TRAP\n");
    printf("-----------------------------------------------------\n");

    /* Create a small 3-line file */
    FILE *fpWrite = fopen(SAMPLE_FILE, "w");
    if (fpWrite != NULL) {
        fputs("Alpha\nBeta\nGamma\n", fpWrite);
        fclose(fpWrite);
    }

    FILE *fp = fopen(SAMPLE_FILE, "r");
    if (fp == NULL) {
        perror("Error opening file");
        return;
    }

    printf(">>> Incorrect approach (while (!feof(fp))):\n");
    char buffer[50];
    int lineCount = 0;

    /* WRONG: feof() only returns true AFTER a read has ALREADY FAILED past EOF */
    while (!feof(fp)) {
        if (fgets(buffer, sizeof(buffer), fp) != NULL) {
            /* If we don't check fgets return value, the last line is duplicated! */
            buffer[strcspn(buffer, "\r\n")] = '\0';
            printf("    Read Line [%d]: '%s'\n", ++lineCount, buffer);
        } else {
            printf("    [feof check failed to prevent loop body! fgets returned NULL at EOF]\n");
        }
    }
    fclose(fp);

    printf("\n>>> Correct idiomatic approach (while (fgets(...) != NULL)):\n");
    fp = fopen(SAMPLE_FILE, "r");
    if (fp != NULL) {
        lineCount = 0;
        while (fgets(buffer, sizeof(buffer), fp) != NULL) {
            buffer[strcspn(buffer, "\r\n")] = '\0';
            printf("    Read Line [%d]: '%s'\n", ++lineCount, buffer);
        }
        fclose(fp);
    }
}

/* Function demonstrating ferror, clearerr, and perror */
void demonstrateStreamDiagnostics(void) {
    printf("\n-----------------------------------------------------\n");
    printf("2. STREAM DIAGNOSTICS (ferror, clearerr, perror, strerror)\n");
    printf("-----------------------------------------------------\n");

    /* Attempt to open a non-existent file in read-only mode */
    const char *nonExistent = "non_existent_system_file.xyz";
    printf(">>> Step A: Attempting to open non-existent file '%s'...\n", nonExistent);
    FILE *fpBad = fopen(nonExistent, "r");
    if (fpBad == NULL) {
        printf("    fopen returned NULL.\n");
        printf("    errno code: %d\n", errno);
        printf("    strerror() output: %s\n", strerror(errno));
        printf("    perror() output:   ");
        perror("fopen failed");
    }

    /* Step B: Attempt an illegal write on a read-only stream */
    printf("\n>>> Step B: Attempting illegal write on read-only stream '%s'...\n", SAMPLE_FILE);
    FILE *fpReadOnly = fopen(SAMPLE_FILE, "r");
    if (fpReadOnly != NULL) {
        /* Intentionally write to a read-only file */
        int result = fputs("Illegal write payload", fpReadOnly);
        
        if (result == EOF && ferror(fpReadOnly)) {
            printf("    fputs returned EOF! ferror(fp) is TRUE (non-zero).\n");
            perror("    Stream Error Detected");

            /* Inspect error flag */
            printf("    ferror(fpReadOnly) before clearerr: %d\n", ferror(fpReadOnly));

            /* Clear error state */
            clearerr(fpReadOnly);
            printf("    clearerr(fpReadOnly) called.\n");
            printf("    ferror(fpReadOnly) after clearerr:  %d (Clean)\n", ferror(fpReadOnly));
        }
        fclose(fpReadOnly);
    }
}

int main(void) {
    printf("=====================================================\n");
    printf("  C Stream Diagnostics: Error Handling, feof, & ferror\n");
    printf("=====================================================\n\n");

    demonstrateFeofBug();
    demonstrateStreamDiagnostics();

    /* Clean up scratch file */
    remove(SAMPLE_FILE);

    printf("\n=== Stream Diagnostics Demonstration Completed ===\n");
    return EXIT_SUCCESS;
}
