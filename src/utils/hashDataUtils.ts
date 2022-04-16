import bcrypt from 'bcrypt';

export function hashData(data: string): string {
    const dataHashed = bcrypt.hashSync(data, 10);

    return dataHashed;
}

export function compareHashData(data: string, dataHashed: string): boolean {
    const dataCompared = bcrypt.compareSync(data, dataHashed);

    return dataCompared
}