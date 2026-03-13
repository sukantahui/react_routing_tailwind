#include <stdio.h>
int sumArray(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) 
        s += arr[i];
    return s;
}
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printf("%d", sumArray(arr, 5));
    return 0;
}
