#include <stdio.h>
#include <stdlib.h>

#define ALPHABET_SIZE 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    int count;
} TrieNode;

TrieNode* create_node() {
    TrieNode *n = (TrieNode*)malloc(sizeof(TrieNode));
    n->count = 0;
    for (int i = 0; i < ALPHABET_SIZE; i++) n->children[i] = NULL;
    return n;
}

void insert_and_count(TrieNode *root, const char *word) {
    TrieNode *curr = root;
    for (int i = 0; word[i] != '\0'; i++) {
        int idx = word[i] - 'a';
        if (!curr->children[idx]) curr->children[idx] = create_node();
        curr = curr->children[idx];
    }
    curr->count++;
}

int main() {
    TrieNode *root = create_node();
    insert_and_count(root, "code"); insert_and_count(root, "code");
    printf("--- Word Frequency Counter using Trie ---\nWord 'code' Frequency = %d\n", root->children['c'-'a']->children['o'-'a']->children['d'-'a']->children['e'-'a']->count);
    return 0;
}
