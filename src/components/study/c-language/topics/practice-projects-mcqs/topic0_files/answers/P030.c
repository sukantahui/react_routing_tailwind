#include <stdio.h>

int main() {
    int x, y;
    printf("Initial value: 10\n");
    x = 10;
    printf("Enter a number: ");
    scanf("%d", &y);
    x += y; printf("After += %d: %d\n", y, x);
    x -= y; printf("After -= %d: %d\n", y, x);
    x *= y; printf("After *= %d: %d\n", y, x);
    x /= y; printf("After /= %d: %d\n", y, x);
    x %= y; printf("After %%= %d: %d\n", y, x);
    return 0;
}
