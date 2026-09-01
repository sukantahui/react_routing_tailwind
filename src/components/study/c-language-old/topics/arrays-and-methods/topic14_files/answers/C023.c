#include <stdio.h>
int main() {
    int arr[] = {2, 7, 4, 5};
    int target = 9;
    for (int i = 0; i < 4; i++)
        for (int j = i+1; j < 4; j++)
            if (arr[i] + arr[j] == target)
                printf("%d", arr[i]);
    return 0;
}
