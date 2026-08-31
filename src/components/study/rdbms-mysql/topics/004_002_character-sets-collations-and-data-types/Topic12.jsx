import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Introduction to Spatial Data Types: POINT, LINESTRING, POLYGON, and GIS Functions (ST_Distance, ST_Contains)
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive spatial workbench: exploring OpenGIS geometry types (POINT, LINESTRING, POLYGON), SRID 4326 GPS coordinates, geodesic distance calculations in meters (ST_Distance), geofence containment testing (ST_Contains), and R-Tree spatial indexing in MySQL.
 */
const Topic12 = () => {
  // Interactive Spatial State
  const [selectedSpatialPhase, setSelectedSpatialPhase] = useState("phase1_spatial_spectrum");

  const spatialPhases = {
    phase1_spatial_spectrum: {
      phaseNumber: "Phase 1: Spatial Types",
      title: "1. Spatial Data Types: POINT, LINESTRING, POLYGON & SRID 4326",
      badge: "OpenGIS Standard",
      badgeColor: "emerald",
      sqlSnippet: `-- 📍 CREATING A SPATIAL TABLE WITH SRID 4326 (WGS 84 GPS):
CREATE TABLE delivery_hubs (
    hub_id INT PRIMARY KEY AUTO_INCREMENT,
    hub_name VARCHAR(100) NOT NULL,
    
    -- GPS Location Point (Longitude, Latitude) with mandatory SRID 4326:
    location POINT NOT NULL SRID 4326,
    
    -- R-Tree Spatial Index for fast O(log N) proximity searches:
    SPATIAL INDEX (location)
);

-- Inserting GPS coordinates using ST_GeomFromText:
-- Barrackpore: Lon 88.3533, Lat 22.7634
INSERT INTO delivery_hubs (hub_name, location) VALUES
('Barrackpore Central Hub', ST_GeomFromText('POINT(88.3533 22.7634)', 4326)),
('Kolkata Park Street Hub', ST_GeomFromText('POINT(88.3639 22.5726)', 4326));`,
      metricsTable: [
        { type: "POINT", wktFormat: "POINT(lon lat)", realWorld: "GPS coordinates, user location, shop marker 📍" },
        { type: "LINESTRING", wktFormat: "LINESTRING(p1, p2, ...)", realWorld: "Delivery routes, roads, railway tracks 🛣️" },
        { type: "POLYGON", wktFormat: "POLYGON((p1, p2, p3, p1))", realWorld: "City geofences, delivery boundaries 🗺️" },
        { type: "SRID 4326", wktFormat: "WGS 84 Ellipsoidal", realWorld: "Enables real-world distance in METERS ⚡" }
      ],
      explanation:
        "MySQL supports OpenGIS standard spatial types (`POINT`, `LINESTRING`, `POLYGON`). Using `SRID 4326` assigns the WGS 84 GPS coordinate system, allowing functions like `ST_Distance()` to compute exact distances in meters on Earth's surface."
    },
    phase2_distance_engine: {
      phaseNumber: "Phase 2: Distance Engine",
      title: "2. Geodesic Distance Calculation in Meters: ST_Distance",
      badge: "Geodesic Math",
      badgeColor: "cyan",
      sqlSnippet: `-- 📏 CALCULATING REAL-WORLD DISTANCE IN METERS:
-- Calculating distance between Barrackpore Hub and Kolkata Hub:
SELECT 
    hub_name,
    -- Distance to Kolkata Hub (88.3639, 22.5726):
    ST_Distance(
        location, 
        ST_GeomFromText('POINT(88.3639 22.5726)', 4326)
    ) AS distance_meters,
    
    -- Distance converted to Kilometers:
    ROUND(ST_Distance(
        location, 
        ST_GeomFromText('POINT(88.3639 22.5726)', 4326)
    ) / 1000, 2) AS distance_km
FROM delivery_hubs
ORDER BY distance_meters ASC;

-- Result for Barrackpore: ~21.24 Kilometers (21,240 Meters) ✅`,
      metricsTable: [
        { functionName: "ST_Distance(g1, g2)", inputSRID: "SRID 4326", outputUnit: "Meters on Earth's ellipsoid ⚡", precision: "Geodesic accuracy" },
        { functionName: "ST_Distance(g1, g2)", inputSRID: "SRID 0 (Flat)", outputUnit: "Euclidean Units (Degree math)", precision: "Flat 2D Cartesian plane" },
        { functionName: "5km Radius Search", inputSRID: "SRID 4326", outputUnit: "WHERE ST_Distance(...) <= 5000", precision: "Finds nearby stores" },
        { functionName: "ST_Buffer(pt, r)", inputSRID: "SRID 4326", outputUnit: "Circular Polygon area", precision: "Radial coverage zone" }
      ],
      explanation:
        "`ST_Distance()` calculates true geodesic distance on Earth's ellipsoid when using `SRID 4326`. It returns distances in meters, making proximity searches (`WHERE ST_Distance(loc, @user) <= 5000`) simple and accurate."
    },
    phase3_geofence_containment: {
      phaseNumber: "Phase 3: Geofencing",
      title: "3. Geofence Containment & Delivery Zones: ST_Contains",
      badge: "Geofencing Engine",
      badgeColor: "amber",
      sqlSnippet: `-- 🗺️ GEOFENCING: CHECKING IF A CUSTOMER IS INSIDE A DELIVERY ZONE:
CREATE TABLE delivery_zones (
    zone_id INT PRIMARY KEY AUTO_INCREMENT,
    zone_name VARCHAR(100) NOT NULL,
    boundary POLYGON NOT NULL SRID 4326,
    SPATIAL INDEX (boundary)
);

-- Inserting Barrackpore Delivery Polygon:
INSERT INTO delivery_zones (zone_name, boundary) VALUES
('Barrackpore Express Zone', ST_GeomFromText(
    'POLYGON((88.34 22.74, 88.38 22.74, 88.38 22.78, 88.34 22.78, 88.34 22.74))', 
    4326
));

-- Test if Customer GPS is inside Barrackpore Zone:
SELECT 
    zone_name,
    ST_Contains(boundary, ST_GeomFromText('POINT(88.3533 22.7634)', 4326)) AS is_deliverable
FROM delivery_zones;
-- Result: 1 (TRUE) → Eligible for Instant Delivery! ✅`,
      metricsTable: [
        { functionName: "ST_Contains(poly, pt)", role: "Tests if point is inside polygon", result: "1 (Inside) or 0 (Outside)", useCase: "Delivery zone eligibility" },
        { functionName: "ST_Within(pt, poly)", role: "Equivalent inverse of ST_Contains", result: "1 (Inside) or 0 (Outside)", useCase: "Rider tracking in zone" },
        { functionName: "ST_Area(poly)", role: "Calculates zone square meters", result: "Square Meters area", useCase: "Territory size calculation" },
        { functionName: "ST_AsGeoJSON(geom)", role: "Exports to GeoJSON format", result: "GeoJSON string", useCase: "Leaflet / Google Maps rendering" }
      ],
      explanation:
        "`ST_Contains(polygon, point)` returns `1` if a coordinate lies inside a geographic polygon boundary. It enables instant geofencing for food delivery eligibility, ride hailing zones, and municipal territory validation."
    },
    phase4_rtree_indexing: {
      phaseNumber: "Phase 4: R-Tree Indexing",
      title: "4. R-Tree Spatial Indexing & Minimum Bounding Boxes (MBR)",
      badge: "R-Tree Architecture",
      badgeColor: "rose",
      sqlSnippet: `-- 🌲 R-TREE SPATIAL INDEXING MECHANICS:
-- 1. Traditional B+ Tree : 1-Dimensional sorted scalar values.
-- 2. R-Tree Spatial Index: 2-Dimensional Minimum Bounding Rectangles (MBR)!

-- Finding nearest 5 drivers within 3 km using SPATIAL INDEX:
EXPLAIN SELECT 
    hub_id, hub_name,
    ST_Distance(location, ST_GeomFromText('POINT(88.35 22.76)', 4326)) AS dist_m
FROM delivery_hubs
WHERE ST_Distance(location, ST_GeomFromText('POINT(88.35 22.76)', 4326)) <= 3000
ORDER BY dist_m ASC
LIMIT 5;

-- EXPLAIN shows: type = range, key = location (R-Tree Index Seek!) 🚀`,
      metricsTable: [
        { indexType: "R-Tree (SPATIAL INDEX)", dimension: "2D Bounding Boxes (MBR)", queryType: "Proximity / Containment", speed: "O(log N) Spatial Seek ⚡" },
        { indexType: "B+ Tree Index", dimension: "1D Scalar Keys", queryType: "Equality / Range", speed: "O(log N) Scalar Seek" },
        { indexType: "NOT NULL Requirement", dimension: "Mandatory for R-Trees", queryType: "Schema Rule", speed: "Cannot index NULLs" },
        { indexType: "MBRIntersects()", dimension: "Box Intersection", queryType: "Fast Pre-filtering", speed: "Instant bounding box filter" }
      ],
      explanation:
        "R-Trees index 2D geometric shapes by grouping neighboring objects into hierarchical Minimum Bounding Rectangles (MBR). This allows MySQL to prune non-matching geographic regions and locate nearby points in $O(\\log N)$ time."
    }
  };

  const navItems = [
    { id: "spatial-overview", label: "1. Spatial Types Overview" },
    { id: "geofence-diagram", label: "2. Geofence & GIS Diagram" },
    { id: "interactive-workbench", label: "3. Spatial Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Spatial Sizing Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_002</span>
            <span>•</span>
            <span>Topic 12 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Spatial (GIS) Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Introduction to Spatial Data Types: POINT, LINESTRING, POLYGON, and GIS Functions (ST_Distance, ST_Contains)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Unlock native geospatial intelligence in MySQL: master OpenGIS types (<code className="text-emerald-400 font-mono">POINT</code>, <code className="text-cyan-400 font-mono">LINESTRING</code>, <code className="text-amber-400 font-mono">POLYGON</code>), compute geodesic distances in meters with <code className="text-rose-400 font-mono">ST_Distance</code> under SRID 4326, build delivery geofences with <code className="text-emerald-400 font-mono">ST_Contains</code>, and optimize with R-Tree spatial indexes.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Spatial Types Overview */}
        <section id="spatial-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. OpenGIS Spatial Types Spectrum
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Representing points, routes, and geographic boundaries natively in MySQL database tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. POINT</span>
              <h3 className="font-bold text-white">GPS Coordinate</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stores (lon, lat) points. Used for user locations, stores, and rider tracking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. LINESTRING</span>
              <h3 className="font-bold text-white">Vector Route</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connected series of points. Represents roads, delivery routes, and tracking paths.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. POLYGON</span>
              <h3 className="font-bold text-white">Closed Geofence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Closed perimeter area. Used for food delivery zones and city boundaries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. SRID 4326</span>
              <h3 className="font-bold text-white">GPS WGS 84</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Earth's ellipsoid standard. Returns exact distances in METERS.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Geofence Diagram */}
        <section id="geofence-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Geofence Containment &amp; Distance Radius
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing polygon geofence testing and radius buffer distance calculations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 12.1: Spatial Polygon Geofence &amp; ST_Distance Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">GIS Spatial Map</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Left: Geofence Polygon Box */}
                <rect x="20" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="240" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  1. GEOFENCE BOUNDARY: ST_Contains(polygon, point)
                </text>
                <line x1="20" y1="85" x2="460" y2="85" stroke="#334155" />

                {/* Drawn Polygon */}
                <polygon points="60,110 380,120 420,260 100,270" fill="#047857" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                <text x="240" y="190" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Barrackpore Delivery Zone (POLYGON)
                </text>

                {/* Inside Point */}
                <circle cx="200" cy="220" r="7" fill="#38bdf8" />
                <text x="215" y="225" fill="#bae6fd" fontSize="10" fontWeight="bold">Customer A (Inside) → ST_Contains = 1 ✅</text>

                {/* Outside Point */}
                <circle cx="440" cy="180" r="7" fill="#f43f5e" />
                <text x="320" y="305" fill="#f87171" fontSize="10" fontWeight="bold">Customer B (Outside) → ST_Contains = 0 ❌</text>

                {/* Right: Distance Radius Box */}
                <rect x="490" y="40" width="440" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="710" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  2. PROXIMITY RADIUS: ST_Distance(pt1, pt2) &lt;= 5000
                </text>
                <line x1="490" y1="85" x2="930" y2="85" stroke="#334155" />

                {/* Radius Circle */}
                <circle cx="710" cy="185" r="85" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="710" cy="185" r="8" fill="#f59e0b" />
                <text x="710" y="170" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Store Center Point
                </text>

                <line x1="710" y1="185" x2="795" y2="185" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                <text x="750" y="180" fill="#34d399" fontSize="9" fontWeight="bold">5,000 m (5 km)</text>

                <rect x="510" y="275" width="400" height="35" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="710" y="297" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  R-Tree Spatial Index resolves 5km radius in &lt; 2ms! ⚡
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Spatial Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Spatial (GIS) Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a spatial phase to inspect DDL definitions, distance calculations in meters, geofence queries, and R-Trees.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(spatialPhases).map((key) => {
              const ph = spatialPhases[key];
              const isSelected = selectedSpatialPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSpatialPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "amber" && "bg-amber-400",
                      ph.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {spatialPhases[selectedSpatialPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  spatialPhases[selectedSpatialPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  spatialPhases[selectedSpatialPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  spatialPhases[selectedSpatialPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  spatialPhases[selectedSpatialPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {spatialPhases[selectedSpatialPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Spatial DDL &amp; GIS Execution Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {spatialPhases[selectedSpatialPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Spatial Specifications &amp; Features:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Spatial Type / Function</th>
                      <th className="py-2.5 px-4">WKT / Input SRID / Mapping</th>
                      <th className="py-2.5 px-4">Real-World / Output Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {spatialPhases[selectedSpatialPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.type || row.functionName || row.indexType}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.wktFormat || row.inputSRID || row.dimension}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.realWorld || row.outputUnit || row.queryType}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {spatialPhases[selectedSpatialPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Spatial Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Implementing food delivery radius matching and rider tracking in West Bengal portals.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Delivery Geofencing */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Instant Delivery Geofencing in Barrackpore Hub
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Instant Geofence
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an express grocery app needed to verify if customer addresses fell within the store's 15-minute delivery polygon. Storing the territory as a `POLYGON SRID 4326` with a `SPATIAL INDEX` allowed `ST_Contains(boundary, customer_location)` queries to execute in 0.8 milliseconds, stopping out-of-boundary orders before checkout.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Proximity Rider Matching */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Nearest 5 Rider Proximity Dispatch in Kolkata Ride-Hailing
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  R-Tree Proximity
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, dispatching 10,000 active taxi cabs required finding the 5 closest drivers within a 3-kilometer radius of a passenger pickup point. Using <code>ST_Distance(location, @pickup_point) &lt;= 3000</code> on an R-Tree indexed `POINT SRID 4326` column enabled driver matching in under 3 milliseconds without needing external Redis or PostGIS clusters.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid forgetting SRID 4326 and coordinate order reversal bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Omitting SRID 4326
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Creating spatial columns without `SRID 4326` defaults to SRID 0 (flat plane), causing `ST_Distance()` to return degree distances rather than real-world meters!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always specify POINT NOT NULL SRID 4326 for GPS data.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Reversing Longitude &amp; Latitude
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                WKT uses `(longitude latitude)` (X then Y), while colloquial GPS coordinates are often spoken as (latitude, longitude). Swapping them puts coordinates in the wrong hemisphere!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always verify (longitude latitude) axis order in WKT strings.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Add SPATIAL INDEX to Points
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always create a `SPATIAL INDEX` on `POINT` and `POLYGON` columns to build R-Tree bounding boxes and enable $O(\\log N)$ radius queries.
              </p>
              <div className="text-xs text-slate-400">
                Enables sub-millisecond geographic proximity searches.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Export via ST_AsGeoJSON
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `ST_AsGeoJSON(location)` in SELECT queries to return standard GeoJSON payloads directly to frontend mapping libraries (Leaflet / Mapbox).
              </p>
              <div className="text-xs text-slate-400">
                Zero backend format translation required.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Spatial Sizing Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Spatial (GIS) Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify spatial schema configuration and indexing in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Spatial Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">SRID 4326 Declared</strong> = Ensure GPS columns explicitly declare `SRID 4326`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">NOT NULL on Spatial</strong> = Verify indexed spatial columns are set to `NOT NULL`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">SPATIAL INDEX Added</strong> = Build R-Tree indexes on location and boundary columns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Distance in Meters</strong> = Validate proximity queries use meters (e.g. 5000 for 5km).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe ST_AsGeoJSON in React Apps...”</span>
                  When building React or Leaflet map components, don't write custom coordinates parsers—just execute `SELECT ST_AsGeoJSON(location) AS geojson` and pass the JSON directly to your map layer!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Geodesic Distance in MySQL 8.0...”</span>
                  In MySQL 5.7, ST_Distance on SRID 4326 was flat Euclidean degree math. In MySQL 8.0, ST_Distance was completely upgraded to compute true ellipsoidal geodesic meters, making MySQL a first-class GIS platform!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering Spatial Data Types, SRID 4326, ST_Distance, ST_Contains, and R-Trees.
            </p>
          </div>

          <FAQTemplate
            title="Spatial Data Types (POINT, POLYGON, ST_Distance) FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Introduction to Spatial Data Types: POINT, LINESTRING, POLYGON, and GIS Functions (ST_Distance, ST_Contains)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic12_note.txt"
          />

          <Teacher
            note="Geospatial engineering is one of the most exciting capabilities of modern MySQL. Instead of relying on complex external GIS services or storing latitude and longitude as disconnected floating-point columns, native spatial types (POINT, POLYGON) coupled with SRID 4326 give you true geodesic accuracy in meters on Earth's ellipsoid! By adding a SPATIAL INDEX (R-Tree), your application can calculate radius proximity searches (ST_Distance) and delivery geofences (ST_Contains) across millions of coordinates in under 2 milliseconds!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
