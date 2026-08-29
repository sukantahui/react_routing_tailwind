#include <stdio.h>
#include <string.h>

int max(int a, int b) { return (a > b) ? a : b; }

int length_of_longest_substring(const char *s) {
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    int max_len = 0, left = 0;

    for (int right = 0; s[right] != '\0'; right++) {
        if (last[(unsigned char)s[right]] >= left) {
            left = last[(unsigned char)s[right]] + 1;
        }
        last[(unsigned char)s[right]] = right;
        max_len = max(max_len, right - left + 1);
    }
    return max_len;
}

int main() {
    const char *str = "abcabcbb";
    printf("--- Longest Substring Without Repeating Characters ---\n");
    printf("String: '%s' -> Longest Substring Length = %d\n", str, length_of_longest_substring(str));
    return 0;
}
