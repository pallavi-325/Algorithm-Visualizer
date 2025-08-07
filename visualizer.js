// Visualization Engine
class AlgorithmVisualizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.currentStep = 0;
        this.steps = [];
        this.isPlaying = false;
        this.animationSpeed = 1000; // milliseconds
        
        this.setupCanvas();
    }

    setupCanvas() {
        // Set canvas size
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        // Set canvas style
        this.ctx.font = '16px Inter, sans-serif';
        this.ctx.textAlign = 'center';
    }

    // Main visualization method
    visualize(steps, algorithmName) {
        this.steps = steps;
        this.currentStep = 0;
        this.algorithmName = algorithmName;
        
        if (steps.length === 0) {
            this.showMessage('No visualization data available');
            return;
        }

        this.showStep(0);
    }

    // Show a specific step
    showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.steps.length) {
            return;
        }

        this.currentStep = stepIndex;
        const step = this.steps[stepIndex];
        
        // Clear canvas
        this.clearCanvas();
        
        // Update step counter
        this.updateStepCounter();
        
        // Draw based on step type
        switch (step.type) {
            case 'compare':
            case 'swap':
            case 'check':
            case 'found':
            case 'not_found':
            case 'select':
            case 'shift':
            case 'insert':
            case 'narrow':
            case 'init':
            case 'move':
            case 'complete':
            case 'move_left':
            case 'move_right':
            case 'copy':
            case 'skip':
            case 'calculate':
            case 'sum':
            case 'empty':
            case 'reverse_all':
            case 'reverse_first':
            case 'reverse_remaining':
            case 'fill':
                this.drawArrayVisualization(step);
                break;
            case 'info':
                this.showMessage(step.description);
                break;
            default:
                this.showMessage('Visualization not available for this step');
        }
    }

    // Draw array-based visualization
    drawArrayVisualization(step) {
        const array = step.array;
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // Calculate dimensions
        const elementWidth = Math.min(60, (canvasWidth - 40) / array.length);
        const elementHeight = 40;
        const startX = (canvasWidth - (array.length * elementWidth)) / 2;
        const startY = canvasHeight / 2 - elementHeight / 2;
        
        // Draw title
        this.ctx.fillStyle = '#2d3748';
        this.ctx.font = 'bold 18px Inter, sans-serif';
        this.ctx.fillText(this.algorithmName, canvasWidth / 2, 30);
        
        // Draw description
        this.ctx.fillStyle = '#718096';
        this.ctx.font = '14px Inter, sans-serif';
        this.wrapText(step.description, canvasWidth / 2, canvasHeight - 30, canvasWidth - 40);
        
        // Draw array elements
        for (let i = 0; i < array.length; i++) {
            const x = startX + i * elementWidth;
            const y = startY;
            
            // Determine element color based on step type
            let backgroundColor = '#667eea';
            let textColor = 'white';
            
            if (step.indices && step.indices.includes(i)) {
                switch (step.type) {
                    case 'compare':
                        backgroundColor = '#ed8936';
                        break;
                    case 'swap':
                        backgroundColor = '#f56565';
                        break;
                    case 'check':
                        backgroundColor = '#4299e1';
                        break;
                    case 'found':
                        backgroundColor = '#48bb78';
                        break;
                    case 'select':
                        backgroundColor = '#9f7aea';
                        break;
                    case 'shift':
                        backgroundColor = '#ed8936';
                        break;
                    case 'insert':
                        backgroundColor = '#48bb78';
                        break;
                    case 'narrow':
                        backgroundColor = '#4299e1';
                        break;
                    case 'init':
                        backgroundColor = '#667eea';
                        break;
                    case 'move':
                        backgroundColor = '#38b2ac';
                        break;
                    case 'complete':
                        backgroundColor = '#48bb78';
                        break;
                    case 'move_left':
                        backgroundColor = '#4299e1';
                        break;
                    case 'move_right':
                        backgroundColor = '#ed8936';
                        break;
                    case 'copy':
                        backgroundColor = '#9f7aea';
                        break;
                    case 'skip':
                        backgroundColor = '#a0aec0';
                        break;
                    case 'calculate':
                        backgroundColor = '#f6ad55';
                        break;
                    case 'sum':
                        backgroundColor = '#68d391';
                        break;
                    case 'empty':
                        backgroundColor = '#a0aec0';
                        break;
                    case 'reverse_all':
                    case 'reverse_first':
                    case 'reverse_remaining':
                        backgroundColor = '#f56565';
                        break;
                    case 'fill':
                        backgroundColor = '#ed8936';
                        break;
                }
            }
            
            // Draw element background
            this.ctx.fillStyle = backgroundColor;
            this.roundRect(x + 2, y + 2, elementWidth - 4, elementHeight - 4, 8);
            this.ctx.fill();
            
            // Draw element value
            this.ctx.fillStyle = textColor;
            this.ctx.font = 'bold 16px Inter, sans-serif';
            this.ctx.fillText(array[i].toString(), x + elementWidth / 2, y + elementHeight / 2 + 5);
            
            // Draw index
            this.ctx.fillStyle = '#4a5568';
            this.ctx.font = '12px Inter, sans-serif';
            this.ctx.fillText(i.toString(), x + elementWidth / 2, y + elementHeight + 15);
        }
        
        // Draw range for binary search
        if (step.range) {
            this.drawSearchRange(step.range, startX, elementWidth);
        }
    }

    // Draw search range for binary search
    drawSearchRange(range, startX, elementWidth) {
        const [left, right] = range;
        const canvasHeight = this.canvas.height;
        
        this.ctx.strokeStyle = '#4299e1';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5, 5]);
        
        const startXPos = startX + left * elementWidth;
        const endXPos = startX + (right + 1) * elementWidth;
        
        this.ctx.beginPath();
        this.ctx.moveTo(startXPos, canvasHeight - 60);
        this.ctx.lineTo(endXPos, canvasHeight - 60);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
        
        // Draw range labels
        this.ctx.fillStyle = '#4299e1';
        this.ctx.font = '12px Inter, sans-serif';
        this.ctx.fillText(`Search Range: [${left}, ${right}]`, this.canvas.width / 2, canvasHeight - 40);
    }

    // Helper method to draw rounded rectangles
    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }

    // Helper method to wrap text
    wrapText(text, x, y, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + ' ' + word;
            const metrics = this.ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);

        for (let i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], x, y + (i * 20));
        }
    }

    // Show message on canvas
    showMessage(message) {
        this.clearCanvas();
        
        this.ctx.fillStyle = '#2d3748';
        this.ctx.font = 'bold 20px Inter, sans-serif';
        this.ctx.fillText(this.algorithmName || 'Algorithm Visualizer', this.canvas.width / 2, 50);
        
        this.ctx.fillStyle = '#718096';
        this.ctx.font = '16px Inter, sans-serif';
        this.wrapText(message, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width - 40);
    }

    // Clear canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Update step counter
    updateStepCounter() {
        const stepCounter = document.getElementById('stepCounter');
        if (stepCounter) {
            stepCounter.textContent = `Step ${this.currentStep + 1} of ${this.steps.length}`;
        }
    }

    // Navigation methods
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }

    // Auto-play functionality
    startAutoPlay() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            if (this.currentStep < this.steps.length - 1) {
                this.nextStep();
            } else {
                this.stopAutoPlay();
            }
        }, this.animationSpeed);
    }

    stopAutoPlay() {
        this.isPlaying = false;
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Set animation speed
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
        if (this.isPlaying) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    // Reset visualization
    reset() {
        this.stopAutoPlay();
        this.currentStep = 0;
        this.steps = [];
        this.clearCanvas();
        this.showMessage('Select an algorithm and click "Run Algorithm" to start visualization');
        this.updateStepCounter();
    }
}

