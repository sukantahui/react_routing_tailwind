#include <stdio.h>
int countDigits(int n) {
    if (n == 0) return 0;
    return 1 + countDigits(n / 10);
}
int main() {
    printf("%d", countDigits(123));
    return 0;
}
