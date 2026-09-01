#include <stdio.h>

int main() {
    int choice, a, b;
    do {
        printf("\n1. Add\n2. Subtract\n3. Multiply\n4. Divide\n5. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        if (choice >= 1 && choice <= 4) {
            printf("Enter two numbers: ");
            scanf("%d %d", &a, &b);
        }
        switch (choice) {
            case 1: printf("Result = %d\n", a + b); break;
            case 2: printf("Result = %d\n", a - b); break;
            case 3: printf("Result = %d\n", a * b); break;
            case 4: if (b != 0) printf("Result = %d\n", a / b);
                    else printf("Division by zero!\n"); break;
            case 5: printf("Exiting...\n"); break;
            default: printf("Invalid choice!\n");
        }
    } while (choice != 5);
    return 0;
}
