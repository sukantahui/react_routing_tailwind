#include <stdio.h>

void buffer_overflow_audit_demo() {
    printf("--- Buffer Overflow & Out-of-Bounds Memory Audit ---\n");
    printf("Detected Out-of-Bounds Write at array index 10 (valid range 0..9).\n");
}

int main() {
    buffer_overflow_audit_demo();
    return 0;
}
