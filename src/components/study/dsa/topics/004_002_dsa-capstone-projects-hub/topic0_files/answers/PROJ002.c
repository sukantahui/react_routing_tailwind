#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct StateNode {
    char text[128];
    struct StateNode *prev;
    struct StateNode *next;
} StateNode;

typedef struct {
    StateNode *head;
    StateNode *curr;
} TextEditor;

TextEditor* createEditor(const char *initialText) {
    TextEditor *ed = (TextEditor *)malloc(sizeof(TextEditor));
    StateNode *node = (StateNode *)malloc(sizeof(StateNode));
    strncpy(node->text, initialText, 127);
    node->prev = NULL;
    node->next = NULL;
    ed->head = node;
    ed->curr = node;
    return ed;
}

void writeText(TextEditor *ed, const char *newText) {
    // Truncate any redo chain ahead of current state
    StateNode *tmp = ed->curr->next;
    while (tmp != NULL) {
        StateNode *next = tmp->next;
        free(tmp);
        tmp = next;
    }
    
    StateNode *newNode = (StateNode *)malloc(sizeof(StateNode));
    strncpy(newNode->text, newText, 127);
    newNode->prev = ed->curr;
    newNode->next = NULL;
    ed->curr->next = newNode;
    ed->curr = newNode;
    printf("[WRITE] Saved state: \"%s\"\n", ed->curr->text);
}

void undo(TextEditor *ed) {
    if (ed->curr->prev != NULL) {
        ed->curr = ed->curr->prev;
        printf("[UNDO] Current state: \"%s\"\n", ed->curr->text);
    } else {
        printf("[UNDO FAILED] At initial state!\n");
    }
}

void redo(TextEditor *ed) {
    if (ed->curr->next != NULL) {
        ed->curr = ed->curr->next;
        printf("[REDO] Current state: \"%s\"\n", ed->curr->text);
    } else {
        printf("[REDO FAILED] At latest state!\n");
    }
}

int main() {
    printf("=== Project 2: Doubly-Linked Text Editor Buffer ===\n\n");
    TextEditor *ed = createEditor("Hello World");
    
    writeText(ed, "Hello World!");
    writeText(ed, "Hello World! Welcome to C.");
    
    undo(ed);
    undo(ed);
    redo(ed);
    
    return 0;
}
