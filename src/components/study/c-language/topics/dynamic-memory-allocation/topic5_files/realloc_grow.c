#include <stdio.h>
#include <stdlib.h>

int main() {
    int capacity = 4;
    int size = 0;
    int *arr = malloc(capacity * sizeof(int));
    if (!arr) return 1;

    int input;
    printf("Enter numbers (0 to stop):\n");
    while (1) {
        scanf("%d", &input);
        if (input == 0) break;

        if (size == capacity) {
            capacity *= 2;
            int *temp = realloc(arr, capacity * sizeof(int));
            if (!temp) {
                printf("Reallocation failed!\n");
                free(arr);
                return 1;
            }
            arr = temp;
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