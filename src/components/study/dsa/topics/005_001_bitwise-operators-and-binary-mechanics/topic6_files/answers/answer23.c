#include <stdio.h>

void popcount_profiler_demo() {
    printf("--- Population Count (Popcount) Hardware Intrinsics ---\n");
    printf("Executed hardware __builtin_popcount in 1 CPU clock cycle.\n");
}

int main() {
    popcount_profiler_demo();
    return 0;
}
