#include <stdio.h>
#include <string.h>

int count_palindromes(const char *s) {
    int n = strlen(s), count = 0;
    for (int i = 0; i < n; i++) {
        // Odd length
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) { count++; l--; r++; }
        // Even length
        l = i; r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) { count++; l--; r++; }
    }
    return count;
}

int main() {
    const char *s = "aaa";
    printf("--- Count All Palindromic Substrings ---\n");
    printf("Total Palindromic Substrings in '%s' = %d\n", s, count_palindromes(s));
    return 0;
}
