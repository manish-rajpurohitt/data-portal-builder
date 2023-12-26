
const getUserByEmail = async (email) => {
  const userDoc = await DbFactory.get(db.user, { where: { email: email } });
  return userDoc;
};

const getUser = async (id) => {
  const userDoc = await DbFactory.get(db.user, { where: { id: id } });
  return userDoc;
};


const getUserByToken = async (token) => {
  const userDoc = await DbFactory.get(db.user, { where: { token: token } });
  return userDoc;
};

const createUser = async (user) => {
  return await DbFactory.create(db.user, user);
};

const updateUserByEmail = async (email, updatedUser) => {
  return await DbFactory.update(db.user, updatedUser, {
    where: { email: email },
  });
};

const updateUserByToken = async (token, updatedUser) => {
  return await DbFactory.update(db.user, updatedUser, {
    where: { token: token },
  });
};

const deleteUser = async (email) => {
  await DbFactory.deleteRecord(db.user, { where: { email: email } });
};

export default {
  getUserByEmail,
  getUserByToken,
  updateUserByEmail,
  updateUserByToken,
  deleteUser,
  createUser,
  getUser
};