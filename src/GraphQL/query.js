import Graph from '../GraphQL.config';
import {gql} from '@apollo/client';
export const getAllFood =  Graph.query({
  query: gql`
    query {
      food {
        data {
          id
          food_name
          type
          price
        }
        message
      }
    }
  `
})
