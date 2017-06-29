const initialState = {
  taskList: [],
};
export default function updateTaskList(state = initialState, action){
  switch (action.type) {
    case "updateTaskList":
      return {
        ...state,
        taskList: action.taskList,
      }
    default:
      return state;
  }
}
