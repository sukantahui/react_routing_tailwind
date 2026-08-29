#include <stdio.h>

void double_free_diagnostics_demo() {
    printf("--- Double Free Exception Diagnostics ---\n");
    printf("Caught Double Free Exception: Memory block at 0x7ffd8a92 already freed!\n");
}

int main() {
    double_free_diagnostics_demo();
    return 0;
}
