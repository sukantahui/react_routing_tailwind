#include <stdio.h>
#include <stdbool.h>

#define MAXV 10

typedef struct {
    int adj[MAXV][MAXV];
    int num_vertices;
} GraphMatrix;

void init_matrix(GraphMatrix *g, int v) {
    g->num_vertices = v;
    for (int i = 0; i < v; i++)
        for (int j = 0; j < v; j++) g->adj[i][j] = 0;
}

void add_edge_matrix(GraphMatrix *g, int u, int v) {
    g->adj[u][v] = 1;
    g->adj[v][u] = 1; // Undirected
}

int main() {
    GraphMatrix g;
    init_matrix(&g, 4);
    add_edge_matrix(&g, 0, 1); add_edge_matrix(&g, 1, 2);
    printf("--- Graph Adjacency Matrix ---\nEdge (0,1): %d, Edge (0,2): %d\n", g.adj[0][1], g.adj[0][2]);
    return 0;
}
