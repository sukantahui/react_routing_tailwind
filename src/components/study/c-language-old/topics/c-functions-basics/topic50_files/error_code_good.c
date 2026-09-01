// error_code_good.c – Checking and handling error codes
#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        // Error: print a helpful message
        fprintf(stderr, "Error opening file: %s\n", strerror(errno));
        return 1;  // Exit with error code
    }

    char buffer[100];
    if (fgets(buffer, 100, fp) == NULL) {
        fprintf(stderr, "Error reading file: %s\n", strerror(errno));
        fclose(fp);
        return 1;
    }

    printf("First line: %s\n", buffer);
    fclose(fp);
    return 0;
}