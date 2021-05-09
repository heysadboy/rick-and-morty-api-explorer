import React, { useState } from 'react';
import PaginationFooter from '../components/PaginationFooter';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import Loader from '../components/Loader';
import ErrorStatus from '../components/ErrorStatus';
import locationsHeader from '../data/LocationsHeader.json';

export const GET_LOCATIONS = gql`
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

export const Locations = () => {
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
                    <td data-label="Actions" className="one wide"><Link className="ui green basic button" to={`/location/${row.id}`}>View</Link></td>
                </tr>
            );
        });

        let start;
        let end;

        if (data.locations.info.prev == null) {
            start = 1;
            end = data.locations.results.length;
        }

        if (data.locations.info.next == null) {
            start = data.locations.info.count - data.locations.results.length + 1;
            end = data.locations.info.count;
        }

        if (data.locations.info.next != null && data.locations.info.prev != null) {
            start = (data.locations.info.prev * data.locations.results.length) + 1;
            end = (data.locations.info.prev + 1) * data.locations.results.length;
        }

        return (
            <div>
                <Table title={type} headerData={headerData} rows={rows} />
                <PaginationFooter data={data.locations.info} type={type.toLowerCase()} setPage={setPage} start={start} end={end} />
            </div>
        );
    }
}