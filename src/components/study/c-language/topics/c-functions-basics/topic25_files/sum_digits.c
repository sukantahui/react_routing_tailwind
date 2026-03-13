#include <stdio.h>

// Recursive sum of digits (assumes n >= 0)
int sumDigits(int n) {
    // Base case: single digit
    if (n < 10) {
        return n;
    }
    // Recursive case: last digit + sum of remaining digits
    return (n % 10) + sumDigits(n / 10);
}

int main() {
    int num = 12345;
    printf("Sum of digits of %d = %d\n", num, sumDigits(num));
    return 0;
}