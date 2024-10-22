import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getTypeById = async (id) => {
    const prisma = new PrismaClient();

    const type = await prisma.type.findUnique({
        where: { id: id },
        include: {
            movies: true,  // Include the related genre data
        },
    });

    if (!type) {
        throw new NotFoundError("Type", id);
    } else return type;
};

export default getTypeById;