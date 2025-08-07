// Algorithm Library with Visualization Support
class AlgorithmLibrary {
    constructor() {
        this.algorithms = {
            sorting: {
                'Bubble Sort': {
                    description: 'Simple sorting algorithm that repeatedly steps through the list',
                    complexity: 'O(n²)',
                    code: `function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return arr;
}`,
                    visualizer: this.bubbleSortVisualizer
                },
                'Selection Sort': {
                    description: 'Sorts an array by repeatedly finding the minimum element',
                    complexity: 'O(n²)',
                    code: `function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}`,
                    visualizer: this.selectionSortVisualizer
                },
                'Insertion Sort': {
                    description: 'Builds the final sorted array one item at a time',
                    complexity: 'O(n²)',
                    code: `function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}`,
                    visualizer: this.insertionSortVisualizer
                },
                'Merge Sort': {
                    description: 'Divide and conquer algorithm that recursively sorts subarrays',
                    complexity: 'O(n log n)',
                    code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i), right.slice(j));
}`,
                    visualizer: this.mergeSortVisualizer
                },
                'Quick Sort': {
                    description: 'Efficient, in-place sorting algorithm using divide and conquer',
                    complexity: 'O(n log n) average',
                    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
                    visualizer: this.quickSortVisualizer
                }
            },
            searching: {
                'Linear Search': {
                    description: 'Simple search algorithm that checks each element sequentially',
                    complexity: 'O(n)',
                    code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}`,
                    visualizer: this.linearSearchVisualizer
                },
                'Binary Search': {
                    description: 'Efficient search algorithm for sorted arrays',
                    complexity: 'O(log n)',
                    code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found at index mid
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Not found
}`,
                    visualizer: this.binarySearchVisualizer
                }
            },
            'two-pointer': {
                'Reverse Array': {
                    description: 'Reverse an array using two pointer approach',
                    complexity: 'O(n)',
                    code: `function reverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Swap elements at left and right pointers
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;
}`,
                    codePython: `def reverse_array(arr):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        # Swap elements at left and right pointers
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    
    return arr`,
                    codeJava: `public class ReverseArray {
    public static void reverseArray(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            // Swap elements at left and right pointers
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
}`,
                    codeCpp: `#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        // Swap elements at left and right pointers
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}`,
                    visualizer: this.reverseArrayVisualizer
                },
                'Two Sum (Sorted Array)': {
                    description: 'Find two numbers that add up to target in sorted array',
                    complexity: 'O(n)',
                    code: `function twoSumSorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) {
            return [left, right]; // Found pair
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1]; // No pair found
}`,
                    visualizer: this.twoSumSortedVisualizer
                },
                'Remove Duplicates': {
                    description: 'Remove duplicates from sorted array using two pointers',
                    complexity: 'O(n)',
                    code: `function removeDuplicates(arr) {
    if (arr.length === 0) return 0;
    
    let writeIndex = 1;
    
    for (let readIndex = 1; readIndex < arr.length; readIndex++) {
        if (arr[readIndex] !== arr[readIndex - 1]) {
            arr[writeIndex] = arr[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex; // New length
}`,
                    visualizer: this.removeDuplicatesVisualizer
                },
                'Container With Most Water': {
                    description: 'Find two lines that together with x-axis forms a container that would hold the greatest amount of water',
                    complexity: 'O(n)',
                    code: `function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        const area = width * h;
        
        maxArea = Math.max(maxArea, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}`,
                    visualizer: this.maxAreaVisualizer
                },
                'Three Sum': {
                    description: 'Find all unique triplets that sum to zero',
                    complexity: 'O(n²)',
                    code: `function threeSum(arr) {
    const result = [];
    arr.sort((a, b) => a - b);
    
    for (let i = 0; i < arr.length - 2; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        
        let left = i + 1;
        let right = arr.length - 1;
        
        while (left < right) {
            const sum = arr[i] + arr[left] + arr[right];
            
            if (sum === 0) {
                result.push([arr[i], arr[left], arr[right]]);
                while (left < right && arr[left] === arr[left + 1]) left++;
                while (left < right && arr[right] === arr[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}`,
                    visualizer: this.threeSumVisualizer
                },
                'Valid Palindrome': {
                    description: 'Check if string is palindrome after removing non-alphanumeric characters',
                    complexity: 'O(n)',
                    code: `function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}`,
                    visualizer: this.validPalindromeVisualizer
                }
            },
            'array-problems': {
                'Find Missing Number': {
                    description: 'Find the missing number in array of 0 to n',
                    complexity: 'O(n)',
                    code: `function findMissingNumber(arr) {
    const n = arr.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((sum, num) => sum + num, 0);
    
    return expectedSum - actualSum;
}`,
                    visualizer: this.findMissingNumberVisualizer
                },
                'Move Zeros to End': {
                    description: 'Move all zeros to the end while maintaining relative order',
                    complexity: 'O(n)',
                    code: `function moveZeros(arr) {
    let nonZeroIndex = 0;
    
    // Move all non-zero elements to the front
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[nonZeroIndex] = arr[i];
            nonZeroIndex++;
        }
    }
    
    // Fill remaining positions with zeros
    for (let i = nonZeroIndex; i < arr.length; i++) {
        arr[i] = 0;
    }
    
    return arr;
}`,
                    visualizer: this.moveZerosVisualizer
                },
                'Find Peak Element': {
                    description: 'Find a peak element in array (greater than neighbors)',
                    complexity: 'O(log n)',
                    code: `function findPeakElement(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] > arr[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}`,
                    visualizer: this.findPeakElementVisualizer
                },
                'Rotate Array': {
                    description: 'Rotate array by k positions to the right',
                    complexity: 'O(n)',
                    code: `function rotateArray(arr, k) {
    const n = arr.length;
    k = k % n; // Handle cases where k > n
    
    // Reverse entire array
    reverse(arr, 0, n - 1);
    // Reverse first k elements
    reverse(arr, 0, k - 1);
    // Reverse remaining elements
    reverse(arr, k, n - 1);
    
    return arr;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}`,
                    visualizer: this.rotateArrayVisualizer
                },
                'Maximum Subarray Sum (Kadane)': {
                    description: 'Find maximum sum of contiguous subarray',
                    complexity: 'O(n)',
                    code: `function maxSubArraySum(arr) {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}`,
                    visualizer: this.maxSubArraySumVisualizer
                },
                'Product of Array Except Self': {
                    description: 'Calculate product of array except current element',
                    complexity: 'O(n)',
                    code: `function productExceptSelf(arr) {
    const n = arr.length;
    const result = new Array(n).fill(1);
    
    // Calculate left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= arr[i];
    }
    
    // Calculate right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= arr[i];
    }
    
    return result;
}`,
                    visualizer: this.productExceptSelfVisualizer
                }
            },
            'hash-set': {
                'Two Sum (Hash Map)': {
                    description: 'Find two numbers that add up to target using hash map',
                    complexity: 'O(n)',
                    code: `function twoSum(arr, target) {
    const map = new Map();
    
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(arr[i], i);
    }
    
    return [-1, -1];
}`,
                    visualizer: this.twoSumHashVisualizer
                },
                'Valid Anagram': {
                    description: 'Check if two strings are anagrams using hash map',
                    complexity: 'O(n)',
                    code: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const charCount = new Map();
    
    for (let char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    for (let char of t) {
        if (!charCount.has(char) || charCount.get(char) === 0) {
            return false;
        }
        charCount.set(char, charCount.get(char) - 1);
    }
    
    return true;
}`,
                    visualizer: this.validAnagramVisualizer
                },
                'Find Duplicate': {
                    description: 'Find duplicate number in array using hash set',
                    complexity: 'O(n)',
                    code: `function findDuplicate(arr) {
    const seen = new Set();
    
    for (let num of arr) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    
    return -1;
}`,
                    visualizer: this.findDuplicateVisualizer
                },
                'Longest Substring Without Repeating': {
                    description: 'Find longest substring without repeating characters',
                    complexity: 'O(n)',
                    code: `function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
                    visualizer: this.longestSubstringVisualizer
                },
                'Frequency Counter': {
                    description: 'Count frequency of elements using hash map',
                    complexity: 'O(n)',
                    code: `function frequencyCounter(arr) {
    const frequency = new Map();
    
    for (let item of arr) {
        frequency.set(item, (frequency.get(item) || 0) + 1);
    }
    
    return frequency;
}`,
                    visualizer: this.frequencyCounterVisualizer
                }
            },
            'sliding-window': {
                'Maximum Sum Subarray of Size K': {
                    description: 'Find maximum sum of subarray with fixed size k',
                    complexity: 'O(n)',
                    code: `function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window and update max sum
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}`,
                    visualizer: this.maxSumSubarrayVisualizer
                },
                'Minimum Size Subarray Sum': {
                    description: 'Find minimum length subarray with sum >= target',
                    complexity: 'O(n)',
                    code: `function minSubArrayLen(target, arr) {
    let left = 0;
    let sum = 0;
    let minLen = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];
        
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= arr[left];
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}`,
                    visualizer: this.minSubArrayLenVisualizer
                },
                'Longest Substring with K Distinct Characters': {
                    description: 'Find longest substring with exactly k distinct characters',
                    complexity: 'O(n)',
                    code: `function longestSubstringKDistinct(s, k) {
    const charCount = new Map();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
        
        while (charCount.size > k) {
            charCount.set(s[left], charCount.get(s[left]) - 1);
            if (charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
                    visualizer: this.longestSubstringKDistinctVisualizer
                }
            },
            'brute-force': {
                'Generate All Permutations': {
                    description: 'Generate all possible permutations of array',
                    complexity: 'O(n!)',
                    code: `function generatePermutations(arr) {
    const result = [];
    
    function backtrack(start) {
        if (start === arr.length) {
            result.push([...arr]);
            return;
        }
        
        for (let i = start; i < arr.length; i++) {
            [arr[start], arr[i]] = [arr[i], arr[start]];
            backtrack(start + 1);
            [arr[start], arr[i]] = [arr[i], arr[start]];
        }
    }
    
    backtrack(0);
    return result;
}`,
                    visualizer: this.generatePermutationsVisualizer
                },
                'Generate All Subsets': {
                    description: 'Generate all possible subsets of array',
                    complexity: 'O(2^n)',
                    code: `function generateSubsets(arr) {
    const result = [];
    const n = arr.length;
    
    for (let i = 0; i < (1 << n); i++) {
        const subset = [];
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(arr[j]);
            }
        }
        result.push(subset);
    }
    
    return result;
}`,
                    visualizer: this.generateSubsetsVisualizer
                },
                'N-Queens Problem': {
                    description: 'Place n queens on nxn board so no two threaten each other',
                    complexity: 'O(n!)',
                    code: `function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    
    backtrack(0);
    return result;
}`,
                    visualizer: this.nQueensVisualizer
                }
            },
            'iterator-recursion': {
                'Inorder Traversal (Iterative)': {
                    description: 'Traverse binary tree in-order using stack',
                    complexity: 'O(n)',
                    code: `function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}`,
                    visualizer: this.inorderIterativeVisualizer
                },
                'Preorder Traversal (Iterative)': {
                    description: 'Traverse binary tree pre-order using stack',
                    complexity: 'O(n)',
                    code: `function preorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    
    if (root) stack.push(root);
    
    while (stack.length > 0) {
        const current = stack.pop();
        result.push(current.val);
        
        if (current.right) stack.push(current.right);
        if (current.left) stack.push(current.left);
    }
    
    return result;
}`,
                    visualizer: this.preorderIterativeVisualizer
                },
                'Recursive Binary Search': {
                    description: 'Binary search using recursion',
                    complexity: 'O(log n)',
                    code: `function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] > target) {
        return binarySearchRecursive(arr, target, left, mid - 1);
    } else {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
}`,
                    visualizer: this.binarySearchRecursiveVisualizer
                },
                'Recursive Merge Sort': {
                    description: 'Merge sort using recursion',
                    complexity: 'O(n log n)',
                    code: `function mergeSortRecursive(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortRecursive(arr.slice(0, mid));
    const right = mergeSortRecursive(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }
    
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }
    
    return result;
}`,
                    visualizer: this.mergeSortRecursiveVisualizer
                }
            },
            graph: {
                'Breadth First Search (BFS)': {
                    description: 'Traverses a graph level by level',
                    complexity: 'O(V + E)',
                    code: `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}`,
                    visualizer: this.bfsVisualizer
                },
                'Depth First Search (DFS)': {
                    description: 'Traverses a graph by exploring as far as possible',
                    complexity: 'O(V + E)',
                    code: `function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    const result = [start];
    
    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            result.push(...dfs(graph, neighbor, visited));
        }
    }
    
    return result;
}`,
                    visualizer: this.dfsVisualizer
                }
            },
            tree: {
                'Tree Traversal - Inorder': {
                    description: 'Visits left subtree, root, then right subtree',
                    complexity: 'O(n)',
                    code: `function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}`,
                    visualizer: this.inorderTraversalVisualizer
                },
                'Tree Traversal - Preorder': {
                    description: 'Visits root, left subtree, then right subtree',
                    complexity: 'O(n)',
                    code: `function preorderTraversal(root) {
    const result = [];
    
    function preorder(node) {
        if (node) {
            result.push(node.val);
            preorder(node.left);
            preorder(node.right);
        }
    }
    
    preorder(root);
    return result;
}`,
                    visualizer: this.preorderTraversalVisualizer
                }
            },
            dynamic: {
                'Fibonacci (DP)': {
                    description: 'Dynamic programming solution for Fibonacci sequence',
                    complexity: 'O(n)',
                    code: `function fibonacciDP(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
                    visualizer: this.fibonacciDPVisualizer
                },
                'Longest Common Subsequence': {
                    description: 'Finds the longest common subsequence between two strings',
                    complexity: 'O(mn)',
                    code: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}`,
                    visualizer: this.lcsVisualizer
                }
            }
        };
    }

    // Visualization Methods
    bubbleSortVisualizer(arr) {
        const steps = [];
        const n = arr.length;
        let swapped;
        
        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                steps.push({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...arr],
                    description: `Comparing elements at indices ${j} and ${j + 1}`
                });
                
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapped = true;
                    
                    steps.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        array: [...arr],
                        description: `Swapped elements at indices ${j} and ${j + 1}`
                    });
                }
            }
            
            if (!swapped) break;
        }
        
        return steps;
    }

    selectionSortVisualizer(arr) {
        const steps = [];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            
            for (let j = i + 1; j < n; j++) {
                steps.push({
                    type: 'compare',
                    indices: [minIndex, j],
                    array: [...arr],
                    description: `Comparing element at index ${j} with current minimum at index ${minIndex}`
                });
                
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                
                steps.push({
                    type: 'swap',
                    indices: [i, minIndex],
                    array: [...arr],
                    description: `Swapped minimum element with element at index ${i}`
                });
            }
        }
        
        return steps;
    }

    insertionSortVisualizer(arr) {
        const steps = [];
        const n = arr.length;
        
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            
            steps.push({
                type: 'select',
                indices: [i],
                array: [...arr],
                description: `Selecting element ${key} at index ${i} to insert`
            });
            
            while (j >= 0 && arr[j] > key) {
                steps.push({
                    type: 'shift',
                    indices: [j, j + 1],
                    array: [...arr],
                    description: `Shifting element ${arr[j]} from index ${j} to ${j + 1}`
                });
                
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
            
            steps.push({
                type: 'insert',
                indices: [j + 1],
                array: [...arr],
                description: `Inserted ${key} at index ${j + 1}`
            });
        }
        
        return steps;
    }

    linearSearchVisualizer(arr, target) {
        const steps = [];
        
        for (let i = 0; i < arr.length; i++) {
            steps.push({
                type: 'check',
                indices: [i],
                array: [...arr],
                description: `Checking element ${arr[i]} at index ${i}`,
                found: arr[i] === target
            });
            
            if (arr[i] === target) {
                steps.push({
                    type: 'found',
                    indices: [i],
                    array: [...arr],
                    description: `Found target ${target} at index ${i}!`
                });
                break;
            }
        }
        
        if (steps[steps.length - 1].type !== 'found') {
            steps.push({
                type: 'not_found',
                indices: [],
                array: [...arr],
                description: `Target ${target} not found in array`
            });
        }
        
        return steps;
    }

    binarySearchVisualizer(arr, target) {
        const steps = [];
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            steps.push({
                type: 'check',
                indices: [mid],
                array: [...arr],
                description: `Checking middle element ${arr[mid]} at index ${mid}`,
                range: [left, right]
            });
            
            if (arr[mid] === target) {
                steps.push({
                    type: 'found',
                    indices: [mid],
                    array: [...arr],
                    description: `Found target ${target} at index ${mid}!`
                });
                break;
            } else if (arr[mid] < target) {
                left = mid + 1;
                steps.push({
                    type: 'narrow',
                    indices: [mid],
                    array: [...arr],
                    description: `Target is greater than ${arr[mid]}, searching right half`,
                    range: [left, right]
                });
            } else {
                right = mid - 1;
                steps.push({
                    type: 'narrow',
                    indices: [mid],
                    array: [...arr],
                    description: `Target is less than ${arr[mid]}, searching left half`,
                    range: [left, right]
                });
            }
        }
        
        if (steps[steps.length - 1].type !== 'found') {
            steps.push({
                type: 'not_found',
                indices: [],
                array: [...arr],
                description: `Target ${target} not found in array`
            });
        }
        
        return steps;
    }

    // Two Pointer Visualizers
    reverseArrayVisualizer(arr) {
        const steps = [];
        let left = 0;
        let right = arr.length - 1;
        
        steps.push({
            type: 'init',
            indices: [left, right],
            array: [...arr],
            description: `Initializing two pointers: left=${left}, right=${right}`
        });
        
        while (left < right) {
            steps.push({
                type: 'compare',
                indices: [left, right],
                array: [...arr],
                description: `Comparing pointers: left=${left}, right=${right}`
            });
            
            [arr[left], arr[right]] = [arr[right], arr[left]];
            
            steps.push({
                type: 'swap',
                indices: [left, right],
                array: [...arr],
                description: `Swapped elements at indices ${left} and ${right}`
            });
            
            left++;
            right--;
            
            if (left < right) {
                steps.push({
                    type: 'move',
                    indices: [left, right],
                    array: [...arr],
                    description: `Moving pointers: left=${left}, right=${right}`
                });
            }
        }
        
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            description: `Array reversed successfully!`
        });
        
        return steps;
    }

    twoSumSortedVisualizer(arr, target) {
        const steps = [];
        let left = 0;
        let right = arr.length - 1;
        
        steps.push({
            type: 'init',
            indices: [left, right],
            array: [...arr],
            description: `Looking for two numbers that sum to ${target}`
        });
        
        while (left < right) {
            const sum = arr[left] + arr[right];
            
            steps.push({
                type: 'check',
                indices: [left, right],
                array: [...arr],
                description: `Checking sum: ${arr[left]} + ${arr[right]} = ${sum}`
            });
            
            if (sum === target) {
                steps.push({
                    type: 'found',
                    indices: [left, right],
                    array: [...arr],
                    description: `Found pair! ${arr[left]} + ${arr[right]} = ${target}`
                });
                return steps;
            } else if (sum < target) {
                left++;
                steps.push({
                    type: 'move_left',
                    indices: [left, right],
                    array: [...arr],
                    description: `Sum ${sum} < ${target}, moving left pointer to ${left}`
                });
            } else {
                right--;
                steps.push({
                    type: 'move_right',
                    indices: [left, right],
                    array: [...arr],
                    description: `Sum ${sum} > ${target}, moving right pointer to ${right}`
                });
            }
        }
        
        steps.push({
            type: 'not_found',
            indices: [],
            array: [...arr],
            description: `No pair found that sums to ${target}`
        });
        
        return steps;
    }

    removeDuplicatesVisualizer(arr) {
        const steps = [];
        
        if (arr.length === 0) {
            steps.push({
                type: 'empty',
                indices: [],
                array: [...arr],
                description: 'Array is empty, no duplicates to remove'
            });
            return steps;
        }
        
        let writeIndex = 1;
        
        steps.push({
            type: 'init',
            indices: [0, writeIndex],
            array: [...arr],
            description: `Starting with writeIndex = ${writeIndex}`
        });
        
        for (let readIndex = 1; readIndex < arr.length; readIndex++) {
            steps.push({
                type: 'compare',
                indices: [readIndex - 1, readIndex],
                array: [...arr],
                description: `Comparing elements at indices ${readIndex - 1} and ${readIndex}`
            });
            
            if (arr[readIndex] !== arr[readIndex - 1]) {
                arr[writeIndex] = arr[readIndex];
                writeIndex++;
                
                steps.push({
                    type: 'copy',
                    indices: [readIndex, writeIndex - 1],
                    array: [...arr],
                    description: `Copied ${arr[readIndex]} to position ${writeIndex - 1}`
                });
            } else {
                steps.push({
                    type: 'skip',
                    indices: [readIndex],
                    array: [...arr],
                    description: `Skipping duplicate element ${arr[readIndex]}`
                });
            }
        }
        
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            description: `Removed duplicates. New length: ${writeIndex}`
        });
        
        return steps;
    }

    maxAreaVisualizer(arr) {
        const steps = [];
        let left = 0;
        let right = arr.length - 1;
        let maxArea = 0;
        
        steps.push({
            type: 'init',
            indices: [left, right],
            array: [...arr],
            description: `Finding container with most water`
        });
        
        while (left < right) {
            const width = right - left;
            const h = Math.min(arr[left], arr[right]);
            const area = width * h;
            
            steps.push({
                type: 'calculate',
                indices: [left, right],
                array: [...arr],
                description: `Width: ${width}, Height: ${h}, Area: ${area}`
            });
            
            maxArea = Math.max(maxArea, area);
            
            if (arr[left] < arr[right]) {
                left++;
                steps.push({
                    type: 'move_left',
                    indices: [left, right],
                    array: [...arr],
                    description: `Moving left pointer to ${left} (shorter line)`
                });
            } else {
                right--;
                steps.push({
                    type: 'move_right',
                    indices: [left, right],
                    array: [...arr],
                    description: `Moving right pointer to ${right} (shorter line)`
                });
            }
        }
        
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            description: `Maximum area found: ${maxArea}`
        });
        
        return steps;
    }

    // Array Problems Visualizers
    findMissingNumberVisualizer(arr) {
        const steps = [];
        const n = arr.length;
        const expectedSum = (n * (n + 1)) / 2;
        
        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            description: `Expected sum for 0 to ${n}: ${expectedSum}`
        });
        
        let actualSum = 0;
        for (let i = 0; i < arr.length; i++) {
            actualSum += arr[i];
            steps.push({
                type: 'sum',
                indices: [i],
                array: [...arr],
                description: `Adding ${arr[i]}, current sum: ${actualSum}`
            });
        }
        
        const missing = expectedSum - actualSum;
        steps.push({
            type: 'found',
            indices: [],
            array: [...arr],
            description: `Missing number: ${expectedSum} - ${actualSum} = ${missing}`
        });
        
        return steps;
    }

    moveZerosVisualizer(arr) {
        const steps = [];
        let nonZeroIndex = 0;
        
        steps.push({
            type: 'init',
            indices: [0],
            array: [...arr],
            description: `Starting to move zeros to end`
        });
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0) {
                arr[nonZeroIndex] = arr[i];
                steps.push({
                    type: 'move',
                    indices: [i, nonZeroIndex],
                    array: [...arr],
                    description: `Moving ${arr[i]} from index ${i} to ${nonZeroIndex}`
                });
                nonZeroIndex++;
            } else {
                steps.push({
                    type: 'skip',
                    indices: [i],
                    array: [...arr],
                    description: `Skipping zero at index ${i}`
                });
            }
        }
        
        for (let i = nonZeroIndex; i < arr.length; i++) {
            arr[i] = 0;
            steps.push({
                type: 'fill',
                indices: [i],
                array: [...arr],
                description: `Filling index ${i} with zero`
            });
        }
        
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            description: `All zeros moved to end successfully!`
        });
        
        return steps;
    }

    findPeakElementVisualizer(arr) {
        const steps = [];
        let left = 0;
        let right = arr.length - 1;
        
        steps.push({
            type: 'init',
            indices: [left, right],
            array: [...arr],
            description: `Searching for peak element using binary search`
        });
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            steps.push({
                type: 'check',
                indices: [mid, mid + 1],
                array: [...arr],
                description: `Checking if ${arr[mid]} > ${arr[mid + 1]}`
            });
            
            if (arr[mid] > arr[mid + 1]) {
                right = mid;
                steps.push({
                    type: 'move_right',
                    indices: [left, right],
                    array: [...arr],
                    description: `Peak is in left half, moving right to ${right}`
                });
            } else {
                left = mid + 1;
                steps.push({
                    type: 'move_left',
                    indices: [left, right],
                    array: [...arr],
                    description: `Peak is in right half, moving left to ${left}`
                });
            }
        }
        
        steps.push({
            type: 'found',
            indices: [left],
            array: [...arr],
            description: `Peak element found at index ${left}: ${arr[left]}`
        });
        
        return steps;
    }

    rotateArrayVisualizer(arr, k) {
        const steps = [];
        const n = arr.length;
        k = k % n;
        
        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            description: `Rotating array by ${k} positions to the right`
        });
        
        // Reverse entire array
        steps.push({
            type: 'reverse_all',
            indices: [0, n - 1],
            array: [...arr],
            description: `Step 1: Reverse entire array`
        });
        
        // Reverse first k elements
        steps.push({
            type: 'reverse_first',
            indices: [0, k - 1],
            array: [...arr],
            description: `Step 2: Reverse first ${k} elements`
        });
        
        // Reverse remaining elements
        steps.push({
            type: 'reverse_remaining',
            indices: [k, n - 1],
            array: [...arr],
            description: `Step 3: Reverse remaining elements`
        });
        
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            description: `Array rotated successfully!`
        });
        
        return steps;
    }

    // Placeholder visualizers for other algorithms
    mergeSortVisualizer(arr) {
        return [{ type: 'info', description: 'Merge Sort visualization coming soon!' }];
    }

    quickSortVisualizer(arr) {
        return [{ type: 'info', description: 'Quick Sort visualization coming soon!' }];
    }

    bfsVisualizer(graph, start) {
        return [{ type: 'info', description: 'BFS visualization coming soon!' }];
    }

    dfsVisualizer(graph, start) {
        return [{ type: 'info', description: 'DFS visualization coming soon!' }];
    }

    inorderTraversalVisualizer(root) {
        return [{ type: 'info', description: 'Inorder traversal visualization coming soon!' }];
    }

    preorderTraversalVisualizer(root) {
        return [{ type: 'info', description: 'Preorder traversal visualization coming soon!' }];
    }

    fibonacciDPVisualizer(n) {
        return [{ type: 'info', description: 'Fibonacci DP visualization coming soon!' }];
    }

    lcsVisualizer(text1, text2) {
        return [{ type: 'info', description: 'LCS visualization coming soon!' }];
    }

    // Hash & Set Visualizers
    twoSumHashVisualizer(arr, target) {
        return [{ type: 'info', description: 'Two Sum Hash visualization coming soon!' }];
    }

    validAnagramVisualizer(s, t) {
        return [{ type: 'info', description: 'Valid Anagram visualization coming soon!' }];
    }

    findDuplicateVisualizer(arr) {
        return [{ type: 'info', description: 'Find Duplicate visualization coming soon!' }];
    }

    longestSubstringVisualizer(s) {
        return [{ type: 'info', description: 'Longest Substring visualization coming soon!' }];
    }

    frequencyCounterVisualizer(arr) {
        return [{ type: 'info', description: 'Frequency Counter visualization coming soon!' }];
    }

    // Sliding Window Visualizers
    maxSumSubarrayVisualizer(arr, k) {
        return [{ type: 'info', description: 'Max Sum Subarray visualization coming soon!' }];
    }

    minSubArrayLenVisualizer(target, arr) {
        return [{ type: 'info', description: 'Min Subarray Length visualization coming soon!' }];
    }

    longestSubstringKDistinctVisualizer(s, k) {
        return [{ type: 'info', description: 'Longest Substring K Distinct visualization coming soon!' }];
    }

    // Brute Force Visualizers
    generatePermutationsVisualizer(arr) {
        return [{ type: 'info', description: 'Generate Permutations visualization coming soon!' }];
    }

    generateSubsetsVisualizer(arr) {
        return [{ type: 'info', description: 'Generate Subsets visualization coming soon!' }];
    }

    nQueensVisualizer(n) {
        return [{ type: 'info', description: 'N-Queens visualization coming soon!' }];
    }

    // Iterator & Recursion Visualizers
    inorderIterativeVisualizer(root) {
        return [{ type: 'info', description: 'Inorder Iterative visualization coming soon!' }];
    }

    preorderIterativeVisualizer(root) {
        return [{ type: 'info', description: 'Preorder Iterative visualization coming soon!' }];
    }

    binarySearchRecursiveVisualizer(arr, target, left = 0, right = arr.length - 1) {
        return [{ type: 'info', description: 'Binary Search Recursive visualization coming soon!' }];
    }

    mergeSortRecursiveVisualizer(arr) {
        return [{ type: 'info', description: 'Merge Sort Recursive visualization coming soon!' }];
    }

    // Utility methods
    getAlgorithmsByCategory(category) {
        return this.algorithms[category] || {};
    }

    getAllCategories() {
        return Object.keys(this.algorithms);
    }

    getAlgorithm(category, name) {
        return this.algorithms[category]?.[name];
    }
}

// Export for use in other files
window.AlgorithmLibrary = AlgorithmLibrary; 