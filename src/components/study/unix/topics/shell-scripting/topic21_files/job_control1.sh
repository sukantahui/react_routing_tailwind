#!/bin/bash
# Parallel job execution with wait
# Used by Tuhina for batch student data processing

echo "Starting parallel data processing jobs..."

# Start multiple background jobs
echo "Job 1: Processing mathematics data..."
process_math.sh &
job1_pid=$!

echo "Job 2: Processing physics data..."
process_physics.sh &
job2_pid=$!

echo "Job 3: Processing chemistry data..."
process_chemistry.sh &
job3_pid=$!

echo "Job 4: Generating reports..."
generate_reports.sh &
job4_pid=$!

echo -e "\nAll jobs started in background."
echo "Job PIDs: $job1_pid, $job2_pid, $job3_pid, $job4_pid"

# Wait for all jobs to complete
echo -e "\n⏳ Waiting for all jobs to complete..."
wait $job1_pid
math_exit=$?

wait $job2_pid
physics_exit=$?

wait $job3_pid
chemistry_exit=$?

wait $job4_pid
report_exit=$?

# Check results
echo -e "\n📋 Job Results:"
echo "Mathematics: $([ $math_exit -eq 0 ] && echo "✅ Success" || echo "❌ Failed")"
echo "Physics: $([ $physics_exit -eq 0 ] && echo "✅ Success" || echo "❌ Failed")"
echo "Chemistry: $([ $chemistry_exit -eq 0 ] && echo "✅ Success" || echo "❌ Failed")"
echo "Reports: $([ $report_exit -eq 0 ] && echo "✅ Success" || echo "❌ Failed")"

# Final status
if [ $math_exit -eq 0 ] && [ $physics_exit -eq 0 ] && [ $chemistry_exit -eq 0 ] && [ $report_exit -eq 0 ]; then
    echo -e "\n🎉 All jobs completed successfully!"
else
    echo -e "\n⚠️ Some jobs failed. Check logs for details."
    exit 1
fi