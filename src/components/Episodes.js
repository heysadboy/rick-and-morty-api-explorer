import React, { useState } from 'react';
import PaginationFooter from './PaginationFooter';
import { gql, useQuery } from '@apollo/client';
import Table from './Table';
import Loader from './Loader';
import ErrorStatus from './ErrorStatus';
import episodesHeader from '../data/EpisodesHeader.json';

const GET_EPISODES = gql`
query GetEpisodes($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const Episodes = () => {
    const type = "Episodes";
    const [page, setPage] = useState(1);
    const headerData = episodesHeader;

    const { loading, error, data } = useQuery(
        GET_EPISODES,
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
        const rows = data.episodes.results.map(row => {
            return (
                <tr key={row.id}>
                    <td data-label="Name" className="five wide">{row.name}</td>
                    <td data-label="Air Date" className="five wide">{row.air_date}</td>
                    <td data-label="Episode" className="five wide">{row.episode}</td>
                    <td data-label="Action" className="one wide"><button className="ui green basic button">View</button></td>
                </tr>
            );
        });

        return (
            <div>
                <Table title={type} headerData={headerData} rows={rows} />
                <PaginationFooter data={data.episodes.info} type={type.toLowerCase()} setPage={setPage} currentTotal={data.episodes.results.length} />
            </div>
        );
    }
}

export default Episodes;