#include <stdio.h>

int my_strlen(const char *s) {
    int len = 0;
    while (s[len] != '\0') len++;
    return len;
}

int main() {
    const char *str = "ANTIGRAVITY";
    printf("--- Custom C-String Manipulation Functions ---\n");
    printf("String Length of '%s' = %d\n", str, my_strlen(str));
    return 0;
}
