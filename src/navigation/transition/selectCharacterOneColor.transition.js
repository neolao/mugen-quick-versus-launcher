import TRAINING from "../mode/training.mode";
import VERSUS from "../mode/versus.mode";
import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import SELECTING_COLOR from "../sideState/selectingColor.state";
import SELECTED from "../sideState/selected.state";
import TRAINING_SELECTING_CHARACTER_TWO from "../state/trainingSelectingCharacterTwo.state";
import VERSUS_SELECTING_STAGE from "../state/versusSelectingStage.state";

export default function selectCharacterOneColor(data, action) {
  if (data.leftSideState !== SELECTING_COLOR) {
    throw new Error(`Unable to select character one color in state: ${data.state}`);
  }

  const newData = {
    ...data,
    characterOneColorIndex: action.colorIndex,
    leftSideState: SELECTED
  };

  if (newData.mode === TRAINING) {
    newData.state = TRAINING_SELECTING_CHARACTER_TWO;
    newData.rightSideState = SELECTING_CHARACTER;
    return newData;
  }

  if (newData.mode === VERSUS) {
    if (newData.rightSideState === SELECTED) {
      newData.state = VERSUS_SELECTING_STAGE;
    }
    return newData;
  }

  throw new Error(`Unable to select character one color in state: ${data.state}`);
}
