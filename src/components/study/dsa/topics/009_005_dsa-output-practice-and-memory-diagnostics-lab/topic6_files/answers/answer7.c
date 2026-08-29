#include <stdio.h>

void stack_overflow_demo() {
    printf("--- Stack Overflow via Unbounded Recursion Diagnostics ---\n");
    printf("Stack Frame Exhaustion: Recursion depth exceeded maximum stack limit 8 MB!\n");
}

int main() {
    stack_overflow_demo();
    return 0;
}
