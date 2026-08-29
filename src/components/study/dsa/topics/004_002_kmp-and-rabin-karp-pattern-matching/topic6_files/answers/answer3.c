#include <stdio.h>
#include <string.h>

void compute_lps(const char *pat, int m, int lps[]) {
    int len = 0; lps[0] = 0; int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) { len++; lps[i] = len; i++; }
        else { if (len != 0) len = lps[len - 1]; else { lps[i] = 0; i++; } }
    }
}

void kmp_search(const char *text, const char *pat) {
    int n = strlen(text), m = strlen(pat);
    int lps[100];
    compute_lps(pat, m, lps);

    int i = 0, j = 0;
    printf("--- Complete KMP Pattern Matcher ---\nMatches at indices: ");
    while (i < n) {
        if (pat[j] == text[i]) { i++; j++; }
        if (j == m) {
            printf("%d ", i - j);
            j = lps[j - 1];
        } else if (i < n && pat[j] != text[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    printf("\n");
}

int main() {
    kmp_search("ABABDABACDABABCABAB", "ABABCABAB");
    return 0;
}
