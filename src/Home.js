import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things, topRanked, max, usersWithMost })=> {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Here at the Acme Item Tracker Corp we have { users.length } users and { things.length } things!
      </p>
      <h2>Top Ranked</h2>
      <ul>
        {
          topRanked.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
              </li>
            );
          })
        }
      </ul>
      <h2>Users With Most Things ({ max} )</h2>
      <ul>
      {
        usersWithMost.map( user => {
          return (
            <li key={ user.id }>{ user.name }</li>
          );
        })
      }
      </ul>
    </div>
  );
};

const mapSToP = (s)=> {
  const topRank = Math.max(...s.things.map(thing => thing.ranking));
  const topRanked = s.things.filter(thing => thing.ranking === topRank);
  //map of userId to count of their things
  const userThingMap = s.things.reduce((acc, thing)=> {
    if(thing.userId !== null){
      acc[thing.userId] = acc[thing.userId] || [];
      acc[thing.userId]++;
    }
    return acc;
  }, {});
  let max = 0;
  const entries = Object.entries(userThingMap);
  //find the max amount of things owned by any user
  entries.forEach( entry => {
    if(entry[1] >= max){
      max = entry[1];
    }
  });
  const usersWithMost = [];
  //find the users who have the max things
  entries.forEach( entry => {
    //we want the user, not the userId (all keys are strings)
    const user = s.users.find(user => user.id === entry[0]*1);
    if(user){
      usersWithMost.push(user);
    }
  });

  return {
    max,
    users: s.users,
    things: s.things,
    topRanked,
    usersWithMost
  };
};

export default connect(mapSToP)(Home);
