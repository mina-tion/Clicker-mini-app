import { Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  variant:
    | "extra-small"
    | "small"
    | "medium"
    | "extra-medium"
    | "semi-large"
    | "large"
    | "extra-large"
    | "custom";
  children: ReactNode;
};

export function Title({ variant, children, ...rest }: Props & TextProps) {
  let styles: TextProps = {
    fontFamily: "Russo One",
    fontStyle: "normal",
    fontWeight: "400",
  };

  if (variant === "extra-small") {
    styles = {
      ...styles,
      fontSize: "10px",
      lineHeight: "10px",
    };
  }

  if (variant === "small") {
    styles = {
      ...styles,
      fontSize: "12px",
      lineHeight: "12px",
      letterSpacing: "0.02em",
    };
  }

  if (variant === "medium") {
    styles = {
      ...styles,
      fontSize: "16px",
      lineHeight: "24px",
    };
  }

  if (variant === "extra-medium") {
    styles = {
      ...styles,
      fontSize: "24px",
      lineHeight: "28px",
    };
  }

  if (variant === "semi-large") {
    styles = {
      ...styles,
      fontSize: "28px",
      lineHeight: "32px",
    };
  }

  if (variant === "large") {
    styles = {
      ...styles,
      fontSize: "40px",
      lineHeight: "48px",
    };
  }
  if (variant === "extra-large") {
    styles = {
      ...styles,
      fontSize: "64px",
      lineHeight: "normal",
    };
  }

  return (
    <Text {...styles} {...rest}>
      {children}
    </Text>
  );
}
