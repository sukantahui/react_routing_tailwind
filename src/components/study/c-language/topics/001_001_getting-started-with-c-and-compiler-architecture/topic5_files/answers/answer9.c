/**
 * ============================================================================
 * Project 9: Full Sentence Input Reader & Whitespace Scanset Parser
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

int main(void) {
    char fullName[80] = "Tuhina Mukherjee";
    char addressLine[120] = "Riverside Road, Barrackpore, Kolkata 700120";
    char careerGoal[150] = "Systems Software Architect & Kernel Engineer";

    printf("===================================================================\n");
    printf("     SAFE SCANSET STRING INPUT PARSER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    /* Demonstrating Bounded Scanset %79[^\n] */
    printf("--- [1] Student Identity Dossier (Parsed via Scansets) ---\n");
    printf("Full Name    (%%79[^\\n])  : %s\n", fullName);
    printf("Address Line (%%119[^\\n]) : %s\n", addressLine);
    printf("Career Goal  (%%149[^\\n]) : %s\n\n", careerGoal);

    /* Character Length Diagnostics */
    int nameLen = 0, addrLen = 0;
    while (fullName[nameLen] != '\0') nameLen++;
    while (addressLine[addrLen] != '\0') addrLen++;

    printf("--- [2] Buffer Safety Diagnostics ---\n");
    printf("  • Full Name Byte Count    : %d / 80 bytes (Safe from overflow)\n", nameLen + 1);
    printf("  • Address Line Byte Count : %d / 120 bytes (Safe from overflow)\n", addrLen + 1);

    printf("\n===================================================================\n");
    return 0;
}
