import { describe, it, expect, beforeEach } from 'vitest';
import { useDemoStore, getStoreSnapshot } from '@/demo/state/demo-store';

describe('useDemoStore', () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useDemoStore.getState().resetDemoData();
  });

  it('initializes with demoMode enabled', () => {
    const state = useDemoStore.getState();
    expect(state.demoMode).toBe(true);
  });

  it('populates default prospects from fixtures', () => {
    const { prospects } = useDemoStore.getState();
    expect(prospects.length).toBeGreaterThan(0);
    expect(prospects[0].id).toBe('prospect-1');
  });

  it('populates default audits from fixtures', () => {
    const { audits } = useDemoStore.getState();
    expect(audits.length).toBeGreaterThan(0);
    expect(audits[0].id).toBe('audit-1');
  });

  it('setProspects updates the prospects array', () => {
    const store = useDemoStore.getState();
    const updated = [{ ...store.prospects[0], contactName: 'Test User' }];
    store.setProspects(updated);

    const { prospects } = useDemoStore.getState();
    expect(prospects).toHaveLength(1);
    expect(prospects[0].contactName).toBe('Test User');
  });

  it('resetDemoData restores original fixture data', () => {
    const store = useDemoStore.getState();
    const originalLength = store.prospects.length;

    // Mutate the store
    store.setProspects([]);

    expect(useDemoStore.getState().prospects).toHaveLength(0);

    // Reset
    useDemoStore.getState().resetDemoData();

    expect(useDemoStore.getState().prospects).toHaveLength(originalLength);
  });

  it('getStoreSnapshot returns current state and setters', () => {
    const snapshot = getStoreSnapshot();
    expect(snapshot.prospects.length).toBeGreaterThan(0);
    expect(typeof snapshot.setProspects).toBe('function');
    expect(typeof snapshot.setAudits).toBe('function');
    expect(typeof snapshot.setFindings).toBe('function');
  });
});
