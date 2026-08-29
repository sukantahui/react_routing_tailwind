#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int vertex;
    struct Node *next;
} Node;

typedef struct {
    Node **head;
    int num_vertices;
} GraphList;

GraphList* create_graph_list(int v) {
    GraphList *g = (GraphList*)malloc(sizeof(GraphList));
    g->num_vertices = v;
    g->head = (Node**)calloc(v, sizeof(Node*));
    return g;
}

void add_edge_list(GraphList *g, int u, int v) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->vertex = v;
    newNode->next = g->head[u];
    g->head[u] = newNode;
}

int main() {
    GraphList *g = create_graph_list(4);
    add_edge_list(g, 0, 1); add_edge_list(g, 0, 2);
    printf("--- Graph Adjacency List ---\nNeighbors of 0: ");
    for (Node *curr = g->head[0]; curr; curr = curr->next) printf("%d ", curr->vertex);
    printf("\n");
    return 0;
}
