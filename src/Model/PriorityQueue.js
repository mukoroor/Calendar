export default class PriorityQueue {
    #heap
    #compare; 

    constructor(compareFn = ((a, b) => a - b)) {
      this.#heap = [];
      this.#compare = compareFn;
    }
  
    enqueue(item) {
      this.#heap.push(item);
      this.bubbleUp(this.size - 1);
    }

    enqueueList() {}
  
    dequeue() {
      const min = this.#heap[0];
      const end = this.#heap.pop();
      if (this.#heap.length > 0) {
        this.#heap[0] = end;
        this.bubbleDown();
      }
      return min;
    }
  
    peek() {
      return this.#heap[0];
    }
  
    get size() {
      return this.#heap.length;
    }
  
    bubbleUp(startIndex) {
      let currentIndex = startIndex;
      while (currentIndex > 0) {
        const parentIndex = Math.floor((currentIndex - 1) / 2);
        if (this.#compare(this.#heap[currentIndex], this.#heap[parentIndex]) >= 0) {
          break;
        }
        [this.#heap[currentIndex], this.#heap[parentIndex]] = [this.#heap[parentIndex], this.#heap[currentIndex]];
        currentIndex = parentIndex;
      }
    }
  
    bubbleDown() {
      let currentIndex = 0;
      const length = this.#heap.length;
      const currentItem = this.#heap[0];
  
      while (true) {
        let leftChildIndex = 2 * currentIndex + 1;
        let rightChildIndex = 2 * currentIndex + 2;
        let leftChild, rightChild;
        let swapIndex = null;
  
        if (leftChildIndex < length) {
          leftChild = this.#heap[leftChildIndex];
          if (this.#compare(leftChild, currentItem) < 0) {
            swapIndex = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.#heap[rightChildIndex];
          if (
            (swapIndex === null && this.#compare(rightChild, currentItem) < 0) ||
            (swapIndex !== null && this.#compare(rightChild, leftChild) < 0)
          ) {
            swapIndex = rightChildIndex;
          }
        }
  
        if (swapIndex === null) {
          break;
        }
  
        this.#heap[currentIndex] = this.#heap[swapIndex];
        this.#heap[swapIndex] = currentItem;
        currentIndex = swapIndex;
      }
    }

    duplicate() {
      const copiedQueue = new PriorityQueue();
      copiedQueue.#compare = this.#compare;
      copiedQueue.#heap = this.#heap.slice();
      return copiedQueue;
    }
  
    inOrder() {
      const sorted = [];
      const tempQueue = new PriorityQueue(this.#compare);
  
      while (this.size > 0) {
        const item = this.dequeue();
        sorted.push(item);
        tempQueue.enqueue(item);
      }
  
      this.#heap = tempQueue.#heap;
  
      return sorted;
    }
  
    setCompare(compareFn) {
      this.#compare = compareFn;
      this.#reshuffle();
    }
  
    #reshuffle() {
      const currentQueue = this.#heap.slice(); // Copy the elements

      // Clear the current heap
      this.#heap.length = 0;

      // Enqueue the elements with the new comparison function
      for (let i = Math.floor((this.size - 1) / 2); i > 0; i--) {
        this.bubbleUp(i);
      }
    }
  }
  