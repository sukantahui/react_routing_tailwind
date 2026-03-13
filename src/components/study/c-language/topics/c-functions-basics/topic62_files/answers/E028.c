#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 10007

typedef struct Node {
    int mod;
    int count;
    struct Node *next;
} Node;

Node* hashTable[TABLE_SIZE];

unsigned int hash(int key) {
    return (unsigned int)(key < 0 ? -key : key) % TABLE_SIZE;
}

void insert(int mod) {
    unsigned int h = hash(mod);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->mod == mod) {
            curr->count++;
            return;
        }
        curr = curr->next;
    }
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->mod = mod;
    newNode->count = 1;
    newNode->next = hashTable[h];
    hashTable[h] = newNode;
}

int getCount(int mod) {
    unsigned int h = hash(mod);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->mod == mod) return curr->count;
        curr = curr->next;
    }
    return 0;
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

int subarraysDivByK(int nums[], int n, int k) {
    int count = 0, prefix = 0;
    insert(0);
    for (int i = 0; i < n; i++) {
        prefix += nums[i];
        int mod = prefix % k;
        if (mod < 0) mod += k;
        count += getCount(mod);
        insert(mod);
    }
    freeTable();
    return count;
}

int main() {
    int n, k;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("K: ");
    scanf("%d", &k);

    int cnt = subarraysDivByK(arr, n, k);
    printf("Number of subarrays = %d\n", cnt);
    return 0;
}
