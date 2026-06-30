# best_use_cases.py
# Decision helper: when to choose text vs binary

def decide_format(data_type, needs_human_readable, performance_critical, size_sensitive):
    """
    Simple decision logic for choosing between text and binary.
    """
    if needs_human_readable:
        return "Text (for readability)"
    if performance_critical or size_sensitive:
        return "Binary (for efficiency)"
    # Default: if data is textual and not performance-critical, use text.
    if data_type in ['string', 'json', 'csv', 'xml']:
        return "Text (appropriate for data type)"
    return "Binary (default for non-textual data)"

if __name__ == "__main__":
    # Example usage
    scenarios = [
        {"data_type": "log", "human": True, "perf": False, "size": False},
        {"data_type": "image", "human": False, "perf": True, "size": True},
        {"data_type": "config", "human": True, "perf": False, "size": False},
        {"data_type": "large_dataset", "human": False, "perf": True, "size": True},
        {"data_type": "message", "human": True, "perf": False, "size": False},
        {"data_type": "serialized_object", "human": False, "perf": True, "size": True},
    ]
    print("📋 Decision guide:\n")
    for s in scenarios:
        choice = decide_format(
            s["data_type"], s["human"], s["perf"], s["size"]
        )
        print(f"  {s['data_type']:>15} → {choice}")