/**
 * A successful result.
 *
 * @template T - The success value type.
 */
export type Ok<T> = {
  readonly _tag: "ok";
  readonly value: T;
};

/**
 * A failed result.
 *
 * @template E - The error type.
 */
export type Err<E> = {
  readonly _tag: "err";
  readonly error: E;
};

/**
 * Success or expected failure. Never use rejection for ordinary domain errors.
 *
 * @template T - The success value type.
 * @template E - The error type.
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Wrap a success value.
 *
 * @template T - The success value type.
 * @param value - The success value.
 * @returns An ok result.
 */
export function ok<T>(value: T): Ok<T> {
  return { _tag: "ok", value };
}

/**
 * Wrap an expected failure.
 *
 * @template E - The error type.
 * @param error - The error value.
 * @returns An err result.
 */
export function err<E>(error: E): Err<E> {
  return { _tag: "err", error };
}
