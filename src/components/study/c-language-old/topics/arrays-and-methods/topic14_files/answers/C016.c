#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int temp = arr[3];
    for (int i = 3; i > 0; i--) 
        arr[i] = arr[i-1];
    arr[0] = temp;
    for (int i = 0; i < 4; i++) 
        printf("%d ", arr[i]);
    return 0;
}
