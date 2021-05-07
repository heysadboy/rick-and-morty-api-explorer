import React, { useState } from 'react';
import PaginationFooter from './PaginationFooter';
import { gql, useQuery } from '@apollo/client';
import Table from './Table';
import Loader from './Loader';
import ErrorStatus from './ErrorStatus';
import charactersHeader from '../data/CharactersHeader.json';

const GET_CHARACTERS = gql`
query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        species
        origin {
          id
          name
        }
        location {
          id
          name
        }
      }
    }
  }
`;

const Characters = () => {
    const type = "Characters";
    const [page, setPage] = useState(1);
    const headerData = charactersHeader;

    const { loading, error, data } = useQuery(
        GET_CHARACTERS,
        {
            variables: { page: page }
        }
    );

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (error) {
        console.log(error.message);
        console.log(Object.keys(error))
        return (
            <div>
                <ErrorStatus message={error.message} />
            </div>
        );
    }

    if (!loading && !error) {
        console.log(data.characters.info);
        const rows = data.characters.results.map(row => {
            return (
                <tr key={row.id}>
                    <td data-label="Name" className="four wide">{row.name}</td>
                    <td data-label="Species" className="three wide">{row.species}</td>
                    <td data-label="Origin" className="four wide">{row.origin.name}</td>
                    <td data-label="Location" className="four wide">{row.location.name}</td>
                    <td data-label="Action" className="one wide"><button className="ui green basic button">View</button></td>
                </tr>
            );
        });

        return (
            <div>
                <Table title={type} headerData={headerData} rows={rows} />
                <PaginationFooter data={data.characters.info} type={type.toLowerCase()} setPage={setPage} currentTotal={data.characters.results.length} />
            </div>
        );
    }
}

export default Characters;