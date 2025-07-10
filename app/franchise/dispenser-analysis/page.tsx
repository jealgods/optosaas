"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { branches, getUsersByFranchise } from "@/lib/mock-data";
import { addDays } from "date-fns";

export default function DispenserAnalysisPage() {
  // In a real app, this would come from authentication
  const franchiseId = 1;
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [selectedDispenserId, setSelectedDispenserId] = useState<number | null>(
    null
  );
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: new Date(2025, 5, 1), // June 1, 2025
    to: addDays(new Date(2025, 5, 1), 1), // June 2, 2025
  });

  const franchiseUsers = getUsersByFranchise(franchiseId);
  const dispensers = franchiseUsers.filter((user) => user.isDispenser);

  // Filter dispensers by selected branch
  const filteredDispensers = selectedBranchId
    ? dispensers.filter((user) => user.branchAccess.includes(selectedBranchId))
    : dispensers;

  // Mock analytics data - in real app this would come from API
  const mockAnalytics = {
    conversion: {
      sameDayConv: 50.0,
      totalInternalConv: 50.0,
      totalOverallConv: 50.0,
    },
    revenue: {
      dispenseRevenue: 420.0,
      perDispense: 210.0,
      totalRevenue: 530.0,
      rpt: 132.5,
    },
    services: {
      extraPairs: 0.0,
      handoversTaken: 57.1,
      glassesCover: 50.0,
      octBooked: 0.0,
    },
    productBreakdown: {
      lensBrand: [
        { type: "Boots", count: 1, percent: 50 },
        { type: "Essi", count: 0, percent: 0 },
        { type: "Zeiss", count: 1, percent: 50 },
        { type: "Norv", count: 0, percent: 0 },
        { type: "Corp", count: 0, percent: 0 },
      ],
      lensIndex: [
        { type: "Stand", count: 1, percent: 50 },
        { type: "Thin", count: 0, percent: 0 },
        { type: "Ultra", count: 1, percent: 50 },
        { type: "Ultra+", count: 0, percent: 0 },
      ],
      visionType: [
        { type: "Single Vision", count: 2, percent: 100.0 },
        { type: "Varifocal", count: 0, percent: 0.0 },
        { type: "Bifocal", count: 0, percent: 0.0 },
        { type: "Office", count: 0, percent: 0.0 },
      ],
    },
    additionalServices: {
      extraPairs: { qty: 0, percent: 0.0 },
      handoversTaken: { qty: 4, percent: 57.1 },
      glassesCover: { qty: 1, percent: 50.0 },
      octBooked: { qty: 0, percent: 0.0 },
      lensFinishUpgrades: {
        protectPlus: { qty: 1, percent: 100 },
        uvBlue: { qty: 0, percent: 0 },
      },
      sunUpgrades: {
        transition: { qty: 0, percent: 0 },
        polarised: { qty: 0, percent: 0 },
      },
    },
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Dispenser Analysis
        </h1>
        <p className="text-muted-foreground">
          Performance analytics for dispensers
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white/80 rounded-xl shadow-sm p-6 mb-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Branch
            </label>
            <Select
              value={selectedBranchId?.toString() || "all"}
              onValueChange={(value) => {
                setSelectedBranchId(value === "all" ? null : parseInt(value));
                setSelectedDispenserId(null);
              }}
            >
              <SelectTrigger className="h-10 w-full bg-white">
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
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Dispenser
            </label>
            <Select
              value={selectedDispenserId?.toString() || "all"}
              onValueChange={(value) =>
                setSelectedDispenserId(value === "all" ? null : parseInt(value))
              }
            >
              <SelectTrigger className="h-10 w-full bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dispensers</SelectItem>
                {filteredDispensers.map((dispenser) => (
                  <SelectItem
                    key={dispenser.id}
                    value={dispenser.id.toString()}
                  >
                    {dispenser.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Period
            </label>
            <DateRangePicker
              value={dateRange}
              onChange={(range) =>
                setDateRange(range || { from: undefined, to: undefined })
              }
              placeholder="Select date range"
              className="h-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Key Metrics - 10 tiles grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              £{mockAnalytics.revenue.dispenseRevenue}
            </div>
            <div className="text-xs text-muted-foreground">
              Dispense Revenue
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              £{mockAnalytics.revenue.perDispense}
            </div>
            <div className="text-xs text-muted-foreground">£ per Dispense</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.conversion.sameDayConv}%
            </div>
            <div className="text-xs text-muted-foreground">
              Same Day Conversion
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.conversion.totalInternalConv}%
            </div>
            <div className="text-xs text-muted-foreground">
              Total Internal Conversion
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.conversion.totalOverallConv}%
            </div>
            <div className="text-xs text-muted-foreground">
              Total Overall Conversion
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.services.extraPairs}%
            </div>
            <div className="text-xs text-muted-foreground">Extra Pairs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.services.handoversTaken}%
            </div>
            <div className="text-xs text-muted-foreground">Handovers Taken</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.services.glassesCover}%
            </div>
            <div className="text-xs text-muted-foreground">Glasses Cover</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.services.octBooked}%
            </div>
            <div className="text-xs text-muted-foreground">
              OCT (Booked in store)
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              £{mockAnalytics.revenue.totalRevenue}
            </div>
            <div className="text-xs text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* RPT as a separate row */}
      <div className="grid grid-cols-1">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              £{mockAnalytics.revenue.rpt}
            </div>
            <div className="text-xs text-muted-foreground">RPT</div>
          </CardContent>
        </Card>
      </div>

      {/* Product Breakdown - Hidden for now */}
      {/* <section className="space-y-6" aria-labelledby="product-heading">
        <h2 id="product-heading" className="text-xl font-semibold">
          Product Breakdown
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductGrid 
            title="LENS BRAND SPLIT"
            products={mockAnalytics.productBreakdown.lensBrand}
          />
          <ProductGrid 
            title="LENS INDEX SPLIT"
            products={mockAnalytics.productBreakdown.lensIndex}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-sm">VISION TYPE SPLIT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockAnalytics.productBreakdown.visionType.map((type, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs font-medium mb-1">{type.type}</div>
                  <div className="text-sm font-bold">{type.count}</div>
                  <div className="text-xs text-muted-foreground">{type.percent}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section> */}

      {/* Additional Services - Hidden for now */}
      {/* <section className="space-y-6" aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-xl font-semibold">
          Additional Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="EXTRA PAIRS" 
            value={`Qty: ${mockAnalytics.additionalServices.extraPairs.qty} (${mockAnalytics.additionalServices.extraPairs.percent}%)`} 
          />
          <MetricCard 
            title="HANDOVERS TAKEN" 
            value={`${mockAnalytics.additionalServices.handoversTaken.qty} (${mockAnalytics.additionalServices.handoversTaken.percent}%)`} 
          />
          <MetricCard 
            title="GLASSES COVER" 
            value={`${mockAnalytics.additionalServices.glassesCover.qty} (${mockAnalytics.additionalServices.glassesCover.percent}%)`} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="OCT (BOOKED)" 
            value={`${mockAnalytics.additionalServices.octBooked.qty} (${mockAnalytics.additionalServices.octBooked.percent}%)`} 
          />
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2">LENS FINISH UPGRADES</div>
              <div className="space-y-1">
                <div className="text-sm">Protect+: {mockAnalytics.additionalServices.lensFinishUpgrades.protectPlus.qty} ({mockAnalytics.additionalServices.lensFinishUpgrades.protectPlus.percent}%)</div>
                <div className="text-sm">UV Blue: {mockAnalytics.additionalServices.lensFinishUpgrades.uvBlue.qty} ({mockAnalytics.additionalServices.lensFinishUpgrades.uvBlue.percent}%)</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2">SUN UPGRADES</div>
              <div className="space-y-1">
                <div className="text-sm">Transition: {mockAnalytics.additionalServices.sunUpgrades.transition.qty} ({mockAnalytics.additionalServices.sunUpgrades.transition.percent}%)</div>
                <div className="text-sm">Polarised: {mockAnalytics.additionalServices.sunUpgrades.polarised.qty} ({mockAnalytics.additionalServices.sunUpgrades.polarised.percent}%)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section> */}
    </div>
  );
}
