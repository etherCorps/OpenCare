export type memberType = 'Admin' | 'Member' | 'Client';
export type userType = 'Admin' | 'Member';

export interface Ticket {
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    priority: Priority
    status: Status
    createdBy: string
    assignedTo: string
    managedBy: string
}

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
export type Status = 'New' | 'In Progress' | 'On Hold' | 'Testing' | 'Testing Failed' | 'Cancelled'|  'Fixed' | 'Not Fixed' | 'Closed'
