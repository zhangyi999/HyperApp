import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import useToast from "../../../hooks/useToast";

const data: any[] = [
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
];
const PoolsTable: React.FC = () => {
  const toast = useToast()
  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <TableContainer>
          <Table
            sx={{
              minWidth: 840,

              "& .MuiTableCell-root": {
                border: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>流动池</TableCell>
                <TableCell>基础收益</TableCell>
                <TableCell>奖励收益</TableCell>
                <TableCell>交易额</TableCell>
                <TableCell>美元价值</TableCell>
                <TableCell>可用奖励</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell>{item[1]}</TableCell>
                    <TableCell>
                      {item[2][0]} {"->"} {item[2][1]}
                    </TableCell>
                    <TableCell>{item[3]}</TableCell>
                    <TableCell>{item[4]}</TableCell>
                    <TableCell>{item[5]}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button gradient size="small" onClick={()=> toast.success('领取奖励')}>
                          领取奖励
                        </Button>
                        <Button size="small" variant="outlined">
                          管理流动性
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default PoolsTable;
