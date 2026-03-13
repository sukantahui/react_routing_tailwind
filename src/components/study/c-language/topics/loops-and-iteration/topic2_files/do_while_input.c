/**
 * do_while_input.c
 *
 * Input validation using do-while.
 * Guarantees at least one prompt, then repeats until a positive number is entered.
 */

#include <stdio.h>

int main() {
    int num;

    do {
        printf("Enter a positive number: ");
        scanf("%d", &num);
        if (num <= 0) {
            printf("❌ That's not positive. Try again.\n");
        }
    } while (num <= 0);

    printf("✅ You entered: %d\n", num);
    return 0;
}