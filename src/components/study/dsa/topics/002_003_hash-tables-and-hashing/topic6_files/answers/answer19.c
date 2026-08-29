#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key, val;
    struct Node *prev, *next;
} Node;

typedef struct {
    int capacity, count;
    Node *head, *tail;
    Node *hash_map[100];
} LRUCache;

void init_lru(LRUCache *c, int cap) {
    c->capacity = cap; c->count = 0;
    c->head = (Node*)malloc(sizeof(Node));
    c->tail = (Node*)malloc(sizeof(Node));
    c->head->next = c->tail; c->tail->prev = c->head;
    for (int i = 0; i < 100; i++) c->hash_map[i] = NULL;
}

int main() {
    LRUCache cache; init_lru(&cache, 2);
    printf("--- Custom O(1) LRU Cache ---\nInitialized Capacity 2 LRU Cache successfully.\n");
    return 0;
}
