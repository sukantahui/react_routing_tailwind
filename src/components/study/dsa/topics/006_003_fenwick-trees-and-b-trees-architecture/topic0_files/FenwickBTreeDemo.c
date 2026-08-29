/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Fenwick Tree (Binary Indexed Tree) & B-Tree Database Node Architecture
 * File: FenwickBTreeDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// ============================================================================
// 1. FENWICK TREE (BINARY INDEXED TREE - BIT) IN C
// ============================================================================
typedef struct FenwickTree {
    int* tree; // 1-based indexing array of size N + 1
    int n;
} FenwickTree;

FenwickTree* createFenwickTree(int n) {
    FenwickTree* ft = (FenwickTree*)malloc(sizeof(FenwickTree));
    if (!ft) return NULL;

    ft->n = n;
    ft->tree = (int*)calloc(n + 1, sizeof(int));
    return ft;
}

// Point Update: Add `val` to index `idx` (1-based) in O(log N)
void fenwickAdd(FenwickTree* ft, int idx, int val) {
    // Magic index advance: idx += idx & (-idx)
    while (idx <= ft->n) {
        ft->tree[idx] += val;
        idx += idx & (-idx); // Add lowest set bit
    }
}

// Prefix Sum Query: Computes sum from 1 to `idx` in O(log N)
int fenwickQueryPrefix(const FenwickTree* ft, int idx) {
    int sum = 0;
    // Magic index decrease: idx -= idx & (-idx)
    while (idx > 0) {
        sum += ft->tree[idx];
        idx -= idx & (-idx); // Remove lowest set bit
    }
    return sum;
}

// Range Sum Query: [l..r] = prefixSum(r) - prefixSum(l - 1)
int fenwickQueryRange(const FenwickTree* ft, int l, int r) {
    return fenwickQueryPrefix(ft, r) - fenwickQueryPrefix(ft, l - 1);
}

void freeFenwickTree(FenwickTree* ft) {
    if (ft) {
        free(ft->tree);
        free(ft);
    }
}

// ============================================================================
// 2. B-TREE (ORDER M) NODE STRUCT ARCHITECTURE FOR DATABASE STORAGE
// ============================================================================
#define B_TREE_ORDER 4 // 2-3-4 Tree (Max keys = 3, Max children = 4)

typedef struct BTreeNode {
    int keys[B_TREE_ORDER - 1];              // Up to 3 keys per node
    struct BTreeNode* children[B_TREE_ORDER]; // Up to 4 child pointers
    int numKeys;                              // Current number of keys
    bool isLeaf;                              // True if leaf node
} BTreeNode;

BTreeNode* createBTreeNode(bool isLeaf) {
    BTreeNode* node = (BTreeNode*)malloc(sizeof(BTreeNode));
    if (!node) return NULL;
    node->isLeaf = isLeaf;
    node->numKeys = 0;
    for (int i = 0; i < B_TREE_ORDER; i++) {
        node->children[i] = NULL;
    }
    return node;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - FENWICK TREE & B-TREE NODE DEMO           \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int rawData[] = {3, 2, -1, 6, 5, 4, -3, 3, 7, 2};
    int n = sizeof(rawData) / sizeof(rawData[0]);

    printf("1. Initial Array (1-based, size %d):\n   ", n);
    for (int i = 0; i < n; i++) printf("%d ", rawData[i]);
    printf("\n\n");

    FenwickTree* ft = createFenwickTree(n);

    // Build Fenwick tree in O(N log N) by point additions
    for (int i = 0; i < n; i++) {
        fenwickAdd(ft, i + 1, rawData[i]);
    }
    printf("✓ Fenwick Tree (BIT) constructed using lowbit bitwise math.\n\n");

    // Prefix & Range Sum Queries
    printf("2. Testing Fenwick Range Queries:\n");
    printf("   • Prefix Sum [1..5] (3+2-1+6+5):       %d\n", fenwickQueryPrefix(ft, 5));
    printf("   • Range Sum [3..7] (-1+6+5+4-3):       %d\n", fenwickQueryRange(ft, 3, 7));
    printf("   • Total Array Sum [1..10]:             %d\n\n", fenwickQueryRange(ft, 1, 10));

    // Dynamic Point Update: add +10 to index 4 (value was 6, now 16)
    printf("3. Performing Point Update: Add +10 to element at index 4...\n");
    fenwickAdd(ft, 4, 10);
    printf("   • New Range Sum [3..7] (Was 11, now 21): %d\n\n", fenwickQueryRange(ft, 3, 7));

    // B-Tree Node Architecture Demo
    printf("4. B-Tree (Order %d) Storage Block Blueprint:\n", B_TREE_ORDER);
    BTreeNode* root = createBTreeNode(true);
    root->keys[0] = 10;
    root->keys[1] = 20;
    root->keys[2] = 30;
    root->numKeys = 3;

    printf("   • Node Struct Size in RAM: %zu bytes (Direct Disk Block Alignment)\n", sizeof(BTreeNode));
    printf("   • Node Keys Stored: [%d, %d, %d] (Max Capacity: %d keys)\n",
           root->keys[0], root->keys[1], root->keys[2], B_TREE_ORDER - 1);
    printf("   • Is Leaf Node: %s\n\n", root->isLeaf ? "TRUE" : "FALSE");

    free(root);
    freeFenwickTree(ft);
    printf("✓ All test resources freed successfully.\n");

    return 0;
}
