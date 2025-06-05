import React from 'react'
import { Alert } from '@mui/material'
interface errorMessageProps{
  errorMessage:string;
}
const Error = ({errorMessage}:errorMessageProps) => {
  return (
      <Alert severity='error'>{errorMessage}</Alert>
  )
}

export default Error

