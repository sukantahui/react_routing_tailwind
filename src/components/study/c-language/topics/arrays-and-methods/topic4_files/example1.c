#include <stdio.h>

int main() {
    int scores[] = {85, 92, 78, 90, 88};
    int n = sizeof(scores) / sizeof(scores[0]);

    // Forward traversal: sum all elements
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += scores[i];
    }
    printf("Sum of all scores: %d\n", sum);

    // Forward traversal: print each element with its index
    printf("Scores (forward order):\n");
    for (int i = 0; i < n; i++) {
        printf("scores[%d] = %d\n", i, scores[i]);
    }

    return 0;
}