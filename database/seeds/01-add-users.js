exports.seed = function(knex) {
  // Inserts seed entries
  return knex('users').insert([
    {
      full_name: 'Lisa Wilton',
      slack_id: 'Lisa Wilton',
      username: 'Lisawilton',
      email_address: 'lisa@lambdaschool.com',
      location: '',
      longitude: '0.1278',
      latitude: '51.5074',
      profile_picture: '',
    },
    {
      full_name: 'Chioma Nkem-Eze',
      slack_id: 'Jessica Eze',
      username: 'chiomaeze',
      email_address: 'chioma@lambdaschool.com',
      location: '',
      longitude: '-84.386330',
      latitude: '33.753746',
      profile_picture: '',
    },
    {
      full_name: 'Victor Aworo',
      slack_id: 'Victor',
      username: 'Victor',
      email_address: 'vic@lambdaschool.com',
      location: '',
      longitude: '',
      latitude: '',
      profile_picture: '',
    },
    {
      full_name: 'Emily Abrahart',
      slack_id: 'Emily',
      username: 'Emily',
      email_address: 'emily@lambdaschool.com',
      location: '',
      longitude: '',
      latitude: '',
      profile_picture: '',
    },
    {
      full_name: 'Martins Onyedikachi',
      slack_id: 'Martins O-U',
      username: 'Martins O-U',
      email_address: 'mato@lambdaschool.com',
      location: '',
      longitude: '',
      latitude: '',
      profile_picture: '',
    },
  ]);
};
