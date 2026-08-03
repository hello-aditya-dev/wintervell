import type { DemoQueue } from '../types/call-centre';

export interface QueueRepository {
  list(): DemoQueue[];
  getById(id: string): DemoQueue | null;
}

export class DemoQueueRepository implements QueueRepository {
  private getStore: () => { queues: DemoQueue[]; setQueues: (queues: DemoQueue[]) => void };

  constructor(
    getStore: () => { queues: DemoQueue[]; setQueues: (queues: DemoQueue[]) => void }
  ) {
    this.getStore = getStore;
  }

  list(): DemoQueue[] {
    const { queues } = this.getStore();
    return [...queues];
  }

  getById(id: string): DemoQueue | null {
    const { queues } = this.getStore();
    return queues.find((q) => q.id === id) ?? null;
  }
}
