/**
 * ============================================================================
 * Project 10: Multi-Stage Compilation Simulation & Build Metadata Inspector
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

#define LAB_VERSION "2.4.0-PROD"
#define COMPILER_PIPELINE "Preprocessing -> Compilation -> Assembly -> Linking"

int main(void) {
    printf("===================================================================\n");
    printf("     C COMPILER PIPELINE & BUILD METADATA INSPECTOR\n");
    printf("     Coder & AccoTax Systems Laboratory | Barrackpore\n");
    printf("===================================================================\n\n");

    printf("--- [1] Predefined Preprocessor Macros ---\n");
    printf("  • Source File Name (__FILE__)    : %s\n", __FILE__);
    printf("  • Compilation Date (__DATE__)    : %s\n", __DATE__);
    printf("  • Compilation Time (__TIME__)    : %s\n", __TIME__);
    printf("  • Active Code Line (__LINE__)    : %d\n", __LINE__);

    #ifdef __STDC__
    printf("  • ANSI C Conformance (__STDC__)  : YES (Standard Conforming C)\n");
    #endif

    #ifdef __STDC_VERSION__
    printf("  • C Standard Version             : %ldL (e.g. 199901L = C99, 201112L = C11)\n", __STDC_VERSION__);
    #endif

    printf("\n--- [2] Build Environment Config ---\n");
    printf("  • Lab Software Release Version   : %s\n", LAB_VERSION);
    printf("  • GCC Toolchain Pipeline Stages  : %s\n", COMPILER_PIPELINE);

    printf("\n--- [3] Hardware Data Model Word Size ---\n");
    printf("  • Size of char                   : %zu Byte(s)\n", sizeof(char));
    printf("  • Size of short int              : %zu Byte(s)\n", sizeof(short));
    printf("  • Size of standard int           : %zu Byte(s)\n", sizeof(int));
    printf("  • Size of long long int          : %zu Byte(s)\n", sizeof(long long));
    printf("  • Size of pointer address (void*): %zu Byte(s) (%zu-bit Architecture)\n",
           sizeof(void*), sizeof(void*) * 8);

    printf("\n===================================================================\n");
    return 0;
}
