#include <stdio.h>
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) 
        printf("%d ", arr[i]);
}
int main() {
    int arr[] = {10, 20, 30};
    printArray(arr, 3);
    return 0;
}
