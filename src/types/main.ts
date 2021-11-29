export interface MjmlVars {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

export interface MjmlComponent<Vars extends MjmlVars> {
  (vars?: Vars): string;
}

export interface MjmlComponentConfig<Vars extends MjmlVars> {
  html(vars: Vars): string;
  vars?: MjmlVars;
}
