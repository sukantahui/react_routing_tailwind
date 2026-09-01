// inline_vs_macro.c – Macro vs inline function (safety)
#include <stdio.h>

// Macro – evaluates arguments twice (dangerous)
#define SQUARE_MACRO(x) ((x) * (x))

// Inline function – safe
inline int square_inline(int x) {
    return x * x;
}

int main() {
    int a = 5;
    int b = 5;

    int result_macro = SQUARE_MACRO(a++);  // a is incremented twice
    printf("Macro: a = %d, result = %d\n", a, result_macro); // a=7, result=30

    int result_inline = square_inline(b++); // b incremented once
    printf("Inline: b = %d, result = %d\n", b, result_inline); // b=6, result=25

    return 0;
}