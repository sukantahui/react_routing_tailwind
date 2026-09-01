#include <stdio.h>

void countDown(int n) {
    // Base case
    if (n <= 0) {
        printf("Done!\n");
        return;
    }
    // Recursive case
    printf("%d\n", n);
    countDown(n - 1);
}

int main() {
    countDown(5);
    return 0;
}