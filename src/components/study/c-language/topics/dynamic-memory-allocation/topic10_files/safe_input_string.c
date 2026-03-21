#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct {
    char *data;
    int length;
    int capacity;
} DynStr;

DynStr* ds_create() {
    DynStr *ds = malloc(sizeof(DynStr));
    if (!ds) return NULL;
    ds->capacity = 16;
    ds->data = malloc(ds->capacity);
    if (!ds->data) { free(ds); return NULL; }
    ds->data[0] = '\0';
    ds->length = 0;
    return ds;
}

void ds_append_char(DynStr *ds, char ch) {
    if (ds->length + 2 > ds->capacity) {
        ds->capacity *= 2;
        char *tmp = realloc(ds->data, ds->capacity);
        if (!tmp) return;
        ds->data = tmp;
    }
    ds->data[ds->length] = ch;
    ds->length++;
    ds->data[ds->length] = '\0';
}

void ds_free(DynStr *ds) {
    if (ds) { free(ds->data); free(ds); }
}

// Read a line from stdin (including spaces) until newline
DynStr* read_line() {
    DynStr *line = ds_create();
    if (!line) return NULL;
    int ch;
    while ((ch = getchar()) != EOF && ch != '\n') {
        ds_append_char(line, (char)ch);
    }
    return line;
}

int main() {
    printf("Enter a line: ");
    DynStr *input = read_line();
    if (input) {
        printf("You entered: %s\n", input->data);
        ds_free(input);
    }
    return 0;
}