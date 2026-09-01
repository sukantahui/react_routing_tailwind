#include <stdio.h>

int main() {
    int arr[3][4] = {
        {10, 20, 30, 40},
        {50, 60, 70, 80},
        {90, 100, 110, 120}
    };

    printf("Addresses of elements (row‑major order):\n");
    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 4; col++) {
            printf("&arr[%d][%d] = %p\n", row, col, (void*)&arr[row][col]);
        }
    }

    // Show that rows are contiguous
    printf("\nAddress of arr[0][3] = %p\n", (void*)&arr[0][3]);
    printf("Address of arr[1][0] = %p\n", (void*)&arr[1][0]);
    printf("Difference: %ld bytes (should be sizeof(int) = %zu)\n",
           (char*)&arr[1][0] - (char*)&arr[0][3], sizeof(int));

    return 0;
}