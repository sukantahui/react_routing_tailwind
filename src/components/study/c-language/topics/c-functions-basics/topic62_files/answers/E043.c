#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int x, y;
} Point;

int orangesRotting(int grid[][100], int m, int n) {
    int fresh = 0;
    Point queue[10000];
    int front = 0, rear = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) {
                queue[rear].x = i; queue[rear].y = j; rear++;
            } else if (grid[i][j] == 1) {
                fresh++;
            }
        }
    }
    if (fresh == 0) return 0;

    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int minutes = 0;
    while (front < rear) {
        int size = rear - front;
        for (int s = 0; s < size; s++) {
            Point p = queue[front++];
            for (int d = 0; d < 4; d++) {
                int nx = p.x + dirs[d][0];
                int ny = p.y + dirs[d][1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] == 1) {
                    grid[nx][ny] = 2;
                    queue[rear].x = nx; queue[rear].y = ny; rear++;
                    fresh--;
                }
            }
        }
        minutes++;
    }
    return (fresh == 0) ? minutes - 1 : -1;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int grid[100][100];
    printf("Grid:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &grid[i][j]);

    int time = orangesRotting(grid, m, n);
    printf("Minutes = %d\n", time);
    return 0;
}
