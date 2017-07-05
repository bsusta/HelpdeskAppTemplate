import gql from 'graphql-tag';

export const InvoiceItemFragment = gql`
  fragment InvoiceItemInfo on InvoiceItem {
      id
      key: id
      createdAt
      name
      price
      quantity
      task{
        id
      }
      unit{
        id
        name
      }
      updatedAt
      user{
        id
        firstName
      }
    }
`;
