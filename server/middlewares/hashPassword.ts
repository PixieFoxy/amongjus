import * as bcrypt from 'bcrypt';

async function hashPassword(plaintext: string) {
    const SALT_ROUNDS = 10;
    return await bcrypt.hash(plaintext, SALT_ROUNDS);
}

export { hashPassword } ;