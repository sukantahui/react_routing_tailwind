#include <stdio.h>
#include <stdlib.h>

#define SIZE 7

typedef struct Node {
    int key;
    struct Node *next;
} Node;

Node* table[SIZE];

int hash_func(int key) { return key % SIZE; }

void insert_chain(int key) {
    int idx = hash_func(key);
    Node *n = (Node*)malloc(sizeof(Node));
    n->key = key; n->next = table[idx];
    table[idx] = n;
}

void print_chain() {
    printf("--- Separate Chaining Hash Table ---\n");
    for (int i = 0; i < SIZE; i++) {
        printf("Bucket %d: ", i);
        Node *curr = table[i];
        while (curr) { printf("%d -> ", curr->key); curr = curr->next; }
        printf("NULL\n");
    }
}

int main() {
    insert_chain(15); insert_chain(22); insert_chain(29); insert_chain(36);
    print_chain();
    return 0;
}
