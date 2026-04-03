#include <stdio.h>

void greetMorning(void) {
    printf("Good morning!\n");
}

void greetEvening(void) {
    printf("Good evening!\n");
}

int main() {
    void (*greet)(void) = NULL;
    
    // Don't call without checking
    // greet(); // would crash
    
    // Check before call
    if (greet) {
        greet();
    } else {
        printf("No greet function set.\n");
    }
    
    // Assign and call safely
    greet = greetMorning;
    if (greet) greet();
    
    greet = greetEvening;
    if (greet) greet();
    
    // Reset to NULL
    greet = NULL;
    if (greet) greet(); // skipped
    else printf("Again, no function.\n");
    
    return 0;
}