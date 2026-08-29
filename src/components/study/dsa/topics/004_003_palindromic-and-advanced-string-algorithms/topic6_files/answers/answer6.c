#include <stdio.h>
#include <string.h>

int min(int a, int b) { return (a < b) ? a : b; }

int min_cut_palindrome(const char *s) {
    int n = strlen(s);
    int dp[100];
    bool P[100][100] = {{false}};

    for (int i = 0; i < n; i++) {
        int min_cuts = i;
        for (int j = 0; j <= i; j++) {
            if (s[i] == s[j] && (i - j <= 2 || P[j + 1][i - 1])) {
                P[j][i] = true;
                min_cuts = (j == 0) ? 0 : min(min_cuts, dp[j - 1] + 1);
            }
        }
        dp[i] = min_cuts;
    }
    return dp[n - 1];
}

int main() {
    const char *s = "aab";
    printf("--- Minimum Cuts for Palindrome Partitioning ---\n");
    printf("Minimum Cuts for '%s' = %d\n", s, min_cut_palindrome(s));
    return 0;
}
