export const FETCH_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
} as const;

export type TFetchState<T> =
    | { status: typeof FETCH_STATUS.LOADING }
    | { status: typeof FETCH_STATUS.SUCCESS; data: T }
    | { status: typeof FETCH_STATUS.ERROR; error: string };