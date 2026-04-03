#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Callback type for menu actions
typedef void (*menu_action)(void);

// Menu item structure
typedef struct {
    const char* name;
    menu_action action;
} MenuItem;

// Action functions
void action_new() { printf("Creating new file...\n"); }
void action_open() { printf("Opening file...\n"); }
void action_save() { printf("Saving file...\n"); }
void action_exit() { printf("Exiting program.\n"); exit(0); }

int main() {
    MenuItem menu[] = {
        {"New", action_new},
        {"Open", action_open},
        {"Save", action_save},
        {"Exit", action_exit},
        {NULL, NULL}  // sentinel
    };
    
    int choice;
    while (1) {
        printf("\n=== MENU ===\n");
        for (int i = 0; menu[i].name != NULL; i++) {
            printf("%d. %s\n", i+1, menu[i].name);
        }
        printf("Choice: ");
        scanf("%d", &choice);
        
        if (choice >= 1 && choice <= 4) {
            if (menu[choice-1].action) {
                menu[choice-1].action();
            }
        } else {
            printf("Invalid choice.\n");
        }
    }
    return 0;
}