// Array Display Manager
class ArrayDisplayManager {
    constructor(container) {
        this.container = container;
    }

    // Update array display
    updateArray(array, currentIndices = [], stepType = '') {
        this.container.innerHTML = '';
        
        array.forEach((element, index) => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'array-element';
            elementDiv.textContent = element;
            
            // Add special classes based on current step
            if (currentIndices.includes(index)) {
                elementDiv.classList.add(stepType);
            }
            
            this.container.appendChild(elementDiv);
        });
    }

    // Clear array display
    clear() {
        this.container.innerHTML = '';
    }
}

// Console Output Manager
class ConsoleOutputManager {
    constructor(container) {
        this.container = container;
    }

    // Add output message
    addMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `console-message ${type}`;
        messageDiv.textContent = message;
        
        this.container.appendChild(messageDiv);
        this.container.scrollTop = this.container.scrollHeight;
    }

    // Clear console
    clear() {
        this.container.innerHTML = '';
    }

    // Update with step information
    updateWithStep(step) {
        this.addMessage(step.description, step.type);
    }
}

// Export for use in other files
window.AlgorithmVisualizer = AlgorithmVisualizer;
window.ArrayDisplayManager = ArrayDisplayManager;
window.ConsoleOutputManager = ConsoleOutputManager; 