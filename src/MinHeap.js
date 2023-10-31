export default class MinHeap {
    #heap
    #compare = function(a, b) { return a < b};

    constructor(compareFunction) {
        this.#heap = [];
        if (typeof compareFunction == 'function') this.#compare = compareFunction;
    }

    // Insert a new element into the heap
    insert(value) {
        this.#heap.push(value);
        this.bubbleUp();
    }

    // Remove and return the minimum element from the heap
    extractMin() {
        if (this.#heap.length === 0) {
            return null; // Heap is empty
        }

        if (this.#heap.length === 1) {
            return this.#heap.pop();
        }

        const min = this.#heap[0];
        this.#heap[0] = this.#heap.pop();
        this.sinkDown(0);
        return min;
    }

    // Move an element up to its correct position
    bubbleUp() {
        let currentIndex = this.#heap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.#compare(this.#heap[currentIndex], this.#heap[parentIndex]) < 0) {
                [this.#heap[currentIndex], this.#heap[parentIndex]] = [this.#heap[parentIndex], this.#heap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    // Move an element down to its correct position
    sinkDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallest = index;

        if (leftChildIndex < this.#heap.length && this.#compare(this.#heap[leftChildIndex], this.#heap[smallest])) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex < this.#heap.length && this.#compare(this.#heap[rightChildIndex], this.#heap[smallest])) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            [this.#heap[index], this.#heap[smallest]] = [this.#heap[smallest], this.#heap[index]];
            this.sinkDown(smallest);
        }
    }
}