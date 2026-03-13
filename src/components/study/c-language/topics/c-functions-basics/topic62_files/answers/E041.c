#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool dfs(char board[][100], int m, int n, int i, int j, char *word, int pos) {
    if (pos == strlen(word)) return true;
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != word[pos]) return false;
    char temp = board[i][j];
    board[i][j] = '#';
    bool found = dfs(board, m, n, i+1, j, word, pos+1) ||
                 dfs(board, m, n, i-1, j, word, pos+1) ||
                 dfs(board, m, n, i, j+1, word, pos+1) ||
                 dfs(board, m, n, i, j-1, word, pos+1);
    board[i][j] = temp;
    return found;
}

bool exist(char board[][100], int m, int n, char *word) {
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (board[i][j] == word[0] && dfs(board, m, n, i, j, word, 0))
                return true;
    return false;
}

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    char board[100][100];
    printf("Board:\n");
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf(" %c", &board[i][j]); // space to consume newline

    char word[100];
    printf("Word: ");
    scanf("%s", word);

    if (exist(board, m, n, word))
        printf("Word found: Yes\n");
    else
        printf("Word found: No\n");
    return 0;
}
