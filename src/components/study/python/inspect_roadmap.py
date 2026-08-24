import json

with open("python-roadmap.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open("roadmap_summary.txt", "w", encoding="utf-8") as out:
    for seg in data.get("segments", []):
        out.write(f"\n=======================================================\n")
        out.write(f"Segment ID: {seg.get('segmentId')} | Title: {seg.get('title')}\n")
        out.write(f"=======================================================\n")
        for mod in seg.get("modules", []):
            out.write(f"  Module ID: {mod.get('moduleId')} | Slug: {mod.get('slug')} | Title: {mod.get('title')}\n")
            for idx, topic in enumerate(mod.get("topics", [])):
                out.write(f"    Topic {idx}: {topic}\n")

print("Wrote roadmap_summary.txt cleanly.")
