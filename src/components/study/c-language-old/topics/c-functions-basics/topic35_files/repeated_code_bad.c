// repeated_code_bad.c – copy‑pasted validation logic (before refactoring)
#include <stdio.h>

int main() {
    int age1, age2, age3;

    // First person
    printf("Enter age of Swadeep: ");
    scanf("%d", &age1);
    // Validation block 1
    if (age1 >= 18 && age1 <= 60) {
        printf("Swadeep is eligible.\n");
    } else {
        printf("Swadeep is NOT eligible.\n");
    }

    // Second person
    printf("Enter age of Tuhina: ");
    scanf("%d", &age2);
    // Validation block 2 (identical)
    if (age2 >= 18 && age2 <= 60) {
        printf("Tuhina is eligible.\n");
    } else {
        printf("Tuhina is NOT eligible.\n");
    }

    // Third person
    printf("Enter age of Abhronila: ");
    scanf("%d", &age3);
    // Validation block 3 (identical again)
    if (age3 >= 18 && age3 <= 60) {
        printf("Abhronila is eligible.\n");
    } else {
        printf("Abhronila is NOT eligible.\n");
    }

    return 0;
}