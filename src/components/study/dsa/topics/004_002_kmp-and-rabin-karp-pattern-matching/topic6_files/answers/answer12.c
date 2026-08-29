#include <stdio.h>
#include <string.h>

int max(int a, int b) { return (a > b) ? a : b; }

void bad_char_heuristic(const char *str, int size, int badchar[256]) {
    for (int i = 0; i < 256; i++) badchar[i] = -1;
    for (int i = 0; i < size; i++) badchar[(unsigned char)str[i]] = i;
}

void boyer_moore_search(const char *txt, const char *pat) {
    int m = strlen(pat), n = strlen(txt);
    int badchar[256];
    bad_char_heuristic(pat, m, badchar);

    int s = 0;
    printf("--- Boyer-Moore Bad Character Matcher ---\nMatches at indices: ");
    while (s <= (n - m)) {
        int j = m - 1;
        while (j >= 0 && pat[j] == txt[s + j]) j--;
        if (j < 0) {
            printf("%d ", s);
            s += (s + m < n) ? m - badchar[(unsigned char)txt[s + m]] : 1;
        } else {
            s += max(1, j - badchar[(unsigned char)txt[s + j]]);
        }
    }
    printf("\n");
}

int main() {
    boyer_moore_search("ABAAABCDABACDA", "ABC");
    return 0;
}
