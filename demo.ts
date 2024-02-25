import * as R from "remeda";
import { User, UserRecord } from "./types";
import {
  validateUser,
  formatUserName,
  updateUserId,
  convertUserToUserRecord,
  validateUserRecordSearchableNameLength,
  getSearchableName,
  capitalize,
  uppercaseLastLetter,
  reverseString,
} from "./helpers-either";
import { wrap } from "@okeeffed/eitherify";

const flow = (user: User) =>
  R.pipe(
    wrap(user),
    validateUser,
    formatUserName,
    updateUserId,
    convertUserToUserRecord,
    validateUserRecordSearchableNameLength,
    getSearchableName,
    capitalize,
    uppercaseLastLetter,
    reverseString
  );

function main() {
  try {
    // const user: User = { id: "123", name: "John" };

    // const result = flow(user);

    // console.log(result);

    // return;

    // TODO: We'll get here later
    const users = [
      { id: "123", name: "John" },
      { id: "456", name: "Jane" },
      { id: "789", name: "Jin" },
    ];

    const results = R.map(users, flow);
    console.log(results);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
// alt();
