/**
 * ============================================================================
 * Project 6: ASCII Character Inspector & Multi-Base Memory Visualizer
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void inspectChar(char ch) {
    int asciiCode = (unsigned char)ch;
    char uppercase = (ch >= 'a' && ch <= 'z') ? (ch - 32) : ch;
    char lowercase = (ch >= 'A' && ch <= 'Z') ? (ch + 32) : ch;

    printf("Character: '%c'\n", ch);
    printf("  • ASCII Decimal (%-5s) : %d\n", "%d", asciiCode);
    printf("  • Hexadecimal   (%-5s) : %#04X\n", "%#X", asciiCode);
    printf("  • Octal Base-8  (%-5s) : %#04o\n", "%#o", asciiCode);
    printf("  • Binary Equivalent    : ");
    for (int b = 7; b >= 0; b--) {
        printf("%d", (asciiCode >> b) & 1);
        if (b == 4) printf(" ");
    }
    printf("\n");
    printf("  • Case Shift Mapping   : Upper -> '%c', Lower -> '%c'\n\n", uppercase, lowercase);
}

int main(void) {
    printf("===================================================================\n");
    printf("     ASCII CHARACTER & BASE INSPECTOR - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    inspectChar('A');
    inspectChar('z');
    inspectChar('9');
    inspectChar('#');

    printf("===================================================================\n");
    return 0;
}
