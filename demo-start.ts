import * as R from "remeda";
import * as T from "./types";
import {
  validateUser,
  formatUserName,
  updateUserId,
  convertUserToUserRecord,
  validateUserRecordSearchableNameLength,
  getSearchableName,
  toUpperCase,
} from "./helpers";

function main() {
  try {
    const user: T.User = { id: "123", name: "John" };

    const validUser = validateUser(user);
    const formattedUser = formatUserName(validUser);
    const updatedUser = updateUserId(formattedUser);
    const userRecord = convertUserToUserRecord(updatedUser);
    const validUserRecord = validateUserRecordSearchableNameLength(userRecord);
    const searchableName = getSearchableName(validUserRecord);
    const result = toUpperCase(searchableName);

    console.log(result);

    // TODO: We'll get here later
    const users = [
      { id: "123", name: "John" },
      { id: "456", name: "Jane" },
      { id: "789", name: "Jin" },
    ];
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
// alt();
