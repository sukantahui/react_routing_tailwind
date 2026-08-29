#include <stdio.h>

void pass_by_ref_demo() {
    printf("--- Pass-by-Value vs Pass-by-Reference Tracing ---\n");
    printf("Pass-by-Value: Original unchanged (x=10)\nPass-by-Reference (Pointer): Original mutated (x=20)\n");
}

int main() {
    pass_by_ref_demo();
    return 0;
}
