import * as H from "./helpers";
import { eitherify } from "@okeeffed/eitherify";

export const validateUser = eitherify(H.validateUser);
export const formatUserName = eitherify(H.formatUserName);
export const updateUserId = eitherify(H.updateUserId);
export const convertUserToUserRecord = eitherify(H.convertUserToUserRecord);
export const validateUserRecordSearchableNameLength = eitherify(
  H.validateUserRecordSearchableNameLength
);
export const getSearchableName = eitherify(H.getSearchableName);
export const toUpperCase = eitherify(H.toUpperCase);
export const capitalize = eitherify(H.capitalize);
export const uppercaseLastLetter = eitherify(H.uppercaseLastLetter);
export const reverseString = eitherify(H.reverseString);
