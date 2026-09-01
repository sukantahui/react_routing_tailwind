#include <stdio.h>
void doubleElements(int arr[], int n) {
    for (int i = 0; i < n; i++)
        arr[i] *= 2;
}
int main() {
    int a[] = {2,3,4,5};
    doubleElements(a,4);
    for (int i = 0; i < 4; i++)
        printf("%d ", a[i]);
    return 0;
}
