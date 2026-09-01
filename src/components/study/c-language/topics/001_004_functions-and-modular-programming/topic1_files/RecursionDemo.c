#include <stdio.h>

/**
 * RecursionDemo.c
 * Recursive GCD & Tower of Hanoi Solvers
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

void towerOfHanoi(int n, char fromRod, char toRod, char auxRod) {
    if (n == 1) {
        printf("Move disk 1 from rod %c to rod %c\n", fromRod, toRod);
        return;
    }
    towerOfHanoi(n - 1, fromRod, auxRod, toRod);
    printf("Move disk %d from rod %c to rod %c\n", n, fromRod, toRod);
    towerOfHanoi(n - 1, auxRod, toRod, fromRod);
}

int main(void) {
    printf("=== Recursive GCD & Tower of Hanoi Demo ===\n\n");
    printf("GCD of 48 and 18: %d\n\n", gcd(48, 18));

    printf("Tower of Hanoi (3 Disks):\n");
    towerOfHanoi(3, 'A', 'C', 'B');

    return 0;
}
