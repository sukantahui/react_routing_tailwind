/**
 * break_menu.c
 *
 * A simple menu that repeats until the user enters 0.
 * Uses break to exit the infinite loop.
 */

#include <stdio.h>

int main() {
    int choice;

    while (1) {  // infinite loop
        printf("\n===== LIBRARY MENU =====\n");
        printf("1. Issue book\n");
        printf("2. Return book\n");
        printf("3. Show all books\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        if (choice == 0) {
            printf("👋 Thank you! Visit again.\n");
            break;  // exit the loop
        }

        switch (choice) {
            case 1:
                printf("📘 Book issued.\n");
                break;
            case 2:
                printf("📕 Book returned.\n");
                break;
            case 3:
                printf("📚 List of books...\n");
                break;
            default:
                printf("❌ Invalid choice. Try again.\n");
        }
    }

    return 0;
}