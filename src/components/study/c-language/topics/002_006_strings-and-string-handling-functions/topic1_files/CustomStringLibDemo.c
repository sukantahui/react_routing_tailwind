#include <stdio.h>

/**
 * CustomStringLibDemo.c
 * Custom string length & reversal without <string.h>
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

size_t customStrlen(const char *str) {
    size_t len = 0;
    while (str[len] != '\0') len++;
    return len;
}

void customReverse(char *str) {
    size_t i = 0, j = customStrlen(str);
    if (j == 0) return;
    j--;
    while (i < j) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
        i++;
        j--;
    }
}

int main(void) {
    char word[] = "Barrackpore";

    printf("=== Custom String Manipulation Engine ===\n\n");
    printf("Original Word : %s\n", word);
    printf("Custom Length : %zu\n", customStrlen(word));

    customReverse(word);
    printf("Reversed Word : %s\n", word);

    return 0;
}
