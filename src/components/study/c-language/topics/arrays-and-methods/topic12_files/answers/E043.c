#include <stdio.h>

typedef struct {
    int x, y, time;
} QueueNode;

int orangesRotting(int grid[][100], int rows, int cols) {
    QueueNode q[10000];
    int front = 0, rear = 0;
    int fresh = 0;

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == 2) {
                q[rear++] = (QueueNode){i, j, 0};
            } else if (grid[i][j] == 1) {
                fresh++;
            }
        }
    }

    int dirs[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    int maxTime = 0;

    while (front < rear) {
        QueueNode cur = q[front++];
        maxTime = cur.time;
        for (int d = 0; d < 4; d++) {
            int ni = cur.x + dirs[d][0];
            int nj = cur.y + dirs[d][1];
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] == 1) {
                grid[ni][nj] = 2;
                fresh--;
                q[rear++] = (QueueNode){ni, nj, cur.time + 1};
            }
        }
    }

    return (fresh == 0) ? maxTime : -1;
}

int main() {
    int rows, cols, grid[100][100];
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);
    printf("Enter grid (0 empty, 1 fresh, 2 rotten):\n");
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            scanf("%d", &grid[i][j]);

    int minutes = orangesRotting(grid, rows, cols);
    if (minutes == -1)
        printf("Impossible, some fresh oranges remain.\n");
    else
        printf("Minutes = %d\n", minutes);
    return 0;
}