"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { branches, getUsersByFranchise } from "@/lib/mock-data";
import { User } from "@/lib/types";
import { addDays } from "date-fns";

export default function DashboardPage() {
  // In a real app, this would come from authentication
  const franchiseId = 1;
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to?: Date | undefined}>({
    from: new Date(2025, 5, 1), // June 1, 2025
    to: addDays(new Date(2025, 5, 1), 1) // June 2, 2025
  });

  const franchiseUsers = getUsersByFranchise(franchiseId);
  const optometrists = franchiseUsers.filter(user => user.isOptometrist);
  const dispensers = franchiseUsers.filter(user => user.isDispenser);

  // Filter by selected branch if one is selected
  const filteredOptometrists = selectedBranchId 
    ? optometrists.filter(user => user.branchAccess.includes(selectedBranchId))
    : optometrists;
  
  const filteredDispensers = selectedBranchId
    ? dispensers.filter(user => user.branchAccess.includes(selectedBranchId))
    : dispensers;

  // Mock performance data - in real app this would come from analytics API
  const getOptometristPerformance = (userId: number) => {
    const performances = {
      7: { sameDayPercent: 100.0, overallPercent: 200.0 }, // Dr. Emily Rodriguez
      8: { sameDayPercent: 50.0, overallPercent: 50.0 },   // Dr. James Parker
      9: { sameDayPercent: 33.3, overallPercent: 33.3 },   // Dr. Amanda Foster
      10: { sameDayPercent: 0.0, overallPercent: 0.0 },    // Dr. Robert Kim
      11: { sameDayPercent: 0.0, overallPercent: 0.0 },    // Dr. Michelle Thompson
    };
    return performances[userId as keyof typeof performances] || { sameDayPercent: 0, overallPercent: 0 };
  };

  const getDispenserPerformance = (userId: number) => {
    const performances = {
      5: { octCrPercent: 100.0 }, // Lisa Chen
      6: { octCrPercent: 66.7 },  // Tom Wilson
    };
    return performances[userId as keyof typeof performances] || { octCrPercent: 0 };
  };

  // RPT (Revenue Per Test) performance data
  const getOptometristRPT = (userId: number) => {
    const rptData = {
      7: { rpt: 340.00, tests: 15 }, // Dr. Emily Rodriguez
      8: { rpt: 275.50, tests: 12 }, // Dr. James Parker
      9: { rpt: 198.75, tests: 8 },  // Dr. Amanda Foster
      10: { rpt: 165.00, tests: 6 }, // Dr. Robert Kim
      11: { rpt: 134.25, tests: 4 }, // Dr. Michelle Thompson
    };
    return rptData[userId as keyof typeof rptData] || { rpt: 0, tests: 0 };
  };

  const getDispenserRPT = (userId: number) => {
    const rptData = {
      5: { rpt: 185.50, tests: 12 }, // Lisa Chen
      6: { rpt: 142.30, tests: 8 },  // Tom Wilson
      13: { rpt: 126.75, tests: 6 }, // David Martinez
      14: { rpt: 98.20, tests: 4 },  // Sophie Turner
      15: { rpt: 87.50, tests: 3 },  // Alex Johnson
    };
    return rptData[userId as keyof typeof rptData] || { rpt: 0, tests: 0 };
  };

  // Sort by performance
  const sortedOptometrists = [...filteredOptometrists].sort((a, b) => {
    const aPerf = getOptometristPerformance(a.id);
    const bPerf = getOptometristPerformance(b.id);
    return bPerf.sameDayPercent - aPerf.sameDayPercent;
  });

  const sortedDispensers = [...filteredDispensers].sort((a, b) => {
    const aPerf = getDispenserPerformance(a.id);
    const bPerf = getDispenserPerformance(b.id);
    return bPerf.octCrPercent - aPerf.octCrPercent;
  });

  // Sort by RPT performance
  const sortedOptometristsRPT = [...filteredOptometrists].sort((a, b) => {
    const aRPT = getOptometristRPT(a.id);
    const bRPT = getOptometristRPT(b.id);
    return bRPT.rpt - aRPT.rpt;
  });

  const sortedDispensersRPT = [...filteredDispensers].sort((a, b) => {
    const aRPT = getDispenserRPT(a.id);
    const bRPT = getDispenserRPT(b.id);
    return bRPT.rpt - aRPT.rpt;
  });

  // Calculate average RPT
  const avgOptometristRPT = sortedOptometristsRPT.length > 0 
    ? sortedOptometristsRPT.reduce((sum, opt) => sum + getOptometristRPT(opt.id).rpt, 0) / sortedOptometristsRPT.length
    : 0;

  const avgDispenserRPT = sortedDispensersRPT.length > 0
    ? sortedDispensersRPT.reduce((sum, disp) => sum + getDispenserRPT(disp.id).rpt, 0) / sortedDispensersRPT.length
    : 0;

  // Helper function for ranking display
  const getRankDisplay = (index: number) => {
    return (index + 1).toString();
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Sales Performance Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track and analyze your team's performance metrics
        </p>
      </header>

      {/* Filters */}
      <section className="space-y-4" aria-label="Dashboard filters">
        <h2 className="sr-only">Filter Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="branch-select" className="text-sm font-medium">
              Branch:
            </label>
            <Select 
              value={selectedBranchId?.toString() || "all"} 
              onValueChange={(value) => setSelectedBranchId(value === "all" ? null : parseInt(value))}
            >
              <SelectTrigger className="w-full" id="branch-select">
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
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Period:
            </label>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Standard Performance Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Optometrist Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Optometrist Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <caption className="sr-only">
                  Optometrist performance ranking showing same day and overall conversion rates
                </caption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12" scope="col">Rank</TableHead>
                    <TableHead scope="col">Optometrist</TableHead>
                    <TableHead className="text-right" scope="col">Same Day</TableHead>
                    <TableHead className="text-right" scope="col">Overall</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOptometrists.map((optometrist, index) => {
                    const performance = getOptometristPerformance(optometrist.id);
                    return (
                      <TableRow key={optometrist.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{optometrist.name}</TableCell>
                        <TableCell className="text-right">{performance.sameDayPercent.toFixed(1)}%</TableCell>
                        <TableCell className="text-right">{performance.overallPercent.toFixed(1)}%</TableCell>
                      </TableRow>
                    );
                  })}
                  {sortedOptometrists.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No optometrists found for selected branch
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dispenser Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Dispenser Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <caption className="sr-only">
                  Dispenser performance ranking showing OCT conversion rates
                </caption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12" scope="col">Rank</TableHead>
                    <TableHead scope="col">Dispenser</TableHead>
                    <TableHead className="text-right" scope="col">OCT CR%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedDispensers.map((dispenser, index) => {
                    const performance = getDispenserPerformance(dispenser.id);
                    return (
                      <TableRow key={dispenser.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{dispenser.name}</TableCell>
                        <TableCell className="text-right">{performance.octCrPercent.toFixed(1)}%</TableCell>
                      </TableRow>
                    );
                  })}
                  {sortedDispensers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No dispensers found for selected branch
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RPT Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Optometrist RPT Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Optometrist RPT Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <caption className="sr-only">
                  Optometrist revenue per test ranking
                </caption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12" scope="col">Rank</TableHead>
                    <TableHead scope="col">Optometrist</TableHead>
                    <TableHead className="text-right" scope="col">RPT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOptometristsRPT.map((optometrist, index) => {
                    const rptData = getOptometristRPT(optometrist.id);
                    return (
                      <TableRow key={optometrist.id}>
                        <TableCell className="font-medium">
                          {getRankDisplay(index)}
                        </TableCell>
                        <TableCell>{optometrist.name}</TableCell>
                        <TableCell className="text-right font-medium">£{rptData.rpt.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {sortedOptometristsRPT.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No optometrists found for selected branch
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {sortedOptometristsRPT.length > 0 && (
                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                  Team Avg: £{avgOptometristRPT.toFixed(2)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dispenser RPT Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Dispenser RPT Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <caption className="sr-only">
                  Dispenser revenue per test ranking
                </caption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12" scope="col">Rank</TableHead>
                    <TableHead scope="col">Dispenser</TableHead>
                    <TableHead className="text-right" scope="col">RPT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedDispensersRPT.map((dispenser, index) => {
                    const rptData = getDispenserRPT(dispenser.id);
                    return (
                      <TableRow key={dispenser.id}>
                        <TableCell className="font-medium">
                          {getRankDisplay(index)}
                        </TableCell>
                        <TableCell>{dispenser.name}</TableCell>
                        <TableCell className="text-right font-medium">£{rptData.rpt.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {sortedDispensersRPT.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No dispensers found for selected branch
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {sortedDispensersRPT.length > 0 && (
                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                  Team Avg: £{avgDispenserRPT.toFixed(2)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}