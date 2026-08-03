export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const users: DemoUser[] = [
  {
    id: 'user-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@wintervell.example.com',
    role: 'Senior Consultant',
    avatar: 'AM',
  },
  {
    id: 'user-2',
    name: 'Jordan Lee',
    email: 'jordan.lee@wintervell.example.com',
    role: 'Consultant',
    avatar: 'JL',
  },
  {
    id: 'user-3',
    name: 'Casey Rivera',
    email: 'casey.rivera@wintervell.example.com',
    role: 'Associate Consultant',
    avatar: 'CR',
  },
];

export default users;
