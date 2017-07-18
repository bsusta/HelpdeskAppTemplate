import gql from 'graphql-tag';

export default inboxTasks =  gql`
  query Tasks($id:ID!) {
       allTasks (
         orderBy: id_DESC,
         filter:
           {
           assignedUser:{
             id:$id
           }
         }
       )
       {
    title
    description
		id
    key: id
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
    status
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
