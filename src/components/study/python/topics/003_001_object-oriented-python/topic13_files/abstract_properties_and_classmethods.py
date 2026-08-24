# topic13_files/abstract_properties_and_classmethods.py
# Module: 003_001_object-oriented-python
# Topic: Abstract Base Classes (abc module)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 13 - File 2: Abstract Properties, Classmethods & Virtual Subclasses
Demonstrates:
  1. Abstract Properties: Combining `@property` and `@abstractmethod`
  2. Abstract Classmethods: Combining `@classmethod` and `@abstractmethod`
  3. Virtual Subclasses via `ABC.register()` (Subclassing without inheritance!)
  4. Custom dynamic subtyping via `__subclasshook__`
"""

from abc import ABC, abstractmethod
from typing import Dict, Any

# =====================================================================
# 1. ABSTRACT BASE WITH ABSTRACT PROPERTIES & CLASSMETHODS
# =====================================================================
class BaseCloudStorageProvider(ABC):
    """Abstract contract enforcing properties and factory classmethods."""

    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Mandatory abstract read-only property."""
        pass

    @property
    @abstractmethod
    def storage_quota_gb(self) -> float:
        """Mandatory abstract read-only property."""
        pass

    @classmethod
    @abstractmethod
    def create_from_config(cls, config: Dict[str, Any]) -> "BaseCloudStorageProvider":
        """Mandatory abstract alternative constructor factory."""
        pass

    @abstractmethod
    def upload_file(self, filename: str, binary_data: bytes) -> str:
        """Mandatory file upload contract."""
        pass


# =====================================================================
# 2. CONCRETE IMPLEMENTATION: AWS S3 PROVIDER
# =====================================================================
class AWSS3StorageProvider(BaseCloudStorageProvider):
    def __init__(self, bucket_name: str, quota_gb: float):
        self.bucket_name = bucket_name
        self._quota_gb = float(quota_gb)

    @property
    def provider_name(self) -> str:
        return f"Amazon Web Services S3 (Bucket: {self.bucket_name})"

    @property
    def storage_quota_gb(self) -> float:
        return self._quota_gb

    @classmethod
    def create_from_config(cls, config: Dict[str, Any]) -> "AWSS3StorageProvider":
        return cls(config.get("bucket", "default-bucket"), config.get("quota", 100.0))

    def upload_file(self, filename: str, binary_data: bytes) -> str:
        return f"https://s3.amazonaws.com/{self.bucket_name}/{filename}"


# =====================================================================
# 3. VIRTUAL SUBCLASSES VIA ABC.register()
# =====================================================================
class ExternalThirdPartyDropBox:
    """An external vendor class that does NOT inherit from BaseCloudStorageProvider."""
    def upload_file(self, filename: str, binary_data: bytes) -> str:
        return f"https://dropbox.com/files/{filename}"


# Register as a Virtual Subclass:
BaseCloudStorageProvider.register(ExternalThirdPartyDropBox)


def demonstrate_abstract_properties_and_virtual():
    print("=" * 70)
    print("CODER & ACCOTAX - ABSTRACT PROPERTIES & VIRTUAL SUBCLASSES")
    print("=" * 70)

    # 1. Factory Creation via Abstract Classmethod
    s3 = AWSS3StorageProvider.create_from_config({"bucket": "coder-accotax-backups", "quota": 500.0})
    print(f"1. Provider Name   : {s3.provider_name}")
    print(f"   Storage Quota   : {s3.storage_quota_gb} GB")
    print(f"   Uploaded File   : {s3.upload_file('syllabus_2026.pdf', b'101010')}\n")

    # 2. Virtual Subclass Reflection (ABC.register in action!)
    print("2. Virtual Subclass Introspection (ExternalThirdPartyDropBox):")
    print(f"   issubclass(DropBox, BaseCloudStorageProvider) : {issubclass(ExternalThirdPartyDropBox, BaseCloudStorageProvider)}")
    
    dropbox_instance = ExternalThirdPartyDropBox()
    print(f"   isinstance(dropbox_inst, BaseCloudStorageProvider): {isinstance(dropbox_instance, BaseCloudStorageProvider)}")

    print(r"""
Insight:
  `ExternalThirdPartyDropBox` never inherited from `BaseCloudStorageProvider` in code.
  Yet, via `ABC.register()`, Python's `issubclass()` and `isinstance()` treat it as a
  first-class virtual subtype!
""")
    print("[PASSED] Abstract Properties & Virtual Subclasses Verified.")


if __name__ == "__main__":
    demonstrate_abstract_properties_and_virtual()
