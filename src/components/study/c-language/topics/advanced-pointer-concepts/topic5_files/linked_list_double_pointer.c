#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Insert at head using double pointer
void insertHead(Node **head, int value) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = *head;
    *head = newNode;   // modifies the original head pointer
}

void printList(Node *head) {
    while (head) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    Node *head = NULL;   // double pointer will modify this
    insertHead(&head, 10);
    insertHead(&head, 20);
    insertHead(&head, 30);
    printList(head);     // Output: 30 -> 20 -> 10 -> NULL
    // Free memory omitted for brevity
    return 0;
}