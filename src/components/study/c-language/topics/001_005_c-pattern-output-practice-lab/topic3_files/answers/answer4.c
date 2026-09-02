#include <stdio.h>

long long factorialRecursive(int n) {
    if (n <= 1) return 1;
    return (long long)n * factorialRecursive(n - 1);
}

long long factorialTailRecursive(int n, long long accumulator) {
    if (n <= 1) return accumulator;
    return factorialTailRecursive(n - 1, (long long)n * accumulator);
}

int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int gcdRecursive(int a, int b) {
    if (b == 0) return a;
    return gcdRecursive(b, a % b);
}

long long powerRecursive(int base, int exp) {
    if (exp == 0) return 1;
    return (long long)base * powerRecursive(base, exp - 1);
}

void towerOfHanoi(int n, char source, char auxiliary, char destination) {
    if (n == 1) {
        printf("  Move Disk 1 from Rod %c -> Rod %c\n", source, destination);
        return;
    }
    towerOfHanoi(n - 1, source, destination, auxiliary);
    printf("  Move Disk %d from Rod %c -> Rod %c\n", n, source, destination);
    towerOfHanoi(n - 1, auxiliary, source, destination);
}

int main(void) {
    printf("=========================================================\n");
    printf("   SCIENTIFIC RECURSION & NUMBER THEORY EXPLORER LAB     \n");
    printf("=========================================================\n\n");

    int num = 6;
    printf("[1] FACTORIAL COMPUTATION (n = %d):\n", num);
    printf("  • Non-Tail Recursive Result : %lld\n", factorialRecursive(num));
    printf("  • Tail Recursive Result     : %lld\n", factorialTailRecursive(num, 1));

    int fibTerm = 7;
    printf("\n[2] FIBONACCI SEQUENCE (Term %d):\n", fibTerm);
    printf("  • 7th Fibonacci Term       : %d\n", fibonacci(fibTerm));

    int x = 48, y = 18;
    printf("\n[3] EUCLIDEAN GCD (a = %d, b = %d):\n", x, y);
    printf("  • GCD                       : %d\n", gcdRecursive(x, y));

    int base = 2, exp = 10;
    printf("\n[4] POWER FUNCTION (%d^%d):\n", base, exp);
    printf("  • Power Result              : %lld\n", powerRecursive(base, exp));

    int disks = 3;
    printf("\n[5] TOWER OF HANOI PUZZLE (%d Disks):\n", disks);
    towerOfHanoi(disks, 'A', 'B', 'C');

    return 0;
}
