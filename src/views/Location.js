import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorStatus from '../components/ErrorStatus';

export const GET_LOCATION = gql`
query GetLocation($id: ID!) {
    location(id: $id) {
      name
      type
      dimension
      residents {
        id
        name
        status
        image
      }
    }
  }
`;

export const Location = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(
        GET_LOCATION,
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
        const location = data.location;
        const residents = location.residents.map((ch) => {
            return (
                <div key={ch.id} className="item">
                    <img className="ui avatar image" src={ch.image} alt={ch.name} />
                    <div className="content">
                        <Link className="header" to={`/character/${ch.id}`}>{ch.name}</Link>
                        <p>{ch.status}</p>
                    </div>
                </div>);
        }
        );
        return (
            <div className="ui items">
                <div className="item">
                    <div className="content">
                        <h1 className="ui header">{location.name}</h1>
                        <div className="description">
                            <div className="ui bulleted list">
                                {location.dimension && <div className="item"><strong>Dimension:</strong> {location.dimension}</div>}
                                {location.type && <div className="item"><strong>Type:</strong> {location.type}</div>}
                            </div>
                            <h3>Residents</h3>
                            <div className="ui relaxed divided list">
                                {residents}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}