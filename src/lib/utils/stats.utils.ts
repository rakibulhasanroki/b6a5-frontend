export const hasParticipantData = (stats: any) => {
  return stats?.participant?.eventsJoined > 0;
};

export const hasOrganizerData = (stats: any) => {
  return stats?.organizer?.eventsCreated > 0;
};

export const isAdmin = (stats: any) => {
  return !!stats?.admin;
};
