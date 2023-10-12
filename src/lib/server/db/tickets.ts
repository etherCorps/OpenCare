import {prisma} from "../PrismaClient";

export async function getUserTickets(keyId: string, keyField: string) {
    const data = {
        where: {
            [keyField]: keyId
        },
    };

    return await prisma.tickets.findMany(data as any)
}

export async function getProjectTickets(projectId: any) {
    return await prisma.tickets.findMany({
        where: {
            assignedTo: projectId
        }
    })
}

export async function ticketsGroupByStatus (keyId: string, keyField: string) {
    const data = {
        where: {
            [keyField]: keyId
        },
    };
    return await prisma.tickets.groupBy({
        by: ['bugStatus'],
        where: data.where,
        _count:{
            _all: true,
        },
    })
}
