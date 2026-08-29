#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 5

// Adjacency List Node
typedef struct AdjListNode {
    int dest;
    int weight;
    struct AdjListNode *next;
} AdjListNode;

// Graph Structure (Adjacency List)
typedef struct {
    AdjListNode *head[MAX_VERTICES];
} Graph;

AdjListNode* createAdjNode(int dest, int weight) {
    AdjListNode *newNode = (AdjListNode *)malloc(sizeof(AdjListNode));
    newNode->dest = dest;
    newNode->weight = weight;
    newNode->next = NULL;
    return newNode;
}

void initGraph(Graph *g) {
    for (int i = 0; i < MAX_VERTICES; i++) {
        g->head[i] = NULL;
    }
}

// Add Undirected Weighted Edge
void addEdge(Graph *g, int src, int dest, int weight) {
    // Add edge src -> dest
    AdjListNode *newNode = createAdjNode(dest, weight);
    newNode->next = g->head[src];
    g->head[src] = newNode;

    // Add edge dest -> src (Undirected)
    newNode = createAdjNode(src, weight);
    newNode->next = g->head[dest];
    g->head[dest] = newNode;
}

// Breadth-First Search (BFS) Traversal using Queue
void BFS(Graph *g, int startVertex) {
    bool visited[MAX_VERTICES] = {false};
    int queue[MAX_VERTICES];
    int front = 0, rear = 0;

    visited[startVertex] = true;
    queue[rear++] = startVertex;

    printf("BFS Traversal starting from vertex %d: ", startVertex);

    while (front < rear) {
        int curr = queue[front++];
        printf("%d ", curr);

        AdjListNode *temp = g->head[curr];
        while (temp != NULL) {
            int adjVertex = temp->dest;
            if (!visited[adjVertex]) {
                visited[adjVertex] = true;
                queue[rear++] = adjVertex;
            }
            temp = temp->next;
        }
    }
    printf("\n");
}

// Depth-First Search (DFS) Helper
void DFSUtil(Graph *g, int vertex, bool visited[]) {
    visited[vertex] = true;
    printf("%d ", vertex);

    AdjListNode *temp = g->head[vertex];
    while (temp != NULL) {
        int connectedVertex = temp->dest;
        if (!visited[connectedVertex]) {
            DFSUtil(g, connectedVertex, visited);
        }
        temp = temp->next;
    }
}

void DFS(Graph *g, int startVertex) {
    bool visited[MAX_VERTICES] = {false};
    printf("DFS Traversal starting from vertex %d: ", startVertex);
    DFSUtil(g, startVertex, visited);
    printf("\n");
}

void printGraph(Graph *g) {
    printf("\n--- Graph Adjacency List Structure ---\n");
    for (int v = 0; v < MAX_VERTICES; v++) {
        printf("Vertex [%d]: ", v);
        AdjListNode *temp = g->head[v];
        while (temp != NULL) {
            printf("-> (Node %d, Wt: %d) ", temp->dest, temp->weight);
            temp = temp->next;
        }
        printf("\n");
    }
    printf("--------------------------------------\n\n");
}

int main() {
    printf("=== Graph Adjacency List & BFS/DFS Traversals in C ===\n\n");
    Graph g;
    initGraph(&g);

    addEdge(&g, 0, 1, 4);
    addEdge(&g, 0, 2, 2);
    addEdge(&g, 1, 2, 1);
    addEdge(&g, 1, 3, 5);
    addEdge(&g, 2, 3, 8);
    addEdge(&g, 3, 4, 3);

    printGraph(&g);

    BFS(&g, 0);
    DFS(&g, 0);

    return 0;
}
