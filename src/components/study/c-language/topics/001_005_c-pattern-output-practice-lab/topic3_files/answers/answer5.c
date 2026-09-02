#include <stdio.h>
#include <stdbool.h>
#include <math.h>

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

bool isArmstrong(int n) {
    int temp = n, sum = 0, digits = 0;
    while (temp > 0) {
        digits++;
        temp /= 10;
    }
    temp = n;
    while (temp > 0) {
        int d = temp % 10;
        int p = 1;
        for (int i = 0; i < digits; i++) p *= d;
        sum += p;
        temp /= 10;
    }
    return sum == n;
}

bool isPalindrome(int n) {
    int temp = n, rev = 0;
    while (temp > 0) {
        rev = rev * 10 + (temp % 10);
        temp /= 10;
    }
    return rev == n;
}

bool isPerfect(int n) {
    if (n <= 1) return false;
    int sum = 1;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            sum += i;
            if (i * i != n) sum += n / i;
        }
    }
    return sum == n;
}

long long fact(int d) {
    long long f = 1;
    for (int i = 1; i <= d; i++) f *= i;
    return f;
}

bool isStrong(int n) {
    int temp = n;
    long long sum = 0;
    while (temp > 0) {
        sum += fact(temp % 10);
        temp /= 10;
    }
    return sum == n;
}

bool isHarshad(int n) {
    if (n <= 0) return false;
    int temp = n, sum = 0;
    while (temp > 0) {
        sum += temp % 10;
        temp /= 10;
    }
    return (n % sum == 0);
}

void analyzeNumber(int num) {
    printf("---------------------------------------------------------\n");
    printf("NUMERIC CHARACTERISTICS FOR: %d\n", num);
    printf("---------------------------------------------------------\n");
    printf("  • Prime Number     : %s\n", isPrime(num) ? "YES" : "NO");
    printf("  • Armstrong Number : %s\n", isArmstrong(num) ? "YES" : "NO");
    printf("  • Palindrome Number: %s\n", isPalindrome(num) ? "YES" : "NO");
    printf("  • Perfect Number   : %s\n", isPerfect(num) ? "YES" : "NO");
    printf("  • Strong Number    : %s\n", isStrong(num) ? "YES" : "NO");
    printf("  • Harshad Number   : %s\n", isHarshad(num) ? "YES" : "NO");
}

int main(void) {
    printf("=========================================================\n");
    printf("    COMPREHENSIVE ALGORITHMIC NUMBER ANALYZER LAB        \n");
    printf("=========================================================\n");

    analyzeNumber(153);
    analyzeNumber(28);
    analyzeNumber(145);
    analyzeNumber(121);

    return 0;
}
