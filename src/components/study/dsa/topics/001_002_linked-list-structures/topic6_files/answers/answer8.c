#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

int search_key(Node *head, int key) {
    int pos = 0;
    Node *curr = head;
    while (curr) {
        if (curr->data == key) return pos;
        pos++;
        curr = curr->next;
    }
    return -1;
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 10;
    head->next = (Node*)malloc(sizeof(Node)); head->next->data = 25;
    head->next->next = (Node*)malloc(sizeof(Node)); head->next->next->data = 40; head->next->next->next = NULL;

    printf("--- Key Search Engine ---\n");
    int key = 25;
    int index = search_key(head, key);
    if (index != -1) printf("Key %d found at zero-based index: %d\n", key, index);
    else printf("Key %d not found in list.\n", key);

    return 0;
}
