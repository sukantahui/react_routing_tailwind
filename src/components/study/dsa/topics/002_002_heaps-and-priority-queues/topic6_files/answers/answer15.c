#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int least_interval(char tasks[], int n_tasks, int n_cooling) {
    int freq[26] = {0};
    for (int i = 0; i < n_tasks; i++) freq[tasks[i] - 'A']++;

    int max_freq = 0, count_max = 0;
    for (int i = 0; i < 26; i++) {
        if (freq[i] > max_freq) {
            max_freq = freq[i];
            count_max = 1;
        } else if (freq[i] == max_freq) {
            count_max++;
        }
    }

    int part_count = max_freq - 1;
    int part_length = n_cooling - (count_max - 1);
    int empty_slots = part_count * part_length;
    int available_tasks = n_tasks - (max_freq * count_max);
    int idles = max(0, empty_slots - available_tasks);

    return n_tasks + idles;
}

int main() {
    char tasks[] = {'A', 'A', 'A', 'B', 'B', 'B'};
    int n_tasks = 6, n_cooling = 2;
    printf("--- Task Scheduler (CPU Cooling Periods) ---\n");
    printf("Minimum Total Intervals Required = %d\n", least_interval(tasks, n_tasks, n_cooling));
    return 0;
}
