import type { DemoCampaign } from '../types/call-centre';

const campaigns: DemoCampaign[] = [
  {
    id: 'campaign-1',
    name: 'Q1 New business outreach',
    contactCount: 150,
    attempted: 87,
    connectedDemo: 32,
    followUp: 15,
    completed: 42,
    assignedTeam: 'Sales',
    status: 'active-demo',
  },
  {
    id: 'campaign-2',
    name: 'Existing client check-in',
    contactCount: 80,
    attempted: 45,
    connectedDemo: 28,
    followUp: 8,
    completed: 30,
    assignedTeam: 'Customer Success',
    status: 'active-demo',
  },
  {
    id: 'campaign-3',
    name: 'Technical follow-up campaign',
    contactCount: 40,
    attempted: 0,
    connectedDemo: 0,
    followUp: 0,
    completed: 0,
    assignedTeam: 'Support',
    status: 'planned',
  },
];

export default campaigns;
