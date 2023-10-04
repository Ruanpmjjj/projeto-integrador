import { prisma } from '../../../db';

export async function createUserModel(_nickName: string, _email: string, _password: string)  {
    
    const user = await prisma.user.create({
        data: {
            nickName: _nickName,
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

export async function findUserByModelNickName(_nickName: string) {
    const user = await prisma.user.findUnique({
        where: {
            nickName: _nickName
        }
    });
    
    return user;
}

export async function findUserByModelLoginByEmail(_email: string, _password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: _email,
            password: _password
        }
    });
    
    return user;
}

export async function findUserByModelLoginByNickName(_nickName:string, _password: string) {
    const user = await prisma.user.findUnique({
        where: {
            nickName: _nickName,
            password: _password
        }
    })
    
    return user
}