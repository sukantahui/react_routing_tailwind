#include <stdio.h>

void dfs(char grid[][100], int m, int n, int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') return;
    grid[i][j] = '0';
    dfs(grid, m, n, i+1, j);
    dfs(grid, m, n, i-1, j);
    dfs(grid, m, n, i, j+1);
    dfs(grid, m, n, i, j-1);
}

int numIslands(char grid[][100], int m, int n) {
    int count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, m, n, i, j);
            }
        }
    }
    return count;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    char grid[100][100];
    printf("Grid:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf(" %c", &grid[i][j]);

    int islands = numIslands(grid, m, n);
    printf("Number of islands = %d\n", islands);
    return 0;
}
