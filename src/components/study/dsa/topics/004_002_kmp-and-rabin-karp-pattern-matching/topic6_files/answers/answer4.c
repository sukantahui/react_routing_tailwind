#include <stdio.h>
#include <string.h>

#define D 256
#define Q 101

void rabin_karp_search(const char *text, const char *pat) {
    int n = strlen(text), m = strlen(pat);
    int p_hash = 0, t_hash = 0, h = 1;

    for (int i = 0; i < m - 1; i++) h = (h * D) % Q;
    for (int i = 0; i < m; i++) {
        p_hash = (D * p_hash + pat[i]) % Q;
        t_hash = (D * t_hash + text[i]) % Q;
    }

    printf("--- Rabin-Karp Rolling Hash Matcher ---\nMatches at indices: ");
    for (int i = 0; i <= n - m; i++) {
        if (p_hash == t_hash) {
            int j = 0;
            while (j < m && text[i + j] == pat[j]) j++;
            if (j == m) printf("%d ", i);
        }
        if (i < n - m) {
            t_hash = (D * (t_hash - text[i] * h) + text[i + m]) % Q;
            if (t_hash < 0) t_hash += Q;
        }
    }
    printf("\n");
}

int main() {
    rabin_karp_search("GEEKS FOR GEEKS", "GEEK");
    return 0;
}
