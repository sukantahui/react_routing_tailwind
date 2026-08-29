#include <stdio.h>
#include <stdbool.h>

#define R 3
#define C 4

bool search_matrix(int matrix[R][C], int target) {
    int low = 0, high = R * C - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int val = matrix[mid / C][mid % C];
        if (val == target) return true;
        if (val < target) low = mid + 1;
        else high = mid - 1;
    }
    return false;
}

int main() {
    int matrix[R][C] = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    int target = 3;
    printf("--- Search a 2D Matrix (Flattened 1D Binary Search) ---\n");
    if (search_matrix(matrix, target)) printf("Target %d FOUND in 2D Matrix!\n", target);
    else printf("Target NOT found.\n");
    return 0;
}
