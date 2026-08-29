#include <stdio.h>
#include <limits.h>

#define R 4
#define C 4

int kadane_1d(int arr[], int n, int *start, int *end) {
    int max_so_far = INT_MIN, curr_max = 0;
    int temp_start = 0;
    *start = -1; *end = -1;

    for (int i = 0; i < n; i++) {
        curr_max += arr[i];
        if (curr_max > max_so_far) {
            max_so_far = curr_max;
            *start = temp_start;
            *end = i;
        }
        if (curr_max < 0) {
            curr_max = 0;
            temp_start = i + 1;
        }
    }
    return max_so_far;
}

void max_submatrix_sum_2d(int matrix[R][C]) {
    int max_sum = INT_MIN;
    int final_top = 0, final_bottom = 0, final_left = 0, final_right = 0;

    for (int r1 = 0; r1 < R; r1++) {
        int temp[C];
        for (int c = 0; c < C; c++) temp[c] = 0;

        for (int r2 = r1; r2 < R; r2++) {
            for (int c = 0; c < C; c++) temp[c] += matrix[r2][c];

            int start_col, end_col;
            int sum = kadane_1d(temp, C, &start_col, &end_col);

            if (sum > max_sum) {
                max_sum = sum;
                final_top = r1;
                final_bottom = r2;
                final_left = start_col;
                final_right = end_col;
            }
        }
    }

    printf("--- 2D Kadane's Maximum Submatrix Sum ---\n");
    printf("Maximum Submatrix Sum = %d\n", max_sum);
    printf("Top-Left: (%d, %d), Bottom-Right: (%d, %d)\n", final_top, final_left, final_bottom, final_right);
}

int main() {
    int matrix[R][C] = {
        { 1,  2, -1, -4},
        {-8, -3,  4,  2},
        { 3,  8, 10,  1},
        {-4, -1,  1,  7}
    };

    max_submatrix_sum_2d(matrix);
    return 0;
}
