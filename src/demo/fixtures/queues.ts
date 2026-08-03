import type { DemoQueue } from '../types/call-centre';

const queues: DemoQueue[] = [
  {
    id: 'queue-1',
    name: 'New enquiries',
    callsWaiting: 2,
    longestWaitSeconds: 45,
    availableAgents: 2,
    serviceLevelTarget: 80,
    currentServiceLevel: 78,
    status: 'active-demo',
  },
  {
    id: 'queue-2',
    name: 'Existing customers',
    callsWaiting: 0,
    longestWaitSeconds: 0,
    availableAgents: 1,
    serviceLevelTarget: 85,
    currentServiceLevel: 92,
    status: 'active-demo',
  },
  {
    id: 'queue-3',
    name: 'Follow-up calls',
    callsWaiting: 1,
    longestWaitSeconds: 30,
    availableAgents: 1,
    serviceLevelTarget: 75,
    currentServiceLevel: 71,
    status: 'active-demo',
  },
  {
    id: 'queue-4',
    name: 'Technical support',
    callsWaiting: 0,
    longestWaitSeconds: 0,
    availableAgents: 1,
    serviceLevelTarget: 80,
    currentServiceLevel: 85,
    status: 'paused-demo',
  },
];

export default queues;
