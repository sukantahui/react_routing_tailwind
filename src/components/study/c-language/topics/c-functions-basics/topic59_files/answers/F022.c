#include <stdio.h>

int isPerfect(int n) {
    int sum = 0;
    for (int i = 1; i <= n/2; i++)
        if (n % i == 0) sum += i;
    return sum == n && n != 0;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isPerfect(n))
        printf("Perfect\n");
    else
        printf("Not Perfect\n");
    return 0;
}
