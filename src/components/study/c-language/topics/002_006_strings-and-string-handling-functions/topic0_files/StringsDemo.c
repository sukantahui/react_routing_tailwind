#include <stdio.h>
#include <string.h>

/**
 * StringsDemo.c
 * Null-terminated strings & <string.h> functions
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    char greeting[50] = "Coder & AccoTax";
    char location[] = "Barrackpore";
    char buffer[100];

    printf("=== Strings & Null-Terminators ('\\0') ===\n\n");

    printf("String 1: %s (Length: %zu)\n", greeting, strlen(greeting));
    printf("String 2: %s (Length: %zu)\n", location, strlen(location));

    // String Concatenation & Copying
    strcpy(buffer, greeting);
    strcat(buffer, " - ");
    strcat(buffer, location);

    printf("Combined Buffer: %s\n", buffer);
    printf("Total Buffer Length: %zu\n", strlen(buffer));

    return 0;
}
