#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define N 4

void printSolution(int board[N][N]) {
    printf("N-Queens Solution (%dx%d Chessboard):\n", N, N);
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf(" %s ", board[i][j] ? "Q" : ".");
        }
        printf("\n");
    }
    printf("\n");
}

bool isSafe(int board[N][N], int row, int col) {
    int i, j;

    // Check this row on left side
    for (i = 0; i < col; i++)
        if (board[row][i]) return false;

    // Check upper diagonal on left side
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;

    // Check lower diagonal on left side
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j]) return false;

    return true;
}

bool solveNQUtil(int board[N][N], int col) {
    if (col >= N) return true;

    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1; // Place Queen
            printf("[BACKTRACKING] Placed Queen at (%d, %d)\n", i, col);

            if (solveNQUtil(board, col + 1)) return true;

            board[i][col] = 0; // BACKTRACK
            printf("[BACKTRACKING] Pruned branch & Backtracked from (%d, %d)\n", i, col);
        }
    }
    return false;
}

void solveNQ() {
    int board[N][N] = {0};

    if (!solveNQUtil(board, 0)) {
        printf("Solution does not exist\n");
        return;
    }

    printSolution(board);
}

int main() {
    printf("=== Backtracking Paradigm: N-Queens Problem in C ===\n\n");
    solveNQ();
    return 0;
}
