#!/bin/bash
# tr_squeeze.sh - Squeeze repeated characters with -s
echo "Hello    World" | tr -s ' '          # multiple spaces to one
echo $'Line1\n\n\nLine2' | tr -s '\n'      # multiple newlines to one
echo "aaa bbb aaa" | tr -s 'a'             # consecutive 'a' become single 'a'