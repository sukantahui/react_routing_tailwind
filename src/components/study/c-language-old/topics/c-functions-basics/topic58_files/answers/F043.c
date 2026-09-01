#include <stdio.h>
void printReverse(int arr[], int n) {
    if (n == 0) return;
    printf("%d ", arr[n-1]);
    printReverse(arr, n-1);
}
int main() {
    int a[] = {5,4,3,2,1};
    printReverse(a,5);
    return 0;
}
