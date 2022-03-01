import {useState, createContext, useCallback } from 'react'
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
// import lime from "@material-ui/core/colors/lime";
// pick a date util library
// import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
// import LuxonUtils from '@date-io/luxon';

import {inPc} from '../../theme'

import { DatePicker , MuiPickersUtilsProvider} from "@material-ui/pickers";

import {Dialog} from '../../components'

export const Context = createContext({})

// console.log(lime)
const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            500: '#fdb756'
        }
    },
  });  


function StaticDatePickerProvider({children}) {
    const [date, changeDate] = useState(new Date());
    const [dateProps, setProps] = useState({})
    const [opened, setOpen] = useState(false)
    const closeDialog = () => {
        setOpen(false)
    }
    const open = useCallback(dateProps => {
        setProps(dateProps)
        setOpen(true)
    },[])
    const onChange = (val) => {
        // setOpen(false)
        changeDate(val)
    }
    console.log({
        dateProps
    })
    return (
        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
        <Context.Provider
            value={{
                date,
                open,
                close: closeDialog,
                setProps,
                changeDate
            }}
        >
            {children}
            {/* <ThemeProvider theme={defaultMaterialTheme}>
                    <DatePicker
                        autoOk
                        showTodayButton={false}
                        open={opened}
                        orientation={inPc?"landscape":"portrait"}
                        variant="variant"
                        value={date}
                        onChange={changeDate}
                        {...dateProps}
                    />
                </ThemeProvider> */}
            <Dialog
                fullWidth
                maxWidth='xs'
                scroll='body'
                onClose={closeDialog}
                aria-labelledby="simple-dialog-title"
                open={opened}
            >
                <ThemeProvider theme={defaultMaterialTheme}>
                    <DatePicker
                        autoOk
                        open={opened}
                        orientation={inPc?"landscape":"portrait"}
                        variant="static"
                        value={date}
                        onClose={closeDialog}
                        onChange={onChange}
                        {...dateProps}
                    />
                </ThemeProvider>
            </Dialog>
        </Context.Provider>
        </MuiPickersUtilsProvider>
    );
}

export default StaticDatePickerProvider