
import {
    Container,
    FlexBlock,
    Icon,
    TextMD,
    WhiteSpace
} from '../../components'

// import { } from '../../'

function PageBlock({children, align}) {
    return (
        <Container align={align}>
            <WhiteSpace/>
            {children}
        </Container>
    )
}

export default PageBlock