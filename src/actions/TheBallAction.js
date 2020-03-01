export const changeAnimatedState = (newAnimatedState) => {
  return (dispatch) => {
    dispatch({
      type: "changeAnimatedState",
      payload: {
        animatedState: newAnimatedState
      }
    });
  }
}

export const ResetAnimation = (initialStyle) => {
  return (dispatch) => {
    dispatch({
      type: "ResetAnimation",
      payload:initialStyle
    });
  }
}

export const stopWidth = () => {
  return (dispatch) => {
    dispatch({
      type: "stopWidth"
    });
  }
}