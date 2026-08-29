/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Kosaraju's SCC, Tarjan's Bridges & Ford-Fulkerson Network Flow
 * File: SCCBridgesFlowDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Adjacency List for Directed Graph
typedef struct Node {
    int dest;
    struct Node* next;
} Node;

typedef struct Graph {
    int V;
    Node** adj;
} Graph;

Graph* createGraph(int V) {
    Graph* g = (Graph*)malloc(sizeof(Graph));
    g->V = V;
    g->adj = (Node**)malloc(V * sizeof(Node*));
    for (int i = 0; i < V; i++) g->adj[i] = NULL;
    return g;
}

void addEdge(Graph* g, int u, int v) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->dest = v;
    newNode->next = g->adj[u];
    g->adj[u] = newNode;
}

// 1. Kosaraju's Algorithm for Strongly Connected Components (SCC)
void fillOrder(Graph* g, int v, bool visited[], int stack[], int* top) {
    visited[v] = true;
    Node* curr = g->adj[v];
    while (curr != NULL) {
        if (!visited[curr->dest]) {
            fillOrder(g, curr->dest, visited, stack, top);
        }
        curr = curr->next;
    }
    stack[++(*top)] = v; // Push to finish-time stack
}

Graph* getTranspose(Graph* g) {
    Graph* gT = createGraph(g->V);
    for (int v = 0; v < g->V; v++) {
        Node* curr = g->adj[v];
        while (curr != NULL) {
            addEdge(gT, curr->dest, v); // Reverse edge direction
            curr = curr->next;
        }
    }
    return gT;
}

void printSCCDFS(Graph* gT, int v, bool visited[]) {
    visited[v] = true;
    printf("%d ", v);
    Node* curr = gT->adj[v];
    while (curr != NULL) {
        if (!visited[curr->dest]) {
            printSCCDFS(gT, curr->dest, visited);
        }
        curr = curr->next;
    }
}

void findSCCsKosaraju(Graph* g) {
    int V = g->V;
    int* stack = (int*)malloc(V * sizeof(int));
    int top = -1;
    bool* visited = (bool*)calloc(V, sizeof(bool));

    // Step 1: Fill vertices in stack according to finish times
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            fillOrder(g, i, visited, stack, &top);
        }
    }

    // Step 2: Create reversed/transposed graph
    Graph* gT = getTranspose(g);

    // Step 3: Process all vertices in order defined by stack
    for (int i = 0; i < V; i++) visited[i] = false;

    printf("1. Kosaraju's Strongly Connected Components (SCCs):\n");
    int sccCount = 0;
    while (top >= 0) {
        int v = stack[top--];
        if (!visited[v]) {
            sccCount++;
            printf("   • SCC #%d: { ", sccCount);
            printSCCDFS(gT, v, visited);
            printf("}\n");
        }
    }
    printf("   -> Total SCCs: %d\n\n", sccCount);

    free(stack);
    free(visited);
    // Free gT
    for (int i = 0; i < V; i++) {
        Node* curr = gT->adj[i];
        while (curr) { Node* temp = curr; curr = curr->next; free(temp); }
    }
    free(gT->adj);
    free(gT);
}

// 2. Tarjan's Bridge Finding in Undirected Graph
static void bridgeDFS(Graph* g, int u, int parent, bool visited[], int tin[], int low[], int* timer) {
    visited[u] = true;
    tin[u] = low[u] = ++(*timer);

    Node* curr = g->adj[u];
    while (curr != NULL) {
        int v = curr->dest;
        if (v == parent) {
            curr = curr->next;
            continue;
        }

        if (visited[v]) {
            // Back-edge
            low[u] = (tin[v] < low[u]) ? tin[v] : low[u];
        } else {
            // Forward-edge
            bridgeDFS(g, v, u, visited, tin, low, timer);
            low[u] = (low[v] < low[u]) ? low[v] : low[u];

            // Bridge Condition: If lowest reachable node from v is strictly after u
            if (low[v] > tin[u]) {
                printf("   • Critical Bridge Edge: (%d - %d)\n", u, v);
            }
        }
        curr = curr->next;
    }
}

void findBridges(Graph* g) {
    int V = g->V;
    bool* visited = (bool*)calloc(V, sizeof(bool));
    int* tin = (int*)malloc(V * sizeof(int));
    int* low = (int*)malloc(V * sizeof(int));
    int timer = 0;

    printf("2. Critical Infrastructure Bridges (Tarjan's Low-Link):\n");
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            bridgeDFS(g, i, -1, visited, tin, low, &timer);
        }
    }
    printf("\n");

    free(visited);
    free(tin);
    free(low);
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - SCC & CRITICAL BRIDGES DEMO               \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // 1. Kosaraju Directed Graph with 5 vertices
    Graph* gSCC = createGraph(5);
    addEdge(gSCC, 1, 0);
    addEdge(gSCC, 0, 2);
    addEdge(gSCC, 2, 1);
    addEdge(gSCC, 0, 3);
    addEdge(gSCC, 3, 4);

    findSCCsKosaraju(gSCC);

    // 2. Undirected Bridge Test Graph
    Graph* gBridge = createGraph(5);
    // Add bidirectional edges
    addEdge(gBridge, 1, 0); addEdge(gBridge, 0, 1);
    addEdge(gBridge, 0, 2); addEdge(gBridge, 2, 0);
    addEdge(gBridge, 1, 2); addEdge(gBridge, 2, 1);
    addEdge(gBridge, 0, 3); addEdge(gBridge, 3, 0);
    addEdge(gBridge, 3, 4); addEdge(gBridge, 4, 3);

    findBridges(gBridge);

    // Cleanup gSCC
    for (int i = 0; i < 5; i++) {
        Node* curr = gSCC->adj[i];
        while (curr) { Node* temp = curr; curr = curr->next; free(temp); }
    }
    free(gSCC->adj); free(gSCC);

    // Cleanup gBridge
    for (int i = 0; i < 5; i++) {
        Node* curr = gBridge->adj[i];
        while (curr) { Node* temp = curr; curr = curr->next; free(temp); }
    }
    free(gBridge->adj); free(gBridge);

    return 0;
}
