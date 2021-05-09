import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTER, Character } from '../views/Character';
import { MemoryRouter as Router, Route } from "react-router-dom";

const characterMock = {
    request: {
        query: GET_CHARACTER,
        variables: { id: "1" }
    },
    result: {
        data:
        {
            character: {
                name: "test name",
                status: "test",
                species: "test",
                type: "test",
                gender: "test",
                image: "test",
                origin: {
                    id: "1",
                    name: "test"
                },
                location: {
                    id: "test",
                    name: "test"
                },
                episode: [
                    {
                        id: "test",
                        episode: "test",
                        name: "test",
                        air_date: "test"
                    }
                ]
            }
        }
    }

}

it('Test Character', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={[characterMock]} addTypename={false}>
            <Router initialEntries={["/character/1"]}>
                <Route path="/character/:id">
                    <Character />
                </Route>
            </Router>
        </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    const h1 = component.root.findByType('h1');
    expect(h1.children.join('')).toContain('test name');
});