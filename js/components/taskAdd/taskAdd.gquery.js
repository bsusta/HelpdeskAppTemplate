import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';


export const createTask = gql`
	mutation CreateTask($title: String!,$description: String) {
		createTask(
      title: $title,
      description: $description,
		) {
		  ...TaskInfo
		}
	}
	${taskFragment}
`;
