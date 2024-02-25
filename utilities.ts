// import * as R from "remeda";
import * as T from "./types";

export const eitherify =
  <T, R>(fn: (arg: T) => R) =>
  (arg: T.Either<T>): T.Either<R> => {
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

export function wrap<T>(data: T): T.Success<T> {
  return {
    success: true,
    data,
  };
}

export function unwrap(e: T.Either<any>) {
  if (!e.success) throw e.error;
  return e.data;
}
