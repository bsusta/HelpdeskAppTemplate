import gql from 'graphql-tag';
import {taskFragment} from './fragments';
export const inboxTasks =  gql`
  query Tasks($id:ID!,$status:String,$after: String, $limit: Int) {
       allTasks (
         after: $after,
         first: $limit,
         orderBy: createdAt_DESC,
         filter:
           {
           assignedUser:{
             id:$id
           }
           status:{
             name:$status
           }
         }
       )
       {
    ...TaskData
	 }
 }${taskFragment}
`;

export const requestedTasks =  gql`
  query Tasks($id:ID!,$status:String,$after: String, $limit: Int) {
       allTasks (
         after: $after,
         first: $limit,
         orderBy: createdAt_DESC,
         filter:
           {
           requester:{
             id:$id
           }
           status:{
             name:$status
           }
         }
       )
       {
    ...TaskData
	 }
 }${taskFragment}
`;


export const closedProjectTasks =  gql`
  query Tasks($id:ID!,$after: String, $limit: Int) {
       allTasks (
         after: $after,
         first: $limit,
         orderBy: createdAt_DESC,
         filter:
           {
           project:{
             id:$id
           },
           status:{
             id:"cj5b6hwro0m5d0161vwmgev4o"
           }
         }
       )
       {
    ...TaskData
	 }
  }${taskFragment}
`;

export const activeProjectTasks =  gql`
  query Tasks($id:ID!,$after: String, $limit: Int) {
       allTasks (
         after: $after,
         first: $limit,
         orderBy: createdAt_DESC,
         filter:
           {
           project:{
             id:$id
           },
           status:{
             id_not:"cj5b6hwro0m5d0161vwmgev4o"
           }
         }
       )
       {
    ...TaskData
	 }
  }${taskFragment}
`;

export const myProjectTasks =  gql`
  query Tasks($id:ID!,$userId:ID!,$after: String, $limit: Int) {
       allTasks (
         after: $after,
         first: $limit,
         orderBy: createdAt_DESC,
         filter:
           {
           project:{
             id:$id
           },
           status:{
             id_not:"cj5b6hwro0m5d0161vwmgev4o"
           },
           assignedUser:{
             id:$userId
           }
         }
       )
       {
    ...TaskData
	 }
  }${taskFragment}
`;

export const subscribeToMoreTasks = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
        ...TaskData
			}
		}
	}${taskFragment}
`;
