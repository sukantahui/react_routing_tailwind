#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int key = 6, index = -1;
    for (int i = 0; i < 4; i++) 
        if (arr[i] == key) index = i;
    printf("%d", index);
    return 0;
}
