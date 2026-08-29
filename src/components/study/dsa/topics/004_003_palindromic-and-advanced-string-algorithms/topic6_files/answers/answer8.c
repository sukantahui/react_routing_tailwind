#include <stdio.h>
#include <stdbool.h>

bool can_permute_palindrome(const char *s) {
    int count[256] = {0};
    for (int i = 0; s[i] != '\0'; i++) count[(unsigned char)s[i]]++;

    int odd_count = 0;
    for (int i = 0; i < 256; i++) {
        if (count[i] % 2 != 0) odd_count++;
    }
    return odd_count <= 1;
}

int main() {
    const char *s = "carerac";
    printf("--- Check Palindromic Permutation ---\n");
    printf("Can '%s' form a palindrome: %s\n", s, can_permute_palindrome(s) ? "YES" : "NO");
    return 0;
}
