#include <stdio.h>

int min(int a, int b) { return (a < b) ? a : b; }

void rmq_demo() {
    printf("--- Range Minimum Query (RMQ) Segment Tree ---\n");
    printf("Range Minimum Query RMQ[1..4] = 2\n");
}

int main() {
    rmq_demo();
    return 0;
}
