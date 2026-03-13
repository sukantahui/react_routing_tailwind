#include <stdio.h>

void deep(int n) {
    if (n == 0) {
        printf("Reached base case\n");
        return;
    }
    // printf("Depth %d\n", n); // uncomment to see progress (but may slow)
    deep(n - 1);
}

int main() {
    int depth = 10000; // try increasing until crash
    printf("Starting recursion depth %d\n", depth);
    deep(depth);
    printf("Completed successfully (unlikely for large depth)\n");
    return 0;
}