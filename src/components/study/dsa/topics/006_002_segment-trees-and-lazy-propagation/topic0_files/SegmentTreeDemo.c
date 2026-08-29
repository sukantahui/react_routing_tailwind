/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Segment Trees with Lazy Propagation for O(log N) Range Updates
 * File: SegmentTreeDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct SegmentTree {
    int* tree; // Array-based binary tree of size 4 * N
    int* lazy; // Lazy values waiting to be propagated downwards
    int n;
} SegmentTree;

// Initialize Segment Tree
SegmentTree* createSegmentTree(int n) {
    SegmentTree* st = (SegmentTree*)malloc(sizeof(SegmentTree));
    if (!st) return NULL;

    st->n = n;
    st->tree = (int*)calloc(4 * n, sizeof(int));
    st->lazy = (int*)calloc(4 * n, sizeof(int));
    return st;
}

// Build the Segment Tree in O(N) from source array
void buildTree(SegmentTree* st, const int arr[], int node, int start, int end) {
    if (start == end) {
        st->tree[node] = arr[start];
        return;
    }

    int mid = start + (end - start) / 2;
    int leftChild = 2 * node;
    int rightChild = 2 * node + 1;

    buildTree(st, arr, leftChild, start, mid);
    buildTree(st, arr, rightChild, mid + 1, end);

    st->tree[node] = st->tree[leftChild] + st->tree[rightChild];
}

// Push pending lazy updates to child nodes
static void pushDown(SegmentTree* st, int node, int start, int end) {
    if (st->lazy[node] != 0) {
        int val = st->lazy[node];
        int mid = start + (end - start) / 2;
        int leftChild = 2 * node;
        int rightChild = 2 * node + 1;

        // Apply to left child
        st->tree[leftChild] += val * (mid - start + 1);
        st->lazy[leftChild] += val;

        // Apply to right child
        st->tree[rightChild] += val * (end - mid);
        st->lazy[rightChild] += val;

        st->lazy[node] = 0; // Clear current lazy state
    }
}

// Range Update with Lazy Propagation in O(log N)
void updateRangeLazy(SegmentTree* st, int node, int start, int end, int l, int r, int val) {
    // Current segment is completely outside query range
    if (r < start || end < l) {
        return;
    }

    // Current segment is completely inside query range
    if (l <= start && end <= r) {
        st->tree[node] += val * (end - start + 1);
        if (start != end) {
            st->lazy[node] += val; // Mark node as having pending updates for children
        }
        return;
    }

    // Partial overlap: Push down lazy values first
    pushDown(st, node, start, end);

    int mid = start + (end - start) / 2;
    int leftChild = 2 * node;
    int rightChild = 2 * node + 1;

    updateRangeLazy(st, leftChild, start, mid, l, r, val);
    updateRangeLazy(st, rightChild, mid + 1, end, l, r, val);

    st->tree[node] = st->tree[leftChild] + st->tree[rightChild];
}

// Range Sum Query with Lazy Propagation in O(log N)
int queryRangeSum(SegmentTree* st, int node, int start, int end, int l, int r) {
    // Completely outside
    if (r < start || end < l) {
        return 0;
    }

    // Completely inside
    if (l <= start && end <= r) {
        return st->tree[node];
    }

    // Partial overlap: Push down lazy updates
    pushDown(st, node, start, end);

    int mid = start + (end - start) / 2;
    int leftChild = 2 * node;
    int rightChild = 2 * node + 1;

    int leftSum = queryRangeSum(st, leftChild, start, mid, l, r);
    int rightSum = queryRangeSum(st, rightChild, mid + 1, end, l, r);

    return leftSum + rightSum;
}

void freeSegmentTree(SegmentTree* st) {
    if (st) {
        free(st->tree);
        free(st->lazy);
        free(st);
    }
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - SEGMENT TREE & LAZY PROPAGATION DEMO      \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int rawData[] = {1, 3, 5, 7, 9, 11};
    int n = sizeof(rawData) / sizeof(rawData[0]);

    SegmentTree* st = createSegmentTree(n);
    buildTree(st, rawData, 1, 0, n - 1);

    printf("1. Initial Array: {1, 3, 5, 7, 9, 11} (Size: %d)\n", n);
    printf("   Segment Tree successfully built in O(N) time.\n\n");

    // Range Queries before updates
    printf("2. Initial Range Queries:\n");
    printf("   • Query Sum [1..3] (Values: 3+5+7): %d\n", queryRangeSum(st, 1, 0, n - 1, 1, 3));
    printf("   • Query Sum [0..5] (Total Sum):     %d\n\n", queryRangeSum(st, 1, 0, n - 1, 0, 5));

    // Lazy Range Update: Add 10 to indices 1 through 4
    printf("3. Performing Lazy Range Update: Add +10 to range [1..4]...\n");
    updateRangeLazy(st, 1, 0, n - 1, 1, 4, 10);
    printf("   ✓ Range update completed in O(log N) time using lazy propagation.\n\n");

    // Range Queries after update
    printf("4. Range Queries After Update:\n");
    printf("   • Query Sum [1..3] (Was 15, now 15 + 3*10 = 45): %d\n", queryRangeSum(st, 1, 0, n - 1, 1, 3));
    printf("   • Query Sum [0..5] (Was 36, now 36 + 4*10 = 76): %d\n", queryRangeSum(st, 1, 0, n - 1, 0, 5));
    printf("   • Query Sum [0..0] (Index 0 untouched, value 1):  %d\n\n", queryRangeSum(st, 1, 0, n - 1, 0, 0));

    freeSegmentTree(st);
    printf("   ✓ Segment Tree heap memory safely freed.\n");

    return 0;
}
