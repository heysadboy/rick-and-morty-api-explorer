import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_LOCATIONS, Locations } from '../views/Locations';
import { MemoryRouter as Router, Route } from "react-router-dom";

const locationsMock = {
    request: {
        query: GET_LOCATIONS,
        variables: { page: 1 }
    },
    result: {
        data:
        {
            locations: {
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
                        type: "test",
                        dimension: "test"
                    }
                ]
            }

        }
    }
}

it('Test Locations', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={[locationsMock]} addTypename={false}>
            <Router initialEntries={["/locations"]}>
                <Route path="/locations">
                    <Locations />
                </Route>
            </Router>
        </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    const td = component.root.findAllByType('td')[0];
    expect(td.children.join('')).toContain('test name');
});