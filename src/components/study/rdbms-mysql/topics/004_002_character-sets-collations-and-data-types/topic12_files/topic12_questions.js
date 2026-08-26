// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What are the primary Spatial (GIS) data types in MySQL?",
    shortAnswer: "1) `POINT` (single GPS coordinate),\n2) `LINESTRING` (ordered series of points / route),\n3) `POLYGON` (closed geometric boundary / area),\n4) `MULTIPOINT`, `MULTILINESTRING`, `MULTIPOLYGON` (collections of geometries),\n5) `GEOMETRY` (general parent type).",
    explanation: "Standard OpenGIS geometric data types supported natively in MySQL.",
    hint: "POINT, LINESTRING, POLYGON, MULTI-variants, and GEOMETRY.",
    level: "basic"
  },
  {
    question: "What is Well-Known Text (WKT) in GIS?",
    shortAnswer: "A standard text markup language used to represent geometric shapes in human-readable format (e.g. `'POINT(88.3639 22.5726)'` or `'LINESTRING(0 0, 10 10, 20 25)'`).",
    explanation: "The universal text standard for defining spatial coordinates.",
    hint: "Human-readable text representation of geometries (e.g. 'POINT(lon lat)').",
    level: "basic"
  },
  {
    question: "What is an SRID (Spatial Reference System Identifier) in MySQL?",
    shortAnswer: "An integer identifier specifying the **geographic coordinate system and map projection** used by spatial geometries (e.g. **SRID 0** for flat Cartesian planes, **SRID 4326** for WGS 84 GPS coordinates on Earth's ellipsoid).",
    explanation: "Dictates whether distance calculations use flat Euclidean geometry or ellipsoidal geodesic meters.",
    hint: "Identifies the coordinate system (SRID 4326 is standard GPS WGS 84).",
    level: "basic"
  },
  {
    question: "Why should GPS coordinates always be defined with `SRID 4326` in MySQL 8.0?",
    shortAnswer: "Because `SRID 4326` activates **ellipsoidal geodesic calculations**, allowing functions like `ST_Distance()` to return exact real-world distances in **METERS** on Earth's surface rather than flat degree approximations.",
    explanation: "Standard for GPS tracking, food delivery radius, and logistics.",
    hint: "Enables real-world geodesic distance calculations in meters on Earth's ellipsoid.",
    level: "expert",
    codeExample: "CREATE TABLE delivery_partners (\n  partner_id INT PRIMARY KEY AUTO_INCREMENT,\n  partner_name VARCHAR(100) NOT NULL,\n  current_location POINT NOT NULL SRID 4326,\n  SPATIAL INDEX (current_location)\n);"
  },
  {
    question: "What is an R-Tree index, and how does a `SPATIAL INDEX` work in MySQL InnoDB?",
    shortAnswer: "An R-Tree indexes 2-dimensional geometric shapes by grouping neighboring objects into hierarchical **Minimum Bounding Rectangles (MBR)**, enabling fast $O(\\log N)$ spatial containment and proximity searches.",
    explanation: "Unlike 1-dimensional B+ trees, R-Trees index multi-dimensional bounding boxes.",
    hint: "Hierarchical bounding box (MBR) tree enabling O(log N) 2D geometric search.",
    level: "expert"
  },
  {
    question: "What is the mandatory column constraint requirement for creating a `SPATIAL INDEX` in MySQL?",
    shortAnswer: "The spatial column **MUST be defined as `NOT NULL`**.",
    explanation: "R-Tree indexes cannot index NULL geometries.",
    hint: "The column must be NOT NULL.",
    level: "basic"
  },
  {
    question: "How do you parse a WKT string into a spatial binary point using `ST_GeomFromText()`?",
    shortAnswer: "`ST_GeomFromText('POINT(88.3639 22.5726)', 4326)`",
    explanation: "Parses text WKT and assigns the specified SRID in binary format.",
    hint: "ST_GeomFromText('POINT(x y)', srid).",
    level: "basic",
    codeExample: "INSERT INTO stores (store_name, location) \nVALUES ('Barrackpore Branch', ST_GeomFromText('POINT(88.3533 22.7634)', 4326));"
  },
  {
    question: "What does `ST_Distance(geom1, geom2)` return in MySQL 8.0 when both geometries use `SRID 4326`?",
    shortAnswer: "It returns the **geodesic distance in METERS** across Earth's ellipsoidal surface between the two points.",
    explanation: "Standard geodesic calculation in MySQL 8.0.",
    hint: "Returns geodesic distance in meters on Earth's surface.",
    level: "basic",
    codeExample: "SELECT \n  store_name, \n  ST_Distance(location, ST_GeomFromText('POINT(88.3639 22.5726)', 4326)) AS distance_in_meters \nFROM stores;"
  },
  {
    question: "What does `ST_Contains(polygon, point)` check?",
    shortAnswer: "It returns `1` if the target `point` lies **completely inside the interior of the `polygon` boundary**, and `0` otherwise (used for geofencing delivery zones).",
    explanation: "Classic geofencing check for delivery boundaries and city limits.",
    hint: "Returns 1 if the point is inside the polygon geofence, otherwise 0.",
    level: "basic",
    codeExample: "SELECT * FROM delivery_orders \nWHERE ST_Contains(delivery_zone_polygon, customer_location_point);"
  },
  {
    question: "What is the difference between `ST_Contains(A, B)` and `ST_Within(A, B)`?",
    shortAnswer: "- `ST_Contains(A, B)`: Tests if geometry $A$ contains geometry $B$;\n- `ST_Within(A, B)`: Tests if geometry $A$ is within geometry $B$ (`ST_Within(A, B)` is mathematically equivalent to `ST_Contains(B, A)`).",
    explanation: "Inverse spatial relationship predicates.",
    hint: "ST_Contains(polygon, point) is equivalent to ST_Within(point, polygon).",
    level: "basic"
  },
  {
    question: "How do you export a spatial geometry into GeoJSON format for Leaflet or Google Maps?",
    shortAnswer: "`ST_AsGeoJSON(geometry_column)`",
    explanation: "Converts binary geometry directly into standard GeoJSON strings for web map rendering.",
    hint: "ST_AsGeoJSON(geom_col).",
    level: "basic",
    codeExample: "SELECT store_name, ST_AsGeoJSON(location) AS geojson \nFROM stores;"
  },
  {
    question: "How do you convert a binary spatial column into human-readable WKT text?",
    shortAnswer: "`ST_AsText(geometry_column)`",
    explanation: "Returns WKT string format like 'POINT(88.3639 22.5726)'.",
    hint: "ST_AsText(geometry_col).",
    level: "basic",
    codeExample: "SELECT store_name, ST_AsText(location) AS wkt_point FROM stores;"
  },
  {
    question: "What does `ST_Buffer(geom, distance)` generate?",
    shortAnswer: "It generates a **polygon representing a buffer zone area** consisting of all points within the specified distance radius around the source geometry.",
    explanation: "Useful for generating radial delivery zones or proximity radiuses.",
    hint: "Generates a polygon representing a circular buffer radius around a point.",
    level: "expert"
  },
  {
    question: "How do you query for all stores within a 5-kilometer (5,000 meters) radius of a user's GPS coordinate?",
    shortAnswer: "`WHERE ST_Distance(store_location, ST_GeomFromText('POINT(88.3639 22.5726)', 4326)) <= 5000`",
    explanation: "Standard proximity query using geodesic meters.",
    hint: "WHERE ST_Distance(loc, user_point) <= 5000 (in meters for SRID 4326).",
    level: "basic",
    codeExample: "SELECT store_name, ST_Distance(location, @user_pt) AS dist_meters \nFROM stores \nWHERE ST_Distance(location, @user_pt) <= 5000 \nORDER BY dist_meters ASC;"
  },
  {
    question: "What is the Minimum Bounding Rectangle (MBR) in spatial operations?",
    shortAnswer: "The smallest axis-aligned bounding box that completely encloses a geometric shape, used by R-Tree spatial indexes for fast pre-filtering.",
    explanation: "R-Tree bounding rectangle bounding box geometry.",
    hint: "The smallest bounding box enclosing a geometric shape, used by R-Tree indexes.",
    level: "expert"
  },
  {
    question: "What function checks if the bounding boxes of two geometries intersect?",
    shortAnswer: "`MBRIntersects(geom1, geom2)` or `ST_Intersects(geom1, geom2)`",
    explanation: "Fast bounding box intersection check used in spatial indexing.",
    hint: "MBRIntersects() or ST_Intersects().",
    level: "expert"
  },
  {
    question: "How do you define a `POLYGON` in WKT syntax?",
    shortAnswer: "`'POLYGON((x1 y1, x2 y2, x3 y3, x4 y4, x1 y1))'` (Note: Double parentheses; the last point must match the first point to close the ring).",
    explanation: "Outer rings are wrapped in parentheses and must close on the starting coordinate.",
    hint: "POLYGON((p1, p2, p3, p1)) with closed ring coordinates.",
    level: "basic",
    codeExample: "SELECT ST_GeomFromText('POLYGON((88.35 22.75, 88.37 22.75, 88.37 22.77, 88.35 22.77, 88.35 22.75))', 4326);"
  },
  {
    question: "Can a `LINESTRING` represent a delivery route with multiple waypoints?",
    shortAnswer: "Yes! A `LINESTRING` stores an ordered sequence of connected points, representing roads, bus routes, or vehicle tracking breadcrumb paths.",
    explanation: "Standard vector path representation in GIS.",
    hint: "Yes, stores ordered connected waypoints representing routes.",
    level: "basic"
  },
  {
    question: "What is `ST_Area(polygon)` used for?",
    shortAnswer: "It calculates the **surface area** of a polygon geometry (in square meters for SRID 4326).",
    explanation: "Computes geographic land area or delivery zone surface area.",
    hint: "Calculates the surface area of a polygon geometry.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 12 in Module 004_002?",
    shortAnswer: "MySQL's OpenGIS spatial data types (`POINT`, `POLYGON`) combined with `SRID 4326` and R-Tree `SPATIAL INDEX` deliver native geographic intelligence: execute high-speed radius distance calculations in meters (`ST_Distance`) and geofence containment checks (`ST_Contains`) directly in the database without external GIS servers.",
    explanation: "Essential foundation for building modern location-based, logistics, and delivery platforms.",
    hint: "Native spatial types with SRID 4326 and R-Trees enable fast geodesic distance and geofence operations in SQL.",
    level: "basic"
  }
];

export default questions;
