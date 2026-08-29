#include <stdio.h>
#include <math.h>

int possible(double d, int *stations, int n, int k) {
    int count = 0;
    for (int i = 0; i < n - 1; i++) {
        count += (int)((stations[i + 1] - stations[i]) / d);
    }
    return count <= k;
}

double min_max_gas_station(int *stations, int n, int k) {
    double low = 0.0;
    double high = 0.0;
    for (int i = 0; i < n - 1; i++) {
        if (stations[i + 1] - stations[i] > high) {
            high = stations[i + 1] - stations[i];
        }
    }

    double diff = 1e-6;
    while (high - low > diff) {
        double mid = low + (high - low) / 2.0;
        if (possible(mid, stations, n, k)) {
            high = mid;
        } else {
            low = mid;
        }
    }
    return low;
}

int main() {
    int stations[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int n = sizeof(stations) / sizeof(stations[0]);
    int k = 9;

    double ans = min_max_gas_station(stations, n, k);

    printf("--- Minimize Max Distance to Gas Station ---\n");
    printf("Minimized Maximum Distance = %f\n", ans);
    return 0;
}

