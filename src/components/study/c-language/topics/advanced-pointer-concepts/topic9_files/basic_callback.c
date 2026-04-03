#include <stdio.h>

// A function that applies a given operation to an integer
int apply(int x, int (*operation)(int)) {
    if (operation) {
        return operation(x);
    }
    return x; // no-op if NULL
}

int doubleValue(int n) {
    return n * 2;
}

int square(int n) {
    return n * n;
}

int main() {
    printf("double(5) = %d\n", apply(5, doubleValue));
    printf("square(5) = %d\n", apply(5, square));
    printf("no op: %d\n", apply(5, NULL));
    return 0;
}