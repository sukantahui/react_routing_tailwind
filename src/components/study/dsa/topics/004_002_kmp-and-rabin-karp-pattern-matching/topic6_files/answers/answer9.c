#include <stdio.h>
#include <string.h>

int count_pattern_occurrences(const char *text, const char *pat) {
    int count = 0;
    int n = strlen(text), m = strlen(pat);
    for (int i = 0; i <= n - m; i++) {
        if (strncmp(text + i, pat, m) == 0) count++;
    }
    return count;
}

int main() {
    const char *text = "AAAAA", *pat = "AA";
    printf("--- Overlapping Pattern Occurrences Count ---\n");
    printf("Pattern '%s' in '%s' (Overlapping) Count = %d\n", pat, text, count_pattern_occurrences(text, pat));
    return 0;
}
