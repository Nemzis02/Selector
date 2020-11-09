import React, { useEffect, useState, useMemo } from 'react';
import { Selector } from './Selector';

const askPermission = () => {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.");
    }
  });
};

const fetchData = async ({ path, query, options }) => {
  const baseUrl = 'http://localhost:3040';
  let search = '';

  if (query) {
    Object.keys(query).forEach(
      (key, i, arr) =>
        (search += `${i === 0 ? '?' : ''}${key}=${query[key]}${
          arr.length - 1 !== i ? '&' : ''
        }`)
    );
  }

  const url = baseUrl + path + search;

  if (!path) {
    console.error('No path provided');
    return [];
  }

  try {
    return await fetch(`${url}`, options).then((res) => res.json());
  } catch (error) {
    console.error(error);
    return [];
  }
};

const sendNotification = ({ title, body }) => {
  fetchData({
    path: '/trigger-push-msg',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: window.localStorage.getItem('messageSubscription'),
        payload: {
          notification: {
            title,
            body,
          },
        },
      }),
    },
  });
};

const normalizeData = (data) =>
  data.map(({ _id, id, name: text, ...rest }) => {
    return { id: id || _id, text, ...rest };
  });

const App = () => {
  const [mongoLanguages, setMongoLanguages] = useState(null);
  const [postgresLanguages, setPostgresLanguages] = useState(null);
  const [
    postgresRatingRangeLanguages,
    setPostgresRatingRangeLanguages,
  ] = useState(null);

  useEffect(() => {
    const fetchMongoLanguages = async () => {
      const mongoLanguages = await fetchData({ path: '/mongo' });
      setMongoLanguages(normalizeData(mongoLanguages));
    };

    const fetchPostgresLanguages = async () => {
      const postgresLanguages = await fetchData({ path: '/postgres' });
      setPostgresLanguages(normalizeData(postgresLanguages));
    };

    const fetchPostgresRatingRangeLanguages = async (ratingMin, ratingMax) => {
      const postgresLanguages = await fetchData({
        path: '/postgres',
        query: {
          ratingMin,
          ratingMax,
        },
      });

      setPostgresRatingRangeLanguages(normalizeData(postgresLanguages));
    };

    fetchPostgresLanguages();
    fetchMongoLanguages();
    fetchPostgresRatingRangeLanguages(4, 8);
  }, []);

  const computedRangePostgresOptions = useMemo(() => {
    return (
      postgresRatingRangeLanguages &&
      postgresRatingRangeLanguages.map(({ id, text, rating }) => ({
        id,
        text: `${text} ${rating}`,
      }))
    );
  }, [postgresRatingRangeLanguages]);

  const onChange = (value) => {
    askPermission().then(() =>
      sendNotification({ title: 'Language:', body: value.text })
    );
  };

  return (
    <>
      <Selector
        label='MongoDB languages:'
        options={mongoLanguages || []}
        placeholder='Select language...'
        onChange={onChange}
      />
      <Selector
        label='Postgres languages:'
        options={postgresLanguages || []}
        placeholder='Select language...'
      />
      <Selector
        label='Postgres langs from 4 to 8:'
        options={computedRangePostgresOptions || []}
        placeholder='Select language...'
      />
    </>
  );
};

export default App;
