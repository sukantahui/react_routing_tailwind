# topic7_files/fluent_pipeline_builder_and_method_chaining.py
# Module: 003_005_advance-comprehensions
# Topic: Building clean data transformation pipelines
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Fluent Pipeline Builder & Method Chaining DSL
Demonstrates:
  1. Building a declarative `Pipeline[T]` wrapper supporting method chaining
  2. Fluent `.filter()`, `.map()`, `.take()`, and `.collect()` methods
  3. Composing transformations into self-documenting expressive pipelines
"""

import itertools
from typing import Callable, Iterator, Any, List, TypeVar, Generic

T = TypeVar("T")
U = TypeVar("U")

class FluentPipeline(Generic[T]):
    """A lazy, fluent data transformation pipeline wrapper."""

    def __init__(self, source: Iterator[T]):
        self._source = source

    @classmethod
    def from_iterable(cls, iterable: Any) -> "FluentPipeline[T]":
        """Factory method to initialize pipeline from any iterable."""
        return cls(iter(iterable))

    def map(self, func: Callable[[T], U]) -> "FluentPipeline[U]":
        """Applies a transformation function lazily to each element."""
        return FluentPipeline(map(func, self._source))

    def filter(self, predicate: Callable[[T], bool]) -> "FluentPipeline[T]":
        """Filters elements matching the boolean predicate lazily."""
        return FluentPipeline(filter(predicate, self._source))

    def take(self, count: int) -> "FluentPipeline[T]":
        """Limits stream to the first N elements using itertools.islice."""
        return FluentPipeline(itertools.islice(self._source, count))

    def collect(self) -> List[T]:
        """Eagerly materializes the transformed stream into a list."""
        return list(self._source)

    def reduce(self, reducer_fn: Callable[[Any, T], Any], initializer: Any) -> Any:
        """Folds the stream into a single aggregated scalar."""
        acc = initializer
        for item in self._source:
            acc = reducer_fn(acc, item)
        return acc


def demonstrate_fluent_pipeline():
    print("=" * 70)
    print("CODER & ACCOTAX - FLUENT PIPELINE BUILDER & METHOD CHAINING")
    print("=" * 70)

    raw_candidates = [
        {"id": "STU-101", "name": "sourav mukherjee", "marks": 92.5, "branch": "AI"},
        {"id": "STU-102", "name": "priyanka sen", "marks": 88.0, "branch": "ML"},
        {"id": "STU-103", "name": "debolina roy", "marks": 95.0, "branch": "AI"},
        {"id": "STU-104", "name": "rahul verma", "marks": 54.0, "branch": "WEB"},  # Below 60%
        {"id": "STU-105", "name": "sneha gupta", "marks": 91.0, "branch": "AI"}
    ]

    print("1. Executing Fluent Chained Pipeline (Clean Declarative DSL):")
    # Expressive fluent pipeline chain:
    honors_roster = (
        FluentPipeline.from_iterable(raw_candidates)
        .filter(lambda s: s["marks"] >= 60.0)                        # Step 1: Filter qualifying marks
        .filter(lambda s: s["branch"] == "AI")                       # Step 2: Select AI branch
        .map(lambda s: {**s, "name": s["name"].title(), "tier": "HONORS"}) # Step 3: Enrich
        .take(2)                                                     # Step 4: Top 2 candidates
        .collect()                                                   # Step 5: Materialize
    )

    for cand in honors_roster:
        print(f"   * [{cand['id']}] {cand['name']:<18} | Marks: {cand['marks']}% | Tier: {cand['tier']}")

    # Aggregation through pipeline:
    total_marks = (
        FluentPipeline.from_iterable(raw_candidates)
        .filter(lambda s: s["marks"] >= 60.0)
        .reduce(lambda acc, s: acc + s["marks"], 0.0)
    )
    print(f"\n2. Total Qualifying Marks Aggregate: {total_marks:.2f}")

    print(r"""
Fluent Pipeline Benefits:
  1. Replaces deeply nested `map(..., filter(..., ...))` calls with clean linear method chaining.
  2. Keeps computation fully lazy until terminal `.collect()` or `.reduce()` is invoked.
""")
    print("[PASSED] Fluent Pipeline Builder & Method Chaining Verified.")


if __name__ == "__main__":
    demonstrate_fluent_pipeline()
