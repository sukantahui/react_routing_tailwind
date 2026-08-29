#include <stdio.h>

void asan_interceptor_demo() {
    printf("--- AddressSanitizer (ASan) Buffer Overflow Interceptor ---\n");
    printf("ASan Intercepted: global-buffer-overflow on address 0x00010c20.\n");
}

int main() {
    asan_interceptor_demo();
    return 0;
}
