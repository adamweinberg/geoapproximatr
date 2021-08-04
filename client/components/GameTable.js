import React from "react";
import { useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const GameTable = (props) => {
  const { score, distance } = props; //last round score and distance
  const { game } = useSelector((state) => state);

  const totalScore = game.scores.reduce((curr, acc) => acc + curr) + score;

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
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
            {game.distances.map((distance, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{distance}</TableCell>
                  <TableCell align="right">{game.scores[index]}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell align="center">{distance}</TableCell>
              <TableCell align="right">{score}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={2}>
                Total Score:
              </TableCell>
              <TableCell align="right">{totalScore}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GameTable;
