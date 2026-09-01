#include <stdio.h>
int main() {
    int arr[] = {8, 6, 4, 2};
    int first = arr[0], second = arr[1];
    if (second > first) 
    { 
        int t = first; first = second; second = t; 
    }
    for (int i = 2; i < 4; i++) {
        if (arr[i] > first) 
        { 
            second = first; first = arr[i]; 
        }
        else if (arr[i] > second) 
            second = arr[i];
    }
    printf("%d", second);
    return 0;
}
