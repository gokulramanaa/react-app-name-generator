import React from 'react';
import { Typography } from '@mui/material';

type propTypes = {};

type stateTypes = {
    value: string,
};

async function asyncFetch(url: string, params: any = {}): Promise<Response> {
    const credentialObj = Object.assign({ credentials: 'omit', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, }, params);
    return fetch(url, credentialObj);
}

export default class ResultsPage extends React.Component<propTypes, stateTypes> {
    constructor(props: propTypes) {
        super(props);
        this.state = {
            value: 'aldkjf',
        }
    }

    componentDidMount = async () => {
        const url = 'https://azure-django-app.azurewebsites.net/names/?num_results=50';
        const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            // credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
        });
        if (!response.ok) {
            debugger;
            const error = `Exception while fetching next alerts page from server ${response.status}`;
            console.log(error);
            return;
        }
        const data = await response.json();
        console.log(data);
        // debugger;
    }

    render(): React.ReactNode {
        const { value } = this.state;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Results
                </Typography>
                <div>{value}</div>
            </React.Fragment>
        );
    }
}