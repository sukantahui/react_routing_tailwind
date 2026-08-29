/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: MST (Kruskal, Prim) & Shortest Path (Dijkstra, Bellman-Ford)
 * File: ShortestPathDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>

#define INF INT_MAX

// Structure for weighted edge
typedef struct Edge {
    int src, dest, weight;
} Edge;

// Comparator for qsort in Kruskal's algorithm
int compareEdges(const void* a, const void* b) {
    Edge* edgeA = (Edge*)a;
    Edge* edgeB = (Edge*)b;
    return edgeA->weight - edgeB->weight;
}

// Simple DSU for Kruskal
typedef struct DSU {
    int* parent;
    int* rank;
} DSU;

DSU* createSimpleDSU(int n) {
    DSU* dsu = (DSU*)malloc(sizeof(DSU));
    dsu->parent = (int*)malloc(n * sizeof(int));
    dsu->rank = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i;
        dsu->rank[i] = 0;
    }
    return dsu;
}

int findDSURoot(DSU* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    return dsu->parent[i] = findDSURoot(dsu, dsu->parent[i]);
}

bool unionDSU(DSU* dsu, int u, int v) {
    int rootU = findDSURoot(dsu, u);
    int rootV = findDSURoot(dsu, v);
    if (rootU == rootV) return false;

    if (dsu->rank[rootU] < dsu->rank[rootV]) {
        dsu->parent[rootU] = rootV;
    } else if (dsu->rank[rootU] > dsu->rank[rootV]) {
        dsu->parent[rootV] = rootU;
    } else {
        dsu->parent[rootV] = rootU;
        dsu->rank[rootU]++;
    }
    return true;
}

// 1. Kruskal's Minimum Spanning Tree (MST) in O(E log E)
void kruskalMST(Edge edges[], int V, int E) {
    qsort(edges, E, sizeof(Edge), compareEdges);

    DSU* dsu = createSimpleDSU(V);
    Edge* result = (Edge*)malloc((V - 1) * sizeof(Edge));
    int eCount = 0;
    int totalCost = 0;

    for (int i = 0; i < E && eCount < V - 1; i++) {
        Edge nextEdge = edges[i];
        if (unionDSU(dsu, nextEdge.src, nextEdge.dest)) {
            result[eCount++] = nextEdge;
            totalCost += nextEdge.weight;
        }
    }

    printf("1. Kruskal's Minimum Spanning Tree (MST):\n");
    printf("   Selected Edges in MST:\n");
    for (int i = 0; i < eCount; i++) {
        printf("   • (%d - %d) with weight %d\n", result[i].src, result[i].dest, result[i].weight);
    }
    printf("   -> Total MST Cost: %d units\n\n", totalCost);

    free(dsu->parent);
    free(dsu->rank);
    free(dsu);
    free(result);
}

// 2. Dijkstra's Single-Source Shortest Path Algorithm
void dijkstra(int V, int graph[V][V], int src) {
    int* dist = (int*)malloc(V * sizeof(int));
    bool* visited = (bool*)calloc(V, sizeof(bool));

    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        // Pick vertex with minimum distance from unvisited set
        int minVal = INF, minIdx = -1;
        for (int v = 0; v < V; v++) {
            if (!visited[v] && dist[v] <= minVal) {
                minVal = dist[v];
                minIdx = v;
            }
        }

        if (minIdx == -1) break;
        int u = minIdx;
        visited[u] = true;

        // Relax adjacent vertices
        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] != 0 && dist[u] != INF &&
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    printf("2. Dijkstra's Shortest Path from Source Node %d:\n", src);
    printf("   Destination Node     Shortest Distance\n");
    printf("   --------------------------------------\n");
    for (int i = 0; i < V; i++) {
        if (dist[i] == INF) {
            printf("   Node %d               INF (Unreachable)\n", i);
        } else {
            printf("   Node %d               %d units\n", i, dist[i]);
        }
    }
    printf("\n");

    free(dist);
    free(visited);
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - MST & SHORTEST PATH ENGINES DEMO          \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // Kruskal test graph
    int V_kruskal = 4, E_kruskal = 5;
    Edge edges[] = {
        {0, 1, 10},
        {0, 2, 6},
        {0, 3, 5},
        {1, 3, 15},
        {2, 3, 4}
    };
    kruskalMST(edges, V_kruskal, E_kruskal);

    // Dijkstra test graph (5 vertices)
    int V_dijkstra = 5;
    int adjMatrix[5][5] = {
        {0, 4, 2, 0, 0},
        {4, 0, 1, 5, 0},
        {2, 1, 0, 8, 10},
        {0, 5, 8, 0, 2},
        {0, 0, 10, 2, 0}
    };

    dijkstra(V_dijkstra, adjMatrix, 0);

    return 0;
}
