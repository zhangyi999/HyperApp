
import {
    Card,
    HrDotted,
    Button,
    TextSM,
    TextM,
    TextMD,
    TextGL,
    TextXL,
    TextXXL,
    TextLinear,
    CheckButton,
    Input,
    Icon
} from '../../components'
// background-size: 8px 1px;
// background-repeat: repeat-x;
import useDrawer from '../../hook/useDrawer'


function Test() {
    const {open} = useDrawer(
        <Card b={2}>
            <TextMD>M</TextMD>
        </Card>
        , {closeButton: true})
    return (
        <>
            <Card b={0} onClick={open}>
                <TextSM >M 0</TextSM>

                <HrDotted color='5'/>
            </Card>
            <Card b={1}>
                <TextM>M 1 </TextM>
                <HrDotted/>
                <Icon type='icon-fuzhidao' />
            <Input />
            </Card>
            <Card b={2}>
                <TextMD>M 2</TextMD>
                <HrDotted/>

            <Input />
            </Card>
            <Card b={3}>
                <TextGL>M 3</TextGL>
                <HrDotted/>

            <Input />
            </Card>
            <Card b={4}>
                <TextXL>M 4</TextXL>
            </Card>
            <TextLinear size='2' b={800}>sdfss</TextLinear>
            <Button square status='0'><TextSM>M</TextSM></Button>
            <Button square status='1'>Button</Button>
            <Button status='2'>Button</Button>
            <Button status='3'>Button</Button>
            <Button status='4'>Button</Button>
            <Button status='5'>Button</Button>
            <CheckButton checked square>
                CheckButton
            </CheckButton>
        </>
    )
}



export default Test