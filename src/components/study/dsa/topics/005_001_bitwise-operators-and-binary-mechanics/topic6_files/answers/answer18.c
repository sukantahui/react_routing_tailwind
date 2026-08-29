#include <stdio.h>
#include <limits.h>

int divide_bitwise(int dividend, int divisor) {
    if (dividend == INT_MIN && divisor == -1) return INT_MAX;
    long long dvd = dividend, dvs = divisor;
    dvd = (dvd < 0) ? -dvd : dvd;
    dvs = (dvs < 0) ? -dvs : dvs;

    long long quotient = 0;
    while (dvd >= dvs) {
        long long temp = dvs, multiple = 1;
        while (dvd >= (temp << 1)) {
            temp <<= 1;
            multiple <<= 1;
        }
        dvd -= temp;
        quotient += multiple;
    }
    return ((dividend < 0) ^ (divisor < 0)) ? -quotient : quotient;
}

int main() {
    int dividend = 10, divisor = 3;
    printf("--- Divide Integers Without Multiplication or Division ---\n");
    printf("%d / %d = %d\n", dividend, divisor, divide_bitwise(dividend, divisor));
    return 0;
}
