#include <stdio.h>
#include <stdbool.h>
#include <stdint.h>

/**
 * VersionEvolutionDemo.c
 * Demonstrates C syntax evolution across standards:
 * - K&R C (1978) vs ANSI C89 vs ISO C99 vs Modern C11/C17/C23
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

// C99: Fixed-width integer type definition from <stdint.h>
typedef uint32_t Year;

int main(void) {
    // C99 feature: Variable declaration anywhere in code (not just top of block)
    Year startYear = 1972;

    printf("====================================================\n");
    printf(" Evolution of C Standards: From K&R to C23\n");
    printf(" Educator: Sukanta Hui | Coder & AccoTax\n");
    printf("====================================================\n\n");

    printf("1. 1972 - Birth of C at Bell Labs by Dennis Ritchie\n");
    printf("   Initial release on PDP-11 for Unix kernel development.\n\n");

    printf("2. 1978 - K&R C (Kernighan & Ritchie)\n");
    printf("   First informal specification published.\n\n");

    printf("3. 1989/1990 - ANSI C89 / ISO C90 (C89)\n");
    printf("   Function prototypes introduced, void* pointer type added.\n\n");

    // C99 feature: bool type from <stdbool.h> and // single-line comments
    bool isModernC = true;

    printf("4. 1999 - ISO C99 (C99)\n");
    printf("   Single-line comments (//), <stdint.h>, <stdbool.h> added.\n");
    printf("   Is modern C enabled? %s\n\n", isModernC ? "YES (C99+ Standard Active)" : "NO");

    printf("5. 2011 - ISO C11 (C11)\n");
    printf("   Multi-threading support (<threads.h>), _Static_assert introduced.\n\n");

    printf("6. 2023 - ISO C23 (C23)\n");
    printf("   Binary literals (0b), typeof operator, constexpr introduced.\n");

    return 0;
}
