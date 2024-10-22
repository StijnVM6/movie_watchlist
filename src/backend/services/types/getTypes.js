import { PrismaClient } from "@prisma/client";

const getTypes = async () => {
    const prisma = new PrismaClient();
    const types = await prisma.type.findMany({
        include: {
            movies: true,  // Include the related genre data
        },
    });

    if (types.count <= 0) return null;
    else return types;
};

export default getTypes;