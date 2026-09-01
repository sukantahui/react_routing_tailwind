#include <stdio.h>
#include <stdlib.h>

int main() {
    int *marks = (int*)malloc(5 * sizeof(int));   // heap allocation
    if (marks == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    // Store marks for 5 students
    for (int i = 0; i < 5; i++) {
        marks[i] = (i + 1) * 10;
    }

    printf("Marks: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", marks[i]);
    }

    free(marks);   // must free heap memory
    marks = NULL;  // good practice to avoid dangling pointer
    return 0;
}