#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int min = arr[0];
    for (int i = 1; i < 4; i++) 
        if (arr[i] < min) 
            min = arr[i];
    printf("%d", min);
    return 0;
}
