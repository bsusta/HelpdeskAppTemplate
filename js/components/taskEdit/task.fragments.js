import gql from 'graphql-tag';

export const taskFragment = gql`
  fragment TaskInfo on Task {
      id
      key: id
      title
      description
      active
      createdAt
      duration
      important
      project {
        id
        title
      }
      company {
        id
        name
      }
      user {
        id
        email
      }
      assignedUser {
        id
        email
      }
      invoiceItems {
        id
        name
        price
        quantity
        unit {
          id
          name
        }
      }
      comments {
        id
        content
        createdAt
      }
      subtasks(orderBy:createdAt_DESC) {
        id
        name
        createdAt
        user {
         id    
         email
        }
      }
      _commentsMeta {
        count
      }
      _subtasksMeta {
        count
      }
    }
`;

