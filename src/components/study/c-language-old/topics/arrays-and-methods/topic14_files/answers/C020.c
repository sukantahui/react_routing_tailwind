#include <stdio.h>
int main() {
    int arr[] = {2, 4, 6, 8};
    int temp[4], k = 0;
    for (int i = 0; i < 4; i++) {
        int dup = 0;
        for (int j = 0; j < k; j++) 
        if (temp[j] == arr[i]) 
            dup = 1;
        if (!dup) 
            temp[k++] = arr[i];
    }
    for (int i = 0; i < k; i++) printf("%d ", temp[i]);
    return 0;
}
