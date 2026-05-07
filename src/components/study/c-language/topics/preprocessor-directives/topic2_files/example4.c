#include <stdio.h>

// Inline function – type-safe, no double evaluation
static inline int max(int a, int b) {
    return a > b ? a : b;
}

// For generic max, C11 _Generic could be used, but inline is simpler
static inline double max_d(double a, double b) {
    return a > b ? a : b;
}

int main() {
    int x = 1, y = 2;
    int m = max(x++, y++);  // increments only once each
    printf("x=%d, y=%d, max=%d\n", x, y, m);  // x=2, y=3, max=2
    
    double a = 3.5, b = 2.1;
    printf("max_d = %.1f\n", max_d(a, b));
    
    // Inline functions are preferred in modern C
    return 0;
}