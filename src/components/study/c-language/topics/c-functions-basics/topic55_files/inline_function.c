// inline_function.c – Simple example of an inline function
#include <stdio.h>

// Definition of an inline function (compiler may expand at call site)
inline int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int x = 10, y = 20;
    int m = max(x, y);  // May be replaced with (x > y) ? x : y
    printf("Max: %d\n", m);
    return 0;
}