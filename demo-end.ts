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
} from "./helpers-either";
import { wrap } from "@okeeffed/eitherify";

const originalFlow = (user: T.User) =>
  R.pipe(
    wrap(user),
    validateUser,
    formatUserName,
    updateUserId,
    convertUserToUserRecord,
    validateUserRecordSearchableNameLength,
    getSearchableName,
    toUpperCase
  );

const subflow = (user: T.User) =>
  R.pipe(
    wrap(user),
    validateUser,
    formatUserName,
    updateUserId,
    convertUserToUserRecord
  );

const subflow2 = (userRecord: T.UserRecord) =>
  R.pipe(
    wrap(userRecord),
    validateUserRecordSearchableNameLength,
    getSearchableName,
    toUpperCase
  );

const flow = (user: T.User) =>
  R.pipe(
    wrap(user),
    validateUser,
    formatUserName,
    updateUserId,
    convertUserToUserRecord,
    validateUserRecordSearchableNameLength,
    getSearchableName,
    toUpperCase
  );

function main() {
  const user: T.User = { id: "123", name: "John" };

  const result = flow(user);

  // console.log(result);

  // return;

  const users: T.User[] = [
    { id: "123", name: "John" },
    { id: "456", name: "Jane" },
    { id: "789", name: "Jin" },
  ];

  const results = R.flatMap(users, flow);

  console.log(results);
}

main();
