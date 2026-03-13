#include <stdio.h>

void rotateRight(int arr[], int from, int to) {
    int temp = arr[to];
    for(int i = to; i > from; i--)
        arr[i] = arr[i-1];
    arr[from] = temp;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int outOfPlace = -1;
    for(int i = 0; i < n; i++) {
        if(outOfPlace == -1) {
            if((i % 2 == 0 && arr[i] < 0) || (i % 2 == 1 && arr[i] > 0))
                outOfPlace = i;
        } else {
            if((arr[outOfPlace] < 0 && arr[i] > 0) || (arr[outOfPlace] > 0 && arr[i] < 0)) {
                rotateRight(arr, outOfPlace, i);
                if(i - outOfPlace >= 2) outOfPlace += 2;
                else outOfPlace = -1;
            }
        }
    }
    printf("Rearranged: ");
    for(int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}