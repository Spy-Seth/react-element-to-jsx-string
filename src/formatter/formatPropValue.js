/* @flow */

import isPlainObject from 'is-plain-object';
import { isValidElement } from 'react';
import formatComplexDataStructure from './formatComplexDataStructure';
import formatFunction from './formatFunction';
import formatSymbol from './formatSymbol';
import formatTreeNode from './formatTreeNode';
import type { Options } from './../options';
import parseReactElement from './../parser/parseReactElement';

const escape = (s: string): string => s.replace(/"/g, '&quot;');

const formatPropValue = (
  propValue: any,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (typeof propValue === 'number') {
    return `{${String(propValue)}}`;
  }

  if (typeof propValue === 'string') {
    return `"${escape(propValue)}"`;
  }

  if (typeof propValue === 'symbol') {
    return `{${formatSymbol(propValue)}}`;
  }

  if (typeof propValue === 'function') {
    return `{${formatFunction(propValue, options)}}`;
  }

  if (isValidElement(propValue)) {
    return `{${formatTreeNode(
      parseReactElement(propValue, options),
      true,
      lvl,
      options
    )}}`;
  }

  if (propValue instanceof Date) {
    return `{new Date("${propValue.toISOString()}")}`;
  }

  if (isPlainObject(propValue) || Array.isArray(propValue)) {
    return `{${formatComplexDataStructure(propValue, inline, lvl, options)}}`;
  }

  return `{${String(propValue)}}`;
};

export default formatPropValue;
