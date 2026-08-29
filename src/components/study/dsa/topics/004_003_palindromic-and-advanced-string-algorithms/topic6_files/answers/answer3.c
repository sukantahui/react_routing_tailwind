#include <stdio.h>
#include <string.h>

void format_manacher_string(const char *s, char formatted[]) {
    int idx = 0;
    formatted[idx++] = '^';
    for (int i = 0; s[i] != '\0'; i++) {
        formatted[idx++] = '#';
        formatted[idx++] = s[i];
    }
    formatted[idx++] = '#';
    formatted[idx++] = '$';
    formatted[idx] = '\0';
}

int main() {
    const char *s = "aba";
    char formatted[100];
    format_manacher_string(s, formatted);
    printf("--- Manacher's String Formatting ---\nOriginal : '%s'\nFormatted: '%s'\n", s, formatted);
    return 0;
}
