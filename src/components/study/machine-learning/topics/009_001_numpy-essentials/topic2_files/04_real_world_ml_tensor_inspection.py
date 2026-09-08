"""
================================================================================
Topic 2 - Script 04: Real-World ML Computer Vision & NLP Tensor Representation
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- 4D Computer Vision Image Batch: (Batch_Size, Channels, Height, Width)
- 3D NLP Sequence Batch: (Batch_Size, Sequence_Length, Embedding_Dim)
- Strides and memory footprints in production deep learning pipelines
================================================================================
"""

import numpy as np

def simulate_ml_tensors():
    print("=" * 65)
    print("1. COMPUTER VISION: Batch of RGB Training Images")
    print("=" * 65)
    
    # 32 images, 3 color channels (RGB), 224 height, 224 width
    batch_size, channels, height, width = 32, 3, 224, 224
    
    # Simulated image batch in float32
    cv_batch = np.random.randn(batch_size, channels, height, width).astype(np.float32)
    
    print(f"CV Batch Shape   : {cv_batch.shape}")
    print(f"Total Pixels/Nums: {cv_batch.size:,}")
    print(f"Memory Size (MB) : {cv_batch.nbytes / (1024 * 1024):.2f} MB")
    print(f"Byte Strides     : {cv_batch.strides}")
    print(f"Stride to jump to next image: {cv_batch.strides[0]} bytes")
    
    print("\n" + "=" * 65)
    print("2. NLP: Transformer Input Batch")
    print("=" * 65)
    # 16 sentences, 128 tokens per sentence, 768-dim embeddings (BERT base)
    nlp_batch = np.zeros((16, 128, 768), dtype=np.float32)
    print(f"NLP Batch Shape  : {nlp_batch.shape}")
    print(f"Total Floats     : {nlp_batch.size:,}")
    print(f"Memory Size (MB) : {nlp_batch.nbytes / (1024 * 1024):.2f} MB")
    print(f"Byte Strides     : {nlp_batch.strides}")

if __name__ == "__main__":
    simulate_ml_tensors()
