# topic4_files/bidirectional_custom_codec_dataclass_pipeline.py
# Module: 003_004_working-with-json
# Topic: Handling custom Python objects with custom JSONEncoders & object_hook
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 3: Bidirectional Dataclass JSON Codec Architecture
Demonstrates:
  1. Pairing `@dataclass` domain models with custom JSONEncoder & object_hook
  2. Achieving 100% roundtrip fidelity without manual dict-unpacking boilerplate
  3. Handling nested dataclasses and enumerations cleanly
"""

import json
from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import List

class CourseTier(Enum):
    FOUNDATION = "FOUNDATION"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"


@dataclass
class ModuleSyllabus:
    module_code: str
    topic_name: str
    lecture_hours: int


@dataclass
class AcademicCourse:
    course_id: str
    title: str
    tier: CourseTier
    launch_date: date
    modules: List[ModuleSyllabus]


class CourseDataClassCodec:
    """Unified bidirectional serializer & deserializer for Course dataclasses."""

    class Encoder(json.JSONEncoder):
        def default(self, o):
            if isinstance(o, CourseTier):
                return o.value
            elif isinstance(o, (date,)):
                return o.isoformat()
            elif isinstance(o, ModuleSyllabus):
                return {
                    "__dataclass__": "ModuleSyllabus",
                    "module_code": o.module_code,
                    "topic_name": o.topic_name,
                    "lecture_hours": o.lecture_hours
                }
            elif isinstance(o, AcademicCourse):
                return {
                    "__dataclass__": "AcademicCourse",
                    "course_id": o.course_id,
                    "title": o.title,
                    "tier": o.tier,
                    "launch_date": o.launch_date,
                    "modules": o.modules
                }
            return super().default(o)

    @classmethod
    def object_hook(cls, dct: dict):
        dtype = dct.get("__dataclass__")
        if dtype == "ModuleSyllabus":
            return ModuleSyllabus(
                module_code=dct["module_code"],
                topic_name=dct["topic_name"],
                lecture_hours=dct["lecture_hours"]
            )
        elif dtype == "AcademicCourse":
            return AcademicCourse(
                course_id=dct["course_id"],
                title=dct["title"],
                tier=CourseTier(dct["tier"]),
                launch_date=date.fromisoformat(dct["launch_date"]),
                modules=dct["modules"]
            )
        return dct

    @classmethod
    def serialize(cls, obj) -> str:
        return json.dumps(obj, cls=cls.Encoder, indent=2)

    @classmethod
    def deserialize(cls, json_str: str):
        return json.loads(json_str, object_hook=cls.object_hook)


def demonstrate_bidirectional_codec():
    print("=" * 70)
    print("CODER & ACCOTAX - BIDIRECTIONAL DATACLASS JSON CODEC")
    print("=" * 70)

    course = AcademicCourse(
        course_id="CRS-PY-2026",
        title="Python Full-Stack & Agentic AI",
        tier=CourseTier.ADVANCED,
        launch_date=date(2026, 9, 1),
        modules=[
            ModuleSyllabus("M01", "OOP & Decorators", 12),
            ModuleSyllabus("M02", "Generators & Iterators", 10),
            ModuleSyllabus("M03", "JSON APIs & Serialization", 8)
        ]
    )

    print("1. Serializing Nested Dataclasses to JSON:")
    json_doc = CourseDataClassCodec.serialize(course)
    print(json_doc)

    print("\n2. Deserializing Back to Dataclasses via `object_hook`:")
    restored_course: AcademicCourse = CourseDataClassCodec.deserialize(json_doc)

    print(f"   * Course Type      : {type(restored_course).__name__}")
    print(f"   * Course Title     : {restored_course.title}")
    print(f"   * Tier Enum Type   : {type(restored_course.tier)} ({restored_course.tier})")
    print(f"   * Launch Date Type : {type(restored_course.launch_date)} ({restored_course.launch_date})")
    print(f"   * First Module     : {restored_course.modules[0].topic_name} (Type: {type(restored_course.modules[0]).__name__})")
    print(f"   * Objects Match?   : {restored_course == course} [100% Roundtrip Fidelity!]")

    print("\n[PASSED] Bidirectional Dataclass JSON Codec Verified.")


if __name__ == "__main__":
    demonstrate_bidirectional_codec()
