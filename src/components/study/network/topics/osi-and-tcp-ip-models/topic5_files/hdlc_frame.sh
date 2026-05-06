#!/bin/bash
# hdlc_frame.sh – simulate HDLC framing
echo "=== HDLC Frame Simulator ==="
echo "Flag: 01111110"
echo "Example address: 0x01"
echo "Control field (I-frame): 0x00"
echo "Information: 'HDLC'"
echo "FCS (CRC-16): 0x1D0F"
echo "Final flag: 01111110"
# Bit stuffing demonstration
DATA="011111101111110"
STUFFED=$(echo $DATA | sed 's/11111/111110/g')
echo "Original data: $DATA"
echo "After stuffing: $STUFFED"