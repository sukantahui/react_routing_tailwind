#include <stdio.h>
#include <stdbool.h>
#include <string.h>

void compute_lps(const char *s, int n, int lps[]) {
    int len = 0; lps[0] = 0; int i = 1;
    while (i < n) {
        if (s[i] == s[len]) { len++; lps[i] = len; i++; }
        else { if (len != 0) len = lps[len - 1]; else { lps[i] = 0; i++; } }
    }
}

bool repeated_substring_pattern(const char *s) {
    int n = strlen(s);
    int lps[100];
    compute_lps(s, n, lps);
    int len = lps[n - 1];
    return (len > 0 && n % (n - len) == 0);
}

int main() {
    const char *str = "abcabcabc";
    printf("--- Repeated Substring Pattern via KMP LPS ---\n");
    printf("'%s' -> %s\n", str, repeated_substring_pattern(str) ? "REPEATED Pattern" : "NOT Repeated");
    return 0;
}
