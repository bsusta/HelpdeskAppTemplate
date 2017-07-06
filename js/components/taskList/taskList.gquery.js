import gql from 'graphql-tag';
mutation updateTask($title: String!,$description: String,$id: ID!,$assignedUserId: ID,$deadlineAt: DateTime,$duration:Int,$status:TASK_STATUS,$requesterId:ID,$companyId:ID) {

export const tasks = gql`
  query Tasks {
       allTasks (orderBy: id_DESC) {
    title
    description
		id
    key: id
    assignedUser{
      firstName
      id
    }
    deadlineAt
    duration
    status
    requester{
      id
    }
    company{
      id
    }
	 }
  }
`;

export const editedTasksSubscription = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
        title
        description
    		id
        key: id
        assignedUser{
          firstName
          id
        }
        deadlineAt
        duration
        status
        requester{
          id
        }
        company{
          id
        }
			}
		}
	}
`;
