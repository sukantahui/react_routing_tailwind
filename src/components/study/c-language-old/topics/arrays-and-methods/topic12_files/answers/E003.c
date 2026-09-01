#include <stdio.h>

/*
    Function: heapify
    ------------------
    This function ensures the subtree rooted at index i
    satisfies the Max-Heap property.

    Max-Heap Property:
    Parent node must be greater than its children.
*/
void heapify(int arr[], int n, int i) {

    int largest = i;            // Assume root is largest
    int left = 2 * i + 1;       // Left child index
    int right = 2 * i + 2;      // Right child index

    // If left child exists and is greater than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If right child exists and is greater than current largest
    if (right < n && arr[right] > arr[largest])
        largest = right;

    /*
        If largest is not root,
        swap and recursively heapify the affected subtree
    */
    if (largest != i) {

        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}

/*
    Function: heapSort
    --------------------
    Steps:
    1. Build a Max Heap from the array.
    2. Swap root (largest element) with last element.
    3. Reduce heap size and heapify again.
    4. Repeat until array is sorted.
*/
void heapSort(int arr[], int n) {

    /*
        Step 1: Build Max Heap
        Start from last non-leaf node
    */
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    /*
        Step 2: Extract elements one by one
    */
    for (int i = n - 1; i > 0; i--) {

        // Move current root (largest) to end
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // Call heapify on reduced heap
        heapify(arr, i, 0);
    }
}

/*
    Main Function
    --------------
    1. Take array size.
    2. Take array elements.
    3. Call heapSort().
    4. Print sorted array.
*/
int main() {

    int n, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    // Call Heap Sort
    heapSort(arr, n);

    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    printf("\n");

    return 0;
}
