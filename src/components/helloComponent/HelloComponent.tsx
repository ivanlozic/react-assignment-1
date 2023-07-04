import React from 'react'
import { useHello } from '../../hooks/useHello/useHello'
import { HELLO_MESSAGE } from '../../constants/constants'

const HelloComponent = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { msg?: string }> => {
  const WrappedComponent: React.FC<P & { msg?: string }> = (props) => {
    useHello(`${props.msg || HELLO_MESSAGE}${Component.name}`)
    return <Component {...props} />
  }

  WrappedComponent.displayName = `HelloComponent(${
    Component.displayName || Component.name || 'Component'
  })`

  return WrappedComponent
}

export default HelloComponent
