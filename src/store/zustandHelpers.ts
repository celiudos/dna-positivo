// utils/zustandHelpers.ts ----------------------------------------------------

export function createSetter<
  TState extends IStoreDefault,
  K extends keyof TState,
  TValue = TState[K]
>(key: K, transform?: (value: TValue, state: TState) => TValue) {
  const type = `set${String(key)[0].toUpperCase()}${String(key).slice(1)}`;

  return (set: any) => (value: TValue) =>
    set(
      (state: TState) =>
        ({
          [key]: transform ? transform(value, state) : value,
        } as Partial<TState>),
      false,
      { type, [key]: value }
    );
}
