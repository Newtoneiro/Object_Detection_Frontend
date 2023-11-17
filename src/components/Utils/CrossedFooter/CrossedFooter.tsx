/**
 * @file CrossedFooter.tsx
 * @description CrossedFooter component.
 */

import { IProps } from "../../../config";
import { View } from "react-native";
import { crossedFooterStyle } from "./CrossedFooter.styles";

/**
 * @component
 *
 * CrossedFooter component.
 *
 * @description
 *
 * This component is used to display a footer with a line crossing it.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} [props.children] - The children to be displayed.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { CrossedFooter } from './CrossedFooter';
 *
 * const SomeComponent = () => {
 * return (
 *  <>
 *   <CrossedFooter>
 *   <Text>This is a crossed footer.</Text>
 *  </CrossedFooter>
 * </>
 * );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link crossedFooterStyle} for the style object.
 */
export const CrossedFooter = ({ children }: IProps) => {
  return (
    <View style={crossedFooterStyle.container}>
      <View style={crossedFooterStyle.line}></View>
      {children && (
        <View style={crossedFooterStyle.childrenBox}>{children}</View>
      )}
    </View>
  );
};
