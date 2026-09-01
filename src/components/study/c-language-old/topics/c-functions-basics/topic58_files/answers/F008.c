#include <stdio.h>
void printArray(int *arr, int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
}
int main() {
    int a[] = {1,2,3,4,5};
    printArray(a,5);
    return 0;
}
