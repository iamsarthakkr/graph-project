export type IAction<T extends string, P = {}> = Readonly<{
   type: T;
   payload?: P;
}>;
