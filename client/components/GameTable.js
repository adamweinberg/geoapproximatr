import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#DDF8EC",
    },
  },
}))(TableRow);

const GameTable = (props) => {
  const { totalScore, distances, scores } = props;

  return (
    <div>
      <TableContainer id="game-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={3}
                style={{ fontSize: "22px" }}
              >
                Game Summary
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Round</TableCell>
              <TableCell align="center">Distance from Target</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {distances.map((distance, index) => {
              return (
                <StyledTableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{distance}</TableCell>
                  <TableCell align="right">{scores[index]}</TableCell>
                </StyledTableRow>
              );
            })}
            <StyledTableRow>
              <TableCell
                align="right"
                colSpan={2}
                style={{ textDecoration: "bold" }}
              >
                Total Score:
              </TableCell>
              <TableCell
                align="right"
                style={{ fontSize: "18px", color: "#3649bd" }}
              >
                {totalScore}
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GameTable;
