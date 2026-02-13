#include <stdio.h>

// Function that returns a character – no input needed
char getInitial(void) {
    return 'S';   // Could be for Swadeep, Sukanta, or any favourite student
}

int main() {
    printf("Initial: %c\n", getInitial());
    return 0;
}