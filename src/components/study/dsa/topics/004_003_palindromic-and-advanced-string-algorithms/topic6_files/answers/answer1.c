#include <stdio.h>
#include <string.h>

void expand(const char *s, int left, int right, int *start, int *max_len) {
    int n = strlen(s);
    while (left >= 0 && right < n && s[left] == s[right]) {
        if (right - left + 1 > *max_len) {
            *start = left;
            *max_len = right - left + 1;
        }
        left--; right++;
    }
}

void longest_palindrome_center(const char *s) {
    int n = strlen(s);
    if (n == 0) return;
    int start = 0, max_len = 1;

    for (int i = 0; i < n; i++) {
        expand(s, i, i, &start, &max_len);     // Odd length
        expand(s, i, i + 1, &start, &max_len); // Even length
    }

    printf("--- Center Expansion Longest Palindrome ---\nInput: '%s'\nLongest Palindromic Substring: '%.*s'\n", s, max_len, s + start);
}

int main() {
    longest_palindrome_center("babad");
    return 0;
}
