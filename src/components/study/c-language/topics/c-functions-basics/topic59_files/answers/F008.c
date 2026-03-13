#include <stdio.h>

int isEven(int n) {
    return n % 2 == 0;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isEven(n))
        printf("Even\n");
    else
        printf("Odd\n");
    return 0;
}
