#include <stdio.h>
#include <string.h>

void compress_rle(const char *src, char dest[]) {
    int len = strlen(src);
    int idx = 0;
    for (int i = 0; i < len; i++) {
        int count = 1;
        while (i + 1 < len && src[i] == src[i + 1]) { count++; i++; }
        idx += sprintf(dest + idx, "%c%d", src[i], count);
    }
}

int main() {
    const char *src = "aabcccccaaa";
    char dest[100];
    compress_rle(src, dest);
    printf("--- Run-Length Encoding (RLE) Compression ---\nOriginal  : '%s'\nCompressed: '%s'\n", src, dest);
    return 0;
}
