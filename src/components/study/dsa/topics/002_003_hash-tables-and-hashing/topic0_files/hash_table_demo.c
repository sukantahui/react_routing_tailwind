#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10

typedef struct Node {
    char key[64];
    int value;
    struct Node *next;
} Node;

typedef struct {
    Node *buckets[TABLE_SIZE];
} HashTable;

// Polynomial rolling hash function for string keys
unsigned int hash(const char *key) {
    unsigned int hashVal = 0;
    while (*key) {
        hashVal = (hashVal * 31) + *key;
        key++;
    }
    return hashVal % TABLE_SIZE;
}

void initHashTable(HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->buckets[i] = NULL;
    }
}

// Insert / Update key-value pair using Separate Chaining
void insert(HashTable *ht, const char *key, int value) {
    unsigned int index = hash(key);
    Node *curr = ht->buckets[index];

    // Check if key exists to update value
    while (curr != NULL) {
        if (strcmp(curr->key, key) == 0) {
            curr->value = value;
            printf("[HASH UPDATE] Key '%s' updated to value %d\n", key, value);
            return;
        }
        curr = curr->next;
    }

    // Insert new node at bucket head
    Node *newNode = (Node *)malloc(sizeof(Node));
    strncpy(newNode->key, key, 63);
    newNode->value = value;
    newNode->next = ht->buckets[index];
    ht->buckets[index] = newNode;
    printf("[HASH INSERT] Key '%s' mapped to Bucket [%u] with value %d\n", key, index, value);
}

// Search key in Hash Table - O(1) average
int get(HashTable *ht, const char *key) {
    unsigned int index = hash(key);
    Node *curr = ht->buckets[index];
    while (curr != NULL) {
        if (strcmp(curr->key, key) == 0) {
            return curr->value;
        }
        curr = curr->next;
    }
    return -1;
}

void printHashTable(HashTable *ht) {
    printf("\n--- Hash Table Bucket Contents ---\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        printf("Bucket [%d]: ", i);
        Node *curr = ht->buckets[i];
        while (curr != NULL) {
            printf("(%s: %d) -> ", curr->key, curr->value);
            curr = curr->next;
        }
        printf("NULL\n");
    }
    printf("----------------------------------\n\n");
}

int main() {
    printf("=== String Hash Table with Separate Chaining in C ===\n\n");
    HashTable ht;
    initHashTable(&ht);

    insert(&ht, "Swadeep", 95);
    insert(&ht, "Tuhina", 98);
    insert(&ht, "Abhronila", 92);
    insert(&ht, "Debangshu", 89);
    insert(&ht, "Sukanta", 100);

    printHashTable(&ht);

    printf("Search 'Tuhina': Score = %d\n", get(&ht, "Tuhina"));
    printf("Search 'Unknown': Score = %d\n", get(&ht, "Unknown"));

    return 0;
}
