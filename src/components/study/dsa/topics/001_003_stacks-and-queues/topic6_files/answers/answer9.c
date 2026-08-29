#include <stdio.h>

void reverse_first_k(int q[], int n, int k) {
    if (k > n || k <= 0) return;
    int stack[100], top = -1;

    for (int i = 0; i < k; i++) stack[++top] = q[i];
    for (int i = 0; i < k; i++) q[i] = stack[top--];
}

int main() {
    int q[] = {10, 20, 30, 40, 50};
    int n = 5, k = 3;
    printf("--- Reverse First K Queue Elements ---\nBefore: [ 10 20 30 40 50 ]\n");
    reverse_first_k(q, n, k);
    printf("After (K=3): [ ");
    for (int i = 0; i < n; i++) printf("%d ", q[i]);
    printf("]\n");
    return 0;
}
