// src/components/sorting/sortingTeacherNarrator.js

/**
 * Sorting Algorithm Teacher Narrator
 * Provides natural, pedagogical teacher explanations for every step of sorting algorithms
 * Supports English (DSA Teacher) and Bengali (বাংলা শিক্ষক - retaining English technical terms)
 */

export const ALGORITHM_TEACHER_PROFILES = {
  bubble: {
    nameEn: "Bubble Sort",
    nameBn: "Bubble Sort (বাবল সর্ট)",
    timeComplexity: "O(N²)",
    spaceComplexity: "O(1)",
    bestCase: "O(N) (when array is already sorted)",
    worstCase: "O(N²) (reverse sorted)",
    summaryEn: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    summaryBn: "পাশাপাশি থাকা উপাদানগুলোর তুলনা করে এবং ভুল ক্রমে থাকলে তাদের অদলবদল (Swap) করে।",
    introEn:
      "Hello students! Let's understand Bubble Sort. In this algorithm, we repeatedly compare adjacent elements. If they are in the wrong order, we swap them. With each pass, the largest remaining unsorted element bubbles up to its correct position at the end, just like an air bubble rising to the surface of water.",
    introBn:
      "স্বাগতম ছাত্রছাত্রীরা! আজ আমরা Bubble Sort শিখব। এই অ্যালগরিদমে পাশাপাশি থাকা দুটি উপাদানের তুলনা করা হয়। যদি তারা সঠিক ক্রমে না থাকে, তবে তাদের Swap বা অদলবদল করা হয়। প্রতিটি Pass-এর শেষে সবচেয়ে বড় সংখ্যাটি পানির বুদবুদের মতো উপরে বা ডানদিকের শেষ প্রান্তে তার চূড়ান্ত সাজানো স্থানে পৌঁছে যায়।"
  },
  selection: {
    nameEn: "Selection Sort",
    nameBn: "Selection Sort (সিলেকশন সর্ট)",
    timeComplexity: "O(N²)",
    spaceComplexity: "O(1)",
    bestCase: "O(N²)",
    worstCase: "O(N²)",
    summaryEn: "Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.",
    summaryBn: "প্রতিটি ধাপে বাকি থাকা অংশ থেকে সর্বনিম্ন সংখ্যাটি খুঁজে বের করে বর্তমান শুরুর স্থানে বসিয়ে দেয়।",
    introEn:
      "Welcome class! Selection Sort works by dividing the array into two parts: sorted and unsorted. In each pass, we scan the unsorted portion, select the absolute minimum element, and swap it with the first unsorted position. It minimizes the total number of swaps to at most N swaps.",
    introBn:
      "স্বাগতম ক্লাসে! Selection Sort-এ পুরো Array-কে দুটি অংশে ভাগ করা হয়: Sorted এবং Unsorted অংশ। প্রতিটি Pass-এ আমরা সাজানো না হওয়া অংশ থেকে সবচেয়ে ছোট সংখ্যাটিকে খুঁজে বের করি (Select করি) এবং বর্তমান শুরুর ইনডেক্সের সাথে Swap করে দিই।"
  },
  insertion: {
    nameEn: "Insertion Sort",
    nameBn: "Insertion Sort (ইনসার্শন সর্ট)",
    timeComplexity: "O(N²)",
    spaceComplexity: "O(1)",
    bestCase: "O(N) (nearly sorted)",
    worstCase: "O(N²)",
    summaryEn: "Builds the sorted array one item at a time by repeatedly taking the next item and inserting it into the correct position.",
    summaryBn: "এক এক করে একটি উপাদানকে Key হিসেবে নিয়ে বাঁদিকের সাজানো সাব-অ্যারেতে তার সঠিক অবস্থানে ঢোকায়।",
    introEn:
      "Hello students! Think of Insertion Sort like sorting a hand of playing cards. We take one element at a time, called the 'Key', and compare it backward into the already sorted portion on the left, shifting larger elements to the right until the key finds its correct slot.",
    introBn:
      "হ্যালো ছাত্রছাত্রীরা! Insertion Sort হলো ঠিক তাসের পাতা হাতে সাজানোর মতো। আমরা এক এক করে একটি সংখ্যা বা Key হাতে নিই, তারপর বাঁদিকের ইতিমধ্যে সাজানো অংশের পেছনের দিকে তুলনা করে বড় সংখ্যাগুলোকে ডানদিকে সরিয়ে Key-টিকে তার সঠিক স্থানে Insert করি।"
  },
  quick: {
    nameEn: "Quick Sort",
    nameBn: "Quick Sort (কুইক সর্ট)",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(log N)",
    bestCase: "O(N log N)",
    worstCase: "O(N²) (bad pivot choice)",
    summaryEn: "Picks a pivot, partitions array around pivot such that smaller elements are left and larger are right, then recurses.",
    summaryBn: "একটি Pivot বেছে নিয়ে তার চারপাশের উপাদানকে ছোট ও বড় ভাগে ভাগ করে রিকার্সিভলি সমাধান করে।",
    introEn:
      "Welcome students! Quick Sort is a fast Divide and Conquer algorithm. We pick a 'Pivot' element, partition the array so that all elements smaller than the pivot go to the left and larger ones go to the right, and then recursively sort the sub-arrays.",
    introBn:
      "স্বাগতম ছাত্রছাত্রীরা! Quick Sort হলো একটি অত্যন্ত দ্রুত Divide and Conquer অ্যালগরিদম। আমরা একটি সংখ্যাকে Pivot হিসেবে বেছে নিই, এবং অ্যারেটিকে এমনভাবে Partition করি যাতে পিভটের চেয়ে ছোট মানগুলো বাঁদিকে এবং বড় মানগুলো ডানদিকে চলে যায়। তারপর দুই অংশকে রিকার্সিভলি সাজানো হয়।"
  },
  merge: {
    nameEn: "Merge Sort",
    nameBn: "Merge Sort (মার্জ সর্ট)",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    bestCase: "O(N log N)",
    worstCase: "O(N log N)",
    summaryEn: "Divides the array into two halves, recursively sorts them, and then merges the two sorted halves.",
    summaryBn: "অ্যারেকে অর্ধেক করে ভেঙে ক্ষুদ্রতম অংশে ভাগ করে, এবং পরে ক্রমানুসারে তুলনা করে জোড়া লাগায় (Merge)।",
    introEn:
      "Hello students! Merge Sort is a guaranteed O(N log N) Divide and Conquer algorithm. It breaks the array down into halves until each subarray has only one element, and then merges those sorted subarrays back together in perfect order.",
    introBn:
      "হ্যালো ছাত্রছাত্রীরা! Merge Sort হলো একটি সুনিশ্চিত O(N log N) Divide and Conquer অ্যালগরিদম। এটি সম্পূর্ণ Array-কে ভেঙে অর্ধেক অর্ধেক করে ক্ষুদ্রতম সাব-অ্যারেতে পরিণত করে, এবং পরে সেই অংশগুলোকে ক্রমানুসারে তুলনা করে Merge বা জোড়া দিয়ে সম্পূর্ণ সাজিয়ে তোলে।"
  }
};

