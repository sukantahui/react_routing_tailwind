// error_isolated.c – Error handling isolated in helper functions
#include <stdio.h>
#include <errno.h>
#include <string.h>

// Helper: open file with error reporting
FILE* openFile(const char *filename, const char *mode) {
    FILE *fp = fopen(filename, mode);
    if (fp == NULL) {
        fprintf(stderr, "Error opening %s: %s\n", filename, strerror(errno));
    }
    return fp;
}

// Helper: copy data with error handling
int copyData(FILE *src, FILE *dst) {
    char buffer[1024];
    size_t bytes;
    while ((bytes = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        if (fwrite(buffer, 1, bytes, dst) != bytes) {
            fprintf(stderr, "Error writing to destination\n");
            return 0; // failure
        }
    }
    if (ferror(src)) {
        fprintf(stderr, "Error reading from source\n");
        return 0;
    }
    return 1; // success
}

int main() {
    FILE *src = openFile("source.txt", "r");
    if (src == NULL) return 1;

    FILE *dst = openFile("dest.txt", "w");
    if (dst == NULL) {
        fclose(src);
        return 1;
    }

    int success = copyData(src, dst);

    fclose(src);
    fclose(dst);

    if (success) {
        printf("File copied successfully.\n");
        return 0;
    } else {
        return 1;
    }
}