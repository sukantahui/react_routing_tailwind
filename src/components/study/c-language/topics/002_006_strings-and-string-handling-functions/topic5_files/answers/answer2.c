#include <stdio.h>

/**
 * Project 2: Custom String Library Suite
 * Re-implements custom_strlen, custom_strcpy, custom_strcat, and custom_strcmp.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

size_t custom_strlen(const char *s) {
    size_t len = 0;
    while (*s++) len++;
    return len;
}

char *custom_strcpy(char *dest, const char *src) {
    char *orig = dest;
    while ((*dest++ = *src++));
    return orig;
}

char *custom_strcat(char *dest, const char *src) {
    char *orig = dest;
    while (*dest) dest++;
    while ((*dest++ = *src++));
    return orig;
}

int custom_strcmp(const char *s1, const char *s2) {
    while (*s1 && (*s1 == *s2)) {
        s1++;
        s2++;
    }
    return *(unsigned char*)s1 - *(unsigned char*)s2;
}

int main(void) {
    char buffer[100];

    custom_strcpy(buffer, "Coder & AccoTax, ");
    custom_strcat(buffer, "Barrackpore");

    printf("Result Buffer: \"%s\"\n", buffer);
    printf("Length       : %zu\n", custom_strlen(buffer));
    printf("Comparison   : %d\n", custom_strcmp("Barrackpore", "Shyamnagar"));

    return 0;
}
