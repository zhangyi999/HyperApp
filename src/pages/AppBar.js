import React,{memo, useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

// import Slide from '@material-ui/core/Slide';
// import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';

import {
    // // HashRouter as Router,
    // BrowserRouter as Router,
    // // Switch,
    // Route,
    // Link,
    useHistory
} from "react-router-dom";

import {Logo, ConnectWallet, ConnectNet, OpenRouter} from '../pageComponents'

import {
    Container,
    FlexBlock,
    Text,
    TextM,
    WhiteSpace,
    TextMD,
    TextGL,
    Link
} from '../components'

import {Done} from './router'

import {inPc} from '../theme'


const useStyles = makeStyles({
    colorPrimaryNone : {
        background: 'transparent',
        boxShadow: 'none',
        transition: 'all .3s',
        borderBottom: '0px solid #f2f2f2'
    },
    colorPrimary: {
        background: 'rgba(14, 6, 19, 0.6)',
        boxShadow: 'none',
        transition: 'all .3s',
        borderBottom: '0px solid #f2f2f2'
    }
});

const useAppBar = makeStyles({
    colorPrimary : {
        background: 'transparent',
        // boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
        boxShadow: 'none',
        top: 'auto',
        bottom: 0,
        borderRadius: '6px',
        padding: '0px'
    }
});
// colorPrimary

// import styled from 'styled-components'

function useRouter() {
    const history = useHistory()
    const [paths, setPath] = useState(history.location.pathname)
    useEffect(() => {
        history.listen(({pathname}) => {
            setPath(pathname)
        })
    }, [])
    return paths
}

function HideOnScroll() {
    // const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 55
    });
    const classes = useStyles()
    return (
        <MuiAppBar classes={{
            colorPrimary: !trigger? classes.colorPrimaryNone : classes.colorPrimary
        }}>
            <Toolbar>
                <Container style={{padding:0}} flex>
                    <FlexBlock flex justify='start'>
                        <Logo size='3'/>
                        <TextMD b='800' style={{marginLeft: '8px'}}>HyperSwap</TextMD>
                    </FlexBlock>
                    {
                        inPc?<MenuBarMemo />:null
                    }
                    <FlexBlock justify='flex-end' flex>
                        <ConnectWallet />
                        {/* <OpenRouter />s */}
                        {/* <MeerPoolV1 /> */}
                    </FlexBlock>
                </Container>
            </Toolbar>
        </MuiAppBar>
    );
}

const M_STYLE = {
    borderRadius: '10rem',
    width: '70%',
    margin: 'auto',
    background: 'rgba(0,0,0,.3)',
    padding: '2px',
    border: '0.18rem solid transparent',
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    backgroundImage: `linear-gradient(to right, #182261, #182261),linear-gradient(90, '#182261', '#451066')`


    // boxShadow: '0px 0px 14px rgba(0,0,0,0.1)'

}
function MobileBar( ) {
    const classes =  useAppBar()
    return (
        <MuiAppBar
            position="fixed"
            classes={classes}
        >
            <Toolbar>
                <MenuBarMemo />
            </Toolbar>
            <WhiteSpace size='gl'/>
        </MuiAppBar>
    )
}

// const RBlock = styled.div`
//     padding: 4px 0px 4px 6px;
//     display: flex;
//     align-items: center;
//     margin-left: 8px;
//     color: ${p => p.theme.color.brown};
// `

// function MeerPoolV1() {
//     return (
//         <Link
//             to='/v1'
//             size='sm'
//             status='6'
//         >
//             <TextM color='2' style={{marginLeft:'10px',paddingTop:'5px', paddingBottom:'5px'}} b={800}>V0</TextM>
//         </Link>
        
//     )
// }

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};


function MenuBar() {
    const paths = useRouter()
    return (
        <FlexBlock
            style={M_STYLE}
            flex
        >
            {
                Done.map(key => {
                    const {path, href, title} = key
                    const link = {
                        key: title,
                        style: { width: 100 / Done.length + '%' },
                        status: path == paths ? '0' : '6'
                    }
                    if ( href ) {
                        link.href = href
                        link.target = '_blank'
                    } else {
                        link.to = path
                    }
                    return (
                        React.createElement(
                            href? 'a': Link,link,
                            <TextM>{title}</TextM>
                        )
                    )
                })
            }
        </FlexBlock>
    )
}

const MenuBarMemo = memo(MenuBar)

function AppBar(props) {
    return (
        <>
            <CssBaseline />
            <HideOnScroll />
            <Toolbar />
            {props.children}
            {
                inPc?null:
                <>
                    <WhiteSpace size='1'/>
                    <MobileBar/>
                    <Toolbar />
                </>
            }
        </>
    )
}

export default memo(AppBar)