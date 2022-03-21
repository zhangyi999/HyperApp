import {
  Container,
  Button as MuiButton,
  Stack,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import PoolsTable from "./components/PoolsTable";
import AddIcon from "@mui/icons-material/Add";
import Card from "../../components/Card";
import { useHistory } from "react-router-dom";

const Pools: React.FC = () => {
  const history = useHistory();
  return (
    <Container sx={{ py: 2 }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography sx={{ flex: 1 }}>流动池概览</Typography>
        <MuiButton
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => history.push("/pools/add")}
        >
          添加流动性
        </MuiButton>
        <MuiButton
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => history.push("/pools/add")}
        >
          新仓位
        </MuiButton>
      </Toolbar>
      <Container>
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 4,
          }}
        >
          <Grid item xs={12} sm={7}>
            <Card
              sx={{
                height: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              查看流动池介绍与使用指南
            </Card>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card
              sx={{
                height: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              热门流动池
            </Card>
          </Grid>
        </Grid>
      </Container>
      <PoolsTable />
    </Container>
  );
};
export default Pools;
