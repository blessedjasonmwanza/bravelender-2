import React from 'react'
import { IconButton } from 'rsuite';
import OffIcon from '@rsuite/icons/Off';

export default function TopNav() {
  return (
    <header className="top-nav">
        <a href="" className="logo-name" title="BraveLender Software">BraveLender Software</a>
        <span className="top-nav-icons green">
            
        </span>
        <span>
        <IconButton icon={<OffIcon />} color="red" appearance="primary"  />
        </span>
    </header>
  )
}
