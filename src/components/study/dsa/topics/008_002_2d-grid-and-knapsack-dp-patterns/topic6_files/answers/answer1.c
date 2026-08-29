#include <stdio.h>

int unique_paths(int m, int n) {
    int dp[100][100];
    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
}

int main() {
    int m = 3, n = 7;
    printf("--- Unique Paths I (2D Grid DP) ---\nUnique Paths on %dx%d grid = %d\n", m, n, unique_paths(m, n));
    return 0;
}
