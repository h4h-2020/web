INSERT INTO tags (name) values ('housing security');
INSERT INTO tags (name) values ('health');
INSERT INTO tags (name) values ('transportation');
INSERT INTO tags (name) values ('food');
INSERT INTO tags (name) values ('reentry');

INSERT INTO social_services (title, fee, location, required_documents, description, attributes_id, link) VALUES ('One Time Rent Assistance', '0', 'Sacred Heart Community Service 1381 South First St.  San José, CA 95110', 'a government issued id', 'One time asistance for rent, utilities, and bills from Salvation Army.', 1, 'https://sacredheartcs.org/');
INSERT INTO social_services (title, fee, location, required_documents, description, attributes_id, link) VALUES ('Soup Kitchen', '0', '1534 Berger Drive, San Jose, CA 95112', 'none', 'Soup kitchen from Loaves and Fishes. (408) 922-9085', 2, 'https://www.loavesfishes.org/');
INSERT INTO social_services (title, fee, location, required_documents, description, attributes_id, link) VALUES ('Shelters', '0', '546 W. Julian Street San Jose, CA 95110', 'a government issued id', 'LifeMoves provides shelter and services to families and single adults in Santa Clara County. (650) 533-9299', 3, 'https://lifemoves.org/santa-clara-county/');
INSERT INTO social_services (title, fee, location, required_documents, description, attributes_id, link) VALUES ('Subsidized Housing', '0', 'West Valley Community Services, 10104 Vista Dr, Cupertino, CA 95014, USA', 'a government issued id', 'West Valley Community Service subsidized housing options. Phone (408) 255-8033', 4, 'https://www.wvcommunityservices.org/housing');
INSERT INTO social_services (title, fee, location, required_documents, description, attributes_id, link) VALUES ('Disability Paratransit', '0', 'VTA Customer Services 3331 North First Street, Building B San Jose, CA 95134-1906', 'a government issued id, a proof of disability', 'Public transportation services for adults with disabilities. Telephone: (408) 321-2300', 5, 'https://www.vta.org/go/accessibility');

INSERT INTO social_services_tags (social_services_id, tags_id) VALUES (1, 1);
INSERT INTO social_services_tags (social_services_id, tags_id) VALUES (1, 2);
INSERT INTO social_services_tags (social_services_id, tags_id) VALUES (2, 4);
INSERT INTO social_services_tags (social_services_id, tags_id) VALUES (3, 1);
INSERT INTO social_services_tags (social_services_id, tags_id) VALUES (3, 2);
INSERT INTO social_services_tags (social_services_id, tags_id) VALUES (4, 1);
INSERT INTO social_services_tags (social_services_id, tags_id) VALUES (5, 3);

INSERT INTO attributes (
  citizenship,
  ssn,
  residency,
  languages,
  income_level,
  children,
  birthdate,
  age,
  disability,
  medical_history,
  education
) VALUES ('t', 't', 'Santa Clara County', 'English', '', 't', '', '> 19', 'f', 'N/A', 'N/A');

INSERT INTO attributes (
  citizenship,
  ssn,
  residency,
  languages,
  income_level,
  children,
  birthdate,
  age,
  disability,
  medical_history,
  education
) VALUES ('f', 'f', 'Santa Clara County', '', '', 'f', '', '> 19', 'f', 'N/A', 'N/A');

INSERT INTO attributes (
  citizenship,
  ssn,
  residency,
  languages,
  income_level,
  children,
  birthdate,
  age,
  disability,
  medical_history,
  education
) VALUES ('f', 'f', 'Santa Clara County', '', '', 'f', '', '> 19', 'f', 'N/A', 'N/A');

INSERT INTO attributes (
  citizenship,
  ssn,
  residency,
  languages,
  income_level,
  children,
  birthdate,
  age,
  disability,
  medical_history,
  education
) VALUES ('t', 't', 'Santa Clara County', 'English, Spanish', '< $35,000/year', 'f', '', '> 19', 'f', 'N/A', 'N/A');

INSERT INTO attributes (
  citizenship,
  ssn,
  residency,
  languages,
  income_level,
  children,
  birthdate,
  age,
  disability,
  medical_history,
  education
) VALUES ('t', 't', 'Santa Clara County', 'English, Spanish', 'N/A', 'f', '', 'N/A', 't', 'N/A', 'N/A');
