import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';


export const taskNameFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
     title_contains:$filter
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;

export const taskAssignedUserFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
      OR: [{
        assignedUser:{
          firstName_contains:$filter,
        }
      }, {
        assignedUser:{
          surName_contains:$filter,
        }
      }]
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;

export const taskRequesterFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
      OR: [{
        requester:{
          firstName_contains:$filter,
        }
      }, {
        requester:{
          surName_contains:$filter,
        }
      }]
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;

export const taskCompanyFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
     company:{
       name_contains:$filter
     }
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;
export const taskProjectFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
     project:{
       title_contains:$filter
     }
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;

export const taskStatusFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
     status:{
       name_contains:$filter
     }
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;
export const taskCreatedByFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
      OR: [{
        createdBy:{
          firstName_contains:$filter,
        }
      }, {
        createdBy:{
          surName_contains:$filter,
        }
      }]
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;

export const taskWorkHoursFilter = gql`
  query allTasks ($filter:Int,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
     duration:$filter
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;
export const taskDescriptionFilter = gql`
  query allTasks ($filter:String,$after: String, $limit: Int) {
       allTasks (
   after: $after,
   first: $limit,
   orderBy: createdAt_DESC,
   filter: {
     description_contains:$filter
    }
   )
   {
    ...TaskInfo
  }
}	${taskFragment}
`;
export const subscribeToMoreTasks = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
        ...TaskInfo
			}
		}
	}${taskFragment}
`;
