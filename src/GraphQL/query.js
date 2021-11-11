import Graph from "../GraphQL.config";
import { gql } from "@apollo/client";
export const getAllFood = () => {
  return Graph.query({
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
    `,
  });
};
export const getComment = (foodId = "asd") => {
  return Graph.query({
    query: gql`
      query {
        comment(foodId: "${foodId}"){
          data {
            foodId
            content
            time
            username
            id
          }
          message
        }
      }
    `,
  });
};

export const sendComment = (foodId = "asd", content, token) => {
  return Graph.mutate({
    mutation: gql`
      mutation {
        addComment(content: "${content}", foodId: "${foodId}"){
          message
          data {
            userId
            content
            foodId
            username
            time
          }
        }
      }
    `,
    context: {
      headers: {
        token
      }
    }
  })
};


