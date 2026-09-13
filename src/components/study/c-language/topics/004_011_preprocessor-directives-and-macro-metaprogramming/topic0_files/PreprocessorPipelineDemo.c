#include <stdio.h>
#include <stdlib.h>

/* Phase 1: Object-like macro constants */
#define BUFFER_CAPACITY 1024
#define COURSE_NAME "Advanced C Systems Engineering"
#define ACADEMY "Coder & AccoTax Barrackpore"

/* Phase 2: Macro expansion vs inline values */
#define MULTIPLY_UNSAFE(a, b) a * b
#define MULTIPLY_SAFE(a, b) ((a) * (b))

int main(void) {
    printf("=====================================================\n");
    printf("  C Preprocessor Translation Pipeline (gcc -E)\n");
    printf("=====================================================\n\n");

    printf(">>> 1. String Constant Replacements:\n");
    printf("    Academy : %s\n", ACADEMY);
    printf("    Course  : %s\n", COURSE_NAME);
    printf("    Buffer  : %d bytes\n\n", BUFFER_CAPACITY);

    printf(">>> 2. Lexical Text Replacement & Precedence Trap:\n");
    int x = 3, y = 4;
    
    /* MULTIPLY_UNSAFE(x + 2, y + 1) expands literally to: 3 + 2 * 4 + 1 = 3 + 8 + 1 = 12 */
    int unsafeResult = MULTIPLY_UNSAFE(x + 2, y + 1);
    
    /* MULTIPLY_SAFE(x + 2, y + 1) expands to: ((3 + 2) * (4 + 1)) = (5 * 5) = 25 */
    int safeResult = MULTIPLY_SAFE(x + 2, y + 1);

    printf("    Expression: (3 + 2) * (4 + 1)\n");
    printf("    Unsafe Macro Result (x + 2 * y + 1) = %d [WRONG PRECEDENCE!]\n", unsafeResult);
    printf("    Safe Macro Result   (((x + 2) * (y + 1))) = %d [CORRECT!]\n\n", safeResult);

    printf(">>> 3. Inspecting Macro Expansion via CLI:\n");
    printf("    Run 'gcc -E PreprocessorPipelineDemo.c -o expanded.i' to view\n");
    printf("    the pure preprocessed output before assembler translation.\n");

    printf("\n=== Preprocessor Pipeline Demonstration Completed ===\n");
    return EXIT_SUCCESS;
}
