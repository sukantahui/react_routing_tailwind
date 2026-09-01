#include <stdio.h>

int isLeap(int year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

int main() {
    int year;
    printf("Enter year: ");
    scanf("%d", &year);
    if (isLeap(year))
        printf("%d is a leap year.\n", year);
    else
        printf("%d is not a leap year.\n", year);
    return 0;
}
