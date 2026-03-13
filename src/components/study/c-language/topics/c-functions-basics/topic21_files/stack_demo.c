#include <stdio.h>

void recurse(int n) {
    printf("Entering recurse(%d)\n", n);
    if (n > 0) {
        recurse(n - 1);
    }
    printf("Leaving recurse(%d)\n", n);
}

int main() {
    recurse(3);
    return 0;
}