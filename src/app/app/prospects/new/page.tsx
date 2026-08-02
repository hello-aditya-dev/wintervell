'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';

import { useDemoStore } from '@/demo/state/demo-store';
import type { Industry, ProspectStage, CreateProspectInput } from '@/demo/types/prospect';
import { PageHeader, DemoLabel } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// ── Schema ───────────────────────────────────────────────────────────────

const schema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  company: z.string().min(1, 'Company is required'),
  website: z.string().min(1, 'Website is required').url('Must be a valid URL'),
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
  phone: z.string().optional(),
  industry: z.enum(['healthcare', 'legal', 'finance', 'education', 'retail', 'technology', 'real_estate', 'hospitality', 'construction', 'other']),
  companySize: z.string().optional(),
  leadSource: z.string().optional(),
  servicesOfInterest: z.array(z.string()).optional(),
  estimatedBudget: z.coerce.number().nullable().optional(),
  assignedOwner: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof schema>;

const industries: { label: string; value: Industry }[] = [
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Legal', value: 'legal' },
  { label: 'Finance', value: 'finance' },
  { label: 'Education', value: 'education' },
  { label: 'Retail', value: 'retail' },
  { label: 'Technology', value: 'technology' },
  { label: 'Real Estate', value: 'real_estate' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Construction', value: 'construction' },
  { label: 'Other', value: 'other' },
];

const serviceOptions = [
  'Technical SEO',
  'Search Optimization',
  'Performance',
  'Mobile Experience',
  'Accessibility',
  'Conversion',
  'Trust & Credibility',
  'Content Quality',
  'AI Search Readiness',
];

// ── Page component ───────────────────────────────────────────────────────

export default function NewProspectPage() {
  const router = useRouter();
  const setProspects = useDemoStore((s) => s.setProspects);
  const prospects = useDemoStore((s) => s.prospects);
  const users = useDemoStore((s) => s.users);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contactName: '',
      company: '',
      website: '',
      email: '',
      phone: '',
      industry: 'technology',
      companySize: '',
      leadSource: '',
      servicesOfInterest: [],
      estimatedBudget: null,
      assignedOwner: 'user-1',
      notes: '',
      tags: [],
    },
  });

  const [tagsInput, setTagsInput] = React.useState('');

  function onSubmit(values: FormValues) {
    const newId = `prospect-${Date.now()}`;
    const now = new Date().toISOString();

    const newProspect = {
      id: newId,
      contactName: values.contactName,
      company: values.company,
      website: values.website,
      email: values.email,
      phone: values.phone ?? '',
      industry: values.industry,
      companySize: values.companySize ?? '',
      leadSource: values.leadSource ?? '',
      servicesOfInterest: values.servicesOfInterest ?? [],
      estimatedBudget: values.estimatedBudget ?? null,
      currency: 'USD',
      assignedOwner: values.assignedOwner ?? 'user-1',
      stage: 'new' as ProspectStage,
      estimatedValue: 0,
      tags: values.tags ?? [],
      notes: values.notes ?? '',
      nextAction: '',
      latestAuditId: null,
      opportunityId: null,
      createdAt: now,
      updatedAt: now,
    };

    setProspects([...prospects, newProspect]);
    toast.success('Saved in demonstration workspace');
    router.push('/app/prospects');
  }

  return (
    <div>
      <PageHeader
        title="Create Prospect"
        description="Add a new prospect to the demonstration workspace."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button variant="outline" size="sm" onClick={() => router.push('/app/prospects')}>
              <ArrowLeft className="size-3.5 mr-1" /> Back
            </Button>
          </div>
        }
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
          {/* Contact & Company */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Contact & Company</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {industries.map((i) => (
                          <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <FormControl><Input placeholder="e.g. 50-200" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leadSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Source</FormLabel>
                    <FormControl><Input placeholder="e.g. Inbound - Website" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Budget & Assignment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Budget & Assignment</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="estimatedBudget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Budget</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 15000"
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          field.onChange(v === '' ? null : Number(v));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedOwner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Owner</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {users.map((u) => (
                          <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Services of Interest */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Services of Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="servicesOfInterest"
                render={() => (
                  <FormItem>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => (
                        <label key={service} className="flex items-center gap-1.5 text-xs">
                          <input
                            type="checkbox"
                            value={service}
                            onChange={(e) => {
                              const current = form.getValues('servicesOfInterest') ?? [];
                              if (e.target.checked) {
                                form.setValue('servicesOfInterest', [...current, service]);
                              } else {
                                form.setValue('servicesOfInterest', current.filter((s) => s !== service));
                              }
                            }}
                            className="rounded border-border"
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Notes & Tags */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Notes & Tags</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl><Textarea rows={3} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label className="text-sm">Tags</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Type a tag and press Enter"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && tagsInput.trim()) {
                        e.preventDefault();
                        const current = form.getValues('tags') ?? [];
                        if (!current.includes(tagsInput.trim())) {
                          form.setValue('tags', [...current, tagsInput.trim()]);
                        }
                        setTagsInput('');
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(form.watch('tags') ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          form.setValue('tags', (form.getValues('tags') ?? []).filter((t) => t !== tag));
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-3">
            <Button type="submit">Save Prospect</Button>
            <Button type="button" variant="outline" onClick={() => router.push('/app/prospects')}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
