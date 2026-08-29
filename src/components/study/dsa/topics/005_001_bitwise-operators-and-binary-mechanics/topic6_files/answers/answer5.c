#include <stdio.h>
#include <stdbool.h>

bool is_power_of_two(int n) {
    return (n > 0) && ((n & (n - 1)) == 0);
}

int main() {
    int n = 16;
    printf("--- Check if Power of Two ---\n");
    printf("Is %d a Power of Two: %s\n", n, is_power_of_two(n) ? "YES" : "NO");
    return 0;
}
