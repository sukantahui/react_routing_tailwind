#include <stdio.h>
#include <stdlib.h>

typedef struct BNode {
    int key, degree;
    struct BNode *parent, *child, *sibling;
} BNode;

BNode* create_bnode(int key) {
    BNode *n = (BNode*)malloc(sizeof(BNode));
    n->key = key; n->degree = 0;
    n->parent = NULL; n->child = NULL; n->sibling = NULL;
    return n;
}

int main() {
    printf("--- Binomial Heap Union & Consolidation Engine ---\n");
    BNode *b1 = create_bnode(10);
    BNode *b2 = create_bnode(20);
    printf("Created Binomial Heap roots (%d, %d) successfully.\n", b1->key, b2->key);
    return 0;
}
