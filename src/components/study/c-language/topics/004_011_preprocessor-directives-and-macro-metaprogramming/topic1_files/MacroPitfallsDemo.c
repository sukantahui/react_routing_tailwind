#include <stdio.h>
#include <stdlib.h>

/* Pitfall 1: Multiple Evaluation of Arguments with Side Effects */
#define SQUARE(x) ((x) * (x))

/* Safe alternative using inline function (C99) */
static inline int square_inline(int x) {
    return x * x;
}

/* Pitfall 2: Multi-statement Macro without do-while wrapper */
#define SWAP_BAD(a, b, type) \
    type temp = (a); \
    (a) = (b); \
    (b) = temp;

/* Correct Idiom: Wrapping multi-statement macros in do { ... } while(0) */
#define SWAP_SAFE(a, b, type) \
    do { \
        type temp_ = (a); \
        (a) = (b); \
        (b) = temp_; \
    } while (0)

int main(void) {
    printf("=====================================================\n");
    printf("  Macro Pitfalls: Side Effects & do-while(0) Idioms\n");
    printf("=====================================================\n\n");

    /* 1. Multiple Evaluation Hazard */
    printf(">>> 1. Side Effect Trap with SQUARE(a++):\n");
    int a = 5;
    printf("    Initial a = %d\n", a);
    
    /* SQUARE(a++) expands to ((a++) * (a++)) -> 'a' is incremented TWICE! */
    int result = SQUARE(a++);
    printf("    SQUARE(a++) Result = %d (Expected 25, got 30 or UB!)\n", result);
    printf("    After macro, a = %d (Incremented twice!)\n\n", a);

    int b = 5;
    int inlineResult = square_inline(b++);
    printf("    Inline Function square_inline(b++) Result = %d\n", inlineResult);
    printf("    After inline function, b = %d (Incremented exactly once!)\n\n", b);

    /* 2. Multi-Statement Macro in if-else Branch */
    printf(">>> 2. Multi-statement Macro with do { ... } while(0):\n");
    int x = 10, y = 20;
    int condition = 1;

    printf("    Before Swap: x = %d, y = %d\n", x, y);

    /* Safe inside single-line if-else blocks */
    if (condition)
        SWAP_SAFE(x, y, int);
    else
        printf("    Swap bypassed\n");

    printf("    After SWAP_SAFE: x = %d, y = %d\n", x, y);

    printf("\n=== Macro Pitfalls Demonstration Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
