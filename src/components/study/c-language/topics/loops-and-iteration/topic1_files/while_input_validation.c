/**
 * while_input_validation.c
 *
 * Repeatedly asks the user for a positive number.
 * Loop continues until a valid input is given.
 */

#include <stdio.h>

int main() {
    int num;

    printf("Enter a positive number: ");
    scanf("%d", &num);

    while (num <= 0) {
        printf("Invalid! Please enter a positive number: ");
        scanf("%d", &num);
    }

    printf("You entered: %d\n", num);
    return 0;
}