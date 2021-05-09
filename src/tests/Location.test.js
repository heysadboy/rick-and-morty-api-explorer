import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_LOCATION, Location } from '../views/Location';
import { MemoryRouter as Router, Route } from "react-router-dom";

const locationMock = {
    request: {
        query: GET_LOCATION,
        variables: { id: "1" }
    },
    result: {
        data:
        {
            location: {
                name: "test name",
                type: "test",
                dimension: "test",
                residents: [
                    {
                        id: "1",
                        name: "test",
                        status: "test",
                        image: "test"
                    }
                ]
            }
        }
    }
}

it('Test Location', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={[locationMock]} addTypename={false}>
            <Router initialEntries={["/location/1"]}>
                <Route path="/location/:id">
                    <Location />
                </Route>
            </Router>
        </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    const h1 = component.root.findByType('h1');
    expect(h1.children.join('')).toContain('test name');
});