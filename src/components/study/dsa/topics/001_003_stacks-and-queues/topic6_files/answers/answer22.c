#include <stdio.h>

#define R 4
#define C 4

int max(int a, int b) { return (a > b) ? a : b; }

int max_hist(int row[], int n) {
    int stack[100], top = -1, max_area = 0;
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : row[i];
        while (top != -1 && row[stack[top]] >= h) {
            int height = row[stack[top--]];
            int width = (top == -1) ? i : (i - stack[top] - 1);
            max_area = max(max_area, height * width);
        }
        stack[++top] = i;
    }
    return max_area;
}

int maximal_rectangle(int matrix[R][C]) {
    int max_area = 0;
    int heights[C];
    for (int j = 0; j < C; j++) heights[j] = 0;

    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            heights[j] = (matrix[i][j] == 1) ? heights[j] + 1 : 0;
        }
        max_area = max(max_area, max_hist(heights, C));
    }
    return max_area;
}

int main() {
    int matrix[R][C] = {
        {1, 0, 1, 0},
        {1, 0, 1, 1},
        {1, 1, 1, 1},
        {1, 0, 0, 1}
    };
    printf("--- Maximal Rectangle in Binary Matrix ---\n");
    printf("Maximal Rectangle Area = %d\n", maximal_rectangle(matrix));
    return 0;
}
