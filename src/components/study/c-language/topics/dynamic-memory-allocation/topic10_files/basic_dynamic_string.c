#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    int length;
    int capacity;
} DynamicString;

DynamicString* str_create() {
    DynamicString *s = malloc(sizeof(DynamicString));
    if (!s) return NULL;
    s->capacity = 8;
    s->data = malloc(s->capacity);
    if (!s->data) { free(s); return NULL; }
    s->data[0] = '\0';
    s->length = 0;
    return s;
}

void str_append_char(DynamicString *s, char ch) {
    if (s->length + 2 > s->capacity) {
        s->capacity *= 2;
        char *new_data = realloc(s->data, s->capacity);
        if (!new_data) return;
        s->data = new_data;
    }
    s->data[s->length] = ch;
    s->length++;
    s->data[s->length] = '\0';
}

void str_append_cstr(DynamicString *s, const char *cstr) {
    int len = strlen(cstr);
    if (s->length + len + 1 > s->capacity) {
        while (s->length + len + 1 > s->capacity)
            s->capacity *= 2;
        char *new_data = realloc(s->data, s->capacity);
        if (!new_data) return;
        s->data = new_data;
    }
    strcpy(s->data + s->length, cstr);
    s->length += len;
}

void str_free(DynamicString *s) {
    if (s) {
        free(s->data);
        free(s);
    }
}

int main() {
    DynamicString *s = str_create();
    str_append_char(s, 'H');
    str_append_char(s, 'e');
    str_append_char(s, 'l');
    str_append_char(s, 'l');
    str_append_char(s, 'o');
    str_append_cstr(s, " world!");
    printf("%s\n", s->data);
    str_free(s);
    return 0;
}