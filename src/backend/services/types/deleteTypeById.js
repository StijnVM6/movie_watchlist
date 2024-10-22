import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteTypeById = async (id) => {
    const prisma = new PrismaClient();

    const type = await prisma.type.deleteMany({
        where: { id: id }
    });

    if (type.count <= 0) {
        throw new NotFoundError("Type", id);
    } else return id;
};

export default deleteTypeById;