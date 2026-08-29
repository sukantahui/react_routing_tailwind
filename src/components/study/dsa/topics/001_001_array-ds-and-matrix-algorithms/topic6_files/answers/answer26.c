#include <stdio.h>
#include <stdbool.h>

#define R 4
#define C 4

bool staircase_search(int matrix[R][C], int target, int *found_r, int *found_c) {
    int row = 0, col = C - 1; // Top-right corner
    while (row < R && col >= 0) {
        if (matrix[row][col] == target) {
            *found_r = row;
            *found_c = col;
            return true;
        } else if (matrix[row][col] > target) {
            col--; // Move left
        } else {
            row++; // Move down
        }
    }
    return false;
}

int main() {
    int matrix[R][C] = {
        {10, 20, 30, 40},
        {15, 25, 35, 45},
        {27, 29, 37, 48},
        {32, 33, 39, 50}
    };
    int target = 29;
    int r, c;

    printf("--- 2D Staircase Search Engine ---\nTarget Key: %d\n", target);
    if (staircase_search(matrix, target, &r, &c)) {
        printf("Target Found at Cell Matrix[%d][%d]\n", r, c);
    } else {
        printf("Target Not Found.\n");
    }

    return 0;
}
