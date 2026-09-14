/**
 * RawByteArrayDemo.c
 * Demonstrates direct memory block serialization of numeric arrays
 * and floating-point matrices using fread() and fwrite().
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>

#define MATRIX_ROWS 3
#define MATRIX_COLS 3

int main(void) {
    printf("========================================================\n");
    printf("    CODER & ACCOTAX - RAW BINARY ARRAY SERIALIZATION    \n");
    printf("========================================================\n\n");

    const char *bin_file = "matrix_data.bin";

    // 1. Initial 3x3 floating point transformation matrix
    double source_matrix[MATRIX_ROWS][MATRIX_COLS] = {
        {1.0, 0.0, 0.0},
        {0.0, 1.0, 0.0},
        {0.5, 0.5, 1.0}
    };

    printf("--- 1. WRITING RAW 3x3 DOUBLE MATRIX TO DISK ---\n");
    FILE *fp = fopen(bin_file, "wb"); // Notice "wb" mode for binary!
    if (fp == NULL) {
        perror("Error creating binary matrix file");
        return 1;
    }

    // Write all 9 doubles (72 bytes) in one instant CPU-to-disk operation
    size_t written = fwrite(source_matrix, sizeof(double), MATRIX_ROWS * MATRIX_COLS, fp);
    fclose(fp);
    printf("  Successfully wrote %zu double elements (%zu bytes) to '%s'.\n\n",
           written, written * sizeof(double), bin_file);

    // 2. Read back into a completely uninitialized destination buffer
    printf("--- 2. READING RAW BINARY MATRIX BACK INTO MEMORY ---\n");
    double dest_matrix[MATRIX_ROWS][MATRIX_COLS];

    fp = fopen(bin_file, "rb"); // Notice "rb" mode for reading binary!
    if (fp == NULL) {
        perror("Error opening binary matrix file");
        return 1;
    }

    size_t read_count = fread(dest_matrix, sizeof(double), MATRIX_ROWS * MATRIX_COLS, fp);
    fclose(fp);
    printf("  Successfully read %zu double elements.\n\n", read_count);

    // 3. Display matrix values to prove fidelity
    printf("--- 3. RECONSTRUCTED MATRIX IN RAM ---\n");
    for (int r = 0; r < MATRIX_ROWS; r++) {
        printf("    [ ");
        for (int c = 0; c < MATRIX_COLS; c++) {
            printf("%6.2f ", dest_matrix[r][c]);
        }
        printf("]\n");
    }

    // Cleanup
    remove(bin_file);
    printf("\n  Cleaned up binary matrix file '%s'.\n", bin_file);
    printf("========================================================\n");

    return 0;
}
