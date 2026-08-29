#include <stdio.h>
#include <string.h>

int min(int a, int b) { return (a < b) ? a : b; }

void manacher_algorithm(const char *s) {
    char T[200];
    int idx = 0; T[idx++] = '^';
    for (int i = 0; s[i] != '\0'; i++) { T[idx++] = '#'; T[idx++] = s[i]; }
    T[idx++] = '#'; T[idx++] = '$'; T[idx] = '\0';

    int P[200] = {0};
    int C = 0, R = 0;
    int max_len = 0, center_idx = 0;

    for (int i = 1; i < idx - 1; i++) {
        int i_mirror = 2 * C - i;
        if (R > i) P[i] = min(R - i, P[i_mirror]);
        while (T[i + 1 + P[i]] == T[i - 1 - P[i]]) P[i]++;
        if (i + P[i] > R) { C = i; R = i + P[i]; }
        if (P[i] > max_len) { max_len = P[i]; center_idx = i; }
    }

    int start = (center_idx - max_len) / 2;
    printf("--- Manacher's O(N) Longest Palindromic Substring ---\nInput: '%s'\nLongest Palindromic Substring: '%.*s'\n", s, max_len, s + start);
}

int main() {
    manacher_algorithm("babad");
    return 0;
}
