#include <stdio.h>
#include <string.h>
int isPalindrome(char *s) {
    int len = strlen(s);
    for (int i = 0; i < len/2; i++)
        if (s[i] != s[len-1-i])
            return 0;
    return 1;
}
int main() {
    printf(isPalindrome("madam") ? "Palindrome" : "Not Palindrome");
    return 0;
}
