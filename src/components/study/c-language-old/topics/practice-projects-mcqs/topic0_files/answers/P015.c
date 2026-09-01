#include <stdio.h>

int reverseNumber(int n) {
    int rev = 0;
    while (n != 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return rev;
}

int isPalindrome(int n) {
    return n == reverseNumber(n);
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (isPalindrome(n))
        printf("Palindrome\n");
    else
        printf("Not Palindrome\n");
    return 0;
}
