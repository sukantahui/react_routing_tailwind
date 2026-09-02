#include <stdio.h>
#include <string.h>

/**
 * SafeStringIODemo.c
 * Demonstrates safe string input using fgets(), trimming newline '\n',
 * the dangerous pitfalls of gets() (CWE-120) and scanf("%s"), and puts() output.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// Helper to remove trailing newline added by fgets()
void trimTrailingNewline(char *str) {
    size_t len = strlen(str);
    if (len > 0 && str[len - 1] == '\n') {
        str[len - 1] = '\0';
    }
}

int main(void) {
    char fullName[50];
    char city[30];

    printf("====================================================\n");
    printf(" Safe String Input/Output (fgets vs gets & scanf)\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    // Simulating safe bounded input via fgets
    // In interactive mode: fgets(fullName, sizeof(fullName), stdin);
    // For demonstration, let's copy a test input string with simulated newline:
    char simulatedInput[] = "Swadeep Mukherjee\n";
    strncpy(fullName, simulatedInput, sizeof(fullName) - 1);
    fullName[sizeof(fullName) - 1] = '\0';

    printf("1. Raw input captured by fgets(): \"%s\"\n", fullName);
    printf("   Notice trailing '\\n' at end of string.\n\n");

    // Trimming trailing newline
    trimTrailingNewline(fullName);
    printf("2. Sanitized string after trimTrailingNewline(): \"%s\"\n\n", fullName);

    // Bounded scanf demonstration (%29s limits input to 29 chars + '\0')
    char singleWordInput[] = "Barrackpore";
    sscanf(singleWordInput, "%29s", city);
    printf("3. Bounded Single Word parsing: \"%s\"\n\n", city);

    printf("4. Output using puts():\n");
    puts("   ✓ puts() automatically appends a newline character!");
    puts(fullName);

    return 0;
}
