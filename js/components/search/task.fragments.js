import gql from 'graphql-tag';

export const taskFragment = gql`
  fragment TaskInfo on Task {
    title
    description
    repeat{
      id
      every
      repeated
      startDate
      times
    }
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
    pendingAt
    closedAt
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
`;
