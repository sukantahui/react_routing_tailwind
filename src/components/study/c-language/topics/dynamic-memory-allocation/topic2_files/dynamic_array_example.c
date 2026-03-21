#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = NULL;
    int capacity = 0;
    int size = 0;
    int input;

    printf("Enter numbers (0 to stop):\n");

    while (1) {
        scanf("%d", &input);
        if (input == 0) break;

        if (size == capacity) {
            capacity = (capacity == 0) ? 4 : capacity * 2;
            int *new_arr = realloc(arr, capacity * sizeof(int));
            if (!new_arr) {
                printf("Allocation failed!\n");
                free(arr);
                return 1;
            }
            arr = new_arr;
        }
        arr[size++] = input;
    }

    printf("You entered: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    free(arr);
    return 0;
}