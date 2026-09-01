#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    int length;
    int capacity;
} String;

String* str_new() {
    String *s = malloc(sizeof(String));
    if (!s) return NULL;
    s->capacity = 16;
    s->data = malloc(s->capacity);
    if (!s->data) { free(s); return NULL; }
    s->data[0] = '\0';
    s->length = 0;
    return s;
}

void str_append(String *s, const char *text) {
    int add_len = strlen(text);
    if (s->length + add_len + 1 > s->capacity) {
        while (s->length + add_len + 1 > s->capacity)
            s->capacity *= 2;
        char *tmp = realloc(s->data, s->capacity);
        if (!tmp) return;
        s->data = tmp;
    }
    strcpy(s->data + s->length, text);
    s->length += add_len;
}

String* str_concat(const String *a, const String *b) {
    String *res = str_new();
    if (!res) return NULL;
    str_append(res, a->data);
    str_append(res, b->data);
    return res;
}

void str_free(String *s) {
    if (s) { free(s->data); free(s); }
}

int main() {
    String *s1 = str_new();
    String *s2 = str_new();
    str_append(s1, "Hello, ");
    str_append(s2, "world!");
    String *s3 = str_concat(s1, s2);
    printf("%s\n", s3->data);
    str_free(s1);
    str_free(s2);
    str_free(s3);
    return 0;
}