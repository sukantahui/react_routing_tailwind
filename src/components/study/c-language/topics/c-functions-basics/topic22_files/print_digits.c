#include <stdio.h>

// Print digits of a number from most significant to least
void printDigits(int n) {
    // Base case: single digit
    if (n < 10) {
        printf("%d ", n);
        return;
    }
    // Recursive case: print digits of n/10, then last digit
    printDigits(n / 10);
    printf("%d ", n % 10);
}

int main() {
    int num = 12345;
    printf("Digits of %d: ", num);
    printDigits(num);
    printf("\n");
    return 0;
}