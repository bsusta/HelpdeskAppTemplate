import gql from 'graphql-tag';

export const commentFragment = gql`
  fragment CommentInfo on Comment {
      id
      key: id
      content
      createdAt
      task{
        id
      }
      updatedAt
      user {
        id
        email
      }
    }
`;
