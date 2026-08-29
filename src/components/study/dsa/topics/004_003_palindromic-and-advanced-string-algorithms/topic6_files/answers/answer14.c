#include <stdio.h>
#include <string.h>

void make_smallest_palindrome(char s[]) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        if (s[left] != s[right]) {
            char min_c = (s[left] < s[right]) ? s[left] : s[right];
            s[left] = s[right] = min_c;
        }
        left++; right--;
    }
}

int main() {
    char str[] = "egcfe";
    printf("--- Lexicographical Smallest Palindrome Reconstruction ---\nBefore: '%s'\n", str);
    make_smallest_palindrome(str);
    printf("After : '%s'\n", str);
    return 0;
}
