#include <stdio.h>

/**
 * ControlFlowDemo.c
 * Demonstrates decision branching (if-else, switch-case)
 * and loop iterations (while, for).
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    int choice;
    int num, i, isPrime = 1;

    printf("=== Control Flow & Branching Portal ===\n");
    printf("1. Check Prime Number\n");
    printf("2. Print Even Numbers (1 to 10)\n");
    printf("3. Exit\n");
    printf("Enter choice (1-3): ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            printf("Enter integer to test prime: ");
            scanf("%d", &num);
            if (num <= 1) {
                isPrime = 0;
            } else {
                for (i = 2; i * i <= num; i++) {
                    if (num % i == 0) {
                        isPrime = 0;
                        break;
                    }
                }
            }
            if (isPrime) {
                printf("%d is a PRIME number.\n", num);
            } else {
                printf("%d is NOT a prime number.\n", num);
            }
            break;

        case 2:
            printf("Even Numbers from 1 to 10:\n");
            for (i = 1; i <= 10; i++) {
                if (i % 2 != 0) continue;
                printf("%d ", i);
            }
            printf("\n");
            break;

        case 3:
            printf("Exiting program.\n");
            break;

        default:
            printf("Invalid selection.\n");
            break;
    }

    return 0;
}
