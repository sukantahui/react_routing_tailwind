#include <stdio.h>

void option1() { printf("You chose Option 1\n"); }
void option2() { printf("You chose Option 2\n"); }
void option3() { printf("You chose Option 3\n"); }
void option4() { printf("Exiting...\n"); }

int main() {
    // Array of function pointers (jump table)
    void (*menu[5])(void) = {NULL, option1, option2, option3, option4};
    int choice;
    
    do {
        printf("\n1. Option 1\n2. Option 2\n3. Option 3\n4. Exit\nChoice: ");
        scanf("%d", &choice);
        
        if (choice >= 1 && choice <= 4) {
            menu[choice]();  // call function via jump table
        } else {
            printf("Invalid choice\n");
        }
    } while (choice != 4);
    
    return 0;
}