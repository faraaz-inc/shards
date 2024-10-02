"use client"
import React, {ReactNode, useState} from 'react';
import styled from "@emotion/styled";

export const Sidebar = ({children}: { children: ReactNode }) => {
  const [refresh, forceRefresh] = useState<number>(0);

  return (
    <div>
      <div className='text-gray-400 ml-5 mr-3 flex justify-between align-middle'>
        <div>
          File System
        </div>
        <div onClick={() => forceRefresh(prev => prev +  1)} className='border-[1px] text-xs border-gray-800 rounded-full px-3 py-1 hover:cursor-pointer'>
          Refresh
        </div>
      </div>
      <Aside>
        {children}
      </Aside>
    </div>
  )
}

const Aside = styled.aside`
  display: block;
  width: 250px;
  height: 84vh;
  border-right: 2px solid;
  border-color: #242424;
  padding-top: 3px;
`

export default Sidebar
