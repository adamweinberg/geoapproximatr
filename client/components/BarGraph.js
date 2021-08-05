import React from "react";
import { LinearProgress } from "@material-ui/core";

const BarGraph = (props) => {
  const { score, isFinalScore } = props;

  return (
    <React.Fragment>
      {isFinalScore ? (
        <LinearProgress
          id="final-score-slider"
          variant="determinate"
          value={score / 250} //total score * 100 / 25000
        />
      ) : (
        <LinearProgress
          id="score-slider"
          variant="determinate"
          value={score / 50} //round score * 100 / 5000
        />
      )}
    </React.Fragment>
  );
};

export default BarGraph;
