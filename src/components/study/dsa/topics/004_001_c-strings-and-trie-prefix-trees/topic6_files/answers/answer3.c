#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define ALPHABET_SIZE 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    bool is_end_of_word;
} TrieNode;

TrieNode* create_node() {
    TrieNode *n = (TrieNode*)malloc(sizeof(TrieNode));
    n->is_end_of_word = false;
    for (int i = 0; i < ALPHABET_SIZE; i++) n->children[i] = NULL;
    return n;
}

void insert(TrieNode *root, const char *word) {
    TrieNode *curr = root;
    for (int i = 0; word[i] != '\0'; i++) {
        int idx = word[i] - 'a';
        if (!curr->children[idx]) curr->children[idx] = create_node();
        curr = curr->children[idx];
    }
    curr->is_end_of_word = true;
}

bool search_trie(TrieNode *root, const char *word) {
    TrieNode *curr = root;
    for (int i = 0; word[i] != '\0'; i++) {
        int idx = word[i] - 'a';
        if (!curr->children[idx]) return false;
        curr = curr->children[idx];
    }
    return curr && curr->is_end_of_word;
}

int main() {
    TrieNode *root = create_node();
    insert(root, "apple");
    printf("--- Exact Word Search in Trie ---\n");
    printf("Search 'apple': %s\n", search_trie(root, "apple") ? "FOUND" : "NOT FOUND");
    printf("Search 'app'  : %s\n", search_trie(root, "app") ? "FOUND" : "NOT FOUND");
    return 0;
}
