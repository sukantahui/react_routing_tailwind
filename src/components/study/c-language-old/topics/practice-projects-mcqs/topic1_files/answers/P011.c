#include <stdio.h>

int main() {
    int i;
    float f;
    char c;
    printf("Enter an integer: ");
    scanf("%d", &i);
    printf("Enter a float: ");
    scanf("%f", &f);
    printf("Enter a character: ");
    scanf(" %c", &c);  // space before %c to consume newline
    printf("You entered: integer = %d, float = %f, character = %c\n", i, f, c);
    return 0;
}
