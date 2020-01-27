// @flow
import * as React from 'react'
import type { FieldProps as Props, FieldRenderProps } from './types'
import renderComponent from './renderComponent'
import useField from './useField'

const Field = ({
  afterSubmit,
  allowNull,
  beforeSubmit,
  children,
  component,
  defaultValue,
  format,
  formatOnBlur,
  initialValue,
  isEqual,
  keepFieldStateOnUnmount,
  multiple,
  name,
  parse,
  subscription,
  type,
  validate,
  validateFields,
  value,
  ...rest
}: Props) => {
  const field: FieldRenderProps = useField(name, {
    afterSubmit,
    allowNull,
    beforeSubmit,
    children,
    component,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    keepFieldStateOnUnmount,
    multiple,
    parse,
    subscription,
    type,
    validate,
    validateFields,
    value
  })

  if (typeof children === 'function') {
    return (children: Function)({ ...field, ...rest })
  }

  if (typeof component === 'string') {
    // ignore meta, combine input with any other props
    return React.createElement(component, { ...field.input, children, ...rest })
  }
  return renderComponent(
    { children, component, ...rest },
    field,
    `Field(${name})`
  )
}

export default Field