/**
 * Generate teacher explanation for the current step
 */
export function getTeacherStepExplanation({
  algorithm = "bubble",
  sortOrder = "asc",
  step,
  currentStepIdx = 0,
  totalSteps = 1,
  language = "bn"
}) {
  if (!step) {
    return {
      title: language === "bn" ? "প্রস্তুতি" : "Ready",
      speechText:
        language === "bn"
          ? "সর্টিং শুরু করার জন্য প্লে বাটনে ক্লিক করুন।"
          : "Click play or step forward to start sorting.",
      displaySubtitle: "Ready to start."
    };
  }

  const isAsc = sortOrder === "asc";
  const orderWordEn = isAsc ? "ascending (smallest to largest)" : "descending (largest to smallest)";
  const orderWordBn = isAsc ? "ছোট থেকে বড় (Ascending)" : "বড় থেকে ছোট (Descending)";
  const algoProfile = ALGORITHM_TEACHER_PROFILES[algorithm] || ALGORITHM_TEACHER_PROFILES.bubble;
  const status = step.statusText || "";

  // STEP 0: INITIAL STATE
  if (currentStepIdx === 0 || (step.stepType === "init" && currentStepIdx === 0)) {
    const speechEn = `Hello students! Today we are demonstrating ${algoProfile.nameEn} on an array of ${step.array.length} numbers, sorting in ${orderWordEn} order. Let's observe the data and trace the algorithm step by step.`;
    const speechBn = `স্বাগতম ছাত্রছাত্রীরা! আজ আমরা ${step.array.length} টি সংখ্যার এই ডেটাসেটে ${algoProfile.nameBn} অ্যালগরিদমটি ${orderWordBn} ক্রমে সাজিয়ে শিখব। চলো ধাপে ধাপে প্রতিটি পদক্ষেপ লক্ষ্য করি।`;

    return {
      title: language === "bn" ? "ভূমিকা ও প্রাথমিক অবস্থা" : "Introduction & Initial State",
      speechText: language === "bn" ? speechBn : speechEn,
      displaySubtitle:
        language === "bn"
          ? `অ্যারে সাইজ: ${step.array.length} • ক্রম: ${orderWordBn}`
          : `Array size: ${step.array.length} • Order: ${orderWordEn}`
    };
  }

  // FINAL COMPLETED STATE
  if (step.stepType === "complete" || currentStepIdx >= totalSteps - 1 || status.includes("Sorting Complete")) {
    const speechEn = `Well done students! ${algoProfile.nameEn} is complete. Total comparisons: ${step.comparisons}, total swaps: ${step.swaps}. All ${step.array.length} elements are now perfectly sorted in ${orderWordEn} order!`;
    const speechBn = `অভিনন্দন ছাত্রছাত্রীরা! ${algoProfile.nameBn} সফলভাবে সম্পন্ন হয়েছে। মোট ${step.comparisons} টি Comparison এবং ${step.swaps} টি Swap হয়েছে। সম্পূর্ণ অ্যারেটি এখন নিখুঁতভাবে ${orderWordBn} ক্রমে সাজানো!`;

    return {
      title: language === "bn" ? "সর্টিং সম্পূর্ণ!" : "Sorting Complete!",
      speechText: language === "bn" ? speechBn : speechEn,
      displaySubtitle:
        language === "bn"
          ? `সম্পূর্ণ সর্টেড! মোট তুলনা: ${step.comparisons}, অদলবদল: ${step.swaps}`
          : `Fully sorted! Comparisons: ${step.comparisons}, Swaps: ${step.swaps}`
    };
  }

  // BUBBLE SORT
  if (algorithm === "bubble") {
    if (status.startsWith("Outer pass")) {
      const passNum = (step.vars?.i ?? 0) + 1;
      const speechEn = `Starting Pass number ${passNum}. We compare adjacent pairs from index 0. The largest unsorted number will bubble up to the right.`;
      const speechBn = `পাস নম্বর ${passNum} শুরু হচ্ছে। ইনডেক্স 0 থেকে পাশাপাশি দুটি সংখ্যার তুলনা শুরু করব। সবচেয়ে বড় সংখ্যাটি বুদবুদের মতো ডানদিকে উঠে যাবে।`;
      return {
        title: language === "bn" ? `পাস ${passNum} শুরু` : `Starting Pass ${passNum}`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (step.stepType === "compare") {
      const idx1 = step.compareIndices[0] ?? 0;
      const idx2 = step.compareIndices[1] ?? 1;
      const val1 = step.array[idx1];
      const val2 = step.array[idx2];
      const needsSwap = isAsc ? val1 > val2 : val1 < val2;

      let speechEn = "";
      let speechBn = "";

      if (needsSwap) {
        speechEn = `Comparing index ${idx1} (${val1}) and index ${idx2} (${val2}). Since ${val1} is ${isAsc ? "greater" : "smaller"} than ${val2}, they are in the wrong order. We must swap them!`;
        speechBn = `ইনডেক্স ${idx1}-এ মান ${val1} এবং ইনডেক্স ${idx2}-এ মান ${val2}। যেহেতু ${val1} সংখ্যাটি ${val2}-এর চেয়ে ${isAsc ? "বড়" : "ছোট"}, তাই এরা সঠিক ক্রমে নেই। এদের Swap করতে হবে।`;
      } else {
        speechEn = `Comparing index ${idx1} (${val1}) and index ${idx2} (${val2}). ${val1} is already in correct order with respect to ${val2}. No swap needed.`;
        speechBn = `ইনডেক্স ${idx1}-এ মান ${val1} এবং ইনডেক্স ${idx2}-এ মান ${val2}। ${val1} ইতিমধ্যে ${val2}-এর চেয়ে ${isAsc ? "ছোট বা সমান" : "বড় বা সমান"}, তাই এরা সঠিক ক্রমে আছে। Swap লাগবে না।`;
      }

      return {
        title: language === "bn" ? `তুলনা: [${val1}] বনাম [${val2}]` : `Comparing [${val1}] vs [${val2}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (step.stepType === "swap") {
      const idx1 = step.swapIndices[0] ?? 0;
      const idx2 = step.swapIndices[1] ?? 1;
      const val1 = step.array[idx1];
      const val2 = step.array[idx2];
      const speechEn = `Swapped! Elements ${val1} and ${val2} exchanged places. The larger element advances right.`;
      const speechBn = `Swap সম্পন্ন হলো! ${val1} এবং ${val2} পরস্পরের স্থান পরিবর্তন করল।`;

      return {
        title: language === "bn" ? `অদলবদল (Swap): [${val1}] ↔ [${val2}]` : `Swapped: [${val1}] ↔ [${val2}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (step.stepType === "sorted" || status.includes("final sorted position")) {
      const sortedIdx = step.vars?.sortedIndex ?? (step.array.length - 1);
      const sortedVal = step.vars?.sortedVal ?? step.array[sortedIdx];
      const speechEn = `Great! Element ${sortedVal} at index ${sortedIdx} is now locked in its final sorted position.`;
      const speechBn = `চমৎকার! মান ${sortedVal} তার চূড়ান্ত সাজানো স্থান ইনডেক্স ${sortedIdx}-এ স্থির হয়ে গেল।`;

      return {
        title: language === "bn" ? `চূড়ান্ত অবস্থানে লক: [${sortedVal}]` : `Locked in place: [${sortedVal}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }
  }

  // SELECTION SORT
  if (algorithm === "selection") {
    if (status.includes("setting current extremeIdx")) {
      const i = step.vars?.i ?? 0;
      const val = step.vars?.extremeVal ?? step.array[i];
      const speechEn = `Pass ${i + 1}: We assume the element at index ${i} with value ${val} is our current ${isAsc ? "minimum" : "maximum"}. We will search the remaining unsorted array.`;
      const speechBn = `পাস ${i + 1}: ইনডেক্স ${i}-এর মান ${val}-কে বর্তমান ${isAsc ? "ন্যূনতম (minimum)" : "সর্বোচ্চ (maximum)"} হিসেবে ধরলাম। বাকি অংশে এর চেয়ে উপযুক্ত মান খুঁজব।`;

      return {
        title: language === "bn" ? `পাস ${i + 1}: প্রারম্ভিক প্রার্থী [${val}]` : `Pass ${i + 1}: Candidate [${val}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("New extreme element found")) {
      const j = step.vars?.newExtremeIdx ?? 0;
      const val = step.vars?.extremeVal ?? step.array[j];
      const speechEn = `Found a better value at index ${j}! Value ${val} is ${isAsc ? "smaller" : "larger"}. Updating our candidate pointer to index ${j}.`;
      const speechBn = `ইনডেক্স ${j}-এ মান ${val} পাওয়া গেল, যা আরও ${isAsc ? "ছোট" : "বড়"}! তাই ইনডেক্স ${j}-কে নতুন প্রার্থী হিসেবে আপডেট করলাম।`;

      return {
        title: language === "bn" ? `নতুন প্রার্থী পাওয়া গেল: [${val}]` : `New Candidate: [${val}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (step.stepType === "compare") {
      const idx1 = step.compareIndices[0];
      const idx2 = step.compareIndices[1];
      const val1 = step.array[idx1];
      const val2 = step.array[idx2];
      const speechEn = `Scanning: Comparing candidate at index ${idx1} (${val1}) with element at index ${idx2} (${val2}).`;
      const speechBn = `স্ক্যান চলছে: প্রার্থী ইনডেক্স ${idx1} (${val1})-এর সাথে ইনডেক্স ${idx2} (${val2})-এর তুলনা করা হচ্ছে।`;

      return {
        title: language === "bn" ? `স্ক্যান তুলনা: [${val1}] বনাম [${val2}]` : `Scanning [${val1}] vs [${val2}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (step.stepType === "swap" || status.includes("Swapped extreme element")) {
      const idx1 = step.swapIndices[0] ?? 0;
      const idx2 = step.swapIndices[1] ?? 0;
      const speechEn = `Selection pass complete! Swapping the found ${isAsc ? "minimum" : "maximum"} into index ${idx1}.`;
      const speechBn = `সিলেকশন সম্পন্ন! প্রাপ্ত ${isAsc ? "সর্বনিম্ন" : "সর্বোচ্চ"} মানটিকে ইনডেক্স ${idx1}-এ Swap করে স্থান দেওয়া হলো।`;

      return {
        title: language === "bn" ? `সিলেকশন Swap সম্পন্ন` : `Selection Swap`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }
  }

  // INSERTION SORT
  if (algorithm === "insertion") {
    if (status.includes("Picked key")) {
      const key = step.vars?.key;
      const i = step.vars?.i ?? 1;
      const speechEn = `We pick key element ${key} at index ${i}. Now we will scan left through the sorted portion to find its exact insertion spot.`;
      const speechBn = `ইনডেক্স ${i} থেকে Key = ${key} তুলে নিলাম। এবার বাঁদিকের সাজানো উপাত্তগুলোর সাথে তুলনা করে এর সঠিক স্থান বের করব।`;

      return {
        title: language === "bn" ? `Key গ্রহণ: [${key}]` : `Picked Key: [${key}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("Comparing array")) {
      const j = step.vars?.j;
      const arrJ = step.vars?.["arr[j]"] ?? step.array[j];
      const key = step.vars?.key;
      const speechEn = `Comparing sorted element ${arrJ} with our key ${key}. Since ${arrJ} is ${isAsc ? "greater" : "smaller"}, it must shift right.`;
      const speechBn = `সাজানো উপাদান ${arrJ}-এর সাথে Key ${key}-এর তুলনা। যেহেতু ${arrJ} সংখ্যাটি ${isAsc ? "বড়" : "ছোট"}, তাই একে ডানদিকে সরাতে হবে।`;

      return {
        title: language === "bn" ? `Key তুলনা: [${arrJ}] বনাম [${key}]` : `Key Compare: [${arrJ}] vs [${key}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("Shifted")) {
      const from = step.vars?.shiftedFrom;
      const to = step.vars?.shiftedTo;
      const val = step.array[to];
      const speechEn = `Shifted element ${val} right from index ${from} to index ${to} to create space for our key.`;
      const speechBn = `জায়গা তৈরির জন্য মান ${val}-কে ইনডেক্স ${from} থেকে ডানদিকের ইনডেক্স ${to}-এ Shift করা হলো।`;

      return {
        title: language === "bn" ? `উপাদান Shift: [${val}]` : `Shifted [${val}] Right`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("Inserted key")) {
      const key = step.vars?.key;
      const pos = step.vars?.insertedAt;
      const speechEn = `Spot found! Inserted key ${key} into index ${pos}. The sub-array is now sorted up to this point.`;
      const speechBn = `সঠিক জায়গা পাওয়া গেল! Key ${key}-কে ইনডেক্স ${pos}-এ Insert করা হলো।`;

      return {
        title: language === "bn" ? `Key স্থাপন (Insert): [${key}]` : `Inserted Key [${key}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }
  }

  // QUICK SORT
  if (algorithm === "quick") {
    if (status.includes("Chosen pivot")) {
      const pivot = step.vars?.pivot;
      const high = step.vars?.high;
      const speechEn = `Quick Sort partition: Chosen pivot = ${pivot} at index ${high}. Elements ${isAsc ? "smaller" : "greater"} will move left, and others right.`;
      const speechBn = `Quick Sort পার্টিশন: ইনডেক্স ${high}-এর ${pivot}-কে Pivot নির্বাচন করা হলো। ছোট উপাদানগুলো বাঁদিকে এবং বড়গুলো ডানদিকে গ্রুপ হবে।`;

      return {
        title: language === "bn" ? `Pivot নির্বাচন: [${pivot}]` : `Selected Pivot: [${pivot}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("against pivot")) {
      const j = step.vars?.j;
      const arrJ = step.vars?.["arr[j]"] ?? step.array[j];
      const pivot = step.vars?.pivot;
      const speechEn = `Comparing element ${arrJ} against pivot ${pivot}.`;
      const speechBn = `উপাদান ${arrJ}-এর সাথে Pivot ${pivot}-এর তুলনা করা হচ্ছে।`;

      return {
        title: language === "bn" ? `পিভটের সাথে তুলনা: [${arrJ}]` : `Compare vs Pivot [${pivot}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("swapped array") && status.includes("pivot")) {
      const speechEn = `Element is smaller than or equal to pivot, so we swap it into the left partition.`;
      const speechBn = `উপাদানটি Pivot-এর চেয়ে ছোট বা সমান, তাই একে বাঁদিকের পার্টিশনে Swap করে পাঠিয়ে দিলাম।`;

      return {
        title: language === "bn" ? `পার্টিশন Swap` : `Partition Swap`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("Placed pivot")) {
      const pivotVal = step.vars?.pivotValue;
      const pos = step.vars?.pivotIndex;
      const speechEn = `Partition done! Pivot ${pivotVal} is now placed at index ${pos}, dividing smaller elements from larger ones.`;
      const speechBn = `পার্টিশন শেষ! Pivot ${pivotVal} এখন ইনডেক্স ${pos}-এ তার চূড়ান্ত স্থায়ী অবস্থান পেয়ে গেল।`;

      return {
        title: language === "bn" ? `Pivot চূড়ান্ত স্থানে স্থাপিত: [${pivotVal}]` : `Pivot in Final Position [${pivotVal}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("quickSort call")) {
      const low = step.vars?.low;
      const high = step.vars?.high;
      const speechEn = `Recursive call: Running Quick Sort on sub-array range from index ${low} to ${high}.`;
      const speechBn = `রিকার্সিভ কল: ইনডেক্স ${low} থেকে ${high} পর্যন্ত উপ-অ্যারের ওপর Quick Sort চালানো হচ্ছে।`;

      return {
        title: language === "bn" ? `রিকার্সিভ সাব-অ্যারে [${low}..${high}]` : `Sub-array [${low}..${high}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }
  }

  // MERGE SORT
  if (algorithm === "merge") {
    if (status.includes("Dividing range")) {
      const l = step.vars?.left;
      const r = step.vars?.right;
      const m = step.vars?.mid;
      const speechEn = `Divide step: Splitting subarray from index ${l} to ${r} at midpoint ${m}.`;
      const speechBn = `Divide ধাপ: ইনডেক্স ${l} থেকে ${r} পর্যন্ত সাব-অ্যারেটিকে মধ্যবিন্দু ${m}-এ দুই ভাগে বিভক্ত করা হলো।`;

      return {
        title: language === "bn" ? `Divide: উপ-অ্যারে বিভাজন [${l}..${r}]` : `Divide [${l}..${r}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("Comparing left element")) {
      const leftVal = step.vars?.["left[i]"];
      const rightVal = step.vars?.["right[j]"];
      const speechEn = `Merge comparison: Comparing left subarray element ${leftVal} with right subarray element ${rightVal}.`;
      const speechBn = `মার্জ তুলনা: বামদিকের ${leftVal}-এর সাথে ডানদিকের ${rightVal}-এর তুলনা করা হচ্ছে।`;

      return {
        title: language === "bn" ? `মার্জ তুলনা: [${leftVal}] বনাম [${rightVal}]` : `Merge Compare: [${leftVal}] vs [${rightVal}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("Placed value")) {
      const val = step.vars?.placedVal;
      const k = step.vars?.index;
      const speechEn = `Placing smaller element ${val} into merged position ${k}.`;
      const speechBn = `ছোট মান ${val}-কে মার্জ করা অ্যারের ইনডেক্স ${k}-এ স্থাপন করা হলো।`;

      return {
        title: language === "bn" ? `মার্জে মান স্থাপন: [${val}]` : `Placed [${val}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }

    if (status.includes("Copying remaining")) {
      const val = step.vars?.placedVal;
      const k = step.vars?.index;
      const speechEn = `Copying remaining sorted element ${val} into index ${k}.`;
      const speechBn = `অবশিষ্ট সাজানো উপাদান ${val}-কে ইনডেক্স ${k}-এ কপি করা হলো।`;

      return {
        title: language === "bn" ? `অবশিষ্ট উপাদান কপি: [${val}]` : `Copying Remaining [${val}]`,
        speechText: language === "bn" ? speechBn : speechEn,
        displaySubtitle: status
      };
    }
  }

  // GENERAL FALLBACK
  const fallbackEn = status || `Executing step ${currentStepIdx} of ${algoProfile.nameEn}.`;
  const fallbackBn = `ধাপ ${currentStepIdx}: ${status || `${algoProfile.nameBn}-এর কার্যক্রম চলছে।`}`;

  return {
    title: language === "bn" ? `ধাপ ${currentStepIdx}` : `Step ${currentStepIdx}`,
    speechText: language === "bn" ? fallbackBn : fallbackEn,
    displaySubtitle: status
  };
}

/**
 * Speech Manager for Audio Synthesis
 */
export class SortingVoiceTeacher {
  constructor() {
    this.speechSynth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.language = "bn"; // 'bn' | 'en'
    this.speechRate = 1.0;
    this.voice = null;
    this.onStateChange = null;

    if (this.speechSynth) {
      if (typeof window !== "undefined" && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
      this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.speechSynth) return;
    const voices = this.speechSynth.getVoices();
    if (this.language === "bn") {
      this.voice = voices.find((v) => v.lang.startsWith("bn")) || null;
    } else {
      this.voice =
        voices.find((v) => v.lang.startsWith("en-") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("David") || v.name.includes("Guy"))) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        null;
    }
  }

  setLanguage(lang) {
    this.language = lang;
    this.loadVoices();
  }

  setRate(rate) {
    this.speechRate = Math.max(0.7, Math.min(1.5, rate));
  }

  stop() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  speak(text, onEndCallback = null) {
    if (!this.speechSynth || !text) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      this.speechSynth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.language === "bn" ? "bn-IN" : "en-US";
      utterance.rate = this.language === "bn" ? 0.95 * this.speechRate : 1.0 * this.speechRate;
      utterance.pitch = 1.0;

      if (!this.voice) {
        this.loadVoices();
      }
      if (this.voice) {
        utterance.voice = this.voice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (this.onStateChange) this.onStateChange(true);
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
        if (onEndCallback) onEndCallback();
      };

      this.currentUtterance = utterance;
      this.speechSynth.speak(utterance);
    } catch (e) {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEndCallback) onEndCallback();
    }
  }
}
