#include <stdio.h>
#include <string.h>

void naive_search(const char *text, const char *pattern) {
    int n = strlen(text), m = strlen(pattern);
    printf("--- Naive Pattern Search ---\nMatches at indices: ");
    for (int i = 0; i <= n - m; i++) {
        int j = 0;
        while (j < m && text[i + j] == pattern[j]) j++;
        if (j == m) printf("%d ", i);
    }
    printf("\n");
}

int main() {
    naive_search("AABAACAADAABAABA", "AABA");
    return 0;
}
