// Main Application Controller
class AlgorithmVisualizerApp {
    constructor() {
        this.algorithmLibrary = new AlgorithmLibrary();
        this.currentCategory = 'sorting';
        this.currentAlgorithm = null;
        this.currentArray = [];
        this.visualizer = null;
        this.arrayDisplay = null;
        this.consoleOutput = null;
        this.codeEditor = null;
        
        this.initializeApp();
    }

    initializeApp() {
        // Initialize components
        this.initializeCodeEditor();
        this.initializeVisualizer();
        this.initializeArrayDisplay();
        this.initializeConsoleOutput();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial category
        this.loadCategory('sorting');
        
        // Generate initial array
        this.generateRandomArray();
        this.updateCurrentArrayDisplay();
    }

    initializeCodeEditor() {
        const textarea = document.getElementById('codeEditor');
        this.codeEditor = CodeMirror.fromTextArea(textarea, {
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            lineWrapping: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
    }

    initializeVisualizer() {
        const canvas = document.getElementById('visualizationCanvas');
        this.visualizer = new AlgorithmVisualizer(canvas);
        
        // Handle canvas resize
        window.addEventListener('resize', () => {
            this.visualizer.setupCanvas();
            if (this.visualizer.steps.length > 0) {
                this.visualizer.showStep(this.visualizer.currentStep);
            }
        });
    }

    initializeArrayDisplay() {
        const container = document.getElementById('arrayDisplay');
        this.arrayDisplay = new ArrayDisplayManager(container);
    }

    initializeConsoleOutput() {
        const container = document.getElementById('consoleOutput');
        this.consoleOutput = new ConsoleOutputManager(container);
    }

    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.switchCategory(category);
            });
        });

        // Algorithm selection
        document.getElementById('algorithmList').addEventListener('click', (e) => {
            if (e.target.classList.contains('algorithm-item')) {
                this.selectAlgorithm(e.target.dataset.algorithm);
            }
        });

        // Input controls
        document.getElementById('generateRandomBtn').addEventListener('click', () => {
            this.generateRandomArray();
        });

        document.getElementById('customInputBtn').addEventListener('click', () => {
            this.setCustomArray();
        });

        document.getElementById('clearInputBtn').addEventListener('click', () => {
            this.clearArray();
        });

        // Array input field
        document.getElementById('arrayInput').addEventListener('input', (e) => {
            this.updateArrayFromInput(e.target.value);
        });

        // Prediction buttons
        document.getElementById('predictBtn').addEventListener('click', () => {
            this.predictOutput();
        });

        document.getElementById('showSolutionBtn').addEventListener('click', () => {
            this.showSolution();
        });

        // Control buttons
        document.getElementById('runBtn').addEventListener('click', () => {
            this.runAlgorithm();
        });

        document.getElementById('stepBtn').addEventListener('click', () => {
            this.stepThroughAlgorithm();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetVisualization();
        });

        // Navigation buttons
        document.getElementById('nextStep').addEventListener('click', () => {
            this.visualizer.nextStep();
            this.updateOutputs();
        });

        document.getElementById('prevStep').addEventListener('click', () => {
            this.visualizer.previousStep();
            this.updateOutputs();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.runAlgorithm();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.visualizer.nextStep();
                        this.updateOutputs();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.visualizer.previousStep();
                        this.updateOutputs();
                        break;
                }
            }
        });
    }

    switchCategory(category) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.currentCategory = category;
        this.loadCategory(category);
    }

    loadCategory(category) {
        const algorithms = this.algorithmLibrary.getAlgorithmsByCategory(category);
        const container = document.getElementById('algorithmList');
        
        container.innerHTML = '';
        
        Object.entries(algorithms).forEach(([name, algorithm]) => {
            const item = document.createElement('div');
            item.className = 'algorithm-item';
            item.dataset.algorithm = name;
            
            item.innerHTML = `
                <h4>${name}</h4>
                <p>${algorithm.description}</p>
                <small>Complexity: ${algorithm.complexity}</small>
            `;
            
            container.appendChild(item);
        });
    }

    selectAlgorithm(algorithmName) {
        // Update selected algorithm
        document.querySelectorAll('.algorithm-item').forEach(item => {
            item.classList.remove('selected');
        });
        document.querySelector(`[data-algorithm="${algorithmName}"]`).classList.add('selected');
        
        this.currentAlgorithm = algorithmName;
        
        // Load algorithm code
        const algorithm = this.algorithmLibrary.getAlgorithm(this.currentCategory, algorithmName);
        if (algorithm) {
            this.codeEditor.setValue(algorithm.code);
        }
        
        // Reset visualization
        this.resetVisualization();
    }

    generateRandomArray() {
        const size = Math.floor(Math.random() * 8) + 5; // 5-12 elements
        this.currentArray = [];
        
        for (let i = 0; i < size; i++) {
            this.currentArray.push(Math.floor(Math.random() * 100) + 1);
        }
        
        this.updateArrayDisplay();
        this.updateCurrentArrayDisplay();
        this.updateInputField();
    }

    setCustomArray() {
        const input = document.getElementById('arrayInput').value.trim();
        if (input) {
            const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
            if (numbers.length > 0) {
                this.currentArray = numbers;
                this.updateArrayDisplay();
                this.updateCurrentArrayDisplay();
                this.consoleOutput.addMessage(`Custom array set: [${numbers.join(', ')}]`, 'success');
            } else {
                this.consoleOutput.addMessage('Invalid input! Please enter valid numbers separated by commas.', 'error');
            }
        } else {
            this.consoleOutput.addMessage('Please enter array elements first!', 'error');
        }
    }

    clearArray() {
        this.currentArray = [];
        this.updateArrayDisplay();
        this.updateCurrentArrayDisplay();
        this.updateInputField();
        this.consoleOutput.addMessage('Array cleared!', 'info');
    }

    updateArrayFromInput(value) {
        const numbers = value.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        if (numbers.length > 0) {
            this.currentArray = numbers;
            this.updateCurrentArrayDisplay();
        }
    }

    updateCurrentArrayDisplay() {
        const container = document.getElementById('currentArrayDisplay');
        container.innerHTML = '';
        
        if (this.currentArray.length === 0) {
            container.innerHTML = '<span style="color: #a0aec0; font-style: italic;">No array set</span>';
            return;
        }
        
        this.currentArray.forEach((element, index) => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'current-array-element';
            elementDiv.textContent = element;
            elementDiv.title = `Index ${index}: ${element}`;
            container.appendChild(elementDiv);
        });
    }

    updateInputField() {
        document.getElementById('arrayInput').value = this.currentArray.join(', ');
    }

    predictOutput() {
        if (!this.currentAlgorithm) {
            this.consoleOutput.addMessage('Please select an algorithm first!', 'error');
            return;
        }

        if (this.currentArray.length === 0) {
            this.consoleOutput.addMessage('Please create an array first!', 'error');
            return;
        }

        // Update prediction input
        this.updatePredictionInput();

        // Calculate expected output
        const algorithm = this.algorithmLibrary.getAlgorithm(this.currentCategory, this.currentAlgorithm);
        if (!algorithm) {
            this.consoleOutput.addMessage('Algorithm not found!', 'error');
            return;
        }

        try {
            let expectedOutput;
            const arr = [...this.currentArray];

            if (this.currentCategory === 'searching') {
                const target = arr[Math.floor(Math.random() * arr.length)];
                expectedOutput = this.executeAlgorithm(arr, target);
                this.updatePredictionOutput(expectedOutput, `Search result for target ${target}`);
            } else if (this.currentCategory === 'two-pointer') {
                if (this.currentAlgorithm === 'Two Sum (Sorted Array)') {
                    const target = Math.floor(Math.random() * 50) + 10;
                    expectedOutput = this.executeAlgorithm(arr, target);
                    this.updatePredictionOutput(expectedOutput, `Two sum result for target ${target}`);
                } else {
                    expectedOutput = this.executeAlgorithm(arr);
                    this.updatePredictionOutput(expectedOutput);
                }
            } else if (this.currentCategory === 'array-problems') {
                if (this.currentAlgorithm === 'Rotate Array') {
                    const k = Math.floor(Math.random() * arr.length) + 1;
                    expectedOutput = this.executeAlgorithm(arr, k);
                    this.updatePredictionOutput(expectedOutput, `Array rotated by ${k} positions`);
                } else {
                    expectedOutput = this.executeAlgorithm(arr);
                    this.updatePredictionOutput(expectedOutput);
                }
            } else if (this.currentCategory === 'hash-set') {
                if (this.currentAlgorithm === 'Two Sum (Hash Map)') {
                    const target = Math.floor(Math.random() * 50) + 10;
                    expectedOutput = this.executeAlgorithm(arr, target);
                    this.updatePredictionOutput(expectedOutput, `Two sum result for target ${target}`);
                } else {
                    expectedOutput = this.executeAlgorithm(arr);
                    this.updatePredictionOutput(expectedOutput);
                }
            } else if (this.currentCategory === 'sliding-window') {
                if (this.currentAlgorithm === 'Maximum Sum Subarray of Size K') {
                    const k = Math.min(Math.floor(Math.random() * 5) + 2, arr.length);
                    expectedOutput = this.executeAlgorithm(arr, k);
                    this.updatePredictionOutput(expectedOutput, `Max sum subarray of size ${k}`);
                } else if (this.currentAlgorithm === 'Minimum Size Subarray Sum') {
                    const target = Math.floor(Math.random() * 20) + 10;
                    expectedOutput = this.executeAlgorithm(target, arr);
                    this.updatePredictionOutput(expectedOutput, `Min subarray length for sum >= ${target}`);
                } else {
                    expectedOutput = this.executeAlgorithm(arr);
                    this.updatePredictionOutput(expectedOutput);
                }
            } else if (this.currentCategory === 'brute-force') {
                expectedOutput = this.executeAlgorithm(arr);
                this.updatePredictionOutput(expectedOutput);
            } else if (this.currentCategory === 'iterator-recursion') {
                expectedOutput = this.executeAlgorithm(arr);
                this.updatePredictionOutput(expectedOutput);
            } else {
                expectedOutput = this.executeAlgorithm(arr);
                this.updatePredictionOutput(expectedOutput);
            }

            this.updatePredictionExplanation(algorithm);
            this.consoleOutput.addMessage('Output prediction generated!', 'success');

        } catch (error) {
            this.consoleOutput.addMessage(`Error in prediction: ${error.message}`, 'error');
        }
    }

    executeAlgorithm(arr, ...args) {
        const algorithm = this.algorithmLibrary.getAlgorithm(this.currentCategory, this.currentAlgorithm);
        
        // Create a simple execution function for each algorithm
        switch (this.currentAlgorithm) {
            case 'Bubble Sort':
                return [...arr].sort((a, b) => a - b);
            case 'Selection Sort':
                return [...arr].sort((a, b) => a - b);
            case 'Insertion Sort':
                return [...arr].sort((a, b) => a - b);
            case 'Reverse Array':
                return [...arr].reverse();
            case 'Two Sum (Sorted Array)':
                const target = args[0];
                const sorted = [...arr].sort((a, b) => a - b);
                let left = 0, right = sorted.length - 1;
                while (left < right) {
                    const sum = sorted[left] + sorted[right];
                    if (sum === target) return [left, right];
                    if (sum < target) left++;
                    else right--;
                }
                return [-1, -1];
            case 'Remove Duplicates':
                return [...new Set(arr)];
            case 'Move Zeros to End':
                const result = arr.filter(x => x !== 0);
                while (result.length < arr.length) result.push(0);
                return result;
            case 'Find Missing Number':
                const n = arr.length;
                const expectedSum = (n * (n + 1)) / 2;
                const actualSum = arr.reduce((sum, num) => sum + num, 0);
                return expectedSum - actualSum;
            case 'Rotate Array':
                const k = args[0] % arr.length;
                const rotated = [...arr];
                for (let i = 0; i < k; i++) {
                    rotated.unshift(rotated.pop());
                }
                return rotated;
            // Hash & Set algorithms
            case 'Two Sum (Hash Map)':
                const targetHash = args[0];
                const map = new Map();
                for (let i = 0; i < arr.length; i++) {
                    const complement = targetHash - arr[i];
                    if (map.has(complement)) {
                        return [map.get(complement), i];
                    }
                    map.set(arr[i], i);
                }
                return [-1, -1];
            case 'Find Duplicate':
                const seen = new Set();
                for (let num of arr) {
                    if (seen.has(num)) return num;
                    seen.add(num);
                }
                return -1;
            case 'Frequency Counter':
                const frequency = new Map();
                for (let item of arr) {
                    frequency.set(item, (frequency.get(item) || 0) + 1);
                }
                return Object.fromEntries(frequency);
            // Sliding Window algorithms
            case 'Maximum Sum Subarray of Size K':
                const windowSize = args[0];
                let maxSum = 0;
                let windowSum = 0;
                for (let i = 0; i < windowSize; i++) {
                    windowSum += arr[i];
                }
                maxSum = windowSum;
                for (let i = windowSize; i < arr.length; i++) {
                    windowSum = windowSum - arr[i - windowSize] + arr[i];
                    maxSum = Math.max(maxSum, windowSum);
                }
                return maxSum;
            case 'Minimum Size Subarray Sum':
                const targetSum = args[0];
                let leftPtr = 0, sum = 0, minLen = Infinity;
                for (let right = 0; right < arr.length; right++) {
                    sum += arr[right];
                    while (sum >= targetSum) {
                        minLen = Math.min(minLen, right - leftPtr + 1);
                        sum -= arr[leftPtr];
                        leftPtr++;
                    }
                }
                return minLen === Infinity ? 0 : minLen;
            // Brute Force algorithms
            case 'Generate All Permutations':
                const permutations = [];
                function backtrack(start) {
                    if (start === arr.length) {
                        permutations.push([...arr]);
                        return;
                    }
                    for (let i = start; i < arr.length; i++) {
                        [arr[start], arr[i]] = [arr[i], arr[start]];
                        backtrack(start + 1);
                        [arr[start], arr[i]] = [arr[i], arr[start]];
                    }
                }
                backtrack(0);
                return permutations.slice(0, 5); // Return first 5 permutations
            case 'Generate All Subsets':
                const subsets = [];
                const arrLength = arr.length;
                for (let i = 0; i < (1 << arrLength); i++) {
                    const subset = [];
                    for (let j = 0; j < arrLength; j++) {
                        if (i & (1 << j)) {
                            subset.push(arr[j]);
                        }
                    }
                    subsets.push(subset);
                }
                return subsets.slice(0, 8); // Return first 8 subsets
            default:
                return [...arr];
        }
    }

    updatePredictionInput() {
        const container = document.getElementById('predictionInputArray');
        container.innerHTML = '';
        
        this.currentArray.forEach((element, index) => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'prediction-element';
            elementDiv.textContent = element;
            elementDiv.title = `Index ${index}: ${element}`;
            container.appendChild(elementDiv);
        });
    }

    updatePredictionOutput(output, description = '') {
        const container = document.getElementById('predictionOutput');
        container.innerHTML = '';
        
        if (Array.isArray(output)) {
            output.forEach((element, index) => {
                const elementDiv = document.createElement('div');
                elementDiv.className = 'prediction-element highlight';
                elementDiv.textContent = element;
                elementDiv.title = `Output ${index}: ${element}`;
                container.appendChild(elementDiv);
            });
        } else {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'prediction-element highlight';
            elementDiv.textContent = output;
            elementDiv.title = `Output: ${output}`;
            container.appendChild(elementDiv);
        }

        if (description) {
            container.innerHTML += `<div style="margin-top: 10px; color: #4a5568; font-size: 12px;">${description}</div>`;
        }
    }

    updatePredictionExplanation(algorithm) {
        const container = document.getElementById('predictionExplanation');
        container.innerHTML = `
            <p><strong>Algorithm:</strong> ${this.currentAlgorithm}</p>
            <p><strong>Time Complexity:</strong> ${algorithm.complexity}</p>
            <p><strong>Description:</strong> ${algorithm.description}</p>
            <p><strong>How it works:</strong> This algorithm ${algorithm.description.toLowerCase()}. 
            The time complexity is ${algorithm.complexity}, which means ${this.getComplexityExplanation(algorithm.complexity)}.</p>
        `;
    }

    getComplexityExplanation(complexity) {
        switch (complexity) {
            case 'O(n)': return 'it takes linear time proportional to the input size';
            case 'O(n²)': return 'it takes quadratic time, growing with the square of input size';
            case 'O(log n)': return 'it takes logarithmic time, very efficient for large inputs';
            case 'O(n log n)': return 'it takes linearithmic time, efficient for sorting';
            default: return 'the time grows with the input size';
        }
    }

    showSolution() {
        if (!this.currentAlgorithm) {
            this.consoleOutput.addMessage('Please select an algorithm first!', 'error');
            return;
        }

        const algorithm = this.algorithmLibrary.getAlgorithm(this.currentCategory, this.currentAlgorithm);
        if (!algorithm) {
            this.consoleOutput.addMessage('Algorithm not found!', 'error');
            return;
        }

        this.consoleOutput.addMessage('Showing solution...', 'info');
        this.consoleOutput.addMessage(`Algorithm: ${this.currentAlgorithm}`, 'info');
        this.consoleOutput.addMessage(`Complexity: ${algorithm.complexity}`, 'info');
        this.consoleOutput.addMessage(`Description: ${algorithm.description}`, 'info');
    }

    runAlgorithm() {
        if (!this.currentAlgorithm) {
            this.consoleOutput.addMessage('Please select an algorithm first!', 'error');
            return;
        }

        if (this.currentArray.length === 0) {
            this.consoleOutput.addMessage('Please create an array first!', 'error');
            return;
        }

        const algorithm = this.algorithmLibrary.getAlgorithm(this.currentCategory, this.currentAlgorithm);
        if (!algorithm) {
            this.consoleOutput.addMessage('Algorithm not found!', 'error');
            return;
        }

        // Reset outputs
        this.consoleOutput.clear();
        this.visualizer.reset();

        // Generate visualization steps
        let steps = [];
        const arr = [...this.currentArray];

        try {
            if (this.currentCategory === 'searching') {
                // For search algorithms, we need a target
                const target = arr[Math.floor(Math.random() * arr.length)];
                steps = algorithm.visualizer.call(this.algorithmLibrary, arr, target);
                this.consoleOutput.addMessage(`Searching for target: ${target}`, 'info');
            } else if (this.currentCategory === 'two-pointer') {
                if (this.currentAlgorithm === 'Two Sum (Sorted Array)') {
                    const target = Math.floor(Math.random() * 50) + 10; // Random target 10-60
                    steps = algorithm.visualizer.call(this.algorithmLibrary, arr, target);
                    this.consoleOutput.addMessage(`Looking for two numbers that sum to: ${target}`, 'info');
                } else {
                    steps = algorithm.visualizer.call(this.algorithmLibrary, arr);
                }
            } else if (this.currentCategory === 'array-problems') {
                if (this.currentAlgorithm === 'Rotate Array') {
                    const k = Math.floor(Math.random() * arr.length) + 1;
                    steps = algorithm.visualizer.call(this.algorithmLibrary, arr, k);
                    this.consoleOutput.addMessage(`Rotating array by ${k} positions`, 'info');
                } else {
                    steps = algorithm.visualizer.call(this.algorithmLibrary, arr);
                }
            } else {
                steps = algorithm.visualizer.call(this.algorithmLibrary, arr);
            }

            // Visualize the steps
            this.visualizer.visualize(steps, this.currentAlgorithm);
            
            // Update outputs
            this.updateOutputs();
            
            this.consoleOutput.addMessage(`Running ${this.currentAlgorithm}...`, 'success');
            
        } catch (error) {
            this.consoleOutput.addMessage(`Error: ${error.message}`, 'error');
        }
    }

    stepThroughAlgorithm() {
        if (!this.currentAlgorithm) {
            this.consoleOutput.addMessage('Please select an algorithm first!', 'error');
            return;
        }

        // Start auto-play
        this.visualizer.startAutoPlay();
    }

    resetVisualization() {
        this.visualizer.reset();
        this.consoleOutput.clear();
        this.arrayDisplay.clear();
        this.generateRandomArray();
        this.updateCurrentArrayDisplay();
    }

    updateOutputs() {
        if (this.visualizer.steps.length === 0) return;

        const currentStep = this.visualizer.steps[this.visualizer.currentStep];
        
        // Update array display
        if (currentStep.array) {
            this.arrayDisplay.updateArray(
                currentStep.array,
                currentStep.indices || [],
                currentStep.type
            );
        }
        
        // Update console output
        this.consoleOutput.updateWithStep(currentStep);
    }

    // Utility methods
    getCurrentArray() {
        return [...this.currentArray];
    }

    setArray(array) {
        this.currentArray = [...array];
        this.updateArrayDisplay();
    }

    updateArrayDisplay() {
        this.arrayDisplay.updateArray(this.currentArray);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AlgorithmVisualizerApp();
});

// Add some utility functions to global scope for debugging
window.utils = {
    generateArray: (size = 8) => {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 100) + 1);
        }
        return arr;
    },
    
    sortArray: (arr) => {
        return [...arr].sort((a, b) => a - b);
    },
    
    shuffleArray: (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}; 