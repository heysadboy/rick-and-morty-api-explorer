import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Loader from './Loader';
import ErrorStatus from './ErrorStatus';

const GET_CHARACTER = gql`
query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      image
      origin {
        id
        name
      }
      location {
        id
        name
      }
      episode {
        id
        episode
        name
        air_date
      }
    }
  }
`;

const Character = () => {
    const { loading, error, data } = useQuery(
        GET_CHARACTER,
        {
            variables: { id: 1 }
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
        const character = data.character;
        const episodes = character.episode.map((ep) => {
            return (
                <div key={ep.id} className="item">
                    <p className="header">{ep.episode} - {ep.name}</p>
                    <p>{ep.air_date}</p>
                </div>);
        }
        );
        return (
            <div>
                <div className="ui items">
                    <div className="item">
                        <img className="ui image" src={character.image} alt={character.name} />
                        <div className="content">
                            <h1 className="ui header">{character.name}</h1>
                            <div className="description">
                                <div className="ui bulleted list">
                                    {character.location.name && <div className="item"><strong>Location:</strong> {character.location.name}</div>}
                                    {character.gender && <div className="item"><strong>Gender:</strong>  {character.gender}</div>}
                                    {character.origin.name && <div className="item"><strong>Origin:</strong>  {character.origin.name}</div>}
                                    {character.species && <div className="item"><strong>Species:</strong>  {character.species}</div>}
                                    {character.status && <div className="item"><strong>Status:</strong>  {character.status}</div>}
                                    {character.type && <div className="item"><strong>Type:</strong>  {character.type}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui divider"></div>
                <h2>Episodes</h2>
                <div className="ui relaxed divided list">
                    {episodes}
                </div>
            </div>
        );
    }
};

export default Character;