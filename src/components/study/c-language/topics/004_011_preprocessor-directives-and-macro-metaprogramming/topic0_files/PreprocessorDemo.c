#include <stdio.h>

/**
 * PreprocessorDemo.c
 * Macros, Stringizing (#), and Token Concatenation (##)
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#define SQUARE(x) ((x) * (x))
#define STRINGIFY(x) #x
#define CONCAT(a, b) a##b

#ifndef DEBUG_LEVEL
#define DEBUG_LEVEL 1
#endif

int main(void) {
    int var10 = 500;

    printf("=== C Preprocessor Directives & Metaprogramming ===\n\n");
    printf("SQUARE(5 + 1) : %d\n", SQUARE(5 + 1));
    printf("STRINGIFY(Hello): %s\n", STRINGIFY(Hello Barrackpore));
    printf("CONCAT(var, 10): %d\n", CONCAT(var, 10));

#if DEBUG_LEVEL > 0
    printf("Debug Build Active (Level %d) - File: %s, Line: %d\n", DEBUG_LEVEL, __FILE__, __LINE__);
#endif

    return 0;
}
