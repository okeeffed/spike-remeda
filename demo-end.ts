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
import { wrap } from "./utilities";

// Adjust eitherify to properly handle the typing and ensure it's type-safe.
// function eitherify<T, R>(fn: (arg: T) => R): (arg: T.Either<T>) => T.Either<R> {
//   return (arg): T.Either<R> => {
//     if (!arg.success) return arg as T.Either<R>; // Cast to T.Either<R> for type compatibility

//     try {
//       const result: R = fn(arg.data);
//       return { success: true, data: result };
//     } catch (error) {
//       return {
//         success: false,
//         error: error instanceof Error ? error : new Error(String(error)),
//       };
//     }
//   };
// }

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
    { id: "456", name: "Ja" },
    { id: "789", name: "Ji" },
  ];

  const results = R.flatMap(users, flow);

  console.log(results);
}

function alt() {
  const user: T.User = { id: "123", name: "John" };

  const users: T.User[] = [
    { id: "123", name: "John" },
    { id: "456", name: "Jane" },
    { id: "789", name: "Jin" },
  ];

  try {
    const results = users.flatMap((user) => {
      const validUser = validateUser(wrap(user));
      const formattedUser = formatUserName(validUser);
      const updatedUser = updateUserId(formattedUser);
      const userRecord = convertUserToUserRecord(updatedUser);
      const validUserRecord =
        validateUserRecordSearchableNameLength(userRecord);
      const searchableName = getSearchableName(validUserRecord);
      const uppercaseSearchableName = toUpperCase(searchableName);

      return uppercaseSearchableName;
    });

    console.log(results);
  } catch (err) {
    console.error("Error:", err);
  }

  // console.log("Success:", result.success);

  // if (result.success) {
  //   console.log("Data:", result.data);
  // } else {
  //   console.error("Error:", result.error);
  // }
}

main();
// alt();
