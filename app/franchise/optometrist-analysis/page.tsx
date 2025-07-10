"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { branches, getUsersByFranchise } from "@/lib/mock-data";
import { addDays } from "date-fns";

export default function OptometristAnalysisPage() {
  // In a real app, this would come from authentication
  const franchiseId = 1;
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [selectedOptometristId, setSelectedOptometristId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to?: Date | undefined}>({
    from: new Date(2025, 5, 1), // June 1, 2025
    to: addDays(new Date(2025, 5, 1), 1) // June 2, 2025
  });

  const franchiseUsers = getUsersByFranchise(franchiseId);
  const optometrists = franchiseUsers.filter(user => user.isOptometrist);

  // Filter optometrists by selected branch
  const filteredOptometrists = selectedBranchId 
    ? optometrists.filter(user => user.branchAccess.includes(selectedBranchId))
    : optometrists;

  // Get selected optometrist
  const selectedOptometrist = selectedOptometristId 
    ? optometrists.find(user => user.id === selectedOptometristId)
    : null;

  // Mock analytics data - in real app this would come from API
  const mockAnalytics = {
    conversion: {
      sameDayConv: 100.0,
      overallConv: 200.0,
      discussedCLsAtEE: 100.0,
      bookedTrialAfterEE: 100.0
    },
    revenue: {
      totalDispenseRev: 280,
      avgPerDispense: 140,
      totalAppointmentRev: 340,
      rpt: 340
    },
    clinicalOutcomes: {
      eyeCheck: {
        noRx: { count: 0, percent: 0 },
        stable: { count: 0, percent: 0 },
        change: { count: 1, percent: 100 },
        refer: { count: 0, percent: 0 },
        dilate: { count: 0, percent: 0 }
      },
      clCheck: {
        allOk: { count: 0, percent: 0 },
        tryNew: { count: 0, percent: 0 },
        upgrade: { count: 0, percent: 0 },
        cash: { count: 0, percent: 0 },
        furtherAptRequired: { count: 0, percent: 0 },
        sightTestRequired: { count: 0, percent: 0 },
        changeInRx: { count: 0, percent: 0 }
      },
      clTrial: {
        signed: { count: 0, percent: 0 },
        trial: { count: 0, percent: 0 },
        cash: { count: 0, percent: 0 },
        unsuitable: { count: 0, percent: 0 },
        joinedCarePlan: { count: 0, percent: 0 }
      },
      rechecks: {
        allOk: { count: 0, percent: 0 },
        remake: { count: 0, percent: 0 }
      }
    },
    productBreakdown: {
      lensIndex: [
        { type: "1.5", count: 2, percent: 100 },
        { type: "1.6", count: 0, percent: 0 },
        { type: "1.67", count: 0, percent: 0 },
        { type: "1.74", count: 0, percent: 0 }
      ],
      visionType: [
        { type: "Single Vision", count: 1, percent: 50 },
        { type: "Varifocal", count: 0, percent: 0 },
        { type: "Bifocal", count: 0, percent: 0 },
        { type: "Office", count: 1, percent: 50 }
      ],
      brandSplit: [
        { type: "Boots", count: 1, percent: 50 },
        { type: "Essilor", count: 0, percent: 0 },
        { type: "Zeiss", count: 1, percent: 50 },
        { type: "Norville", count: 0, percent: 0 }
      ]
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Optometrist Analysis</h1>
        <p className="text-muted-foreground">Performance analytics for optometrists</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="space-y-1">
          <label className="text-xs font-medium block">Branch</label>
          <Select value={selectedBranchId?.toString() || "all"} onValueChange={(value) => {
            setSelectedBranchId(value === "all" ? null : parseInt(value));
            setSelectedOptometristId(null);
          }}>
            <SelectTrigger className="h-8 bg-white w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id.toString()}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-medium block">Optometrist</label>
          <Select value={selectedOptometristId?.toString() || "all"} onValueChange={(value) => 
            setSelectedOptometristId(value === "all" ? null : parseInt(value))
          }>
            <SelectTrigger className="h-8 bg-white w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Optometrists</SelectItem>
              {filteredOptometrists.map((optometrist) => (
                <SelectItem key={optometrist.id} value={optometrist.id.toString()}>
                  {optometrist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium block">Period</label>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select date range"
            className="h-8 w-64"
          />
        </div>
      </div>

      {/* Key Metrics - 8 tiles in 4x2 grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{mockAnalytics.conversion.sameDayConv}%</div>
            <div className="text-xs text-muted-foreground">Same Day Conversion</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{mockAnalytics.conversion.overallConv}%</div>
            <div className="text-xs text-muted-foreground">Overall Conversion</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">£{mockAnalytics.revenue.totalDispenseRev}</div>
            <div className="text-xs text-muted-foreground">Total Dispense Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">£{mockAnalytics.revenue.avgPerDispense}</div>
            <div className="text-xs text-muted-foreground">Average £ per Dispense</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{mockAnalytics.conversion.discussedCLsAtEE}%</div>
            <div className="text-xs text-muted-foreground">Discussed CL's @ EE</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{mockAnalytics.conversion.bookedTrialAfterEE}%</div>
            <div className="text-xs text-muted-foreground">Booked Trial After EE</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">£{mockAnalytics.revenue.totalAppointmentRev}</div>
            <div className="text-xs text-muted-foreground">Total Appointment Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">£{mockAnalytics.revenue.rpt}</div>
            <div className="text-xs text-muted-foreground">RPT</div>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Outcomes - 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Eye Check Outcomes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Eye Check Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="grid grid-cols-5 gap-2 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-2">No Rx</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.eyeCheck.noRx.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.eyeCheck.noRx.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Stable</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.eyeCheck.stable.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.eyeCheck.stable.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Change</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.eyeCheck.change.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.eyeCheck.change.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Referred</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.eyeCheck.refer.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.eyeCheck.refer.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Dilation</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.eyeCheck.dilate.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.eyeCheck.dilate.percent}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CL Check Outcomes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">CL Check Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-2">All OK</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clCheck.allOk.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clCheck.allOk.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Try New</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clCheck.tryNew.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clCheck.tryNew.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Upgrade</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clCheck.upgrade.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clCheck.upgrade.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Cash Sale</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clCheck.cash.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clCheck.cash.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Further Apt</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clCheck.furtherAptRequired.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clCheck.furtherAptRequired.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Sight Test</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clCheck.sightTestRequired.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clCheck.sightTestRequired.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Change in Rx</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clCheck.changeInRx.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clCheck.changeInRx.percent}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Clinical Outcomes - 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* CL Trial Outcomes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">CL Trial Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-2">Signed Up</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clTrial.signed.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clTrial.signed.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Trial Return</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clTrial.trial.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clTrial.trial.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Cash Sale</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clTrial.cash.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clTrial.cash.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Unsuitable</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clTrial.unsuitable.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clTrial.unsuitable.percent}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Joined Care Plan</div>
                <div className="text-lg font-semibold">{mockAnalytics.clinicalOutcomes.clTrial.joinedCarePlan.count}</div>
                <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.clTrial.joinedCarePlan.percent}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right side - split into 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          {/* CORRS/CUES */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Medical Emergency</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Referred</div>
                  <div className="text-sm font-semibold">0</div>
                  <div className="text-xs text-muted-foreground">0.0%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Dilation</div>
                  <div className="text-sm font-semibold">0</div>
                  <div className="text-xs text-muted-foreground">0.0%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Discharged</div>
                  <div className="text-sm font-semibold">0</div>
                  <div className="text-xs text-muted-foreground">0.0%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rechecks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Rechecks</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">All OK</div>
                  <div className="text-sm font-semibold">{mockAnalytics.clinicalOutcomes.rechecks.allOk.count}</div>
                  <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.rechecks.allOk.percent}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Remake</div>
                  <div className="text-sm font-semibold">{mockAnalytics.clinicalOutcomes.rechecks.remake.count}</div>
                  <div className="text-xs text-muted-foreground">{mockAnalytics.clinicalOutcomes.rechecks.remake.percent}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Breakdown - Horizontal */}
      {/* <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Product Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-medium mb-2">Lens Index</div>
              <div className="space-y-1">
                {mockAnalytics.productBreakdown.lensIndex.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span>{item.type}</span>
                    <span className="font-medium">{item.count} ({item.percent}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-2">Vision Type</div>
              <div className="space-y-1">
                {mockAnalytics.productBreakdown.visionType.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span>{item.type}</span>
                    <span className="font-medium">{item.count} ({item.percent}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-2">Brand Split</div>
              <div className="space-y-1">
                {mockAnalytics.productBreakdown.brandSplit.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span>{item.type}</span>
                    <span className="font-medium">{item.count} ({item.percent}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}