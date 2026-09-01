#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 10007

typedef struct Node {
    int value;
    int count;
    struct Node *next;
} Node;

Node* hashTable[TABLE_SIZE];

unsigned int hash(int key) {
    return (unsigned int)(key < 0 ? -key : key) % TABLE_SIZE;
}

void insert(int value) {
    unsigned int h = hash(value);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->value == value) {
            curr->count++;
            return;
        }
        curr = curr->next;
    }
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->value = value;
    newNode->count = 1;
    newNode->next = hashTable[h];
    hashTable[h] = newNode;
}

int getCount(int value) {
    unsigned int h = hash(value);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->value == value) return curr->count;
        curr = curr->next;
    }
    return 0;
}

void decrement(int value) {
    unsigned int h = hash(value);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->value == value) {
            curr->count--;
            return;
        }
        curr = curr->next;
    }
}

void freeTable() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node *curr = hashTable[i];
        while (curr) {
            Node *temp = curr;
            curr = curr->next;
            free(temp);
        }
        hashTable[i] = NULL;
    }
}

int main() {
    int n, target;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Target: ");
    scanf("%d", &target);

    // Insert all elements into hash table
    for (int i = 0; i < n; i++) insert(arr[i]);

    printf("Pairs: ");
    for (int i = 0; i < n; i++) {
        int comp = target - arr[i];
        int cnt = getCount(comp);
        if (cnt > 0) {
            // To avoid duplicates, we could mark but for simplicity print all
            // We need to ensure each pair printed only once? The example includes (1,5) and (5,1) as separate.
            // We'll just print for each element if complement exists.
            // But we must handle the case where arr[i] == comp and count should be >1.
            if (arr[i] == comp && cnt < 2) continue;
            printf("(%d,%d) ", arr[i], comp);
            // decrement to avoid using same element twice? But pairs can use same element? Example uses (3,3) so allowed.
            // We'll leave as is.
        }
    }
    printf("\n");
    freeTable();
    return 0;
}
