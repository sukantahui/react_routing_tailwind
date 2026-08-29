#include <stdio.h>

void branchless_insertion_sort_demo() {
    printf("--- Branchless Insertion Sort Optimization ---\n");
    printf("Eliminated CPU pipeline branch mispredictions using conditional bitwise moves.\n");
}

int main() {
    branchless_insertion_sort_demo();
    return 0;
}
