import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_EPISODE, Episode } from '../views/Episode';
import { MemoryRouter as Router, Route } from "react-router-dom";

const episodeMock = {
    request: {
        query: GET_EPISODE,
        variables: { id: "1" }
    },
    result: {
        data:
        {
            episode: {
                name: "test name",
                episode: "test",
                air_date: "test date",
                characters: [
                    {
                        id: "1",
                        name: "test",
                        image: "test",
                        origin: {
                            id: "test",
                            name: "test"
                        }
                    }
                ]
            }
        }
    }
}

it('Test Episode', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={[episodeMock]} addTypename={false}>
            <Router initialEntries={["/episode/1"]}>
                <Route path="/episode/:id">
                    <Episode />
                </Route>
            </Router>
        </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    const h1 = component.root.findByType('h1');
    expect(h1.children.join('')).toContain('test name');
});