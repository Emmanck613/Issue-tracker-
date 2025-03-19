import React, { PropsWithChildren } from 'react'
import { Text } from "@radix-ui/themes";

//in react we have a type to define the shape of the props

const ErrorMessage = ( { children }: PropsWithChildren) => {
  
  if(!children) return null;
  
  //the as prop allows us to change the html element of the component
  return (
    <Text color='red' as='p'>{children}</Text>
    )
}

export default ErrorMessage