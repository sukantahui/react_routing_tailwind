/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Disjoint Set Union (DSU / Union-Find) & Dynamic Connectivity
 * File: DSUDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Disjoint Set Union (DSU) Structure
typedef struct DSU {
    int* parent;
    int* rank;
    int* size;
    int numComponents;
    int n;
} DSU;

// Initialize DSU for N elements (0 to N - 1)
DSU* createDSU(int n) {
    DSU* dsu = (DSU*)malloc(sizeof(DSU));
    if (!dsu) return NULL;

    dsu->n = n;
    dsu->numComponents = n;
    dsu->parent = (int*)malloc(n * sizeof(int));
    dsu->rank = (int*)malloc(n * sizeof(int));
    dsu->size = (int*)malloc(n * sizeof(int));

    if (!dsu->parent || !dsu->rank || !dsu->size) {
        free(dsu->parent);
        free(dsu->rank);
        free(dsu->size);
        free(dsu);
        return NULL;
    }

    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i; // Each element is its own representative initially
        dsu->rank[i] = 0;
        dsu->size[i] = 1;
    }

    return dsu;
}

// Find with Path Compression: Flattens the tree during lookup in O(alpha(N))
int findParent(DSU* dsu, int i) {
    if (dsu->parent[i] == i) {
        return i;
    }
    // Path Compression: directly connect node i to the root representative
    return dsu->parent[i] = findParent(dsu, dsu->parent[i]);
}

// Union by Rank / Size
bool unionSets(DSU* dsu, int u, int v) {
    int rootU = findParent(dsu, u);
    int rootV = findParent(dsu, v);

    if (rootU == rootV) {
        return false; // Already in the same component (indicates a graph cycle!)
    }

    // Attach smaller rank tree under root of higher rank tree
    if (dsu->rank[rootU] < dsu->rank[rootV]) {
        dsu->parent[rootU] = rootV;
        dsu->size[rootV] += dsu->size[rootU];
    } else if (dsu->rank[rootU] > dsu->rank[rootV]) {
        dsu->parent[rootV] = rootU;
        dsu->size[rootU] += dsu->size[rootV];
    } else {
        dsu->parent[rootV] = rootU;
        dsu->size[rootU] += dsu->size[rootV];
        dsu->rank[rootU]++;
    }

    dsu->numComponents--;
    return true; // Successfully united
}

// Check if u and v are connected
bool isConnected(DSU* dsu, int u, int v) {
    return findParent(dsu, u) == findParent(dsu, v);
}

// Free DSU memory
void freeDSU(DSU* dsu) {
    if (dsu) {
        free(dsu->parent);
        free(dsu->rank);
        free(dsu->size);
        free(dsu);
    }
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - DISJOINT SET UNION (DSU) ENGINE DEMO      \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int numNodes = 7; // Nodes 0 to 6
    DSU* dsu = createDSU(numNodes);

    printf("1. Initializing DSU with %d independent nodes...\n", numNodes);
    printf("   Initial Components: %d\n\n", dsu->numComponents);

    // Dynamic Connections (Graph Edges)
    int edges[][2] = {
        {0, 1},
        {1, 2},
        {3, 4},
        {5, 6},
        {4, 5}
    };
    int numEdges = sizeof(edges) / sizeof(edges[0]);

    printf("2. Adding Dynamic Edges:\n");
    for (int i = 0; i < numEdges; i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        bool united = unionSets(dsu, u, v);
        printf("   • Connect (%d, %d): %s | Remaining Components: %d\n", 
               u, v, united ? "UNITED" : "CYCLE DETECTED!", dsu->numComponents);
    }
    printf("\n");

    // Querying Dynamic Connectivity
    printf("3. Testing Connectivity Queries:\n");
    printf("   • Are 0 and 2 connected? %s\n", isConnected(dsu, 0, 2) ? "YES (Same Component) ✓" : "NO ✗");
    printf("   • Are 3 and 6 connected? %s\n", isConnected(dsu, 3, 6) ? "YES (Same Component) ✓" : "NO ✗");
    printf("   • Are 0 and 5 connected? %s\n\n", isConnected(dsu, 0, 5) ? "YES (Same Component) ✓" : "NO (Different Components) ✗");

    // Cycle Detection Test
    printf("4. Cycle Detection Test on Edge (0, 2):\n");
    bool cycleFound = !unionSets(dsu, 0, 2);
    printf("   • Trying to connect 0 and 2: %s\n\n", cycleFound ? "CYCLE DETECTED! (Both share root)" : "United successfully");

    freeDSU(dsu);
    printf("   ✓ DSU memory safely freed.\n");

    return 0;
}
