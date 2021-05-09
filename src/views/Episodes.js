import React, { useState } from 'react';
import PaginationFooter from '../components/PaginationFooter';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import Loader from '../components/Loader';
import ErrorStatus from '../components/ErrorStatus';
import episodesHeader from '../data/EpisodesHeader.json';

export const GET_EPISODES = gql`
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

export const Episodes = () => {
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
                    <td data-label="Actions" className="one wide"><Link className="ui green basic button" to={`/episode/${row.id}`}>View</Link></td>
                </tr>
            );
        });

        let start;
        let end;

        if (data.episodes.info.prev == null) {
            start = 1;
            end = data.episodes.results.length;
        }

        if (data.episodes.info.next == null) {
            start = data.episodes.info.count - data.episodes.results.length + 1;
            end = data.episodes.info.count;
        }

        if (data.episodes.info.next != null && data.episodes.info.prev != null) {
            start = (data.episodes.info.prev * data.episodes.results.length) + 1;
            end = (data.episodes.info.prev + 1) * data.episodes.results.length;
        }

        return (
            <div>
                <Table title={type} headerData={headerData} rows={rows} />
                <PaginationFooter data={data.episodes.info} type={type.toLowerCase()} setPage={setPage} start={start} end={end} />
            </div>
        );
    }
}