export type ServiceStatus = 'active' | 'draft' | 'archived';
export type PricingModel = 'fixed' | 'hourly' | 'monthly' | 'project';

export interface Service {
  id: string;
  name: string;
  description: string;
  pricingModel: PricingModel;
  startingPrice: number;
  currency: string;
  estimatedDuration: string;
  relatedFindingCategories: string[];
  proposalWording: string;
  status: ServiceStatus;
}

export interface CreateServiceInput {
  name: string;
  description: string;
  pricingModel: PricingModel;
  startingPrice?: number;
  currency?: string;
  estimatedDuration?: string;
  relatedFindingCategories?: string[];
  proposalWording?: string;
  status?: ServiceStatus;
}

export interface UpdateServiceInput {
  name?: string;
  description?: string;
  pricingModel?: PricingModel;
  startingPrice?: number;
  currency?: string;
  estimatedDuration?: string;
  relatedFindingCategories?: string[];
  proposalWording?: string;
  status?: ServiceStatus;
}
