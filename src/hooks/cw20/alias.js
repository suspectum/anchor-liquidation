import { gql } from '@apollo/client';

const stringify = (msg) => JSON.stringify(msg).replace(/"/g, '\\"');

const aliasItem = ({ contract, msg }) =>
  `
    ${contract}: WasmContractsContractAddressStore(
      ContractAddress: "${contract}"
      QueryMsg: "${stringify(msg)}"
    ) {
      Height
      Result
    }`;

export const alias = (list) => gql`
  query {
    ${list.map(aliasItem)}
  }
`;
