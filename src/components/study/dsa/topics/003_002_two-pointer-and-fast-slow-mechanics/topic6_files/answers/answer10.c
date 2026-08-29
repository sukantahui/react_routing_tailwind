#include <stdio.h>
#include <stdbool.h>

int sum_digits_squared(int n) {
    int sum = 0;
    while (n > 0) {
        int d = n % 10;
        sum += d * d;
        n /= 10;
    }
    return sum;
}

bool is_happy(int n) {
    int slow = n, fast = n;
    do {
        slow = sum_digits_squared(slow);
        fast = sum_digits_squared(sum_digits_squared(fast));
    } while (slow != fast);
    return slow == 1;
}

int main() {
    int n = 19;
    printf("--- Happy Number Fast-Slow Cycle Detection ---\n");
    printf("Number %d is %s!\n", n, is_happy(n) ? "a HAPPY Number" : "NOT a Happy Number");
    return 0;
}
