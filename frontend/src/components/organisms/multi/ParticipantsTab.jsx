import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import CustomOption from '../../molecules/CustomOption';

const ParticipantsTab = () => {
  // const userId = 'myUserId';
  const nickname = useSelector((state) => state.auth.user.nickname);
  const participants = useSelector((state) => state.participant.participants);
  const hostNickname = useSelector((state) => state.room.hostId);
  const user = useSelector((state) => state.auth.user);
  const participantsWithoutMe = participants.filter(
    (participant) => participant !== nickname
  );

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          {nickname === hostNickname ? (
            <ListItemText primary={`${nickname}(host)`} />
          ) : (
            <ListItemText primary={nickname} />
          )}
        </ListItem>
        {participantsWithoutMe.map((participant, index) => (
          <ListItem
            key={index}
            secondaryAction={<CustomOption participant={participant} />}
          >
            {participant === hostNickname ? (
              <ListItemText primary={`${participant}(host)`} />
            ) : (
              <ListItemText primary={participant} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ParticipantsTab;
