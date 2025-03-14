export type User = {
  id: string;
  telegramId: string;
  username: string;
  numberOfTicketsLeft: number;
  imageURL: string;
  spot: number;
  streak: number;
  totalFriends: number;
  totalReferrals: number;
  isKol: boolean;
  createdAt: string;
  updatedAt: string;
  invites: {
    max: number;
    amount: number;
    activity: number;
  };
  earnings: {
    total: number;
    referrals: number;
  };
  farming: {
    availableAfter: string | null;
  };
  rewards: Reward[];
  tasks: Task[];
};

export type Reward = {
  id?: string;
  day: number;
  amount?: number;
  name?: string;
  claimed: boolean;
};

export type Task = {
  id: string;
  title: string;
  task_url: string;
  reward: number;
  done: boolean;
};

export type RequestMeta = {
  offset: number;
  count: number;
  total: number;
};

export type FriendsResponse = {
  results: User[];
  meta: RequestMeta;
};
