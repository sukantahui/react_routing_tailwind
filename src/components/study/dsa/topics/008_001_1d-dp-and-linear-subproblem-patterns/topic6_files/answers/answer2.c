#include <stdio.h>

int climb_stairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2, c = 0;
    for (int i = 3; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    int n = 5;
    printf("--- Climbing Stairs (1D DP) ---\nWays to climb %d stairs = %d\n", n, climb_stairs(n));
    return 0;
}
