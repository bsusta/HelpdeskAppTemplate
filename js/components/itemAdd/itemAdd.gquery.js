import gql from 'graphql-tag';
import { InvoiceItemFragment } from './invoiceItem.fragments';

export const units = gql`
  query Units {
       allUnits (orderBy: id_DESC) {
		id
		key: id
		name
	 }
  }
`;

export const createInvoiceItem = gql`
	mutation CreateInvoiceItem($name: String!,$price: Float!,$unitId: ID,$quantity: Int!,$taskId: ID!) {
		createInvoiceItem(
			name:$name,
      price: $price,
      unitId: $unitId,
      quantity: $quantity,
      taskId: $taskId,
		) {
			...InvoiceItemInfo
		}
	}
	${InvoiceItemFragment}
`;
