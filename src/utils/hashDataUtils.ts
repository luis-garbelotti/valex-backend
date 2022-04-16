import bcrypt from 'bcrypt';

export function hashData(data: string): string {
    const dataHashed = bcrypt.hashSync(data, 10);

    return dataHashed;
}

