#include <stdio.h>

// Comparator callback type: returns negative if a<b, zero if equal, positive if a>b
typedef int (*Compare)(int, int);

// Generic sort that uses a callback for comparison
void bubbleSort(int arr[], int n, Compare cmp) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (cmp(arr[j], arr[j+1]) > 0) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int ascending(int a, int b) { return a - b; }
int descending(int a, int b) { return b - a; }

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    int n = sizeof(arr)/sizeof(arr[0]);
    
    bubbleSort(arr, n, ascending);
    printArray(arr);   // 1 2 5 8 9
    
    bubbleSort(arr, n, descending);
    printArray(arr);   // 9 8 5 2 1
    
    return 0;
}