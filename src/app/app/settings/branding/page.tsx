'use client';

import * as React from 'react';

import { PageHeader, DemoLabel } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// ── Branding state ───────────────────────────────────────────────────────

interface BrandingData {
  agencyName: string;
  logoPlaceholder: string;
  primaryColour: string;
  secondaryColour: string;
  reportAccent: string;
  senderName: string;
  replyToAddress: string;
  website: string;
  phone: string;
  address: string;
  termsUrl: string;
  privacyUrl: string;
  currency: string;
  taxLabel: string;
  reportFooter: string;
}

const defaultBranding: BrandingData = {
  agencyName: 'WinterVell',
  logoPlaceholder: 'WV',
  primaryColour: '#1a1a2e',
  secondaryColour: '#16213e',
  reportAccent: '#0f3460',
  senderName: 'Alex Morgan',
  replyToAddress: 'alex.morgan@wintervell.example.com',
  website: 'https://wintervell.example.com',
  phone: '+1-555-0100',
  address: '123 Digital Ave, Suite 100, New York, NY 10001',
  termsUrl: 'https://wintervell.example.com/terms',
  privacyUrl: 'https://wintervell.example.com/privacy',
  currency: 'USD',
  taxLabel: 'Tax',
  reportFooter: '© 2025 WinterVell. All rights reserved. This report is confidential.',
};

// ── Page component ───────────────────────────────────────────────────────

export default function BrandingPage() {
  const [branding, setBranding] = React.useState<BrandingData>(defaultBranding);

  const updateField = (key: keyof BrandingData, value: string) => {
    setBranding((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success('Saved in demonstration workspace', {
      description: 'Branding settings updated.',
    });
  };

  return (
    <div>
      <PageHeader
        title="Branding"
        description="Configure white-label settings for reports and proposals."
        actions={
          <div className="flex items-center gap-2">
            <DemoLabel />
            <Button size="sm" onClick={handleSave}>Save Changes</Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Settings Form */}
        <div className="space-y-6">
          {/* Agency Identity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Agency Identity</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="branding-agencyName" className="text-xs">Agency Name</Label>
                <Input
                  id="branding-agencyName"
                  value={branding.agencyName}
                  onChange={(e) => updateField('agencyName', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="branding-logoPlaceholder" className="text-xs">Logo Placeholder</Label>
                <Input
                  id="branding-logoPlaceholder"
                  value={branding.logoPlaceholder}
                  onChange={(e) => updateField('logoPlaceholder', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="branding-primaryColour" className="text-xs">Primary Colour</Label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="color"
                    value={branding.primaryColour}
                    onChange={(e) => updateField('primaryColour', e.target.value)}
                    className="h-8 w-8 rounded border cursor-pointer"
                    aria-label="Primary colour picker"
                  />
                  <Input
                    id="branding-primaryColour"
                    value={branding.primaryColour}
                    onChange={(e) => updateField('primaryColour', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="branding-secondaryColour" className="text-xs">Secondary Colour</Label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="color"
                    value={branding.secondaryColour}
                    onChange={(e) => updateField('secondaryColour', e.target.value)}
                    className="h-8 w-8 rounded border cursor-pointer"
                    aria-label="Secondary colour picker"
                  />
                  <Input
                    id="branding-secondaryColour"
                    value={branding.secondaryColour}
                    onChange={(e) => updateField('secondaryColour', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="branding-reportAccent" className="text-xs">Report Accent</Label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="color"
                    value={branding.reportAccent}
                    onChange={(e) => updateField('reportAccent', e.target.value)}
                    className="h-8 w-8 rounded border cursor-pointer"
                    aria-label="Report accent colour picker"
                  />
                  <Input
                    id="branding-reportAccent"
                    value={branding.reportAccent}
                    onChange={(e) => updateField('reportAccent', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="branding-senderName" className="text-xs">Sender Name</Label>
                <Input id="branding-senderName" value={branding.senderName} onChange={(e) => updateField('senderName', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="branding-replyToAddress" className="text-xs">Reply-to Address</Label>
                <Input id="branding-replyToAddress" value={branding.replyToAddress} onChange={(e) => updateField('replyToAddress', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="branding-website" className="text-xs">Website</Label>
                <Input id="branding-website" value={branding.website} onChange={(e) => updateField('website', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="branding-phone" className="text-xs">Phone</Label>
                <Input id="branding-phone" value={branding.phone} onChange={(e) => updateField('phone', e.target.value)} className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="branding-address" className="text-xs">Address</Label>
                <Input id="branding-address" value={branding.address} onChange={(e) => updateField('address', e.target.value)} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Legal & Currency */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Legal & Currency</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="branding-termsUrl" className="text-xs">Terms URL</Label>
                <Input id="branding-termsUrl" value={branding.termsUrl} onChange={(e) => updateField('termsUrl', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="branding-privacyUrl" className="text-xs">Privacy URL</Label>
                <Input id="branding-privacyUrl" value={branding.privacyUrl} onChange={(e) => updateField('privacyUrl', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="branding-currency" className="text-xs">Currency</Label>
                <Input id="branding-currency" value={branding.currency} onChange={(e) => updateField('currency', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="branding-taxLabel" className="text-xs">Tax Label</Label>
                <Input id="branding-taxLabel" value={branding.taxLabel} onChange={(e) => updateField('taxLabel', e.target.value)} className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="branding-reportFooter" className="text-xs">Report Footer</Label>
                <Input id="branding-reportFooter" value={branding.reportFooter} onChange={(e) => updateField('reportFooter', e.target.value)} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Report Preview */}
        <Card className="h-fit sticky top-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Live Report Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="rounded-md border bg-white overflow-hidden text-xs"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {/* Cover */}
              <div
                className="p-6 text-white text-center"
                style={{ backgroundColor: branding.primaryColour }}
              >
                <div
                  className="mx-auto mb-3 flex size-12 items-center justify-center rounded-md text-sm font-bold"
                  style={{ backgroundColor: branding.secondaryColour }}
                >
                  {branding.logoPlaceholder}
                </div>
                <h3 className="text-base font-bold">{branding.agencyName}</h3>
                <p className="mt-1 opacity-80">Digital Presence Audit Report</p>
                <p className="mt-0.5 opacity-60">Prepared for Client Name</p>
              </div>

              {/* Score section */}
              <div className="p-4">
                <h4 className="font-semibold text-[11px] mb-2">Score Overview</h4>
                <div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: branding.reportAccent + '20' }}
                >
                  <div
                    className="h-2 rounded-full"
                    style={{ width: '47%', backgroundColor: branding.reportAccent }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-gray-500">Overall Score: 47/100</p>
              </div>

              <div className="px-4 pb-2">
                <h4 className="font-semibold text-[11px] mb-1">Priority Finding</h4>
                <div className="rounded border p-2 text-[10px]">
                  <p className="font-medium">Missing ADA compliance on patient portal</p>
                  <p className="text-gray-500 mt-0.5">Critical · Accessibility</p>
                </div>
              </div>

              {/* Footer */}
              <div
                className="p-3 text-[9px] text-white/80"
                style={{ backgroundColor: branding.secondaryColour }}
              >
                <p>{branding.reportFooter}</p>
                <p className="mt-0.5">{branding.agencyName} · {branding.website}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
