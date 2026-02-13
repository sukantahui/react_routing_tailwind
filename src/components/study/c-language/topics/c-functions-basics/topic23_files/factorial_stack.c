#include <stdio.h>

int factorial(int n) {
    printf("factorial(%d) called\n", n);
    if (n == 0) {
        printf("factorial(0) returning 1\n");
        return 1;
    }
    int result = n * factorial(n - 1);
    printf("factorial(%d) returning %d\n", n, result);
    return result;
}

int main() {
    factorial(5);
    return 0;
}