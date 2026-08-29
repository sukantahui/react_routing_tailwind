#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>
#include <string.h>

bool is_palindrome(const char *s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}

int main() {
    const char *str = "A man, a plan, a canal: Panama";
    printf("--- Valid Palindrome String Scan ---\n");
    if (is_palindrome(str)) printf("'%s' is a VALID Palindrome!\n", str);
    else printf("Not a palindrome.\n");
    return 0;
}
