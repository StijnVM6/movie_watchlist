import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const login = async (username, password) => {
    const prisma = new PrismaClient();
    const secretKey = process.env.AUTH_SECRET_KEY;

    const user = await prisma.user.findFirst({
        where: {
            username: username, password: password
        }
    });

    // Compare the provided password with the hashed one in the database
    // import bcrypt from 'bcrypt';
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //     return res.status(400).json({ message: "Invalid credentials" });
    // }

    if (!user) {
        return null;
    } else {
        const token = jwt.sign({ userId: user.id }, secretKey, {
            expiresIn: "24h"
        });
        return token;
    }
}

export default login;
