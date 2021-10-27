DROP DATABASE IF EXISTS analysis;
CREATE DATABASE analysis;

\c analysis;

CREATE TABLE gap (
  ID SERIAL PRIMARY KEY,
  isClose VARCHAR,
  dateSelected DATE
);

INSERT INTO gap (isClose, dateSelected)
  VALUES ('Si', '2021-10-25'),
         ('No', '2021-10-26');