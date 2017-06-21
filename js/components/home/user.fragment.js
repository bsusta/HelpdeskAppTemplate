import gql from 'graphql-tag';

export const userFragment = gql`
  fragment UserInfo on User {
      id
      active
      email
      password
      note
      firstName
      surName
      company {
        id
        name
      }
    }
`;
