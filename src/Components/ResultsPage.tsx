import React from 'react';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';

type propTypes = {
    values: string[],
};

const ResultsPage = (props: propTypes): React.FunctionComponentElement<propTypes> => {
    const { values = []} = props;

    const generate = () => {
        return values.map((value) =>
        (
            <ListItem
                key={value}
                dense
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <InfoIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <LabelImportantOutlinedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={value}
                />
            </ListItem>
        )
        );
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Results
            </Typography>
            <List>
                {generate()}
            </List>
        </React.Fragment>
    );
}

export default ResultsPage;
