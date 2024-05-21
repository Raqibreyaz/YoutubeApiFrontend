import React, { useState } from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import CurrentTab from './CurrentTab'

function AllTabs({ audioInfo, videoInfo }) {

    const [myTab, setMyTab] = useState(true)

    return (
        audioInfo.length && videoInfo.length ? <div>
            <Tabs>
                <TabList className={'flex justify-between relative mb-2'} >
                    <Tab className='border-none ' onClick={() => setMyTab(true)}>Video</Tab>
                    <Tab className='border-none ' onClick={() => setMyTab(false)}>Audio</Tab>
                    <span className={`absolute h-[2px] w-4 bg-blue-600 bottom-0 ${myTab ? 'left-0 translate-x-[70%]' : 'right-0 translate-x-[-70%]'} `}>
                    </span>
                </TabList>
                <TabPanel>
                    <CurrentTab fileInfo={videoInfo} />
                </TabPanel>
                <TabPanel>
                    <CurrentTab fileInfo={audioInfo} />
                </TabPanel>
            </Tabs>
        </div > : null
    )
}

export default AllTabs
