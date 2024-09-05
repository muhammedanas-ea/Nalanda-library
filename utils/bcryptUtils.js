import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (securePassword, password) => {
  try {
    return await bcrypt.compare(securePassword, password);
  } catch (error) {
    console.log(error);
  }
};
