#include <stdio.h>

void next_greater_element(int arr[], int n) {
    int stack[100], top = -1;
    int nge[100];

    for (int i = n - 1; i >= 0; i--) {
        while (top != -1 && stack[top] <= arr[i]) top--;
        nge[i] = (top == -1) ? -1 : stack[top];
        stack[++top] = arr[i];
    }

    printf("--- Next Greater Element (Monotonic Stack) ---\n");
    for (int i = 0; i < n; i++) printf("Element %2d -> NGE = %d\n", arr[i], nge[i]);
}

int main() {
    int arr[] = {4, 5, 2, 25, 7, 18};
    int n = sizeof(arr) / sizeof(arr[0]);
    next_greater_element(arr, n);
    return 0;
}
