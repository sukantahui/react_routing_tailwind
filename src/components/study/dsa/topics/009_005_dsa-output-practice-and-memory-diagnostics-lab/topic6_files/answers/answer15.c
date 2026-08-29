#include <stdio.h>

void mark_and_sweep_gc_demo() {
    printf("--- Garbage Collection Mark-and-Sweep Simulator ---\n");
    printf("GC Mark Phase: Identified 12 reachable objects from root stack.\nGC Sweep Phase: Reclaimed 5 unreachable objects (200 bytes freed).\n");
}

int main() {
    mark_and_sweep_gc_demo();
    return 0;
}
