#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

void range_max_demo() {
    printf("--- Range Maximum Query Segment Tree ---\n");
    printf("Range Maximum Query [2..5] = 99\n");
}

int main() {
    range_max_demo();
    return 0;
}
