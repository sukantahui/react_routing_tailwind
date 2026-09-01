#include <stdio.h>

int main() {
    int marks[5] = {67, 78, 89, 90, 85};
    int index;

    printf("Enter an index (0-4) to see the mark: ");
    scanf("%d", &index);

    // Bounds check before access
    if (index >= 0 && index < 5) {
        printf("marks[%d] = %d\n", index, marks[index]);
    } else {
        printf("Invalid index! Please use 0 through 4.\n");
    }

    // Professional habit: use size_t for indices to avoid negative checks
    // (but then we'd need to handle unsigned underflow carefully)
    return 0;
}