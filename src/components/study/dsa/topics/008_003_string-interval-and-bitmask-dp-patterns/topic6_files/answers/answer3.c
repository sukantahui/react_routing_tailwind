#include <stdio.h>
#include <string.h>

int min(int a, int b) { return (a < b) ? a : b; }
int min3(int a, int b, int c) { return min(a, min(b, c)); }

int min_distance(char *s1, char *s2) {
    int m = strlen(s1), n = strlen(s2);
    int dp[100][100] = {0};

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + min3(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

int main() {
    char s1[] = "horse", s2[] = "ros";
    printf("--- Edit Distance (Levenshtein Distance 2D DP) ---\nEdit Distance between '%s' and '%s' = %d\n", s1, s2, min_distance(s1, s2));
    return 0;
}
