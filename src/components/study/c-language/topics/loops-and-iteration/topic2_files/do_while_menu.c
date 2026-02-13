/**
 * do_while_menu.c
 *
 * A simple text‑based menu using do-while.
 * Shows options, reads user choice, and repeats until '3' is pressed.
 */

#include <stdio.h>

int main() {
    int choice;

    do {
        printf("\n===== CANTEEN MENU =====\n");
        printf("1. Tea\n");
        printf("2. Coffee\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("☕ Here's your tea! ₹10\n");
                break;
            case 2:
                printf("☕ Here's your coffee! ₹15\n");
                break;
            case 3:
                printf("👋 Thank you, visit again!\n");
                break;
            default:
                printf("❌ Invalid choice. Try again.\n");
        }
    } while (choice != 3);

    return 0;
}