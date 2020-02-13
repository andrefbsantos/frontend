import React from 'react'
import styled from 'styled-components'
import SvgIcon from '@material-ui/core/SvgIcon';

const Social = styled.footer`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;

  > div {
    margin-top: 1rem;
  }
`

const SocialIcon = styled.a`
  border: 1px solid black;
  padding: 5px;
  display: inline-flex;
  margin-right: 5px;
`


export default function Footer() {
  return (
    <Social>
      <div>
        <span>
          Find us at&nbsp;
          <a
            target="_blank"
            href="https://www.imaginarycloud.com"
            rel="noopener noreferrer" >
            Imaginary Cloud
          </a>
          &nbsp;or follow our social networks:
        </span>
      </div>
      <div>
        <SocialIcon
          target="_blank"
          href="https://www.facebook.com/imaginarycloudteam"
          rel="noopener noreferrer"
        >
          <SvgIcon>
            <path fill="#000000" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
          </SvgIcon>
        </SocialIcon>
        <SocialIcon
          target="_blank"
          href="https://www.linkedin.com/company/940558/"
          rel="noopener noreferrer"
        >
          <SvgIcon>
            <path fill="#000000" d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
          </SvgIcon>
        </SocialIcon>
        <SocialIcon
          target="_blank"
          href="https://twitter.com/Imaginary_Cloud"
          rel="noopener noreferrer"
        >
          <SvgIcon>
            <path fill="#000000" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
          </SvgIcon>
        </SocialIcon>
      </div>
    </Social>
  )
}
