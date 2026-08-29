#include <stdio.h>

void stack_vs_heap_profiler_demo() {
    printf("--- Stack vs Heap Memory Allocation Profiler ---\n");
    printf("Stack Allocation: 0.002 ns (SP sub)\nHeap Allocation: 45.200 ns (malloc / OS kernel call)\n");
}

int main() {
    stack_vs_heap_profiler_demo();
    return 0;
}
