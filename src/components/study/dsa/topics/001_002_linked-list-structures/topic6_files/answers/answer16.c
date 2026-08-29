#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* reverse_list(Node *head) {
    Node *prev = NULL, *curr = head;
    while (curr) {
        Node *next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

bool is_palindrome(Node *head) {
    if (!head || !head->next) return true;
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    Node *second_half = reverse_list(slow);
    Node *p1 = head, *p2 = second_half;
    bool res = true;
    while (p2) {
        if (p1->data != p2->data) { res = false; break; }
        p1 = p1->next;
        p2 = p2->next;
    }
    return res;
}

int main() {
    Node *h = (Node*)malloc(sizeof(Node)); h->data = 1;
    h->next = (Node*)malloc(sizeof(Node)); h->next->data = 2;
    h->next->next = (Node*)malloc(sizeof(Node)); h->next->next->data = 2;
    h->next->next->next = (Node*)malloc(sizeof(Node)); h->next->next->next->data = 1;
    h->next->next->next->next = NULL;

    printf("--- Palindrome Linked List Test ---\n");
    if (is_palindrome(h)) printf("List is a Palindrome!\n");
    else printf("List is NOT a Palindrome.\n");

    return 0;
}
