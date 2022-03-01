import {memo, useState, useEffect} from 'react'

import {
    HashRouter as Router,
    Route
} from "react-router-dom";

import {
    Done,
    Dev
} from './router'

import AppBar from './AppBar'

import InitConstants from './InitConstants'
import DialogProvider from '../context/Dialog'

import DrawerProvider from '../context/DrawerProvider'

import WaitMiner, {END, NOW} from './WaitMiner'

// export const END = ~~(new Date('2021.11.15 23:59:59') / 1000 + 10)
// export const NOW = () => ~~(new Date() / 1000)

function Index( ) {
    return (
    
        <Router>
            <InitConstants>
                <DrawerProvider>
                    <DialogProvider>
                        {
                            NOW() <= END?
                            <WaitMiner />:
                            <AppBar>
                                {[...Done,...Dev].map(v => <Route key={v.title} {...v}/>)}
                            </AppBar>
                        }
                        {/* {Done.map(v => <Route key={v.title} {...v}/>)} */}
                    </DialogProvider>
                </DrawerProvider>
            </InitConstants>
        </Router>
    )
}

export default memo(Index)