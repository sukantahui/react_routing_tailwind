#include <stdio.h>

/**
 * Project 5: Run-Length String Compression Engine
 * Compresses repeating character sequences (e.g. "aaabbbcccaa" -> "a3b3c3a2").
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void compressString(const char *src, char *dest) {
    int i = 0, k = 0;
    while (src[i] != '\0') {
        char currentChar = src[i];
        int count = 0;

        while (src[i] == currentChar) {
            count++;
            i++;
        }

        k += sprintf(&dest[k], "%c%d", currentChar, count);
    }
    dest[k] = '\0';
}

int main(void) {
    char input[] = "wwwwaaadexxxxxxywww";
    char compressed[100];

    compressString(input, compressed);

    printf("Original Input : \"%s\"\n", input);
    printf("RLE Compressed : \"%s\"\n", compressed);

    return 0;
}
