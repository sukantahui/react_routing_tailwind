#include <stdio.h>

// Void recursive countdown
void countdown(int n) {
    if (n <= 0) {
        printf("Done!\n");
        return;
    }
    printf("%d\n", n);
    countdown(n - 1);
}

int main() {
    countdown(5);
    return 0;
}