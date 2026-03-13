// error_mixed.c – Error handling mixed with main logic (hard to read)
#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    FILE *src = fopen("source.txt", "r");
    if (src == NULL) {
        fprintf(stderr, "Error opening source: %s\n", strerror(errno));
        return 1;
    }

    FILE *dst = fopen("dest.txt", "w");
    if (dst == NULL) {
        fprintf(stderr, "Error opening dest: %s\n", strerror(errno));
        fclose(src);
        return 1;
    }

    char buffer[1024];
    size_t bytes;
    while ((bytes = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        if (fwrite(buffer, 1, bytes, dst) != bytes) {
            fprintf(stderr, "Error writing to dest\n");
            fclose(src);
            fclose(dst);
            return 1;
        }
    }

    if (ferror(src)) {
        fprintf(stderr, "Error reading from source\n");
        fclose(src);
        fclose(dst);
        return 1;
    }

    printf("File copied successfully.\n");
    fclose(src);
    fclose(dst);
    return 0;
}