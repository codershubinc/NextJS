'use client'
import React from 'react'
import AddMusicToPlayList from './addMusicToPlayList'
import PageUi from '@/components/page/pageui' 
import { Button } from '@/components/ui/button'

function Page() {
  return (


    <PageUi>
      <AddMusicToPlayList />
      <Button
        onClick={() => window.history.back()}>
        Back
      </Button >


    </PageUi >



  )
}

export default Page