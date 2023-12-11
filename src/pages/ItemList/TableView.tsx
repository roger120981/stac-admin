import { Link, useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { StacItem } from "stac-ts";

import SortableTh, { Sort } from "../../components/SortableTh";
import { Loading } from "../../components";
import { LoadingState } from "../../types";

type TableViewProps = {
  results?: {
    type: "FeatureCollection";
    features: StacItem[]
  };
  state: LoadingState;
  compact: boolean;
  sort: Sort;
  handleSort: (sort: Sort) => void;
  highlightItem?: string;
  setHighlightItem: (id?: string) => void;
}

function TableView({
  results,
  state,
  compact,
  sort,
  handleSort,
  highlightItem,
  setHighlightItem
}: TableViewProps) {
  const navigate = useNavigate();

  return (
    <TableContainer flex="1">
      <Table size="sm">
        <Thead>
          <Tr>
            <SortableTh fieldName="id" sort={sort} setSort={handleSort}>ID</SortableTh>
            {!compact && <SortableTh fieldName="collection" sort={sort} setSort={handleSort}>Collection</SortableTh>}
            <Th aria-label="Actions" />
          </Tr>
        </Thead>
        <Tbody>
          { !results || state === "LOADING" ? (
            <Tr>
              <Td colSpan={3}>
                <Loading>Loading items...</Loading>
              </Td>
            </Tr>
          ) : (
            results.features.map(({ id, collection }: StacItem) => (
              <Tr
                key={id}
                onMouseEnter={() => setHighlightItem(id)}
                onMouseLeave={() => setHighlightItem()}
                onClick={() => navigate(`/collections/${collection}/items/${id}/`)}
                bgColor={highlightItem === id ? "gray.50" : "inherit"}
                _hover={{ cursor: "pointer" }}
              >
                <Td>{id}</Td>
                {!compact && <Td>{collection}</Td>}
                <Td fontSize="sm">
                  <Link to={`/collections/${collection}/items/${id}/`} aria-label={`View item ${id}`}>View</Link>
                  {" "}|{" "}
                  <Link to={`/collections/${collection}/items/${id}/edit/`} aria-label={`Edit item ${id}`}>Edit</Link>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableView;
