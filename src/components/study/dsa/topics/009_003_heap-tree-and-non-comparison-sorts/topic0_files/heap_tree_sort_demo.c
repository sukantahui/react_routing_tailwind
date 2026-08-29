#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

// 1. Heap Sort Implementation (In-Place Array Max-Heap)
void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Step 1: Build max heap in-place - O(n)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Step 2: Extract max one by one and move to array end - O(n log n)
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

// 2. Tree Sort Implementation (BST Inorder Extraction)
typedef struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
} BSTNode;

BSTNode* createBSTNode(int key) {
    BSTNode *node = (BSTNode *)malloc(sizeof(BSTNode));
    node->key = key;
    node->left = NULL;
    node->right = NULL;
    return node;
}

BSTNode* insertBST(BSTNode *root, int key) {
    if (root == NULL) return createBSTNode(key);
    if (key < root->key) root->left = insertBST(root->left, key);
    else root->right = insertBST(root->right, key);
    return root;
}

void storeInorder(BSTNode *root, int arr[], int *index) {
    if (root != NULL) {
        storeInorder(root->left, arr, index);
        arr[(*index)++] = root->key;
        storeInorder(root->right, arr, index);
    }
}

void freeBST(BSTNode *root) {
    if (root != NULL) {
        freeBST(root->left);
        freeBST(root->right);
        free(root);
    }
}

void treeSort(int arr[], int n) {
    BSTNode *root = NULL;
    for (int i = 0; i < n; i++) {
        root = insertBST(root, arr[i]);
    }
    int index = 0;
    storeInorder(root, arr, &index);
    freeBST(root);
}

void printArray(const int arr[], int n, const char *title) {
    printf("%-20s: [ ", title);
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], (i + 1 < n) ? ", " : "");
    }
    printf(" ]\n");
}

int main() {
    printf("=== Heap Sort & Tree Sort Master Class in C ===\n\n");
    int raw[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(raw) / sizeof(raw[0]);

    printArray(raw, n, "Original Data");

    int a1[6]; for(int i=0; i<n; i++) a1[i] = raw[i];
    heapSort(a1, n);
    printArray(a1, n, "Heap Sort Result");

    int a2[6]; for(int i=0; i<n; i++) a2[i] = raw[i];
    treeSort(a2, n);
    printArray(a2, n, "Tree Sort Result");

    return 0;
}
