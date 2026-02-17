#include <stdio.h>
#include <math.h>

int countDigits(int n) {
    int count = 0;
    while (n != 0) {
        count++;
        n /= 10;
    }
    return count;
}

int isArmstrong(int n) {
    int original = n, sum = 0, digits = countDigits(n);
    while (n != 0) {
        int d = n % 10;
        sum += pow(d, digits);
        n /= 10;
    }
    return sum == original;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isArmstrong(n))
        printf("Armstrong\n");
    else
        printf("Not Armstrong\n");
    return 0;
}
