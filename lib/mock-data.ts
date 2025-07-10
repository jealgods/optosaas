import { User, Branch, Franchise } from "./types";

export const franchises: Franchise[] = [
  { id: 1, name: "VisionCare Opticians" },
  { id: 2, name: "EyeCare Plus" },
  { id: 3, name: "ClearSight Optometry" }
];

export const franchise: Franchise = {
  id: 1,
  name: "VisionCare Opticians"
};

export const branches: Branch[] = [
  { id: 1, name: "Downtown Branch" },
  { id: 2, name: "Mall Branch" },
  { id: 3, name: "North Side Branch" }
];

export const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    role: "super_admin",
    email: "admin@optosaas.com",
    branchAccess: [],
    isDispenser: false,
    status: "active"
  },
  {
    id: 2,
    name: "John Smith",
    role: "owner",
    email: "john@visioncare.com",
    franchiseId: 1,
    branchAccess: [1, 2, 3],
    isDispenser: false,
    status: "active"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "manager",
    email: "sarah@visioncare.com",
    franchiseId: 1,
    branchAccess: [1],
    isDispenser: false,
    status: "active"
  },
  {
    id: 4,
    name: "Mike Davis",
    role: "staff",
    email: "mike@visioncare.com",
    franchiseId: 1,
    branchAccess: [1, 2],
    isDispenser: false,
    status: "active"
  },
  {
    id: 5,
    name: "Lisa Chen",
    role: "staff",
    email: "lisa@visioncare.com",
    franchiseId: 1,
    branchAccess: [2],
    isDispenser: true,
    status: "active"
  },
  {
    id: 6,
    name: "Tom Wilson",
    role: "staff",
    email: "tom@visioncare.com",
    franchiseId: 1,
    branchAccess: [3],
    isDispenser: true,
    status: "inactive"
  },
  {
    id: 7,
    name: "Dr. Emily Rodriguez",
    role: "staff",
    email: "emily@visioncare.com",
    franchiseId: 1,
    branchAccess: [1],
    isDispenser: false,
    isOptometrist: true,
    status: "active"
  },
  {
    id: 8,
    name: "Dr. James Parker",
    role: "staff",
    email: "james@visioncare.com",
    franchiseId: 1,
    branchAccess: [1, 2],
    isDispenser: false,
    isOptometrist: true,
    status: "active"
  },
  {
    id: 9,
    name: "Dr. Amanda Foster",
    role: "staff",
    email: "amanda@visioncare.com",
    franchiseId: 1,
    branchAccess: [2],
    isDispenser: false,
    isOptometrist: true,
    status: "active"
  },
  {
    id: 10,
    name: "Dr. Robert Kim",
    role: "staff",
    email: "robert@visioncare.com",
    franchiseId: 1,
    branchAccess: [3],
    isDispenser: false,
    isOptometrist: true,
    status: "inactive"
  },
  {
    id: 11,
    name: "Dr. Michelle Thompson",
    role: "staff",
    email: "michelle@visioncare.com",
    franchiseId: 1,
    branchAccess: [1, 3],
    isDispenser: false,
    isOptometrist: true,
    status: "active"
  },
  {
    id: 12,
    name: "Lisa Chen",
    role: "staff",
    email: "lisa@visioncare.com",
    franchiseId: 1,
    branchAccess: [1],
    isDispenser: true,
    status: "active"
  },
  {
    id: 13,
    name: "David Martinez",
    role: "staff",
    email: "david@visioncare.com",
    franchiseId: 1,
    branchAccess: [2],
    isDispenser: true,
    status: "active"
  },
  {
    id: 14,
    name: "Sophie Turner",
    role: "staff",
    email: "sophie@visioncare.com",
    franchiseId: 1,
    branchAccess: [3],
    isDispenser: true,
    status: "active"
  },
  {
    id: 15,
    name: "Alex Johnson",
    role: "staff",
    email: "alex@visioncare.com",
    franchiseId: 1,
    branchAccess: [1, 2],
    isDispenser: true,
    status: "active"
  },
  {
    id: 16,
    name: "Rachel Green",
    role: "staff",
    email: "rachel@visioncare.com",
    franchiseId: 1,
    branchAccess: [2, 3],
    isDispenser: true,
    status: "active"
  },
  {
    id: 17,
    name: "Michael Scott",
    role: "staff",
    email: "michael@visioncare.com",
    franchiseId: 1,
    branchAccess: [1],
    isDispenser: true,
    status: "active"
  },
  {
    id: 20,
    name: "Dr. Nathan Williams",
    role: "staff",
    email: "nathan@visioncare.com",
    franchiseId: 1,
    branchAccess: [1, 2],
    isDispenser: false,
    isOptometrist: true,
    status: "active"
  },
  {
    id: 21,
    name: "Dr. Olivia Martinez",
    role: "staff",
    email: "olivia@visioncare.com",
    franchiseId: 1,
    branchAccess: [2, 3],
    isDispenser: false,
    isOptometrist: true,
    status: "active"
  },
  {
    id: 22,
    name: "Dr. Daniel Lee",
    role: "staff",
    email: "daniel@visioncare.com",
    franchiseId: 1,
    branchAccess: [1],
    isDispenser: false,
    isOptometrist: true,
    status: "active"
  }
];

export function getUsersByFranchise(franchiseId: number): User[] {
  return users.filter(user => user.franchiseId === franchiseId);
}

export function getBranchNames(branchIds: number[]): string {
  return branchIds
    .map(id => branches.find(branch => branch.id === id)?.name)
    .filter(Boolean)
    .join(", ");
}

export function getFranchiseOwners(): User[] {
  return users.filter(user => user.role === "owner");
}