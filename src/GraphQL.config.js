import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import Api from './BE.config'
export default new ApolloClient({
  uri: Api.concat('/api/graphql'),
  cache: new InMemoryCache(),
});


