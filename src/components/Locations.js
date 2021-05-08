import React, { useState } from 'react';
import PaginationFooter from './PaginationFooter';
import { gql, useQuery } from '@apollo/client';
import Table from './Table';
import Loader from './Loader';
import ErrorStatus from './ErrorStatus';
import locationsHeader from '../data/LocationsHeader.json';

const GET_LOCATIONS = gql`
query GetLocations($page: Int!) {
    locations(page: $page) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

const Locations = () => {
    const type = "Locations";
    const [page, setPage] = useState(1);
    const headerData = locationsHeader;

    const { loading, error, data } = useQuery(
        GET_LOCATIONS,
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
        return (
            <div>
                <ErrorStatus message={error.message} />
            </div>
        );
    }

    if (!loading && !error) {
        const rows = data.locations.results.map(row => {
            return (
                <tr key={row.id}>
                    <td data-label="Name" className="five wide">{row.name}</td>
                    <td data-label="Type" className="five wide">{row.type}</td>
                    <td data-label="Dimension" className="five wide">{row.dimension}</td>
                    <td data-label="Action" className="one wide"><button className="ui green basic button">View</button></td>
                </tr>
            );
        });

        return (
            <div>
                <Table title={type} headerData={headerData} rows={rows} />
                <PaginationFooter data={data.locations.info} type={type.toLowerCase()} setPage={setPage} currentTotal={data.locations.results.length} />
            </div>
        );
    }
}

export default Locations;