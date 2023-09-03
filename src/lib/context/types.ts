export interface BaseContext<S = {}, A = {}> {
  state?: S;
  actions?: A;
}

export type SettingsAction<T> = React.Dispatch<React.SetStateAction<T>>;
