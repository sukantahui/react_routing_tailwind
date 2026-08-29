/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Graph Representations, BFS, DFS & Kahn's Topological Sort
 * File: GraphTraversalsDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Adjacency List Node
typedef struct AdjListNode {
    int dest;
    struct AdjListNode* next;
} AdjListNode;

// Graph Struct
typedef struct Graph {
    int V; // Number of vertices
    AdjListNode** adjLists; // Array of adjacency lists
} Graph;

// Create adjacency list node
AdjListNode* createAdjNode(int dest) {
    AdjListNode* newNode = (AdjListNode*)malloc(sizeof(AdjListNode));
    if (!newNode) return NULL;
    newNode->dest = dest;
    newNode->next = NULL;
    return newNode;
}

// Create Graph with V vertices
Graph* createGraph(int V) {
    Graph* graph = (Graph*)malloc(sizeof(Graph));
    if (!graph) return NULL;
    graph->V = V;
    graph->adjLists = (AdjListNode**)malloc(V * sizeof(AdjListNode*));
    for (int i = 0; i < V; i++) {
        graph->adjLists[i] = NULL;
    }
    return graph;
}

// Add Directed Edge from src to dest
void addDirectedEdge(Graph* graph, int src, int dest) {
    AdjListNode* newNode = createAdjNode(dest);
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;
}

// Add Undirected Edge
void addUndirectedEdge(Graph* graph, int u, int v) {
    addDirectedEdge(graph, u, v);
    addDirectedEdge(graph, v, u);
}

// 1. Breadth-First Search (BFS) using dynamic Queue in O(V + E)
void BFS(Graph* graph, int startVertex) {
    bool* visited = (bool*)calloc(graph->V, sizeof(bool));
    int* queue = (int*)malloc(graph->V * sizeof(int));
    int front = 0, rear = 0;

    visited[startVertex] = true;
    queue[rear++] = startVertex;

    printf("   BFS Traversal starting from %d: [", startVertex);
    bool first = true;

    while (front < rear) {
        int curr = queue[front++];
        if (!first) printf(", ");
        printf("%d", curr);
        first = false;

        AdjListNode* temp = graph->adjLists[curr];
        while (temp != NULL) {
            int adjVertex = temp->dest;
            if (!visited[adjVertex]) {
                visited[adjVertex] = true;
                queue[rear++] = adjVertex;
            }
            temp = temp->next;
        }
    }
    printf("]\n");

    free(visited);
    free(queue);
}

// 2. Depth-First Search (DFS) Helper
static void DFSRecursive(Graph* graph, int vertex, bool visited[], bool* first) {
    visited[vertex] = true;
    if (!(*first)) printf(", ");
    printf("%d", vertex);
    *first = false;

    AdjListNode* temp = graph->adjLists[vertex];
    while (temp != NULL) {
        int adjVertex = temp->dest;
        if (!visited[adjVertex]) {
            DFSRecursive(graph, adjVertex, visited, first);
        }
        temp = temp->next;
    }
}

void DFS(Graph* graph, int startVertex) {
    bool* visited = (bool*)calloc(graph->V, sizeof(bool));
    bool first = true;
    printf("   DFS Traversal starting from %d: [", startVertex);
    DFSRecursive(graph, startVertex, visited, &first);
    printf("]\n");
    free(visited);
}

// 3. Kahn's Algorithm for Topological Sort (DAG) via In-Degree Queue
void topologicalSortKahn(Graph* graph) {
    int V = graph->V;
    int* inDegree = (int*)calloc(V, sizeof(int));

    // Compute in-degrees of all vertices
    for (int i = 0; i < V; i++) {
        AdjListNode* temp = graph->adjLists[i];
        while (temp != NULL) {
            inDegree[temp->dest]++;
            temp = temp->next;
        }
    }

    int* queue = (int*)malloc(V * sizeof(int));
    int front = 0, rear = 0;

    // Enqueue vertices with 0 in-degree
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            queue[rear++] = i;
        }
    }

    int count = 0;
    int* topoOrder = (int*)malloc(V * sizeof(int));

    while (front < rear) {
        int u = queue[front++];
        topoOrder[count++] = u;

        AdjListNode* temp = graph->adjLists[u];
        while (temp != NULL) {
            int v = temp->dest;
            if (--inDegree[v] == 0) {
                queue[rear++] = v;
            }
            temp = temp->next;
        }
    }

    if (count != V) {
        printf("   Graph contains a cycle! Topological sort is impossible.\n");
    } else {
        printf("   Topological Order (Kahn's DAG): [");
        for (int i = 0; i < V; i++) {
            printf("%d%s", topoOrder[i], i == V - 1 ? "" : " -> ");
        }
        printf("]\n");
    }

    free(inDegree);
    free(queue);
    free(topoOrder);
}

// Free Graph Memory
void freeGraph(Graph* graph) {
    if (!graph) return;
    for (int i = 0; i < graph->V; i++) {
        AdjListNode* curr = graph->adjLists[i];
        while (curr != NULL) {
            AdjListNode* temp = curr;
            curr = curr->next;
            free(temp);
        }
    }
    free(graph->adjLists);
    free(graph);
}

int main(void) {
    printf("=================================================================\n");
    printf("   CODER & ACCOTAX - GRAPH TRAVERSALS & TOPOLOGICAL SORT DEMO    \n");
    printf("   Mentor: Sukanta Hui · Barrackpore Lab Demonstration           \n");
    printf("=================================================================\n\n");

    // Create DAG with 6 tasks (0 to 5)
    Graph* dag = createGraph(6);
    addDirectedEdge(dag, 5, 2);
    addDirectedEdge(dag, 5, 0);
    addDirectedEdge(dag, 4, 0);
    addDirectedEdge(dag, 4, 1);
    addDirectedEdge(dag, 2, 3);
    addDirectedEdge(dag, 3, 1);

    printf("1. Directed Acyclic Graph (DAG) with 6 vertices & 6 dependency edges:\n");
    BFS(dag, 5);
    DFS(dag, 5);
    printf("\n");

    printf("2. Computing Topological Sort via Kahn's Algorithm:\n");
    topologicalSortKahn(dag);
    printf("\n");

    freeGraph(dag);
    printf("✓ Graph memory successfully released.\n");

    return 0;
}
