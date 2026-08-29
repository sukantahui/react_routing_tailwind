#include <stdio.h>
#include <string.h>

int max(int a, int b) { return (a > b) ? a : b; }

int lcs(char *s1, char *s2) {
    int m = strlen(s1), n = strlen(s2);
    int dp[100][100] = {0};

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

int main() {
    char s1[] = "abcde", s2[] = "ace";
    printf("--- Longest Common Subsequence (LCS 2D String DP) ---\nLCS Length for '%s' and '%s' = %d\n", s1, s2, lcs(s1, s2));
    return 0;
}
