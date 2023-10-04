import { prisma } from '../../../db';

export async function createUserModel(_nickName: string, _email: string, _password: string)  {
    
    const user = await prisma.user.create({
        data: {
            name: _nickName,
            email: _email,
            password: _password
        }
    });

    return user;
}

export async function findUserByModelEmail(_email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: _email
        }
    });

    return user;
}

export async function findUserByModelNickNmae(_nickName: string) {
    const user = await prisma.user.findUnique({
        where: {
            nickName: _nickName
        }
    });
    
    return user;
}