import { actionType, ToDo } from "../types";
const initState: ToDo = [{
  id: 0,
  title: "吃饭",
  isDone: false,
}]

function reducer(state = initState, action: actionType) {
  switch (action.type) {
    case "add_todo":
      return { ...state, userInfo: action.data };
    case "set_token":
      return { ...state, token: action.data };
    default:
      return state;
  }
}
export default reducer;
