#include <stdio.h>

void printPyramid(int rows) {
    printf("--- [1] CENTERED ISOSCELES STAR PYRAMID (%d Rows) ---\n", rows);
    for (int r = 1; r <= rows; r++) {
        for (int s = 1; s <= rows - r; s++) printf(" ");
        for (int k = 1; k <= 2 * r - 1; k++) printf("*");
        printf("\n");
    }
}

void printDiamond(int n) {
    printf("\n--- [2] SYMMETRICAL DIAMOND PATTERN (Radius %d) ---\n", n);
    for (int r = 1; r <= n; r++) {
        for (int s = 1; s <= n - r; s++) printf(" ");
        for (int k = 1; k <= 2 * r - 1; k++) printf("*");
        printf("\n");
    }
    for (int r = n - 1; r >= 1; r--) {
        for (int s = 1; s <= n - r; s++) printf(" ");
        for (int k = 1; k <= 2 * r - 1; k++) printf("*");
        printf("\n");
    }
}

void printFloydsTriangle(int rows) {
    printf("\n--- [3] FLOYD'S TRIANGLE (%d Rows) ---\n", rows);
    int num = 1;
    for (int r = 1; r <= rows; r++) {
        for (int c = 1; c <= r; c++) {
            printf("%-3d ", num++);
        }
        printf("\n");
    }
}

void printPascalsTriangle(int rows) {
    printf("\n--- [4] PASCAL'S TRIANGLE (%d Rows) ---\n", rows);
    for (int n = 0; n < rows; n++) {
        for (int s = 0; s < rows - n - 1; s++) printf("  ");
        int val = 1;
        for (int k = 0; k <= n; k++) {
            printf("%4d", val);
            val = val * (n - k) / (k + 1);
        }
        printf("\n");
    }
}

int main(void) {
    printf("=========================================================\n");
    printf("  INTERACTIVE ASCII SPATIAL PATTERN & GEOMETRY GENERATOR  \n");
    printf("=========================================================\n\n");

    printPyramid(5);
    printDiamond(4);
    printFloydsTriangle(5);
    printPascalsTriangle(6);

    return 0;
}
