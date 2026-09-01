#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int x, y;
    printf("Enter a numbers: ");
    scanf("%d", &x);
    printf("Enter another numbers: ");
    scanf("%d",&y);
    printf("Sum = %d\n", add(x, y));
    return 0;
}
