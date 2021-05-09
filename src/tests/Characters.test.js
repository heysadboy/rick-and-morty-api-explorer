import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTERS, Characters } from '../views/Characters';
import { MemoryRouter as Router, Route } from "react-router-dom";

const charactersMock = {
    request: {
        query: GET_CHARACTERS,
        variables: { page: 1 }
    },
    result: {
        data:
        {
            characters: {
                info: {
                    count: "1",
                    pages: "1",
                    prev: "1",
                    next: "1",
                },
                results: [
                    {
                        id: "1",
                        name: "test name",
                        species: "test",
                        origin: {
                            id: "1",
                            name: "test"
                        },
                        location: {
                            id: "1",
                            name: "test"
                        }
                    }
                ]
            }

        }
    }
}

it('Test Characters', async () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={[charactersMock]} addTypename={false}>
            <Router initialEntries={["/characters"]}>
                <Route path="/characters">
                    <Characters />
                </Route>
            </Router>
        </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    const td = component.root.findAllByType('td')[0];
    expect(td.children.join('')).toContain('test name');
});