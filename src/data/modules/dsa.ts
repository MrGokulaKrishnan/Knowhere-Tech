import type { Lesson } from '@/types';

export const DSA_LESSONS: Lesson[] = [
  {
    id: 'dsa-bigo',
    moduleKey: 'dsa',
    title: 'Big O Notation & Complexity Analysis',
    slug: 'big-o',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['dsa', 'big-o', 'time-complexity', 'space-complexity'],
    explanation: 'Big O notation characterizes the asymptotic efficiency and scalability of an algorithm by describing its limiting behavior as the input size n approaches infinity.',
    beginnerExplanation: 'Big O is like asking: "If my user base grows from 10 to 1,000,000, will my server take 1 second, 1 minute, or 10 years to finish the task?" O(1) is instant, O(n) grows steadily, and O(n²) slows down dramatically.',
    technicalExplanation: 'Big O defines the tight asymptotic upper bound f(n) = O(g(n)) such that 0 <= f(n) <= c * g(n) for all n >= n0. We analyze Time Complexity (CPU operations count) and Auxiliary Space Complexity (extra memory allocated during algorithm execution).',
    keyPoints: [
      'O(1) Constant Time: Instant lookup regardless of input size (HashMap get)',
      'O(log n) Logarithmic Time: Divide-and-conquer (Binary Search, balanced BST)',
      'O(n) Linear Time: Single iteration through array/list',
      'O(n log n) Linearithmic: Optimal comparison sort (Merge Sort, Quick Sort)',
      'O(n²) Quadratic Time: Nested loops (Bubble Sort, brute force pairwise checks)'
    ],
    codeExample: `// O(1) - Constant Time
public int getFirst(int[] arr) {
    return arr[0]; 
}

// O(log n) - Binary Search
public int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '    int mid = low + (high - low) / 2;', token: 'mid calculation', explanation: 'Prevents integer overflow bug present in (low + high) / 2 when sum exceeds 2^31 - 1.' },
      { code: '        if (arr[mid] < target) low = mid + 1;', token: 'low = mid + 1', explanation: 'Discards the left half of the search space in O(1) step, cutting search domain by 50%.' }
    ],
    visualizer: 'dsa-sorting',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        answer: 1,
        explanation: 'Balanced BST reduces the search range by half at each step, yielding O(log n) time.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'What is the time complexity of two consecutive (non-nested) loops iterating from 1 to n?',
        code: `for (int i = 0; i < n; i++) { ... }
for (int j = 0; j < n; j++) { ... }`,
        answer: 'O(n)',
        hint: 'O(n) + O(n) = O(2n) = O(n). Constants are dropped in Big O analysis.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Why is QuickSort preferred over MergeSort for in-memory array sorting despite worst-case O(n²)?',
        level: 'intermediate',
        answer: 'QuickSort is an in-place sort requiring only O(log n) auxiliary stack space, with excellent CPU L1/L2 cache locality. MergeSort requires O(n) extra heap memory allocation. With randomized pivot selection (Dual-Pivot Quicksort in Java Arrays.sort), the O(n²) worst case is virtually eliminated in practice.',
        example: 'Java uses Dual-Pivot Quicksort for primitives and Timsort for objects.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-sorting-algo',
    moduleKey: 'dsa',
    title: 'Sorting Algorithms & Two Pointers',
    slug: 'sorting',
    difficulty: 'intermediate',
    duration: 15,
    order: 2,
    prerequisites: ['dsa-bigo'],
    tags: ['sorting', 'quicksort', 'mergesort', 'two-pointers'],
    explanation: 'Comprehensive exploration of comparison and non-comparison sorting algorithms, stability, and two-pointer algorithmic patterns for array and string manipulation.',
    beginnerExplanation: 'Sorting is organizing a messy deck of cards. Two pointers is like holding your left and right fingers on both ends of the cards and walking them towards the center to find pairs that sum to a target.',
    technicalExplanation: 'Dual-pointer patterns reduce O(n²) nested loop searches to O(n) on sorted arrays by moving left and right boundary indices based on monotonicity conditions.',
    keyPoints: [
      'Two Pointers pattern: Converging from opposite ends (left/right) on sorted data',
      'Sliding Window pattern: Dynamic/fixed sub-array bounds for maximum sum or unique substrings',
      'Stable Sort vs Unstable Sort: Preserving original relative order of equal keys'
    ],
    codeExample: `// Two-Pointer: Two Sum on Sorted Array -> O(n) time, O(1) space
public static int[] twoSumSorted(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    
    while (left < right) {
        int currentSum = numbers[left] + numbers[right];
        if (currentSum == target) {
            return new int[]{left + 1, right + 1}; // 1-indexed
        } else if (currentSum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    return new int[]{-1, -1};
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '    while (left < right) {', token: 'left < right', explanation: 'Boundary guard ensuring pointers never cross.' },
      { code: '        } else if (currentSum < target) {', token: 'currentSum < target', explanation: 'Since array is sorted, incrementing left strictly increases the sum.' }
    ],
    visualizer: 'dsa-sorting',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is the optimal time complexity of finding a pair summing to Target in an already sorted array?',
        options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
        answer: 2,
        explanation: 'Two-pointer approach walks through the array at most once, achieving linear O(n) time and O(1) space.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Given sorted array [2, 7, 11, 15] and target 9, what 1-based indices are returned?',
        code: `int[] arr = {2, 7, 11, 15};
int[] res = twoSumSorted(arr, 9);
System.out.println(res[0] + " " + res[1]);`,
        answer: '1 2',
        hint: '2 + 7 = 9 at indices 0 and 1 (1-based: 1 and 2).'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'When should you use MergeSort over QuickSort?',
        level: 'intermediate',
        answer: 'Use MergeSort when: (1) Guaranteed worst-case O(n log n) is strictly mandatory, (2) Stability is required (equal elements retain initial relative order), or (3) Sorting linked lists or external datasets on disk where random memory access is slow.',
        example: 'MergeSort is naturally stable and has sequential memory access during merge.'
      }
    ],
    xpReward: 20
  }
];
