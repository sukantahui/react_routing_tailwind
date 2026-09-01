#include <stdio.h>

int main() {
    int scores[] = {85, 92, 78, 90, 88};
    int n = sizeof(scores) / sizeof(scores[0]);

    // Reverse traversal: print from last to first
    printf("Scores in reverse order:\n");
    for (int i = n - 1; i >= 0; i--) {
        printf("scores[%d] = %d\n", i, scores[i]);
    }

    // Example where reverse is useful: shifting elements for insertion
    // (we don't modify here, just illustrate reverse thinking)
    printf("\nIf we wanted to shift right, we'd start from the end...\n");

    // Safe reverse loop with size_t (common trick)
    printf("Using size_t reverse pattern:\n");
    size_t j = n;
    while (j-- > 0) {
        printf("scores[%zu] = %d\n", j, scores[j]);
    }

    return 0;
}