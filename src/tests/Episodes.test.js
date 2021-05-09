import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_EPISODES, Episodes } from '../views/Episodes';
import { MemoryRouter as Router, Route } from "react-router-dom";

const episodesMock = {
    request: {
        query: GET_EPISODES,
        variables: { page: 1 }
    },
    result: {
        data:
        {
            episodes: {
                info: {
                    count: "1",
                    pages: "1",
                    prev: "1",
                    next: "1"
                },
                results: [
                    {
                        id: "1",
                        name: "test name",
                        air_date: "test",
                        episode: "test"
                    }
                ]
            }

        }
    }
}

it('Test Episodes', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={[episodesMock]} addTypename={false}>
            <Router initialEntries={["/episodes"]}>
                <Route path="/episodes">
                    <Episodes />
                </Route>
            </Router>
        </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    const td = component.root.findAllByType('td')[0];
    expect(td.children.join('')).toContain('test name');
});