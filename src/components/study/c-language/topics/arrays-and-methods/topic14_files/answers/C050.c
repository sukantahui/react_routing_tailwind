#include <stdio.h>
#include <string.h>
int main() {
    char str[] = "madam";
    int len = strlen(str), palindrome = 1;
    for (int i = 0; i < len/2; i++)
        if (str[i] != str[len-1-i]) 
        { 
            palindrome = 0; break; 
        }
    printf(palindrome ? "Palindrome" : "Not Palindrome");
    return 0;
}
