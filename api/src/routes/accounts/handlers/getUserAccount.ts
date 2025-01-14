import { CommonQueryMethods } from "slonik";
import { getAccountById } from "../../../services/database/queries/accounts/getAccountById";
import { Account } from "../../../types/account";

interface GetUserAccountHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}
export const getUserAccountHandler = async ({
  database,
  userId,
}: GetUserAccountHandlerOptions): Promise<Account> => {
  const account = await getAccountById(database, { userId });
  return account;
};
