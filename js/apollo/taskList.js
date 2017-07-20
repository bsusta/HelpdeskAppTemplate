const initialState = {
  taskList: [],
  numberOfTasks: 3,
};
export const UPDATE_TASKLIST= 'updateTaskList';

export default function updateTaskList(state = initialState, action){
  switch (action.type) {
    case UPDATE_TASKLIST:
      return {
        ...state,
        taskList: action.taskList,
      }
    default:
      return state;
  }
}
