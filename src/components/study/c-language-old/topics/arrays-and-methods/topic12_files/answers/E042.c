#include <stdio.h>

void dfs(char grid[][100], int rows, int cols, int i, int j) {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] != '1') return;
    grid[i][j] = '0';
    dfs(grid, rows, cols, i + 1, j);
    dfs(grid, rows, cols, i - 1, j);
    dfs(grid, rows, cols, i, j + 1);
    dfs(grid, rows, cols, i, j - 1);
}

int numIslands(char grid[][100], int rows, int cols) {
    int count = 0;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, rows, cols, i, j);
            }
        }
    }
    return count;
}

int main() {
    int rows, cols;
    char grid[100][100];
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);
    printf("Enter grid row by row (0/1, no spaces):\n");
    for (int i = 0; i < rows; i++)
        scanf("%s", grid[i]);

    int islands = numIslands(grid, rows, cols);
    printf("Number of islands = %d\n", islands);
    return 0;
}