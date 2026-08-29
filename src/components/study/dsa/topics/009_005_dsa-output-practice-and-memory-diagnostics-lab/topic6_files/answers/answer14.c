#include <stdio.h>

void memory_fragmentation_demo() {
    printf("--- Memory Fragmentation Audit Tool ---\n");
    printf("External Fragmentation: 35% free heap space unavailable for contiguous 100 KB block.\n");
}

int main() {
    memory_fragmentation_demo();
    return 0;
}
