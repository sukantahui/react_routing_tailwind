#include <stdio.h>

void generate_pascal_triangle(int n) {
    int arr[n];
    for (int i = 0; i < n; i++) arr[i] = 0;
    arr[0] = 1;

    printf("--- Pascal's Triangle (In-Place 1D Generator) ---\n");
    for (int line = 0; line < n; line++) {
        // Print spaces for pyramid alignment
        for (int s = 0; s < n - 1 - line; s++) printf("  ");

        // Update row right-to-left
        for (int j = line; j > 0; j--) {
            arr[j] = arr[j] + arr[j - 1];
        }

        // Print row values
        for (int j = 0; j <= line; j++) {
            printf("%4d", arr[j]);
        }
        printf("\n");
    }
}

int main() {
    int rows = 6;
    generate_pascal_triangle(rows);
    return 0;
}
