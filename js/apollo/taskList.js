const initialState = {
  taskList: [],
  includedIds:new Set(),
  endId:{

  }
};
export const ADD_TO_TASKLIST= 'updateTaskList';

export default function updateTaskList(state = initialState, action){
  switch (action.type) {
    case ADD_TO_TASKLIST:
      {
        let filteredTasks=action.taskList.filter((task)=>!state.includedIds.has(task.id));
        filteredTasks.map((task)=>state.includedIds.add(task.id));
        if(filteredTasks.length==0)
        {
          return state;
        }
        let newEndId=Object.assign(state.endId);
        newEndId[action.projectID]=filteredTasks[filteredTasks.length-1].id;
          return {
            ...state,
            endId: newEndId,
            taskList:[...state.taskList,...filteredTasks]
        }
      }

    default:
      return state;
    }
}
