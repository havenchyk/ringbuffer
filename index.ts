export class RingBuffer {
  private data: number[];
  private head: number = 0;
  private tail: number = 0;
  private debug: boolean = false;

  constructor(capacity: number, debug?: boolean) {
    this.data = new Array(capacity);

    if (debug) {
      this.debug = debug;
    }
  }

  // returns oldest number
  read(): number | undefined {
    if (!this.size) {
      this.log("Buffer is empty");

      return;
    }

    const node = this.data[this.tail];

    this.log("=== read", node);

    delete this.data[this.tail];

    this.tail = (this.tail + 1) % this.capacity;

    this.log("tail, head: ", this.tail, this.head);

    return node;
  }

  // returns the number of inserted items
  write(nodes: number[]): number {
    let countOfInserted = 0;

    for (const node of nodes) {
      const inserted = this.writeOne(node);

      if (!inserted) break;

      countOfInserted++;
    }

    return countOfInserted;
  }

  private get capacity() {
    return this.data.length;
  }

  private get size() {
    return this.data.filter(Boolean).length;
  }

  private writeOne(node: number): boolean {
    if (this.size >= this.capacity) {
      this.log("Buffer is full");
      return false;
    }

    this.data[this.head] = node;
    this.head = (this.head + 1) % this.capacity;

    this.log("tail, head: ", this.tail, this.head);

    return true;
  }

  private log(...args) {
    if (this.debug) {
      console.info(...args);
    }
  }
}
