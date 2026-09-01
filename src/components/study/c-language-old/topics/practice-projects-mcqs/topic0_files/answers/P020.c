#include <stdio.h>

int countDigits(int n) {
    if (n == 0) return 1;  // special case: 0 has 1 digit
    int count = 0;
    while (n != 0) {
        count++;
        n /= 10;
    }
    return count;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    printf("Number of digits = %d\n", countDigits(n));
    return 0;
}
