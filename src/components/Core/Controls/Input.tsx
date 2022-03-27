import React, { FC } from "react";
import { ReactNode } from "typings";
import { forwardRef } from "../system/forward-ref";
import { cx } from "../system/core";

interface InputProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: (e: any) => void;
}

const Button: FC<InputProps> = forwardRef<InputProps, "input">((props, ref) => {
  const {
    id,
    name,
    type,
    className,
    value = "",
    placeholder = null,
    maxLength,
    onChange = () => {},
  } = props;
  return (
    <input
      ref={ref}
      className={cx(
        "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
        className
      )}
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={onChange}
    />
  );
});

export default Button;
