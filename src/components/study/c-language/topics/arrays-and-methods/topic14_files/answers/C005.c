#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int max = arr[0];
    for (int i = 1; i < 4; i++) 
        if (arr[i] > max) 
            max = arr[i];
    printf("%d", max);
    return 0;
}
