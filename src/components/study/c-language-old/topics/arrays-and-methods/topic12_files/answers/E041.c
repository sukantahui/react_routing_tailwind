#include <stdio.h>
#include <string.h>

int dfs(char board[][100], int rows, int cols, char *word, int i, int j, int idx) {
    if (idx == strlen(word)) return 1;
    if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] != word[idx]) return 0;

    char temp = board[i][j];
    board[i][j] = '#';
    int found = dfs(board, rows, cols, word, i + 1, j, idx + 1) ||
                dfs(board, rows, cols, word, i - 1, j, idx + 1) ||
                dfs(board, rows, cols, word, i, j + 1, idx + 1) ||
                dfs(board, rows, cols, word, i, j - 1, idx + 1);
    board[i][j] = temp;
    return found;
}

int exist(char board[][100], int rows, int cols, char *word) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (board[i][j] == word[0] && dfs(board, rows, cols, word, i, j, 0))
                return 1;
        }
    }
    return 0;
}

int main() {
    int rows, cols;
    char board[100][100], word[100];
    printf("Enter rows and cols: ");
    scanf("%d %d", &rows, &cols);
    printf("Enter board row by row (no spaces):\n");
    for (int i = 0; i < rows; i++)
        scanf("%s", board[i]);

    printf("Enter word: ");
    scanf("%s", word);

    if (exist(board, rows, cols, word))
        printf("Word found.\n");
    else
        printf("Word not found.\n");
    return 0;
}