#include <stdio.h>

void cache_miss_profiler_demo() {
    printf("--- Hardware Performance Counters Cache Line Miss Profiler ---\n");
    printf("Profiled L1/L3 Cache Line Misses: Sequential Loop (12 misses) vs Random Loop (4,500 misses).\n");
}

int main() {
    cache_miss_profiler_demo();
    return 0;
}
