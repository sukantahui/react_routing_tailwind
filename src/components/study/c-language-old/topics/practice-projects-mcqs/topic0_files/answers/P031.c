#include <stdio.h>

int main() {
    int x, a, b, c, d;
    printf("Enter a number: ");
    scanf("%d", &x);
    printf("Initial: x = %d\n", x);
    a = ++x;
    printf("a = ++x: a = %d, x = %d\n", a, x);
    b = x++;
    printf("b = x++: b = %d, x = %d\n", b, x);
    c = --x;
    printf("c = --x: c = %d, x = %d\n", c, x);
    d = x--;
    printf("d = x--: d = %d, x = %d\n", d, x);
    return 0;
}
