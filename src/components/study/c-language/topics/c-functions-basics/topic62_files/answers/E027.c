#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 10007

typedef struct Node {
    int sum;
    int count;
    struct Node *next;
} Node;

Node* hashTable[TABLE_SIZE];

unsigned int hash(int key) {
    return (unsigned int)(key < 0 ? -key : key) % TABLE_SIZE;
}

void insert(int sum) {
    unsigned int h = hash(sum);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->sum == sum) {
            curr->count++;
            return;
        }
        curr = curr->next;
    }
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->sum = sum;
    newNode->count = 1;
    newNode->next = hashTable[h];
    hashTable[h] = newNode;
}

int getCount(int sum) {
    unsigned int h = hash(sum);
    Node *curr = hashTable[h];
    while (curr) {
        if (curr->sum == sum) return curr->count;
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

int subarraySum(int nums[], int n, int k) {
    int count = 0, prefix = 0;
    insert(0);
    for (int i = 0; i < n; i++) {
        prefix += nums[i];
        count += getCount(prefix - k);
        insert(prefix);
    }
    freeTable();
    return count;
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

    int cnt = subarraySum(arr, n, target);
    printf("Number of subarrays = %d\n", cnt);
    return 0;
}
