import React from 'react'
import styled from 'styled-components';
import { Button as ButtonMaterial } from '@material-ui/core';

export const MyButton = styled(ButtonMaterial)`
  && {
    font-size: 1.5rem;
    margin: 1rem 0;
    margin-right: 1rem;
  }
`

export default function Button({ onClick, disabled, children }) {
  return <MyButton disabled={disabled} variant="outlined" color="secondary" onClick={onClick}>{children}</MyButton>
}
