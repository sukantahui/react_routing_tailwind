#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int count = 0;
    for (int i = 0; i < 5; i++) 
        if (arr[i] % 2 != 0) 
            count++;
    printf("%d", count);
    return 0;
}
