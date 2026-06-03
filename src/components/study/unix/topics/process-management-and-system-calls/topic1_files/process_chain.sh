#!/bin/bash
# process_chain.sh - demonstrates multi-level process creation
echo "Grandparent (original shell) PID: $$"
(
  echo "  Child (subshell) PID: $BASHPID"
  (
    echo "    Grandchild PID: $BASHPID"
    sleep 2
  ) &
  wait
) &
wait
echo "All processes done"