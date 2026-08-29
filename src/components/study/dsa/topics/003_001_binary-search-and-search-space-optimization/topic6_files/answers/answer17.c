#include <stdio.h>
#include <stdbool.h>

#define R 5
#define C 5

bool search_staircase(int matrix[R][C], int target) {
    int row = 0, col = C - 1;
    while (row < R && col >= 0) {
        if (matrix[row][col] == target) return true;
        if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}

int main() {
    int matrix[R][C] = {
        {1, 4, 7, 11, 15},
        {2, 5, 8, 12, 19},
        {3, 6, 9, 16, 22},
        {10, 13, 14, 17, 24},
        {18, 21, 23, 26, 30}
    };
    int target = 5;
    printf("--- Search a 2D Matrix II (Staircase Search) ---\n");
    if (search_staircase(matrix, target)) printf("Target %d FOUND in Staircase Matrix Search!\n", target);
    return 0;
}
