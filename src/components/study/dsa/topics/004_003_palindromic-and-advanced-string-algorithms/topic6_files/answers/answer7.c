#include <stdio.h>
#include <string.h>

int max(int a, int b) { return (a > b) ? a : b; }

int lps_dp(const char *s) {
    int n = strlen(s);
    int dp[100][100] = {{0}};

    for (int i = 0; i < n; i++) dp[i][i] = 1;

    for (int cl = 2; cl <= n; cl++) {
        for (int i = 0; i < n - cl + 1; i++) {
            int j = i + cl - 1;
            if (s[i] == s[j] && cl == 2) dp[i][j] = 2;
            else if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
            else dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
        }
    }
    return dp[0][n - 1];
}

int main() {
    const char *s = "bbbab";
    printf("--- Longest Palindromic Subsequence (LPS DP) ---\n");
    printf("Longest Palindromic Subsequence Length for '%s' = %d\n", s, lps_dp(s));
    return 0;
}
