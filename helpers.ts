import type { User, UserRecord } from "./types";

export function validateUser(obj: any): User {
  if (!obj.id) throw new Error("Invalid user");
  return obj;
}

export function formatUserName(user: User): User {
  if (!user.name) throw new Error("Invalid name");
  return { ...user, name: toUpperCase(user.name) };
}

export function updateUserId(user: User): User {
  return { ...user, id: "12345" };
}

export function convertUserToUserRecord(user: User): UserRecord {
  return { ...user, searchableName: user.name.toLowerCase() };
}

export function validateUserRecordSearchableNameLength(
  userRecord: UserRecord
): UserRecord {
  if (userRecord.searchableName.length < 3) {
    throw new Error("Name too short");
  }
  return userRecord;
}

export function getSearchableName(userRecord: UserRecord): string {
  return userRecord.searchableName;
}

// Take a string to uppercase
export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

// Take a string to capitizlize the first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Take a string to uppercase the last letter
export const uppercaseLastLetter = (str: string): string => {
  return str.slice(0, -1) + str.slice(-1).toUpperCase();
};

// reverse a string
export const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};
