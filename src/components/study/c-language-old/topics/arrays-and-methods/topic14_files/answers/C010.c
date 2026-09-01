#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    for (int i = 0; i < 4; i += 2) 
        printf("%d ", arr[i]);
    return 0;
}
