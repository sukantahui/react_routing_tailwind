/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: DSA Capstone Project: High-Performance Memory Cache Engine
 * File: DSACapstoneEngineDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define CACHE_CAPACITY 4
#define HASH_BUCKETS 16

// Doubly Linked List Node for LRU Ordering
typedef struct CacheNode {
    char key[32];
    int value;
    struct CacheNode* prev;
    struct CacheNode* next;
} CacheNode;

// Hash Bucket for O(1) Key Lookup
typedef struct HashBucket {
    CacheNode* head;
} HashBucket;

typedef struct LRUCache {
    int size;
    int capacity;
    CacheNode* head; // Most Recently Used (MRU)
    CacheNode* tail; // Least Recently Used (LRU)
    HashBucket table[HASH_BUCKETS];
} LRUCache;

static unsigned int hashKey(const char* str) {
    unsigned int hash = 5381;
    int c;
    while ((c = *str++)) hash = ((hash << 5) + hash) + c;
    return hash % HASH_BUCKETS;
}

LRUCache* createCache(int capacity) {
    LRUCache* cache = (LRUCache*)malloc(sizeof(LRUCache));
    cache->size = 0;
    cache->capacity = capacity;
    cache->head = NULL;
    cache->tail = NULL;
    for (int i = 0; i < HASH_BUCKETS; i++) cache->table[i].head = NULL;
    return cache;
}

void detachNode(LRUCache* cache, CacheNode* node) {
    if (node->prev) node->prev->next = node->next;
    else cache->head = node->next;

    if (node->next) node->next->prev = node->prev;
    else cache->tail = node->prev;

    node->prev = node->next = NULL;
}

void attachToFront(LRUCache* cache, CacheNode* node) {
    node->next = cache->head;
    node->prev = NULL;
    if (cache->head) cache->head->prev = node;
    cache->head = node;
    if (!cache->tail) cache->tail = node;
}

int cacheGet(LRUCache* cache, const char* key) {
    unsigned int b = hashKey(key);
    CacheNode* curr = cache->table[b].head;
    while (curr) {
        if (strcmp(curr->key, key) == 0) {
            // Move accessed node to front (MRU)
            detachNode(cache, curr);
            attachToFront(cache, curr);
            return curr->value;
        }
        curr = curr->next;
    }
    return -1; // Cache miss
}

void cachePut(LRUCache* cache, const char* key, int value) {
    unsigned int b = hashKey(key);
    CacheNode* curr = cache->table[b].head;
    while (curr) {
        if (strcmp(curr->key, key) == 0) {
            curr->value = value;
            detachNode(cache, curr);
            attachToFront(cache, curr);
            return;
        }
        curr = curr->next;
    }

    // Evict LRU node if capacity reached
    if (cache->size >= cache->capacity && cache->tail) {
        CacheNode* lru = cache->tail;
        detachNode(cache, lru);

        // Remove from hash table bucket
        unsigned int lruBucket = hashKey(lru->key);
        CacheNode** pHead = &cache->table[lruBucket].head;
        while (*pHead && *pHead != lru) pHead = &((*pHead)->next);
        if (*pHead) *pHead = lru->next;

        free(lru);
        cache->size--;
    }

    CacheNode* newNode = (CacheNode*)malloc(sizeof(CacheNode));
    strncpy(newNode->key, key, sizeof(newNode->key) - 1);
    newNode->key[sizeof(newNode->key) - 1] = '\0';
    newNode->value = value;

    attachToFront(cache, newNode);

    newNode->next = cache->table[b].head;
    cache->table[b].head = newNode;
    cache->size++;
}

void freeCache(LRUCache* cache) {
    CacheNode* curr = cache->head;
    while (curr) {
        CacheNode* next = curr->next;
        free(curr);
        curr = next;
    }
    free(cache);
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - DSA CAPSTONE: LRU MEMORY CACHE ENGINE     \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    LRUCache* cache = createCache(3);

    printf("1. Inserting Cache Keys: ('alpha', 101), ('beta', 102), ('gamma', 103)\n");
    cachePut(cache, "alpha", 101);
    cachePut(cache, "beta", 102);
    cachePut(cache, "gamma", 103);

    printf("   • Reading 'alpha' -> Value = %d (Promoted to MRU ✓)\n", cacheGet(cache, "alpha"));

    printf("2. Inserting 'delta' (104) -> Triggers Eviction of LRU Key ('beta')!\n");
    cachePut(cache, "delta", 104);

    printf("   • Checking 'beta'  -> %d (Evicted -1 ✓)\n", cacheGet(cache, "beta"));
    printf("   • Checking 'delta' -> %d (Found in Cache ✓)\n", cacheGet(cache, "delta"));
    printf("   • Checking 'alpha' -> %d (Found in Cache ✓)\n\n", cacheGet(cache, "alpha"));

    printf("-> Capstone Engine executed with O(1) Hash Map + Doubly Linked List!\n");

    freeCache(cache);
    return 0;
}
