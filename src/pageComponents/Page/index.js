import styled from 'styled-components'
import {
    Container,
    FlexBlock,
    Icon,
    TextMD,
    WhiteSpace,
    Card
} from '../../components'

// import { } from '../../'

const Tip = styled.div`
    width: 7px;
    height: 18px;
    border-radius: 3px;
    background: linear-gradient(0, #4927d4, #9916b6);
    margin-right: 10px;
`

function Page({children, align, title}) {
    return (
      <Container align={align} maxWidth="768">
        <Card
          flex
          b="1"
          justify="start"
          onClick={() => {
            window.history.go(-1);
          }}
          pds={[1, 1.6]}
        >
          <Icon
            style={{
              color: "#fff",
              marginRight: "16px",
              borderRadius: "100px",
              background: "#000",
              padding: "3px",
            }}
            size="20"
            type="icon-direction-left"
          />
          <Tip />
          {title}
        </Card>
        <WhiteSpace size="1" />
        {children}
      </Container>
    );
}

export default Page