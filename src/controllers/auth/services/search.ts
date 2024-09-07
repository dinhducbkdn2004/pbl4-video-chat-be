import userModel from "../../../models/user.model";

const searchUsersAndGroups = async (searchQuery: string) => {
  const searchRegex = new RegExp(searchQuery, "i");

  const users = await userModel.find(
    { "account.name": searchRegex },
    "account.name email"
  );

  return { users };
};

export default searchUsersAndGroups;
