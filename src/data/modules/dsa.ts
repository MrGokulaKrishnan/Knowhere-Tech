import type { Lesson } from '@/types';

export const DSA_LESSONS: Lesson[] = [
  {
    id: 'dsa-bigo',
    moduleKey: 'dsa',
    title: 'Big O Notation & Complexity Analysis',
    slug: 'big-o',
    difficulty: 'beginner',
    duration: 15,
    order: 1,
    prerequisites: [],
    tags: ['big-o', 'complexity', 'algorithms', 'analysis'],
    explanation: 'Big O characterizes the limiting growth rate of an algorithm as input size n approaches infinity, establishing tight upper bounds for CPU time and memory space.',
    beginnerExplanation: 'Big O is like asking: "If my user count grows from 10 to 1,000,000, how much slower will my program get?" O(1) is instant, O(n) grows steadily, and O(n²) becomes painfully slow.',
    technicalExplanation: 'Big O defines asymptotic upper bound f(n) = O(g(n)). We analyze Time Complexity (number of fundamental operations) and Auxiliary Space Complexity (additional memory beyond the input).',
    keyPoints: [
      'O(1) Constant Time: Instant lookup (HashMap get, array index access)',
      'O(log n) Logarithmic Time: Halves search space each step (Binary Search, balanced BST)',
      'O(n) Linear Time: Single iteration through an array',
      'O(n log n) Linearithmic Time: Optimal comparison sorting (MergeSort, QuickSort)',
      'O(n²) Quadratic Time: Nested loops (Bubble Sort, pairwise checks)'
    ],
    codeExample: `public class BigODemo {
    // O(1) - Constant Time
    public static int getFirst(int[] arr) {
        return arr[0];
    }

    // O(n) - Linear Time
    public static int findSum(int[] arr) {
        int sum = 0;
        for (int x : arr) sum += x;
        return sum;
    }

    // O(log n) - Logarithmic Time
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'int mid = low + (high - low) / 2;', token: 'mid', explanation: 'Prevents 32-bit integer overflow when calculating midpoint.' }
    ],
    quiz: [
      {
        id: 'q-dsa-1',
        type: 'mcq',
        question: 'What is the time complexity of searching in a sorted array of size n using Binary Search?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        answer: 1,
        explanation: 'Binary Search halves the remaining search space on each iteration, yielding O(log n).',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-1',
        type: 'predict-output',
        question: 'What is the Big O time complexity of a loop nested inside another loop of size n?',
        answer: 'O(n^2)',
        hint: 'n iterations multiplied by n iterations.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-1',
        question: 'What is the difference between Big O, Big Omega, and Big Theta?',
        level: 'intermediate',
        answer: 'Big O represents the asymptotic upper bound (worst-case upper limit). Big Omega (Ω) represents the asymptotic lower bound (best-case floor). Big Theta (Θ) represents the tight bound where upper and lower bounds asymptotically match.',
        example: 'MergeSort is O(n log n), Ω(n log n), and Θ(n log n) in all cases.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-arrays',
    moduleKey: 'dsa',
    title: 'Arrays, Two Pointers & Sliding Window',
    slug: 'arrays',
    difficulty: 'beginner',
    duration: 18,
    order: 2,
    prerequisites: ['dsa-bigo'],
    tags: ['arrays', 'two-pointers', 'sliding-window', 'arraylist'],
    explanation: 'Static arrays vs dynamic ArrayList resizing (amortized O(1)), Two-Pointer technique for sorted collections, and the Sliding Window pattern for subarray optimization.',
    beginnerExplanation: 'Two pointers are like two fingers scanning a list from both ends towards the middle, finding matching pairs in a single fast pass.',
    technicalExplanation: 'Java ArrayList doubles internal buffer capacity when full (`newCapacity = oldCapacity + (oldCapacity >> 1)`), providing amortized O(1) append. Two Pointers eliminate O(n²) nested loop passes down to O(n).',
    keyPoints: [
      'Two Pointers: Converging pointers on sorted data reduce quadratic search to linear O(n)',
      'Sliding Window: Dynamically expands and contracts a window boundary to track subarray sums/unique counts',
      'Prefix Sum: Precomputing cumulative sums enables O(1) subarray sum queries'
    ],
    codeExample: `public class TwoPointers {
    // Two Sum on Sorted Array: O(n) time, O(1) space
    public static int[] twoSumSorted(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'while (left < right) {', token: 'left < right', explanation: 'Pointers move towards center without crossing.' }
    ],
    quiz: [
      {
        id: 'q-dsa-2',
        type: 'mcq',
        question: 'What is the time complexity of the Two-Pointer approach for Two-Sum on an already sorted array?',
        options: ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'],
        answer: 1,
        explanation: 'Each pointer moves at most n times, visiting each element once in linear O(n) time.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-2',
        type: 'predict-output',
        question: 'What is the amortized time complexity of adding an element to an ArrayList in Java?',
        answer: 'O(1)',
        hint: 'Resizing happens rarely, averaging out to constant time.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-2',
        question: 'How does the Sliding Window technique reduce time complexity?',
        level: 'intermediate',
        answer: 'Instead of recalculating results across all k-sized subarrays from scratch in O(n*k) time, sliding window updates state incrementally by adding the incoming element and subtracting the outgoing element in O(1) per step, achieving total O(n) time.',
        example: 'Finding maximum sum subarray of fixed size k.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-linked-list',
    moduleKey: 'dsa',
    title: 'Linked Lists & Floyd\'s Cycle Detection',
    slug: 'linked-list',
    difficulty: 'intermediate',
    duration: 20,
    order: 3,
    prerequisites: ['dsa-arrays'],
    tags: ['linked-list', 'pointers', 'floyds-cycle', 'nodes', 'reversal'],
    explanation: 'Singly and Doubly Linked Lists, in-place node reversal, dummy head nodes, and Floyd\'s Tortoise and Hare cycle detection algorithm.',
    beginnerExplanation: 'A Linked List is a scavenger hunt: each clue (node) contains a piece of data and the address to the next clue.',
    technicalExplanation: 'Linked lists allow O(1) insertions and deletions at known pointer locations without contiguous memory shifting, at the expense of losing O(1) random indexing and incurring pointer memory overhead.',
    keyPoints: [
      'Floyd\'s Cycle Detection: Fast pointer (2x) meets slow pointer (1x) if a loop exists in O(n) time and O(1) space',
      'In-Place Reversal: Maintain prev, curr, and next pointers to reverse in O(n) without auxiliary memory',
      'Dummy Head Node: Simplifies edge-case insertions/deletions at the head'
    ],
    codeExample: `public class LinkedListUtils {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    // In-place reversal: O(n) time, O(1) space
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    // Floyd's Cycle Detection
    public static boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'fast = fast.next.next;', token: 'fast.next.next', explanation: 'Advances fast pointer by 2 steps while slow moves 1 step.' }
    ],
    quiz: [
      {
        id: 'q-dsa-3',
        type: 'mcq',
        question: 'What is the auxiliary space complexity of Floyd\'s Cycle Detection Algorithm?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        answer: 2,
        explanation: 'Floyd\'s algorithm uses only two pointers (slow and fast), requiring O(1) constant auxiliary space.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-3',
        type: 'predict-output',
        question: 'What does `curr.next = prev` do during in-place linked list reversal?',
        answer: 'Reverses pointer direction',
        hint: 'Points the current node backward to the previous node.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-3',
        question: 'How do you find the middle of a Singly Linked List in a single pass?',
        level: 'intermediate',
        answer: 'Use the fast and slow pointer technique. Advance `fast` by 2 nodes and `slow` by 1 node per step. When `fast` reaches the end (null or fast.next is null), `slow` will be exactly at the midpoint.',
        example: 'For list 1->2->3->4->5, slow stops at 3.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-stack',
    moduleKey: 'dsa',
    title: 'Stack & Monotonic Stack Applications',
    slug: 'stack',
    difficulty: 'beginner',
    duration: 16,
    order: 4,
    prerequisites: ['dsa-linked-list'],
    tags: ['stack', 'lifo', 'arraydeque', 'monotonic-stack', 'parentheses'],
    explanation: 'Last-In-First-Out (LIFO) data structure, why `ArrayDeque` replaces legacy `java.util.Stack`, balanced parentheses validation, and Monotonic Stacks for next-greater-element queries in O(n).',
    beginnerExplanation: 'A stack is like a stack of cafeteria trays: you can only push a new tray on top or pop the top tray off.',
    technicalExplanation: 'Java\'s legacy `Stack` class extends `Vector` with synchronized method overhead. Modern Java uses `ArrayDeque` for high-speed non-synchronized LIFO operations. Monotonic stacks maintain sorted elements to resolve range queries in linear time.',
    keyPoints: [
      'LIFO: Push and Pop operate on top element in O(1) time',
      'Use `Deque<T> stack = new ArrayDeque<>()` instead of legacy `Stack`',
      'Monotonic Stack: Finds next greater or smaller element in single O(n) pass'
    ],
    codeExample: `import java.util.ArrayDeque;
import java.util.Deque;

public class StackValidator {
    public static boolean isValidParentheses(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'Deque<Character> stack = new ArrayDeque<>();', token: 'ArrayDeque', explanation: 'Modern high-performance LIFO queue/stack implementation.' }
    ],
    quiz: [
      {
        id: 'q-dsa-4',
        type: 'mcq',
        question: 'Why should Java developers use `ArrayDeque` instead of `java.util.Stack` for LIFO operations?',
        options: ['Stack is deprecated and has synchronized method locking overhead', 'ArrayDeque allows O(1) random indexing', 'Stack cannot store reference objects', 'ArrayDeque is stored on hard disk'],
        answer: 0,
        explanation: 'Legacy Stack inherits Vector synchronization lock overhead; ArrayDeque is faster and non-blocking.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-4',
        type: 'predict-output',
        question: 'What is the top element of a stack after pushing 10, pushing 20, and popping once?',
        answer: '10',
        hint: '20 is popped, leaving 10 on top.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-4',
        question: 'What is a Monotonic Stack and when is it useful?',
        level: 'intermediate',
        answer: 'A Monotonic Stack is a stack whose elements are strictly increasing or decreasing. When a new element violates the monotonicity, elements are popped. It solves "Next Greater Element", "Daily Temperatures", and "Largest Rectangle in Histogram" in O(n) time instead of O(n²).',
        example: 'Finding the nearest greater element to the right for each array element.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-queue',
    moduleKey: 'dsa',
    title: 'Queue, Deque & BFS Traversal',
    slug: 'queue',
    difficulty: 'beginner',
    duration: 16,
    order: 5,
    prerequisites: ['dsa-stack'],
    tags: ['queue', 'fifo', 'deque', 'bfs', 'arraydeque'],
    explanation: 'First-In-First-Out (FIFO) queue principles, circular buffer queues, double-ended queues (Deque), and driving Breadth-First Search (BFS) graph and tree level-order algorithms.',
    beginnerExplanation: 'A queue is a grocery store checkout line: the first customer to join the line is the first customer served.',
    technicalExplanation: 'Queues maintain head and tail pointers. `offer()` enqueues at tail in O(1); `poll()` dequeues at head in O(1). Queues are the foundational engine for level-by-level BFS traversal in graphs and trees.',
    keyPoints: [
      'FIFO: Offer at rear, Poll from front in O(1) time',
      'ArrayDeque as circular ring buffer prevents element shifting on dequeue',
      'BFS: Level-order shortest path in unweighted graphs'
    ],
    codeExample: `import java.util.ArrayDeque;
import java.util.Queue;

public class QueueDemo {
    public static void main(String[] args) {
        Queue<String> printQueue = new ArrayDeque<>();
        printQueue.offer("Job #1");
        printQueue.offer("Job #2");
        printQueue.offer("Job #3");

        while (!printQueue.isEmpty()) {
            System.out.println("Processing: " + printQueue.poll());
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'printQueue.poll()', token: 'poll', explanation: 'Retrieves and removes head element, returning null if queue is empty.' }
    ],
    quiz: [
      {
        id: 'q-dsa-5',
        type: 'mcq',
        question: 'Which traversal algorithm strictly relies on a Queue to process nodes level by level?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Binary Search', 'Inorder Traversal'],
        answer: 1,
        explanation: 'BFS uses a Queue to explore all immediate neighbor nodes before proceeding to the next level.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-5',
        type: 'predict-output',
        question: 'What does `queue.peek()` return on a non-empty queue without removing it?',
        answer: 'Head element',
        hint: 'Inspects head element without removal.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-5',
        question: 'How would you implement a Queue using two Stacks?',
        level: 'intermediate',
        answer: 'Use `inStack` for enqueue (`push`) and `outStack` for dequeue (`pop`). On `poll()`, if `outStack` is empty, pop all elements from `inStack` and push them into `outStack` (reversing their order to achieve FIFO). Amortized time per operation is O(1).',
        example: 'Elements reverse twice, restoring the original FIFO order.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-hashmap',
    moduleKey: 'dsa',
    title: 'HashMap Internals & Collision Resolution',
    slug: 'hashmap',
    difficulty: 'intermediate',
    duration: 20,
    order: 6,
    prerequisites: ['dsa-arrays'],
    tags: ['hashmap', 'hashset', 'hashing', 'collisions', 'red-black-tree'],
    explanation: 'Deep dive into hashing algorithms, bucket array indexing, load factor (0.75), collision resolution via separate chaining, and Java 8+ Red-Black treeification.',
    beginnerExplanation: 'A HashMap is like a huge hotel with labeled room numbers. The hashing formula instantly tells you which room key belongs to which guest without searching room by room.',
    technicalExplanation: 'Key hash codes are spread using `(h = key.hashCode()) ^ (h >>> 16)` and mapped to bucket `index = (n - 1) & hash`. When a bucket exceeds TREEIFY_THRESHOLD (8 entries) and table capacity >= 64, the linked list converts to a balanced Red-Black Tree, capping worst-case collision lookup at O(log n).',
    keyPoints: [
      'Average O(1) get/put, O(log n) worst-case when treeified',
      'Load Factor 0.75: Triggers table capacity doubling (rehash) when 75% full',
      'Keys MUST adhere strictly to the equals() and hashCode() contract'
    ],
    codeExample: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> wordCount = new HashMap<>();
        String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};

        for (String w : words) {
            // Modern compute method (O(1) average)
            wordCount.merge(w, 1, Integer::sum);
        }

        System.out.println("Frequencies: " + wordCount);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'wordCount.merge(w, 1, Integer::sum);', token: 'merge', explanation: 'Atomic map computation method introduced in Java 8.' }
    ],
    quiz: [
      {
        id: 'q-dsa-6',
        type: 'mcq',
        question: 'What data structure does a Java 8+ HashMap bucket convert to when it exceeds 8 collided entries in a large table?',
        options: ['Circular Queue', 'Red-Black Balanced Tree', 'SkipList', 'Double-Ended Queue'],
        answer: 1,
        explanation: 'Buckets with >8 collisions treeify into Red-Black Trees to prevent O(n) denial-of-service hash attacks.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-6',
        type: 'predict-output',
        question: 'What is the default initial capacity of a Java HashMap?',
        answer: '16',
        hint: 'Power of 2 default initial bucket count.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-6',
        question: 'What happens if two different objects return the same hashCode() in Java?',
        level: 'intermediate',
        answer: 'This is a hash collision. Both entries are placed in the same bucket. When retrieving a key, the HashMap finds the bucket by hash code, then iterates through the entries in that bucket using `.equals()` to find the exact matching key.',
        example: 'Different strings can share the same hash code (e.g. "Aa" and "BB").'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-tree',
    moduleKey: 'dsa',
    title: 'Trees, Binary Search Trees & Traversals',
    slug: 'tree',
    difficulty: 'intermediate',
    duration: 22,
    order: 7,
    prerequisites: ['dsa-linked-list'],
    tags: ['tree', 'bst', 'binary-tree', 'inorder', 'traversal', 'recursion'],
    explanation: 'Hierarchical tree structures: Binary Trees, Binary Search Tree (BST) property (left < root < right), recursive traversals (Inorder, Preorder, Postorder, Level-Order), and self-balancing AVL/Red-Black trees.',
    beginnerExplanation: 'A tree branches downward from a single root node into left and right children. A Binary Search Tree keeps all smaller items on the left and all larger items on the right for lightning-fast search.',
    technicalExplanation: 'In a balanced BST of size n, search, insertion, and deletion take O(log n) time. Inorder traversal of a BST yields sorted elements in ascending order.',
    keyPoints: [
      'BST Property: `node.left.val < node.val < node.right.val`',
      'Inorder (Left-Root-Right): Yields sorted ascending order on BST',
      'Balanced Tree Height: $h = O(\\log n)$ ensures logarithmic worst-case operations'
    ],
    codeExample: `public class BinarySearchTree {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    // BST Search: O(log n) average
    public static TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);', token: 'searchBST', explanation: 'Recursive divide-and-conquer search discarding half the tree.' }
    ],
    quiz: [
      {
        id: 'q-dsa-7',
        type: 'mcq',
        question: 'Which tree traversal order visits a Binary Search Tree in sorted ascending numerical order?',
        options: ['Preorder (Root, Left, Right)', 'Inorder (Left, Root, Right)', 'Postorder (Left, Right, Root)', 'Level-Order (BFS)'],
        answer: 1,
        explanation: 'Inorder traversal on a BST produces values in strictly sorted ascending order.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-7',
        type: 'predict-output',
        question: 'What is the maximum number of children any node can have in a Binary Tree?',
        answer: '2',
        hint: 'Binary means at most two children (left and right).'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-7',
        question: 'What is the worst-case time complexity of searching an unbalanced Binary Search Tree and how do you prevent it?',
        level: 'intermediate',
        answer: 'If elements are inserted in already sorted order (1, 2, 3, 4, 5), the BST degenerates into a skewed linked list with O(n) search time. Self-balancing trees (AVL or Red-Black Trees) use tree rotations to maintain O(log n) maximum height.',
        example: 'Java\'s TreeMap and TreeSet use Red-Black Trees to guarantee O(log n).'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-heap',
    moduleKey: 'dsa',
    title: 'Heaps, PriorityQueue & Top-K Patterns',
    slug: 'heap',
    difficulty: 'intermediate',
    duration: 18,
    order: 8,
    prerequisites: ['dsa-tree'],
    tags: ['heap', 'priority-queue', 'min-heap', 'max-heap', 'top-k'],
    explanation: 'Complete binary tree Heaps: Min-Heap and Max-Heap invariants, array-based heap representation (parent at `(i-1)/2`, children at `2i+1` and `2i+2`), PriorityQueue, and Top-K elements optimization in O(n log k).',
    beginnerExplanation: 'A heap is a priority waiting room: the most urgent patient (min or max value) is always at the front of the door (root) ready to be served in O(1) time.',
    technicalExplanation: 'Heaps maintain the heap property: parent <= children (Min-Heap). Insertion and extraction take O(log n) via sift-up and sift-down operations. Finding Top-K elements uses a Min-Heap of size k in O(n log k) time instead of O(n log n) sorting.',
    keyPoints: [
      'Peek Root: O(1) constant time to inspect min or max element',
      'Insert / Poll: O(log n) via binary sift-up / sift-down operations',
      'Top-K Pattern: Maintain Min-Heap of size k to process unbounded stream of n elements'
    ],
    codeExample: `import java.util.PriorityQueue;

public class TopKElements {
    // Find Kth Largest Element: O(n log k) time, O(k) space
    public static int findKthLargest(int[] nums, int k) {
        // Min-Heap keeps top k largest elements
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll(); // Evict smallest element
            }
        }
        return minHeap.peek(); // Top of heap is the kth largest
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'minHeap.poll();', token: 'poll', explanation: 'Evicts smallest element when heap size exceeds k.' }
    ],
    quiz: [
      {
        id: 'q-dsa-8',
        type: 'mcq',
        question: 'What is the time complexity of finding the K largest elements in an array of size n using a Min-Heap of size k?',
        options: ['O(n²)', 'O(n log k)', 'O(n log n)', 'O(k)'],
        answer: 1,
        explanation: 'Each of the n elements is inserted into a heap of size k in O(log k) time, giving O(n log k).',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-8',
        type: 'predict-output',
        question: 'Does Java\'s default `new PriorityQueue<Integer>()` create a Min-Heap or Max-Heap?',
        answer: 'Min-Heap',
        hint: 'Default PriorityQueue orders elements in natural ascending order (Min-Heap).'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-8',
        question: 'How is a complete binary Heap mapped into a contiguous 1D array?',
        level: 'intermediate',
        answer: 'For a zero-indexed array: Root is at index 0. For any node at index i: Left Child is at `2*i + 1`, Right Child is at `2*i + 2`, and Parent is at `(i - 1) / 2`. This eliminates pointer memory overhead.',
        example: 'Array [10, 20, 30] -> Root 10 has left child 20 (index 1) and right child 30 (index 2).'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-graph',
    moduleKey: 'dsa',
    title: 'Graph Algorithms, BFS, DFS & Topological Sort',
    slug: 'graph',
    difficulty: 'advanced',
    duration: 24,
    order: 9,
    prerequisites: ['dsa-queue', 'dsa-tree'],
    tags: ['graph', 'bfs', 'dfs', 'topological-sort', 'dijkstra', 'adjacency-list'],
    explanation: 'Graph representations (Adjacency Matrix vs Adjacency List), Breadth-First Search (shortest path in unweighted graphs), Depth-First Search (cycle detection, connected components), and Kahn\'s Topological Sorting algorithm.',
    beginnerExplanation: 'A graph is a network of cities (vertices) connected by highways (edges). Algorithms find the shortest road trip or determine build order for software packages.',
    technicalExplanation: 'Graph BFS runs in O(V + E) time using a Queue and visited boolean array. Kahn\'s algorithm uses node in-degrees and a queue to generate valid topological orderings for Directed Acyclic Graphs (DAGs).',
    keyPoints: [
      'Adjacency List: Space-efficient O(V + E) representation for sparse graphs',
      'BFS: Guarantees shortest path in unweighted networks',
      'Topological Sort: Resolves dependency ordering for build tools (Maven, npm) and task schedulers'
    ],
    codeExample: `import java.util.*;

public class GraphBFS {
    public static int shortestPath(int start, int target, Map<Integer, List<Integer>> adj) {
        Queue<Integer> queue = new ArrayDeque<>();
        Set<Integer> visited = new HashSet<>();
        
        queue.offer(start);
        visited.add(start);
        int distance = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int node = queue.poll();
                if (node == target) return distance;

                for (int neighbor : adj.getOrDefault(node, List.of())) {
                    if (visited.add(neighbor)) {
                        queue.offer(neighbor);
                    }
                }
            }
            distance++;
        }
        return -1;
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'if (visited.add(neighbor)) {', token: 'visited.add', explanation: 'Prevents infinite loop cycles by ensuring each node is visited only once.' }
    ],
    quiz: [
      {
        id: 'q-dsa-9',
        type: 'mcq',
        question: 'What is the time complexity of BFS or DFS on a graph with V vertices and E edges represented as an Adjacency List?',
        options: ['O(V²)', 'O(V + E)', 'O(V * E)', 'O(log V)'],
        answer: 1,
        explanation: 'Traversing every vertex and edge once in an Adjacency List takes O(V + E) time.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-9',
        type: 'predict-output',
        question: 'Can a graph containing a directed cycle have a valid Topological Sort?',
        answer: 'No',
        hint: 'Topological sort is only possible on Directed Acyclic Graphs (DAGs).'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-9',
        question: 'How do you detect a cycle in a Directed Graph using DFS?',
        level: 'advanced',
        answer: 'Use 3-color graph coloring (White: unvisited, Gray: currently visiting in active recursion stack, Black: fully processed). If DFS encounters a Gray node, a back-edge exists, indicating a cycle.',
        example: 'Used by package managers like Maven to detect circular dependency deadlocks.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-sorting',
    moduleKey: 'dsa',
    title: 'Sorting Algorithms & Divide-and-Conquer',
    slug: 'sorting',
    difficulty: 'intermediate',
    duration: 20,
    order: 10,
    prerequisites: ['dsa-arrays'],
    tags: ['sorting', 'quicksort', 'mergesort', 'divide-and-conquer', 'stability'],
    explanation: 'Deep comparison of sorting algorithms: Bubble, Insertion, Selection Sort ($O(n^2)$), MergeSort ($O(n \\log n)$ stable), QuickSort ($O(n \\log n)$ average in-place), and Dual-Pivot Quicksort.',
    beginnerExplanation: 'Sorting arranges messy data in order. Slow algorithms compare every pair of items ($O(n^2)$), while fast algorithms divide the list in half recursively to finish much quicker ($O(n \\log n)$).',
    technicalExplanation: 'MergeSort divides array into two halves, recursively sorts, and merges in O(n log n) guaranteed time and O(n) space. QuickSort chooses a pivot, partitions elements, and sorts sub-arrays in-place with average O(n log n) time.',
    keyPoints: [
      'Stability: Equal elements maintain original relative order (MergeSort is stable; QuickSort is not)',
      'MergeSort: Guaranteed O(n log n) worst-case time, ideal for linked lists and external disk sorting',
      'QuickSort: Average O(n log n) in-place with small constant factors, used in Arrays.sort() for primitives'
    ],
    codeExample: `public class SortingAlgorithms {
    // MergeSort: O(n log n) guaranteed time
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int[] leftArr = java.util.Arrays.copyOfRange(arr, l, m + 1);
        int[] rightArr = java.util.Arrays.copyOfRange(arr, m + 1, r + 1);
        int i = 0, j = 0, k = l;
        while (i < leftArr.length && j < rightArr.length) {
            arr[k++] = (leftArr[i] <= rightArr[j]) ? leftArr[i++] : rightArr[j++];
        }
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'int mid = left + (right - left) / 2;', token: 'mid', explanation: 'Divide step splitting array into equal halves.' }
    ],
    visualizer: 'dsa-sorting',
    quiz: [
      {
        id: 'q-dsa-10',
        type: 'mcq',
        question: 'Which sorting algorithm guarantees O(n log n) time complexity in all cases (best, average, and worst)?',
        options: ['QuickSort', 'BubbleSort', 'MergeSort', 'InsertionSort'],
        answer: 2,
        explanation: 'MergeSort always divides in half and merges, guaranteeing O(n log n) worst-case.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-10',
        type: 'predict-output',
        question: 'What is the worst-case time complexity of standard QuickSort with poor pivot selection?',
        answer: 'O(n^2)',
        hint: 'Occurs when pivot is always min or max element.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-10',
        question: 'Why does Java use Dual-Pivot Quicksort for primitives but TimSort for Object arrays in `Arrays.sort()`?',
        level: 'advanced',
        answer: 'Object sorting requires algorithm stability (equal keys preserve initial relative order) which TimSort (adaptive MergeSort) provides. Primitive values have no identity beyond their value, so stability is irrelevant; Dual-Pivot Quicksort is faster and uses O(1) in-place auxiliary memory.',
        example: 'Sorting Employee objects by salary must keep equal-salary employees in original seniority order.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-searching',
    moduleKey: 'dsa',
    title: 'Searching Algorithms & Binary Search Mastery',
    slug: 'searching',
    difficulty: 'beginner',
    duration: 16,
    order: 11,
    prerequisites: ['dsa-sorting'],
    tags: ['searching', 'binary-search', 'rotated-array', 'lower-bound'],
    explanation: 'Linear Search vs Binary Search ($O(\\log n)$), finding lower/upper bounds, and Binary Search on sorted rotated arrays.',
    beginnerExplanation: 'Binary search is how you look up a word in a dictionary: you open the book to the middle, see if your word comes before or after, and throw away half the pages each time.',
    technicalExplanation: 'Binary search works on any monotonically sorted domain. Beyond array lookups, "Binary Search on Answer" optimizes search spaces for capacity planning and minimum allocation problems.',
    keyPoints: [
      'Binary Search: Halves search space each step in O(log n) time',
      'Avoid Integer Overflow: Compute mid via `low + (high - low) / 2`',
      'Rotated Sorted Array: One half is always strictly sorted; check target against sorted boundaries'
    ],
    codeExample: `public class BinarySearchRotated {
    // Search in Rotated Sorted Array: O(log n)
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            // Left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } 
            // Right half is sorted
            else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'if (nums[low] <= nums[mid]) {', token: 'sorted half', explanation: 'Determines whether the left or right half of the rotated array is monotonically sorted.' }
    ],
    quiz: [
      {
        id: 'q-dsa-11',
        type: 'mcq',
        question: 'How many comparisons does Binary Search take in the worst case on an array of 1,024 sorted elements?',
        options: ['1,024', '512', '10', '100'],
        answer: 2,
        explanation: 'log2(1024) = 10 comparisons.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-11',
        type: 'predict-output',
        question: 'What is returned by Binary Search when a target element is not found?',
        answer: '-1',
        hint: 'Standard convention for element not found.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-11',
        question: 'How can Binary Search be applied to non-array optimization problems ("Binary Search on Answer")?',
        level: 'advanced',
        answer: 'When a problem asks for the minimum or maximum value satisfying a monotonic condition (e.g. "Koko Eating Bananas", "Ship Within D Days"), identify the lower and upper bounds of possible answers and binary-search over that range, verifying validity in O(n) per guess in total O(n log(max-min)) time.',
        example: 'Testing if conveyor capacity X can transport all packages within D days.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'dsa-dp',
    moduleKey: 'dsa',
    title: 'Dynamic Programming, Memoization & Tabulation',
    slug: 'dp',
    difficulty: 'advanced',
    duration: 26,
    order: 12,
    prerequisites: ['dsa-searching'],
    tags: ['dynamic-programming', 'memoization', 'tabulation', 'knapsack', 'recursion'],
    explanation: 'Solving complex optimization problems with Overlapping Subproblems and Optimal Substructure: Top-Down Memoization vs Bottom-Up Tabulation, 0/1 Knapsack, Coin Change, and Longest Common Subsequence.',
    beginnerExplanation: 'Dynamic Programming is smart remembering: "Write 1+1+1 on paper. What is it? 3. Now add +1. What is it? 4! How did you know so fast? Because you remembered the 3!"',
    technicalExplanation: 'DP transforms exponential $O(2^n)$ recursive algorithms into polynomial $O(n)$ or $O(n \\cdot W)$ solutions by caching subproblem states in memoization tables or DP arrays.',
    keyPoints: [
      'Two Core Properties: Overlapping Subproblems + Optimal Substructure',
      'Top-Down Memoization: Recursive approach with cache lookup',
      'Bottom-Up Tabulation: Iterative state transitions filling an array, avoiding recursion call-stack limits'
    ],
    codeExample: `public class DynamicProgramming {
    // Coin Change Problem: Bottom-Up Tabulation O(amount * coins.length)
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        java.util.Arrays.fill(dp, amount + 1);
        dp[0] = 0; // Base case: 0 coins needed for 0 amount

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'dp[i] = Math.min(dp[i], 1 + dp[i - coin]);', token: 'state transition', explanation: 'Optimal recurrence relation selecting minimum coins between current best and 1 + previous subproblem.' }
    ],
    quiz: [
      {
        id: 'q-dsa-12',
        type: 'mcq',
        question: 'What are the two mandatory properties a problem must satisfy for Dynamic Programming to apply?',
        options: ['Sorting and Binary Trees', 'Overlapping Subproblems and Optimal Substructure', 'Multi-threading and Locking', 'Bitwise Operators and Heaps'],
        answer: 1,
        explanation: 'DP requires subproblems to repeat (overlapping) and optimal solutions of subproblems to form the overall optimal solution.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-dsa-12',
        type: 'predict-output',
        question: 'What is the base case value for `dp[0]` in the Coin Change problem?',
        answer: '0',
        hint: 'Zero coins are needed to make an amount of zero.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-dsa-12',
        question: 'What is the difference between Top-Down (Memoization) and Bottom-Up (Tabulation) Dynamic Programming?',
        level: 'advanced',
        answer: 'Top-Down starts at the ultimate goal and recurses downward, caching computed subproblem returns in a hash map or array. Bottom-Up starts at the base cases and iteratively fills a table upward, eliminating function call stack overhead and enabling space optimization by storing only the last few rows/values.',
        example: 'Fibonacci: Top-Down uses recursion + cache; Bottom-Up uses a simple 2-variable iterative loop in O(1) space.'
      }
    ],
    xpReward: 20
  }
];
