import React, { useState, useEffect } from "react";
import useStages from "../configuration/useStages.hook";
import useInputPlayerOne from "../input/useInputPlayerOne.hook";
import useInputPlayerTwo from "../input/useInputPlayerTwo.hook";
import useStageName from "./useStageName.hook";
import useNavigationDispatch from "../navigation/useDispatch.hook";
import selectStage from "../navigation/action/selectStage.action";
import Title from "./title.view";
import Name from "./name.view";
import Preview from "./preview.view";
import getSelectableStages from "./util/getSelectableStages";

export default function SelectingStageByPlayers() {
  const dispatch = useNavigationDispatch();
  const stages = useStages();
  const inputPlayerOne = useInputPlayerOne();
  const inputPlayerTwo = useInputPlayerTwo();
  const [stageIndex, setStageIndex] = useState(0);
  const stage = stages[stageIndex];
  const name = useStageName(stage);

  useEffect(() => {
    const previous = () => {
      if (stageIndex > 0) {
        setStageIndex(stageIndex - 1);
      } else {
        setStageIndex(stages.length - 1);
      }
    };
    const next = () => {
      setStageIndex((stageIndex + 1) % stages.length);
    };
    const confirm = () => {
      if (stage.random) {
        const selectableStages = getSelectableStages(stages);
        const randomStage = selectableStages[Math.floor(Math.random() * selectableStages.length)];
        dispatch(selectStage(randomStage));
      } else {
        dispatch(selectStage(stage));
      }
    };

    inputPlayerOne.addEventListener("left", next);
    inputPlayerOne.addEventListener("right", previous);
    inputPlayerOne.addEventListener("a", confirm);
    inputPlayerTwo.addEventListener("left", next);
    inputPlayerTwo.addEventListener("right", previous);
    inputPlayerTwo.addEventListener("a", confirm);

    return () => {
      inputPlayerOne.removeEventListener("left", next);
      inputPlayerOne.removeEventListener("right", previous);
      inputPlayerOne.removeEventListener("a", confirm);
      inputPlayerTwo.removeEventListener("left", next);
      inputPlayerTwo.removeEventListener("right", previous);
      inputPlayerTwo.removeEventListener("a", confirm);
    };
  }, [inputPlayerOne, inputPlayerTwo, stage, stages, stageIndex, dispatch]);

  return (
    <>
      <Preview stage={stage} />
      <Title>Stage</Title>
      <Name>{name}</Name>
    </>
  );
}
