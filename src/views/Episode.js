import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorStatus from '../components/ErrorStatus';

export const GET_EPISODE = gql`
query GetEpisode($id: ID!) {
    episode(id: $id) {
      name
      episode
      air_date
      characters {
        id
        name
        image
        origin {
          id
          name
        }
      }
    }
  }
`;

export const Episode = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(
        GET_EPISODE,
        {
            variables: { id: id }
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
        const episode = data.episode;
        const characters = episode.characters.map((ch) => {
            return (
                <div key={ch.id} className="item">
                    <img className="ui avatar image" src={ch.image} alt={ch.name} />
                    <div className="content">
                        <Link className="header" to={`/character/${ch.id}`}>{ch.name}</Link>
                        <p>{ch.origin.name}</p>
                    </div>
                </div>);
        }
        );
        return (
            <div className="ui items">
                <div className="item">
                    <div className="content">
                        <h1 className="ui header">{episode.name}</h1>
                        <div className="description">
                            <div className="ui bulleted list">
                                {episode.air_date && <div className="item"><strong>Air Date:</strong> {episode.air_date}</div>}
                                {episode.episode && <div className="item"><strong>Episode:</strong> {episode.episode}</div>}
                            </div>
                            <h3>Characters</h3>
                            <div className="ui relaxed divided list">
                                {characters}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}