import bcrypt from "bcrypt";
const saltRounds: number = 10;

export const hashPassword = (password: string): string => {
  const salt: string = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string): boolean =>
  bcrypt.compareSync(plain, hashed);
