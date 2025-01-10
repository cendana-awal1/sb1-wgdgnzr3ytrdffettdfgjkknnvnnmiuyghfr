/*
  # Add sample candidates

  1. Data Changes
    - Insert 10 sample candidates into the candidates table
*/

INSERT INTO candidates (name, votes)
VALUES 
  ('Ahmad Fauzi', 0),
  ('Budi Santoso', 0),
  ('Citra Dewi', 0),
  ('Dian Pratama', 0),
  ('Eko Widodo', 0),
  ('Farah Amelia', 0),
  ('Gunawan Wibowo', 0),
  ('Hana Safira', 0),
  ('Irfan Hakim', 0),
  ('Joko Susanto', 0)
ON CONFLICT (id) DO NOTHING;