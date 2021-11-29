import mjml from 'mjml';
import type { MjmlComponent, MjmlComponentConfig, MjmlVars } from './types';

export function createMjmlComponent<Vars extends MjmlVars>(
  data: MjmlComponentConfig<Vars>,
): MjmlComponent<Vars> {
  return (vars) => {
    if (!data.vars) {
      data.vars = {};
    }
    if (!vars) {
      vars = {} as never;
    }
    return data.html({ ...data.vars, ...vars });
  };
}

export function createMjmlPage<Vars extends MjmlVars>(
  data: MjmlComponentConfig<Vars>,
): MjmlComponent<Vars> {
  return (vars) => {
    if (!data.vars) {
      data.vars = {};
    }
    if (!vars) {
      vars = {} as never;
    }
    const html = data.html({ ...data.vars, ...vars });
    const result = mjml(html);
    if (result.errors.length > 0) {
      throw result.errors;
    }
    return result.html;
  };
}