import * as R from "remeda";

type Success<T> = {
  success: true;
  data: any;
};

type Failure = {
  success: false;
  error: Error;
};

type Either<T> = Success<T> | Failure;

interface User {
  id: string;
  name: string;
}

interface UserRecord extends User {
  searchableName: string;
}

function validateUser(obj: any): User {
  if (!obj.id) throw new Error("Invalid user");
  return obj;
}

function formatUserName(user: User): User {
  if (!user.name) throw new Error("Invalid name");
  return { ...user, name: toUpperCase(user.name) };
}

function updateUserId(user: User): User {
  return { ...user, id: "12345" };
}

function convertUserToUserRecord(user: User): UserRecord {
  return { ...user, searchableName: user.name.toLowerCase() };
}

function validateUserRecordSearchableNameLength(
  userRecord: UserRecord
): UserRecord {
  if (userRecord.searchableName.length < 3) {
    throw new Error("Name too short");
  }
  return userRecord;
}

function toUpperCase(str: string): string {
  return str.toUpperCase();
}

function getSearchableName(userRecord: UserRecord): string {
  return userRecord.searchableName;
}

/**
 * Check an either for success. If not, "short circuit" and return the error
 * by surfacing the Failure. If success, attempt to apply the next function.
 */
function eitherify<T, R>(fn: (arg: T) => R): (arg: Either<T>) => Either<R> {
  return (arg: Either<T>) => {
    if (!arg.success) return arg;

    try {
      return { success: true, data: fn(arg.data) };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  };
}

type FirstArgument<T> = T extends (arg: infer U) => any ? U : never;
type LastOf<T> = T extends [...infer _, infer L] ? L : never;
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

function eitherPipe<
  Fns extends [(arg: any) => any, ...Array<(arg: any) => any>]
>(
  ...fns: Fns
): (e: Either<FirstArgument<Fns[0]>>) => Either<ReturnOf<LastOf<Fns>>> {
  return (e: Either<any>) => fns.reduce((acc, fn) => eitherify(fn)(acc), e);
}

function wrap<T>(data: T): Either<T> {
  return {
    success: true,
    data,
  };
}

function unwrap(e: Either<any>) {
  if (!e.success) throw e.error;
  return e.data;
}

const subflow = (user: User) =>
  R.pipe(
    wrap(user),
    eitherPipe(
      validateUser,
      formatUserName,
      updateUserId,
      convertUserToUserRecord
    )
  );

const subflow2 = (user: User) =>
  R.pipe(
    wrap(user),
    eitherPipe(
      validateUserRecordSearchableNameLength,
      getSearchableName,
      toUpperCase
    )
  );

const flow = (user: User) => R.pipe(user, subflow, unwrap, subflow2);

const originalFlow = (user: User) =>
  R.pipe(
    wrap(user),
    eitherPipe(
      validateUser,
      formatUserName,
      updateUserId,
      convertUserToUserRecord,
      validateUserRecordSearchableNameLength,
      getSearchableName,
      toUpperCase
    )
  );

function main() {
  const user: User = { id: "123", name: "John" };

  const users: User[] = [
    { id: "123", name: "John" },
    { id: "456", name: "Jane" },
    { id: "789", name: "Jin" },
  ];

  const results = R.flatMap(users, flow);

  console.log(results);

  // console.log("Success:", result.success);

  // if (result.success) {
  //   console.log("Data:", result.data);
  // } else {
  //   console.error("Error:", result.error);
  // }
}

function alt() {
  const user: User = { id: "123", name: "John" };

  const users: User[] = [
    { id: "123", name: "John" },
    { id: "456", name: "Jane" },
    { id: "789", name: "Jin" },
  ];

  try {
    const results = users.flatMap((user) => {
      const validUser = validateUser(user);
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
