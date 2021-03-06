import gql from 'graphql-tag';

export const inboxTasks =  gql`
  query Tasks($id:ID!,$statusId:ID,$after: String, $limit: Int) {
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
             id_not:$statusId
           }
         }
       )
       {
    title
    description
		id
    key: id
    createdAt
    assignedUser{
      firstName
			surName
      id
    }
		createdBy{
			firstName
			surName
			id
		}
    deadlineAt
    duration
    status{
      id
      color
      name
    }
    requester{
      id
			firstName
			surName
    }
    company{
      id
			name
    }
		project{
			id
			title
		}
	 }
  }
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
    title
    description
		id
    key: id
    createdAt
    assignedUser{
      firstName
			surName
      id
    }
		createdBy{
			firstName
			surName
			id
		}
    deadlineAt
    duration
    status{
      id
      color
      name
    }

    requester{
      id
			firstName
			surName
    }
    company{
      id
			name
    }
		project{
			id
			title
		}
	 }
  }
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
    title
    description
		id
    key: id
    createdAt
    assignedUser{
      firstName
			surName
      id
    }
		createdBy{
			firstName
			surName
			id
		}
    deadlineAt
    duration
    status{
      id
      color
      name
    }

    requester{
      id
			firstName
			surName
    }
    company{
      id
			name
    }
		project{
			id
			title
		}
	 }
  }
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
    title
    description
		id
    key: id
    createdAt
    assignedUser{
      firstName
			surName
      id
    }
		createdBy{
			firstName
			surName
			id
		}
    deadlineAt
    duration
    status{
      id
      color
      name
    }

    requester{
      id
			firstName
			surName
    }
    company{
      id
			name
    }
		project{
			id
			title
		}
	 }
  }
`;

export const subscribeToMoreTasks = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
        createdAt
        title
        description
    		id
        key: id
				assignedUser{
          firstName
					surName
          id
        }
        deadlineAt
        duration
        status{
          id
          color
          name
        }
				requester{
					firstName
					surName
          id
        }
				createdBy{
					firstName
					surName
          id
        }
        company{
          id
					name
        }
				project{
					id
					title
				}

			}
		}
	}
`;
