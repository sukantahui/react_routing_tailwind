"""
Topic 13: Practice Problem 2 - Spatial Distance & Nearest Facility Search
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy.spatial.distance import cdist

# Problem 2:
# Emergency dispatch service in North 24 Parganas has 4 ambulance stations (Coordinates in km):
stations = np.array([
    [2.0, 5.0],   # Station 0 (Barrackpore)
    [8.0, 12.0],  # Station 1 (Shyamnagar)
    [15.0, 3.0],  # Station 2 (Naihati)
    [20.0, 18.0]  # Station 3 (Kalyani)
])

# Incident locations requiring immediate response:
incidents = np.array([
    [3.5, 6.0],
    [18.0, 16.5]
])

# Calculate all pairwise distances
distances = cdist(incidents, stations, metric='euclidean')

print("--- Problem 2: Emergency Station Dispatch ---")
for i, inc in enumerate(incidents):
    closest_station_idx = int(np.argmin(distances[i]))
    min_dist = distances[i, closest_station_idx]
    print(f"Incident #{i+1} at {inc} -> Dispatch Station {closest_station_idx} (Distance: {min_dist:.2f} km)")
