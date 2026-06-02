--
-- PostgreSQL database dump
--

\restrict 6ex4il8MY5eR5YuksO9zbEyQL5JsPvORM2oN0sQRuMqN0EPie2ycLeaq85EcIjQ

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'ChefAdmin', 'password', 'admin', 'admin@cine.delices', '2025-11-23 18:17:59.064+01', '2025-11-23 18:17:59.064+01');
INSERT INTO public.users VALUES (2, 'OumarTheBoss93', '$2b$10$vn.Uf.H2RLaA0Eq/cJPG/Ox430DqIEXXgYn2LkHLcIuWQD5Y3rT2', 'member', 'oumartheboss93@gmail.com', '2025-11-23 19:02:16.408+01', '2025-11-23 19:02:16.408+01');
INSERT INTO public.users VALUES (4, 'ChefRobert', '$argon2id$v=19$m=65536,t=3,p=4$hcamaJONjW4IiFil2ltpNQ$q4AO6af5YwwiopfxgBSZFf7Wx71tbrifn6BAvc9n2a0', 'member', 'robert.patrick@gmail.com', '2025-12-23 21:42:03.324+01', '2025-12-23 21:42:03.324+01');
INSERT INTO public.users VALUES (5, 'ChefTest', '$argon2id$v=19$m=65536,t=3,p=4$QwNcRI8Sl2/ku/DHyrwggg$NxdstVGnhmfr0Di+VrA7UEMitsjqzePssKr8oXQq+pc', 'member', 'ChefTest@gmail.com', '2026-01-03 13:25:36.901+01', '2026-01-03 13:25:36.901+01');
INSERT INTO public.users VALUES (9, 'ChefSultan', '$argon2id$v=19$m=65536,t=3,p=4$nCDY3LnhTzFhlH/+Z6y70w$xcF+Z49k8M0wItb3QCfgAQuVsW9hk2YdYjJ4WPXhHsY', 'member', 'ChefSultan@gmail.com', '2026-01-03 14:45:07.121+01', '2026-01-03 14:45:07.121+01');
INSERT INTO public.users VALUES (3, 'ChefOumar', '$argon2id$v=19$m=65536,t=3,p=4$aKVNA7pPwOqFqEYStV3/Dw$4r8yURYg07bYgYFEPXKDin2d85NBOwMy4Vd7Zw6JRGY', 'admin', 'chefoumar@gmail.com', '2025-12-06 15:28:40.695+01', '2026-01-14 20:04:15.875+01');
INSERT INTO public.users VALUES (11, 'Test', '$argon2id$v=19$m=65536,t=3,p=4$Y8raq6+RTWXAYWVQKmbgrQ$8cWUMwbmY1aBBvlmwEQf+MCsoKCYWOpLWG7WzIMyvSA', 'member', 'test@gmail.com', '2026-01-18 18:28:31.373+01', '2026-01-18 18:28:31.373+01');
INSERT INTO public.users VALUES (12, 'TestMembre', '$argon2id$v=19$m=65536,t=3,p=4$L/ofvMRnsY1Gcr8bVmvSEw$fmaCXgW7PZnnYbXoR7VYU/nB9LlyB+8xlLl/IrxUuGs', 'member', 'testmembre@gmail.com', '2026-01-22 18:45:04.695+01', '2026-01-22 18:45:04.695+01');
INSERT INTO public.users VALUES (14, 'ChefTippu', '$argon2id$v=19$m=65536,t=3,p=4$+k99jSB0z2ypHe5A2bx4Wg$N5Y1OgJvIFDGRmNljsOJ59XiTYHCgoG33mZm717a4cw', 'member', 'cheftippu@gmail.com', '2026-01-25 16:16:11.694+01', '2026-01-25 16:16:11.694+01');
INSERT INTO public.users VALUES (15, 'TestMembre1', '$argon2id$v=19$m=65536,t=3,p=4$UTLbN/lSiCy8dLxC8YTX/w$DAEyFawghe5X2p/ZfVvAegO/5xptyvNk89hIXbg66N8', 'member', 'testmembre1@gmail.com', '2026-02-09 15:02:17.247+01', '2026-02-09 15:02:17.247+01');
INSERT INTO public.users VALUES (16, 'foulailoumar55@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ZBVrSrwN1DWQSt2vDp70hQ$58kW1Wo/5gmTSDqvmEhXjS9vuDcBR6kWjFiFqsrVTj4', 'admin', 'foulailoumar55@gmail.com', '2026-06-01 22:51:26.688+02', '2026-06-01 22:51:26.688+02');


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ingredients VALUES (1, 'Boeuf haché', 'viande', true, 1, '2025-11-23 18:17:59.1+01', '2026-01-05 16:45:49.375+01');
INSERT INTO public.ingredients VALUES (2, 'Poulet', 'viande', true, 1, '2025-11-23 18:17:59.125+01', '2026-01-05 16:45:50.769+01');
INSERT INTO public.ingredients VALUES (3, 'Oeuf', 'viande', true, 1, '2025-11-23 18:17:59.141+01', '2026-01-05 16:45:51.335+01');
INSERT INTO public.ingredients VALUES (4, 'Tomate', 'végétarien', true, 1, '2025-11-23 18:17:59.148+01', '2026-01-05 16:45:51.545+01');
INSERT INTO public.ingredients VALUES (5, 'Courgette', 'végétarien', true, 1, '2025-11-23 18:17:59.161+01', '2026-01-05 16:45:51.903+01');
INSERT INTO public.ingredients VALUES (6, 'Oignon', 'végétarien', true, 1, '2025-11-23 18:17:59.168+01', '2026-01-05 16:45:52.07+01');
INSERT INTO public.ingredients VALUES (7, 'Riz', 'végétarien', true, 1, '2025-11-23 18:17:59.179+01', '2026-01-05 16:45:52.276+01');
INSERT INTO public.ingredients VALUES (8, 'Pâtes', 'végétarien', true, 1, '2025-11-23 18:17:59.191+01', '2026-01-05 16:45:52.637+01');
INSERT INTO public.ingredients VALUES (9, 'Farine', 'végétarien', true, 1, '2025-11-23 18:17:59.209+01', '2026-01-05 16:45:52.836+01');
INSERT INTO public.ingredients VALUES (10, 'Huile d''olive', 'végétarien', true, 1, '2025-11-23 18:17:59.221+01', '2026-01-05 16:45:53.185+01');
INSERT INTO public.ingredients VALUES (11, 'Nori', 'végétarien', true, 1, '2025-11-23 18:17:59.256+01', '2026-01-05 16:45:53.342+01');
INSERT INTO public.ingredients VALUES (12, 'Pita', 'végétarien', true, 1, '2025-11-23 18:17:59.265+01', '2026-01-05 16:45:53.534+01');
INSERT INTO public.ingredients VALUES (13, 'Fromage', 'végétarien', true, 1, '2025-11-23 18:17:59.272+01', '2026-01-05 16:45:53.713+01');
INSERT INTO public.ingredients VALUES (14, 'Sucre', 'sucré', true, 1, '2025-11-23 18:17:59.279+01', '2026-01-05 16:45:53.892+01');
INSERT INTO public.ingredients VALUES (15, 'Chocolat', 'sucré', true, 1, '2025-11-23 18:17:59.289+01', '2026-01-05 16:45:54.267+01');
INSERT INTO public.ingredients VALUES (16, 'Miel', 'sucré', true, 1, '2025-11-23 18:17:59.296+01', '2026-01-05 16:45:55.29+01');
INSERT INTO public.ingredients VALUES (17, 'Sel', 'salé', true, 1, '2025-11-23 18:17:59.303+01', '2026-01-05 16:45:55.671+01');
INSERT INTO public.ingredients VALUES (18, 'Citron', 'végétarien', true, 1, '2025-11-23 18:17:59.312+01', '2026-01-05 16:45:55.905+01');
INSERT INTO public.ingredients VALUES (19, 'Spaghetti ', 'salé', true, 3, '2026-01-07 12:25:32.435+01', '2026-01-07 12:52:59.216+01');
INSERT INTO public.ingredients VALUES (20, 'Ail', 'salé', true, 3, '2026-01-07 12:25:32.527+01', '2026-01-07 12:53:00.091+01');
INSERT INTO public.ingredients VALUES (21, 'Basilic', 'végétarien', true, 3, '2026-01-07 12:25:32.595+01', '2026-01-07 12:53:01.084+01');
INSERT INTO public.ingredients VALUES (22, 'Poivre', 'salé', true, 3, '2026-01-07 12:25:32.64+01', '2026-01-07 12:53:02.226+01');
INSERT INTO public.ingredients VALUES (23, 'Parmesan Râpé', 'salé', true, 3, '2026-01-07 12:25:32.706+01', '2026-01-07 12:53:03.4+01');
INSERT INTO public.ingredients VALUES (27, 'Chocolat noir', 'sucré', true, 1, '2026-01-13 00:47:03.906446+01', '2026-01-13 00:47:03.906446+01');
INSERT INTO public.ingredients VALUES (28, 'Beurre', 'sucré', true, 1, '2026-01-13 00:47:03.906446+01', '2026-01-13 00:47:03.906446+01');
INSERT INTO public.ingredients VALUES (31, 'Œufs', 'sucré', true, 1, '2026-01-13 00:47:03.906446+01', '2026-01-13 00:47:03.906446+01');
INSERT INTO public.ingredients VALUES (32, 'Levure chimique', 'sucré', true, 1, '2026-01-13 00:47:03.906446+01', '2026-01-13 00:47:03.906446+01');
INSERT INTO public.ingredients VALUES (34, 'Bœuf', 'viande', true, 1, '2026-01-13 11:20:29.774498+01', '2026-01-13 11:20:29.774498+01');
INSERT INTO public.ingredients VALUES (35, 'Pommes de terre', 'salé', true, 1, '2026-01-13 11:20:29.774498+01', '2026-01-13 11:20:29.774498+01');
INSERT INTO public.ingredients VALUES (36, 'Huile', 'salé', true, 1, '2026-01-13 11:20:29.774498+01', '2026-01-13 11:20:29.774498+01');
INSERT INTO public.ingredients VALUES (40, 'Noix de coco râpée', 'salé', true, 1, '2026-01-13 11:41:33.537713+01', '2026-01-13 16:18:55.496+01');
INSERT INTO public.ingredients VALUES (41, 'Piment vert', 'salé', true, 1, '2026-01-13 11:41:33.537713+01', '2026-01-13 16:18:57.129+01');
INSERT INTO public.ingredients VALUES (42, 'Gingembre', 'salé', true, 1, '2026-01-13 11:41:33.537713+01', '2026-01-13 16:20:39.564+01');
INSERT INTO public.ingredients VALUES (44, 'Graines de moutarde', 'salé', true, 1, '2026-01-13 11:41:33.537713+01', '2026-01-13 16:20:40.311+01');
INSERT INTO public.ingredients VALUES (45, 'Feuilles de curry', 'salé', true, 1, '2026-01-13 11:41:33.537713+01', '2026-01-13 16:20:40.884+01');
INSERT INTO public.ingredients VALUES (48, 'Yaourt', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:41.309+01');
INSERT INTO public.ingredients VALUES (52, 'Curcuma', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:41.662+01');
INSERT INTO public.ingredients VALUES (53, 'Piment rouge en poudre', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:42.106+01');
INSERT INTO public.ingredients VALUES (54, 'Garam masala', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:42.529+01');
INSERT INTO public.ingredients VALUES (55, 'Jus de citron', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:43.012+01');
INSERT INTO public.ingredients VALUES (56, 'Feuille de laurier', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:43.492+01');
INSERT INTO public.ingredients VALUES (57, 'Cardamome verte', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:43.916+01');
INSERT INTO public.ingredients VALUES (58, 'Clou de girofle', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:44.184+01');
INSERT INTO public.ingredients VALUES (59, 'Cannelle', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:44.643+01');
INSERT INTO public.ingredients VALUES (60, 'Badiane', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:44.889+01');
INSERT INTO public.ingredients VALUES (126, 'Urad dal (haricot mungo noir)', 'neutre', true, 3, '2026-01-16 17:37:45.215868+01', '2026-01-17 18:48:12.763+01');
INSERT INTO public.ingredients VALUES (127, 'Riz idli', 'neutre', true, 3, '2026-01-16 17:37:45.215868+01', '2026-01-17 18:48:13.734+01');
INSERT INTO public.ingredients VALUES (128, 'Poha (riz aplati)', 'neutre', true, 3, '2026-01-16 17:37:45.215868+01', '2026-01-17 18:48:14.082+01');
INSERT INTO public.ingredients VALUES (129, 'Graines de fenugrec (methi)', 'neutre', true, 3, '2026-01-16 17:37:45.215868+01', '2026-01-17 18:48:14.266+01');
INSERT INTO public.ingredients VALUES (130, 'Sel non iodé', 'neutre', true, 3, '2026-01-16 17:37:45.215868+01', '2026-01-17 18:48:14.594+01');
INSERT INTO public.ingredients VALUES (133, 'Aubergine', 'neutre', true, 3, '2026-01-17 11:47:38.820058+01', '2026-01-17 18:48:14.891+01');
INSERT INTO public.ingredients VALUES (134, 'Poivron vert', 'neutre', true, 3, '2026-01-17 11:47:38.820058+01', '2026-01-17 18:48:15.126+01');
INSERT INTO public.ingredients VALUES (135, 'Poivron rouge', 'neutre', true, 3, '2026-01-17 11:47:38.820058+01', '2026-01-17 18:48:15.513+01');
INSERT INTO public.ingredients VALUES (139, 'Bouquet garni', 'neutre', true, 3, '2026-01-17 11:47:38.820058+01', '2026-01-17 18:48:15.828+01');
INSERT INTO public.ingredients VALUES (174, 'Pâte brisée', 'neutre', true, 3, '2026-01-17 13:04:46.200219+01', '2026-01-17 18:48:21.294+01');
INSERT INTO public.ingredients VALUES (176, 'Crème fraîche liquide', 'neutre', true, 3, '2026-01-17 13:04:46.200219+01', '2026-01-17 18:48:21.741+01');
INSERT INTO public.ingredients VALUES (200, 'Oignon rouge', 'neutre', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:22.104+01');
INSERT INTO public.ingredients VALUES (198, 'Concombre', 'neutre', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:22.285+01');
INSERT INTO public.ingredients VALUES (186, 'Poulet (blanc ou cuisse)', 'viande', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:22.464+01');
INSERT INTO public.ingredients VALUES (187, 'Yaourt nature', 'neutre', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:22.829+01');
INSERT INTO public.ingredients VALUES (191, 'Paprika', 'épicé', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:23.19+01');
INSERT INTO public.ingredients VALUES (190, 'Huile d’olive', 'neutre', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:23.568+01');
INSERT INTO public.ingredients VALUES (192, 'Cumin', 'épicé', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:23.776+01');
INSERT INTO public.ingredients VALUES (193, 'Coriandre en poudre', 'épicé', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:24.179+01');
INSERT INTO public.ingredients VALUES (197, 'Pain pita', 'neutre', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:24.523+01');
INSERT INTO public.ingredients VALUES (201, 'Feuilles de laitue', 'végétarien', true, 3, '2026-01-17 13:15:26.765213+01', '2026-01-17 18:48:24.959+01');
INSERT INTO public.ingredients VALUES (203, 'Citron bio', 'amer', true, 3, '2026-01-17 13:18:40.417073+01', '2026-01-17 18:48:25.26+01');
INSERT INTO public.ingredients VALUES (204, 'Câpres au vinaigre', 'salé', true, 3, '2026-01-17 13:18:40.417073+01', '2026-01-17 18:48:25.674+01');
INSERT INTO public.ingredients VALUES (205, 'Vin blanc sec', 'neutre', true, 3, '2026-01-17 13:18:40.417073+01', '2026-01-17 18:48:26.013+01');
INSERT INTO public.ingredients VALUES (208, 'Persil ciselé', 'végétarien', true, 3, '2026-01-17 13:18:40.417073+01', '2026-01-17 18:48:26.369+01');
INSERT INTO public.ingredients VALUES (202, 'Escalope de poulet', 'viande', true, 3, '2026-01-17 13:18:40.417073+01', '2026-01-17 18:48:26.717+01');
INSERT INTO public.ingredients VALUES (218, 'Pistaches non salées', 'neutre', true, 3, '2026-01-17 13:23:55.634401+01', '2026-01-17 18:48:27.084+01');
INSERT INTO public.ingredients VALUES (217, 'Eau de fleur d’oranger', 'neutre', true, 3, '2026-01-17 13:23:55.634401+01', '2026-01-17 18:48:27.481+01');
INSERT INTO public.ingredients VALUES (216, 'Maïzena', 'neutre', true, 3, '2026-01-17 13:23:55.634401+01', '2026-01-17 18:48:27.84+01');
INSERT INTO public.ingredients VALUES (231, 'Carotte', 'neutre', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:29.357+01');
INSERT INTO public.ingredients VALUES (223, 'Maizena', 'neutre', true, 3, '2026-01-17 13:29:47.596216+01', '2026-01-17 18:48:28.384+01');
INSERT INTO public.ingredients VALUES (233, 'Tomates concassées', 'salé', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:28.623+01');
INSERT INTO public.ingredients VALUES (232, 'Céleri', 'neutre', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:28.947+01');
INSERT INTO public.ingredients VALUES (228, 'Bœuf haché', 'viande', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:29.945+01');
INSERT INTO public.ingredients VALUES (227, 'Pâtes à lasagne', 'neutre', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:30.306+01');
INSERT INTO public.ingredients VALUES (242, 'Fromage râpé', 'neutre', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:30.708+01');
INSERT INTO public.ingredients VALUES (243, 'Parmesan', 'neutre', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:30.992+01');
INSERT INTO public.ingredients VALUES (239, 'Lait', 'neutre', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:31.968+01');
INSERT INTO public.ingredients VALUES (235, 'Vin rouge', 'neutre', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:33.128+01');
INSERT INTO public.ingredients VALUES (234, 'Concentré de tomate', 'salé', true, 3, '2026-01-17 13:36:43.099464+01', '2026-01-17 18:48:35.52+01');
INSERT INTO public.ingredients VALUES (256, 'Mangue', 'neutre', true, 3, '2026-01-25 16:03:54.805+01', '2026-01-25 16:12:18.827+01');
INSERT INTO public.ingredients VALUES (254, 'Cerise', 'neutre', true, 3, '2026-01-25 16:03:26.618+01', '2026-01-25 16:12:20.816+01');
INSERT INTO public.ingredients VALUES (61, 'Shahi jeera', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:45.302+01');
INSERT INTO public.ingredients VALUES (62, 'Macis', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:45.505+01');
INSERT INTO public.ingredients VALUES (63, 'Riz basmati', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:45.878+01');
INSERT INTO public.ingredients VALUES (64, 'Ghee', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:46.255+01');
INSERT INTO public.ingredients VALUES (66, 'Menthe', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:46.631+01');
INSERT INTO public.ingredients VALUES (68, 'Eau', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:46.875+01');
INSERT INTO public.ingredients VALUES (69, 'Safran', 'salé', true, 1, '2026-01-13 12:06:25.068691+01', '2026-01-13 16:20:47.455+01');
INSERT INTO public.ingredients VALUES (110, 'Banane Verte', 'neutre', true, 3, '2026-01-13 21:53:32.2+01', '2026-01-13 23:20:18.907+01');
INSERT INTO public.ingredients VALUES (111, 'Farine De Pois Chiches', 'neutre', true, 3, '2026-01-13 21:55:59.871+01', '2026-01-13 23:20:20.413+01');
INSERT INTO public.ingredients VALUES (112, 'Farine De Riz', 'neutre', true, 3, '2026-01-13 21:56:56.973+01', '2026-01-13 23:20:21.058+01');
INSERT INTO public.ingredients VALUES (113, 'Fécule De Maïs', 'neutre', true, 3, '2026-01-13 21:58:28.131+01', '2026-01-13 23:20:21.924+01');
INSERT INTO public.ingredients VALUES (114, 'Bicarbonate De Soude', 'neutre', true, 3, '2026-01-13 21:59:38.918+01', '2026-01-13 23:20:22.61+01');
INSERT INTO public.ingredients VALUES (115, 'Asafoetida', 'neutre', true, 3, '2026-01-13 22:00:27.307+01', '2026-01-13 23:20:23.197+01');
INSERT INTO public.ingredients VALUES (116, 'Graines De Cumin', 'neutre', true, 3, '2026-01-13 22:00:58.157+01', '2026-01-13 23:20:23.68+01');
INSERT INTO public.ingredients VALUES (117, 'Piment Rouge En Poudre', 'neutre', true, 3, '2026-01-13 22:01:12.297+01', '2026-01-13 23:20:24.199+01');
INSERT INTO public.ingredients VALUES (146, 'Blanc d’œuf', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:16.152+01');
INSERT INTO public.ingredients VALUES (155, 'Lait entier', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:16.49+01');
INSERT INTO public.ingredients VALUES (154, 'Sucre glace', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:16.917+01');
INSERT INTO public.ingredients VALUES (153, 'Extrait de citron', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:17.205+01');
INSERT INTO public.ingredients VALUES (151, 'Zeste de citron', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:17.445+01');
INSERT INTO public.ingredients VALUES (148, 'Huile végétale', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:17.73+01');
INSERT INTO public.ingredients VALUES (147, 'Lait fermenté (buttermilk)', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:18.088+01');
INSERT INTO public.ingredients VALUES (145, 'Beurre doux', 'neutre', true, 3, '2026-01-17 12:24:47.561996+01', '2026-01-17 18:48:18.29+01');
INSERT INTO public.ingredients VALUES (156, 'Riz japonais', 'neutre', true, 3, '2026-01-17 12:47:19.185778+01', '2026-01-17 18:48:18.628+01');
INSERT INTO public.ingredients VALUES (157, 'Blanc de poulet', 'viande', true, 3, '2026-01-17 12:47:19.185778+01', '2026-01-17 18:48:19.01+01');
INSERT INTO public.ingredients VALUES (158, 'Sauce soja', 'salé', true, 3, '2026-01-17 12:47:19.185778+01', '2026-01-17 18:48:19.399+01');
INSERT INTO public.ingredients VALUES (160, 'Vinaigre de riz', 'amer', true, 3, '2026-01-17 12:47:19.185778+01', '2026-01-17 18:48:19.753+01');
INSERT INTO public.ingredients VALUES (163, 'Algue nori', 'végétarien', true, 3, '2026-01-17 12:47:19.185778+01', '2026-01-17 18:48:20.09+01');
INSERT INTO public.ingredients VALUES (169, 'Œuf', 'neutre', true, 3, '2026-01-17 12:53:40.843209+01', '2026-01-17 18:48:20.273+01');
INSERT INTO public.ingredients VALUES (164, 'Nouilles ramen', 'neutre', true, 3, '2026-01-17 12:53:40.843209+01', '2026-01-17 18:48:20.461+01');
INSERT INTO public.ingredients VALUES (172, 'Ciboule', 'neutre', true, 3, '2026-01-17 12:53:40.843209+01', '2026-01-17 18:48:20.669+01');
INSERT INTO public.ingredients VALUES (261, 'Sucre vanillé', 'neutre', true, 3, '2026-02-02 15:44:54.663681+01', '2026-02-09 15:08:00.38+01');
INSERT INTO public.ingredients VALUES (265, 'Café', 'neutre', true, 3, '2026-02-11 15:33:48.309162+01', '2026-02-11 16:09:41.332+01');
INSERT INTO public.ingredients VALUES (266, 'Cacao en poudre', 'neutre', true, 3, '2026-02-11 15:33:48.309162+01', '2026-02-11 16:09:42.271+01');
INSERT INTO public.ingredients VALUES (267, 'Chantilly', 'neutre', true, 3, '2026-02-11 15:33:48.309162+01', '2026-02-11 16:09:43.875+01');
INSERT INTO public.ingredients VALUES (264, 'Gousse de vanille', 'neutre', true, 3, '2026-02-09 16:09:19.320896+01', '2026-02-11 16:09:45.407+01');
INSERT INTO public.ingredients VALUES (270, 'Jaune D''Œuf', 'neutre', true, 16, '2026-06-01 23:06:08.639+02', '2026-06-01 23:09:16.774+02');
INSERT INTO public.ingredients VALUES (269, 'Pommes Golden', 'neutre', true, 16, '2026-06-01 23:06:08.628+02', '2026-06-01 23:09:17.301+02');
INSERT INTO public.ingredients VALUES (268, 'Pâte Brisée', 'neutre', true, 16, '2026-06-01 23:06:08.472+02', '2026-06-01 23:09:17.773+02');


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.media VALUES (38, 'The Matrix', 'Programmeur anonyme dans un service administratif le jour, Thomas Anderson devient Neo la nuit venue. Sous ce pseudonyme, il est l''un des pirates les plus recherchés du cyber-espace. À cheval entre deux mondes, Neo est assailli par d''étranges songes et des messages cryptés provenant d''un certain Morpheus. Celui-ci l''exhorte à aller au-delà des apparences et à trouver la réponse à la question qui hante constamment ses pensées : qu''est-ce que la Matrice ?', 'The Matrix.jpg', '1999-06-26 02:00:00+02', 'film', true, 3, '2026-01-12 19:12:47.923+01', '2026-01-17 21:55:25.364+01', NULL, NULL, 136, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (8, 'Le Voyage De Chihiro', 'Au cours d''un voyage en voiture, la famille de Chihiro,10 ans, fait une halte dans un parc à thème qui semble abandonné. Ses parents découvrent des mets succulents dans un restaurant et commencent à manger. Ils se retrouvent alors transformés en cochons. Prise de panique, Chihiro s''enfuit et rencontre l''énigmatique Haku, qui lui explique le fonctionnement de l''univers dans lequel elle vient de pénétrer. Pour sauver ses parents, la fillette va devoir faire face à la terrible sorcière Yubaba.', 'Le Voyage De Chihiro.jpg', '2002-04-10 02:00:00+02', 'animation', true, 1, '2025-11-23 18:17:59.943+01', '2026-01-17 22:11:27.725+01', 8, 'le-voyage-de-chihiro', 125, NULL, NULL, 'Japonais', 'Japon', NULL);
INSERT INTO public.media VALUES (7, 'Naruto', 'Dans l''univers de la série, Naruto est un jeune ninja du village de Konoha. Hôte du démon renard à neuf queues, une créature qui a attaqué le village par le passé, il est rejeté par les autres villageois. Son ambition est de devenir Hokage, le chef du village, afin de gagner le respect des habitants', 'Naruto.jpg', '2002-04-03 02:00:00+02', 'manga', true, 1, '2025-11-23 18:17:59.831+01', '2026-01-18 16:06:58.172+01', 7, 'naruto', NULL, 9, '2014-11-10', 'Japonais', 'Japon', NULL);
INSERT INTO public.media VALUES (6, 'Matilda', 'Matilda est une petite fille très intelligente depuis son plus jeune âge, ce qui laisse néanmoins ses parents totalement indifférents, notamment son père qui s''enrichit en revendant des carcasses d''automobiles trafiquées et en mauvais état. À l''âge de 6 ans et demi, Matilda est enfin envoyée à l''école. Mais la directrice, une ancienne championne olympique, n''apprécie guère la marmaille. Rapidement, la grande intelligence de Matilda se développe de façon tangible : un mystérieux pouvoir apparaît en elle. Ce pouvoir, la télékinésie (un pouvoir qui peut déplacer les objets par la pensée), lui permet alors d''élaborer un plan pour se débarrasser de la directrice afin que l''école soit plus tranquille. ', 'Matilda.jpg', '1996-04-09 02:00:00+02', 'film', true, 1, '2025-11-23 18:17:59.754+01', '2026-01-17 22:13:12.431+01', 6, 'matilda', 98, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (3, 'The Bear', 'Carmen « Carmy » Berzatto, un ancien chef talentueux de restaurant gastronomique promis à un grand avenir, hérite de la sandwicherie de quartier de son frère Michael après le suicide de ce dernier. Il va tenter d’en faire un point incontournable de la ville de Chicago grâce à son équipe pleine de bonne volonté, soutenu par Sydney, une apprentie venue apprendre à ses côtés, mais doit faire face à la rancœur de Richie, le meilleur ami de Michael dont il veut conserver le souvenir, et à l''état déplorable du restaurant. Il doit également faire face aux dettes non réglées de son frère et à un personnel indiscipliné, tout en faisant face à sa propre douleur et au traumatisme familial.', 'The Bear.jpg', '2022-06-23 02:00:00+02', 'série', true, 1, '2025-11-23 18:17:59.496+01', '2026-01-18 18:23:50.27+01', 3, 'the-bear', NULL, 4, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (10, 'Ratatouille', 'Rémy n''est pas un jeune rat comme les autres. Il a un véritable don, celui de cuisiner, marier les saveurs, découvrir de nouveaux arômes et un rêve : devenir un grand chef et le premier rat de goût. Il est prêt à tout pour vivre sa passion, notamment venir s''installer avec sa famille sous les cuisines d''un des plus grands restaurants parisiens : celui d''Auguste Gusteau, la star des fourneaux.', 'Ratatouille (FIlm).jpg', '2007-07-08 02:00:00+02', 'animation', true, 1, '2025-11-23 18:18:00.104+01', '2026-01-17 23:58:56.233+01', 10, 'ratatouille-film-', 111, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (28, 'La Belle Et Le Clochard', 'Malgré leurs milieux différents, une chienne cocker gâtée et un cabot jovial partagent amour et aventures dans ce classique. Ces aventures amoureuses sont perturbées par tante Sarah et ses deux adorables chats siamois, Si et Am, diaboliques et sournois.', 'La Belle Et Le Clochard.jpg', '1955-12-16 01:00:00+01', 'animation', true, 9, '2026-01-06 23:19:35.37+01', '2026-01-17 21:55:46.108+01', 14, 'la-belle-et-le-clochard', 76, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (27, 'Kaithi', 'Un ex-détenu en liberté conditionnelle est obligé d''aider un policier blessé afin qu''il puisse voir sa fille pour la première fois de sa vie.', 'Kaithi.jpg', '2019-10-25 02:00:00+02', 'film', true, 3, '2026-01-06 22:50:06.749+01', '2026-01-17 21:56:16.31+01', 13, 'kaithi', 145, NULL, NULL, 'Tamil', 'Inde', NULL);
INSERT INTO public.media VALUES (4, 'The Avengers', 'Quand un ennemi inattendu fait surface pour menacer la sécurité et l''équilibre mondial, Nick Fury, directeur de l''agence internationale pour le maintien de la paix, connue sous le nom du S.H.I.E.L.D., doit former une équipe pour éviter une catastrophe mondiale imminente. Un effort de recrutement à l''échelle mondiale est mis en place, pour finalement réunir l''équipe de super héros de rêve, dont Iron Man, l''incroyable Hulk, Thor, Captain America, Hawkeye et Black Widow.', 'Avengers.jpg', '2012-04-25 02:00:00+02', 'film', true, 1, '2025-11-23 18:17:59.599+01', '2026-01-17 22:14:01.727+01', 4, 'the-avengers', 143, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (1, 'Garfield : Héros Malgré Lui', 'Garfield, le célèbre chat d''intérieur, amateur de lasagnes et qui déteste les lundis, est sur le point d''être embarqué dans une folle aventure. Après avoir retrouvé son père disparu, Vic, un chat des rues mal peigné, Garfield et son ami le chien Odie, sont forcés de quitter leur quotidien confortable pour aider Vic à accomplir un cambriolage aussi risqué qu''hilarant.', 'Garfield Héros Malgré Lui.jpg', '2024-07-31 02:00:00+02', 'animation', true, 1, '2025-11-23 18:17:59.32+01', '2026-01-17 23:56:33.002+01', 1, 'garfield-heros-malgre-lui', 101, NULL, NULL, 'Anglais', 'États-Unis,France,Mexique', NULL);
INSERT INTO public.media VALUES (41, 'Sivaji The Boss', 'Un ingénieur en informatique se rend en Inde pour servir la nation et investir dans le bien-être de celle-ci. Quelques fonctionnaires et politiciens corrompus tentent de l''arrêter alors qu''il essaie d''améliorer le quotidien des plus pauvres.', 'Sivaji The Boss.jpg', '2007-06-15 02:00:00+02', 'film', true, 3, '2026-01-13 23:02:10.446+01', '2026-01-21 18:07:36.836+01', NULL, 'sivaji-the-boss', 188, NULL, NULL, 'Tamil', 'Inde', NULL);
INSERT INTO public.media VALUES (39, 'La Couleur Des Sentiments', 'Dans le Mississippi des années 1960, trois femmes nouent une amitié improbable autour d’un projet d’écriture qui remet en question les règles de la société ségrégationniste.', 'La Couleur Des Sentiments.jpg', '2011-10-25 02:00:00+02', 'film', true, 1, '2026-01-12 20:24:11.327531+01', '2026-01-17 21:35:05.265+01', NULL, NULL, 146, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (12, 'Biriyani', 'Sugan, un jeune homme de bonne famille mène une vie parfaite entre sa charmante petite amie, de bons amis, son travail et les siens. Un soir après une soirée bien arrosée avec son meilleur ami, il veut manger un bon biriyani, son péché mignon. Mais les deux compères sont loin de s''imaginer jusqu''où les mènera cette quête mouvementée du BIRIYANI.', 'Biriyani (Film).jpg', '2013-12-20 01:00:00+01', 'film', true, 2, '2025-11-23 19:16:32.655+01', '2026-01-17 21:56:35.56+01', 12, 'biriyani', 149, NULL, NULL, 'Tamil', 'Inde', NULL);
INSERT INTO public.media VALUES (11, 'Idli Kadai', 'La quête d''un homme simple vers la réussite l''amène, au fil du chemin, à redécouvrir ses racines et à renouer avec ce qui fonde véritablement son identité.', 'Idli Kadai.jpg', '2025-10-01 02:00:00+02', 'film', true, 1, '2025-11-23 18:18:00.205+01', '2026-01-17 21:56:51.42+01', 11, 'idli-kadai', 138, NULL, NULL, 'Tamil', 'Inde', NULL);
INSERT INTO public.media VALUES (2, 'Le Monde De Narnia : Chapitre 1', 'Le Monde de Narnia : chapitre 1 conte la lutte entre le bien et le mal qui oppose le magnifique lion Aslan aux forces des ténèbres dans le monde magique de Narnia. Grâce à ses sombres pouvoirs, la Sorcière Blanche a plongé Narnia dans un hiver qui dure depuis un siècle, mais une prédiction révèle que quatre enfants aideront Aslan à rompre la malédiction. Lorsque Lucy, Susan, Edmund et Peter Pevensie, quatre frères et soeurs, découvrent ce monde enchanté en y pénétrant à travers une armoire, tout est en place pour une bataille de proportions épiques.', 'Le Monde De Narnia Chapitre 1.jpg', '2005-12-22 01:00:00+01', 'film', true, 1, '2025-11-23 18:17:59.426+01', '2026-01-17 22:35:53.916+01', 2, 'le-monde-de-narnia-chapitre-1', 143, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (5, 'Le Seigneur Des Anneaux : Les Deux  Tours', 'Après la mort de Boromir et la disparition de Gandalf, la Communauté s''est scindée en trois. Perdus dans les collines d''`Emyn Muil'', Frodon et Sam découvrent qu''ils sont suivis par Gollum, une créature versatile corrompue par l''anneau magique. Gollum promet de conduire les `Hobbits'' jusqu''à la `Porte Noire'' du `Mordor''. A travers la `Terre du Milieu'', Aragorn, Legolas et Gimli font route vers le `Rohan'', le royaume assiégé de Theoden.', 'Le Seigneur Des Anneaux Le Deux Tours.jpg', '2002-12-10 01:00:00+01', 'film', true, 1, '2025-11-23 18:17:59.687+01', '2026-01-17 23:54:49.369+01', 5, 'le-seigneur-des-anneaux-les-deux-tours', 179, NULL, NULL, 'Anglais', 'États-Unis,Nouvelle-Zélande', NULL);
INSERT INTO public.media VALUES (9, 'Game Of Thrones', 'Neuf familles nobles rivalisent pour le contrôle du Trône de Fer dans les sept royaumes de Westeros. Pendant ce temps, des anciennes créatures mythiques oubliées reviennent pour faire des ravages.', 'Game Of Thrones.jpg', '2015-04-12 02:00:00+02', 'série', true, 1, '2025-11-23 18:17:59.995+01', '2026-01-18 17:34:32.899+01', 9, 'game-of-thrones', NULL, 8, '2019-05-19', 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (46, 'Leo', 'Le protagoniste et sa famille vivent dans une petite ville vallonnée où ils tiennent un café et mènent une vie paisible. La ville entière est ébranlée lorsqu''une bande de voleurs débarque, entraînant la mort mystérieuse de nombreuses personnes.', 'Leo.jpg', '2023-10-19 02:00:00+02', 'film', true, 3, '2026-01-22 19:10:46.29+01', '2026-01-24 19:16:38.179+01', NULL, 'leo', 164, NULL, NULL, 'Tamil', 'Inde', NULL);
INSERT INTO public.media VALUES (48, 'Le Petit Chaperon Rouge', 'L''histoire raconte les aventures d''une petite fille nommée le Petit Chaperon rouge, ainsi nommée en raison de sa cape à capuche rouge. La fillette traverse les bois pour apporter de la nourriture à sa grand-mère malade (du vin et un gâteau, selon les versions). Un loup rôde, voulant dévorer la fillette et le contenu du panier.', 'Le Petit Chaperon Rouge.jpg', '1697-01-11 00:09:21+00:09:21', 'animation', true, 3, '2026-01-25 16:18:16.377+01', '2026-02-02 15:48:56.906+01', NULL, 'le-petit-chaperon-rouge', 5, NULL, NULL, 'Français', 'France', NULL);
INSERT INTO public.media VALUES (49, 'Cinquante Nuances Plus Claires', 'Pensant avoir laissé derrière eux les ombres du passé, les jeunes mariés Christian et Ana profitent pleinement de leur relation tortueuse et partagent une vie de luxe. Cependant, alors qu''Anastasia commence tout juste à s''adapter à son nouveau rôle de Madame Grey et que Christian s''ouvre finalement à elle, de nouvelles menaces viennent mettre en péril leur vie commune avant même qu''elle n''ait débuté.', 'Cinquante Nuances Plus Claires.jpg', '2018-02-06 01:00:00+01', 'film', true, 3, '2026-02-09 15:07:32.401+01', '2026-02-12 18:09:56.793+01', NULL, 'cinquante-nuances-plus-claires', 101, NULL, NULL, 'Anglais', 'États-Unis', NULL);
INSERT INTO public.media VALUES (50, 'Blanche-Neige Et Les Sept Nains', 'Une jeune princesse nommée Blanche-Neige est contrainte de fuir son royaume après que la Reine, jalouse de sa beauté, ordonne sa mort. Réfugiée dans la forêt, elle trouve refuge chez sept nains. Mais la Reine prépare un terrible piège en utilisant une pomme empoisonnée.', 'Blanche-Neige Et Les Sept Nains.jpg', '1937-05-06 01:00:00+01', 'animation', true, 16, '2026-06-01 23:13:49.824+02', '2026-06-01 23:31:32.385+02', NULL, 'blanche-neige-et-les-sept-nains', 83, NULL, NULL, 'Anglais', 'États-Unis', NULL);


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recipes VALUES (20, 'Steak Frite', 'Préchauffer le four à 180°C.
Faire fondre le chocolat avec le beurre.
Ajouter le sucre et mélanger.
Incorporer les œufs un à un.
Ajouter la farine et la levure.
Verser dans un moule beurré.
Enfourner 25 à 30 minutes.', 20, 3, 'Steak Frite.jpg', 'plat', true, 3, '2026-01-12 19:56:17.949+01', '2026-01-13 11:29:13.827+01', 'steak-frite');
INSERT INTO public.recipes VALUES (14, 'Spaghetti', 'Faire cuire les spaghetti dans une grande casserole d’eau salée.
Chauffer la sauce tomate à feu doux.
Égoutter les pâtes.
Mélanger avec la sauce.
Servir chaud avec du fromage râpé.', 20, 3, 'Spaghetti.jpg', 'plat', true, 3, '2026-01-07 12:41:07.725+01', '2026-01-12 23:54:20.963+01', 'spaghetti');
INSERT INTO public.recipes VALUES (13, 'Chutney Au Coco', 'Râper la noix de coco fraîche.
Couper le piment vert et le gingembre.
Mixer la noix de coco avec le piment, le gingembre, l’ail et un peu d’eau.
Ajouter le sel et mixer jusqu’à obtenir une texture lisse.
Chauffer un peu d’huile dans une poêle.
Ajouter les graines de moutarde et les feuilles de curry.
Verser le chutney et mélanger brièvement.', 12, 1, 'Chutney.jpg', 'accompagnement', true, 5, '2025-11-26 21:54:45.991+01', '2026-01-13 11:48:17.66+01', 'chutney');
INSERT INTO public.recipes VALUES (21, 'Gâteau Au Chocolat', 'Préchauffer le four à 180°C.
Faire fondre le chocolat noir avec le beurre au bain-marie.
Ajouter le sucre et mélanger jusqu’à obtenir une texture lisse.
Incorporer les œufs un à un.
Ajouter la farine, la levure chimique et le sel.
Verser la préparation dans un moule beurré.
Enfourner 25 à 30 minutes pour un gâteau fondant.', 60, 3, 'Gâteau Au Chocolat.jpg', 'dessert', true, 1, '2026-01-12 20:01:43.530091+01', '2026-01-13 00:50:15.898+01', 'gateau-au-chocolat-de-matilda');
INSERT INTO public.recipes VALUES (12, 'Biryani Au Poulet', 'Préparation
Dans un bol, mélanger le yaourt, la pâte de gingembre et d''ail, le sel, le garam masala, le curcuma, le jus de citron et le piment rouge en poudre.
Bien mélanger et goûter la marinade. Rectifier l''assaisonnement si nécessaire.
Inciser les morceaux de poulet. Les ajouter à la marinade, bien mélanger et laisser reposer 1 heure à une nuit.
Rincez le riz basmati trois fois et faites-le tremper 30 minutes. Égouttez-le et réservez.
Cuisson
Faire chauffer du ghee ou de l''huile dans une casserole.
Ajouter la feuille de laurier, la cardamome, les clous de girofle, la cannelle, l''anis étoilé, le cumin noir et la macis.
Lorsque les épices dégagent leur arôme, ajouter les oignons et les faire revenir jusqu''à ce qu''ils soient légèrement dorés.
Ajouter le poulet et faire sauter 5 minutes.
Couvrir et laisser mijoter à feu doux jusqu''à ce que le poulet soit tendre.
Ajouter le yaourt, les feuilles de menthe, le piment vert, le piment rouge en poudre et le garam masala.
Montage
Répartir le poulet uniformément.
Ajouter le riz trempé par-dessus.
Porter de l''eau salée à ébullition. Versez de l''eau chaude sur le riz.
Parsemez de feuilles de menthe, d''oignons frits et de lait safrané (facultatif).
Couvrez et laissez cuire jusqu''à ce que le riz soit tendre mais encore légèrement granuleux.
Laissez reposer jusqu''à ce que la pression retombe naturellement.
Égrainez délicatement le riz et servez chaud.', 85, 6, 'Chicken Biryani.jpg', 'plat', true, 3, '2025-11-23 19:18:19.347+01', '2026-01-13 12:54:50.791+01', 'biriyani-au-poulet');
INSERT INTO public.recipes VALUES (10, 'Ratatouille', 'Laver et couper tous les légumes en morceaux.
Faire revenir chaque légume séparément dans un peu d’huile d’olive.
Réunir tous les légumes, ajouter le bouquet garni, saler et poivrer.
Couvrir et laisser mijoter à feu doux environ 40 minutes.
Ajouter l’ail écrasé 10 minutes avant la fin de la cuisson.', 80, 2, 'Ratatouille.jpg', 'plat', true, 3, '2025-11-23 18:18:00.112+01', '2026-01-17 13:39:07.231+01', 'ratatouille');
INSERT INTO public.recipes VALUES (8, 'Onigiri Au Poulet', 'Rincer le riz japonais plusieurs fois jusqu’à ce que l’eau soit claire.
Cuire le riz dans une casserole ou un rice cooker avec l’eau indiquée, puis laisser tiédir.
Couper le blanc de poulet en petits morceaux.
Faire revenir le poulet dans une poêle avec un peu d’huile végétale.
Ajouter la sauce soja, le sucre et le vinaigre de riz, puis laisser caraméliser légèrement.
Saler légèrement si nécessaire et laisser refroidir la garniture.
Humidifier légèrement ses mains, déposer du riz dans la paume, ajouter le poulet au centre.
Refermer avec du riz et former un triangle sans trop tasser.
Envelopper ou garnir avec une feuille d’algue nori.
Servir tiède ou froid, idéalement devant un anime.', 15, 1, 'Onigiri.jpg', 'plat', true, 3, '2025-11-23 18:17:59.951+01', '2026-01-17 13:40:00.004+01', 'onigiri');
INSERT INTO public.recipes VALUES (1, 'Lasagne', '
Préchauffer le four à 180°C.
Émincer l’oignon, l’ail, la carotte et le céleri.
Faire chauffer l’huile d’olive dans une grande poêle et faire revenir l’oignon et l’ail jusqu’à ce qu’ils deviennent translucides.
Ajouter la carotte et le céleri, cuire 5 minutes.
Incorporer le bœuf haché et cuire jusqu’à ce qu’il soit doré.
Verser le vin rouge et laisser réduire.
Ajouter les tomates concassées et le concentré de tomate, saler et poivrer.
Laisser mijoter à feu doux pendant 30 minutes.
Préparer la béchamel : faire fondre le beurre, ajouter la farine et cuire 2 minutes.
Verser progressivement le lait en fouettant jusqu’à épaississement.
Disposer une couche de pâtes à lasagne, puis une couche de sauce bolognaise, puis une couche de béchamel.
Répéter jusqu’à épuisement des ingrédients, terminer par la béchamel.
Saupoudrer de fromage râpé et de parmesan.
Enfourner 30 minutes jusqu’à ce que le dessus soit doré.
Laisser reposer 10 minutes avant de servir.', 90, 3, 'Lasagne.jpg', 'plat', true, 3, '2025-11-23 18:17:59.334+01', '2026-01-12 21:04:05.645+01', 'lasagne');
INSERT INTO public.recipes VALUES (2, 'Loukoums', 'Dans une casserole, porter à ébullition l’eau, le sucre et le jus de citron.
Délayer la maïzena dans un peu d’eau froide.
Lorsque le sirop bout, baisser le feu et ajouter la maïzena en remuant sans cesse.
Cuire à feu doux jusqu’à ce que la préparation épaississe et devienne translucide.
Ajouter l’eau de fleur d’oranger et les pistaches, puis mélanger.
Verser la préparation dans un moule tapissé de papier sulfurisé.
Laisser reposer 12 à 24 heures à température ambiante.
Découper en cubes et rouler les loukoums dans le sucre glace.', 120, 4, 'Loukoums.jpg', 'dessert', true, 1, '2025-11-23 18:17:59.438+01', '2026-01-12 23:48:04.276+01', 'loukoums');
INSERT INTO public.recipes VALUES (7, 'Ramen', 'Faire chauffer un grand volume d’eau et cuire les nouilles ramen.
Couper le blanc de poulet en fines lamelles.
Faire revenir le poulet dans l’huile jusqu’à coloration.
Ajouter l’ail et le gingembre.
Verser l’eau chaude et la sauce soja.
Laisser mijoter 10 minutes.
Ajouter les nouilles.
Rectifier l’assaisonnement.
Servir chaud avec œuf, nori et ciboule.', 60, 3, 'Ramen.jpg', 'plat', true, 1, '2025-11-23 18:17:59.839+01', '2026-01-17 13:40:19.811+01', 'ramen');
INSERT INTO public.recipes VALUES (32, 'Mochaccino', 'Préparer un café bien chaud.
Faire chauffer le lait dans une casserole ou au micro-ondes.
Ajouter le cacao en poudre dans le lait chaud et mélanger jusqu’à dissolution complète.
Incorporer le chocolat noir et remuer jusqu’à ce qu’il soit fondu.
Verser le café dans une grande tasse.
Ajouter le mélange lait-chocolat par-dessus.
Sucrer selon votre goût.
Ajouter éventuellement une portion de chantilly.
Servir immédiatement et déguster chaud.', 10, 1, 'Mochaccino.jpg', 'boisson', true, 3, '2026-01-24 11:00:39.287+01', '2026-02-11 15:53:19.2+01', 'cafe-au-chocolat');
INSERT INTO public.recipes VALUES (24, 'Vazhakkai Bajji', 'Préparation de la pâte
Dans un grand bol, mélangez la farine de pois chiches, la farine de riz, le piment rouge en poudre, le bicarbonate de soude, l’asafoetida, le sel, la fécule de maïs (si utilisée), l’huile chaude, le ghee et les graines de cumin.
Ajoutez l’eau progressivement, en fouettant, jusqu’à obtenir une pâte épaisse mais fluide.
👉 La pâte doit bien enrober les tranches de banane, sans être trop lourde ni trop liquide.
Épluchez la banane plantain verte à l’aide d’un économe ou d’un couteau.
Coupez-la en tranches fines ou moyennes, selon votre préférence.
Plongez les tranches dans de l’eau afin d’éviter qu’elles ne noircissent.
Faites chauffer l’huile dans une casserole profonde.
Égouttez les tranches de banane, trempez-les dans la pâte, puis déposez-les délicatement dans l’huile chaude.
Faites frire jusqu’à ce qu’elles soient bien dorées, en les retournant régulièrement.
Ajustez le feu si nécessaire afin d’éviter que l’huile ne fume.
Astuce : à l’aide d’une louche, versez un peu d’huile chaude sur les beignets pendant la cuisson afin qu’ils gonflent bien.
Égouttez sur du papier absorbant avant de servir.', 20, 3, 'Vazhakkai Bajji.jpg', 'entree', true, 3, '2026-01-13 20:24:49.15+01', '2026-01-13 22:48:30.937+01', 'ven-pongal');
INSERT INTO public.recipes VALUES (5, 'Lembas', 'Préchauffer le four à 180°C.
Mélanger la farine, la levure chimique et le sel dans un saladier.
Dans un autre récipient, battre le beurre mou avec le sucre jusqu’à obtenir une texture crémeuse.
Ajouter les œufs un à un en mélangeant bien.
Incorporer le miel et le zeste de citron.
Ajouter progressivement les ingrédients secs et mélanger jusqu’à obtenir une pâte homogène.
Étaler la pâte sur une plaque recouverte de papier cuisson sur environ 1 cm d’épaisseur.
Découper des carrés ou rectangles dans la pâte.
Enfourner pendant 12 à 15 minutes jusqu’à ce que les lembas soient légèrement dorés.
Laisser refroidir complètement avant de déguster.', 90, 3, 'Lembas.jpg', 'dessert', true, 1, '2025-11-23 18:17:59.696+01', '2026-01-17 13:09:47.233+01', 'lembas');
INSERT INTO public.recipes VALUES (11, 'Idli', 'Rincer séparément l’urad dal et le riz idli jusqu’à ce que l’eau soit claire.
Faire tremper l’urad dal, le riz idli et les graines de fenugrec séparément pendant au moins 6 heures.
Tremper le poha dans un peu d’eau pendant 30 minutes.
Mixer l’urad dal avec le poha, le sel et un peu d’eau froide jusqu’à obtenir une pâte lisse et mousseuse.
Mixer le riz idli séparément avec de l’eau pour obtenir une texture légèrement granuleuse.
Mélanger les deux pâtes à la main dans un grand récipient.
Couvrir et laisser fermenter dans un endroit chaud pendant 8 à 14 heures, jusqu’à ce que la pâte double de volume.', 40, 3, 'Idli.jpg', 'plat', true, 3, '2025-11-23 18:18:00.217+01', '2026-01-17 13:38:45.493+01', 'idli');
INSERT INTO public.recipes VALUES (6, 'Tarte Au Chocolat', 'Préchauffer le four à 180°C.
Étaler la pâte brisée dans un moule à tarte et piquer le fond avec une fourchette.
Faire cuire la pâte à blanc pendant 15 minutes.
Pendant ce temps, casser le chocolat noir en morceaux.
Faire chauffer la crème fraîche liquide jusqu’à frémissement.
Hors du feu, ajouter le chocolat et mélanger jusqu’à obtenir une ganache lisse.
Ajouter le beurre et mélanger jusqu’à ce qu’il soit fondu.
Verser la ganache sur le fond de tarte précuit.
Enfourner à nouveau pendant 10 minutes.
Laisser refroidir avant de servir.', 30, 2, 'Tarte Au Chocolat.jpg', 'dessert', true, 1, '2025-11-23 18:17:59.773+01', '2026-01-17 13:09:30.942+01', 'tarte-au-chocolat');
INSERT INTO public.recipes VALUES (4, 'Shawarma', 'Mélanger le yaourt, le jus de citron, l’ail écrasé, l’huile d’olive et toutes les épices dans un grand bol.
Ajouter le poulet coupé en morceaux dans la marinade et bien enrober.
Laisser mariner au réfrigérateur au moins 30 minutes (ou toute une nuit pour plus de saveur).
Préchauffer le four à 200°C ou préparer une poêle à feu moyen.
Cuire le poulet mariné pendant 15 à 20 minutes jusqu’à ce qu’il soit bien doré et cuit à cœur.
Chauffer légèrement les pains pita au four ou à la poêle.
Assembler le shawarma en garnissant les pitas de poulet, de concombre, de tomate, d’oignon et de feuilles de laitue.
Servir chaud avec sauce au yaourt ou selon vos préférences.', 25, 2, 'Shawarma.jpg', 'plat', true, 3, '2025-11-23 18:17:59.642+01', '2026-01-17 13:41:11.538+01', 'shawarma');
INSERT INTO public.recipes VALUES (3, 'Piccata Au Poulet', 'Couper les filets de poulet dans l’épaisseur pour obtenir 8 fines escalopes.
Fariner les escalopes des deux côtés.
Peler, dégermer et émincer l’ail.
Laver le citron, presser une moitié et couper l’autre en rondelles.
Faire chauffer l’huile d’olive dans une poêle à feu moyen.
Cuire les escalopes de poulet environ 2 minutes par face jusqu’à ce qu’elles soient dorées.
Saler et poivrer selon votre goût.
Retirer les escalopes et réserver.
Dans la même poêle, ajouter un filet d’huile d’olive et l’ail, faire revenir 30 secondes.
Verser le vin blanc et laisser évaporer pendant 1 minute.
Ajouter les câpres, le jus de citron et l’eau.
Mélanger en grattant les sucs de cuisson.
Remettre les escalopes dans la poêle.
Déposer les rondelles de citron, couvrir et laisser mijoter 15 minutes à feu doux.
Parsemer de persil ciselé avant de servir.', 40, 3, 'Picatta Au Poulet.jpg', 'plat', true, 3, '2025-11-23 18:17:59.54+01', '2026-01-17 13:41:32.174+01', 'piccata-de-poulet');
INSERT INTO public.recipes VALUES (34, 'Galette À La Framboise', 'Couper le beurre en petits morceaux.
Mélanger le beurre, le sucre, la farine, la levure, le sel et le sucre vanillé.
Ajouter l’œuf et malaxer jusqu’à obtenir une pâte homogène.
Étaler la pâte à la main dans un moule.
Décorer à la fourchette et dorer avec le jaune d’œuf.
Faire cuire 25 minutes à four moyen jusqu’à ce que la galette soit bien dorée.', 40, 1, 'Galette À La Framboise.jpg', 'dessert', true, 3, '2026-01-25 16:19:43.112+01', '2026-02-11 15:52:48.774+01', 'galette-du-petit-chaperon-rouge');
INSERT INTO public.recipes VALUES (36, 'Glace À La Vanille', 'Fendre la gousse de vanille en deux et gratter les graines.
Faire chauffer le lait, la crème, la gousse et les graines de vanille jusqu’à frémissement.
Retirer du feu et laisser infuser quelques minutes.
Fouetter les jaunes d’œufs avec le sucre jusqu’à ce que le mélange blanchisse.
Verser progressivement le mélange chaud sur les œufs en remuant.
Remettre le tout sur feu doux et cuire en remuant jusqu’à ce que la crème épaississe légèrement.
Retirer du feu, laisser refroidir puis placer au réfrigérateur au moins 4 heures.
Turbiner en sorbetière ou placer au congélateur en remuant régulièrement jusqu’à obtenir une glace onctueuse.', 15, 1, 'Glace À La Vanille.jpg', 'dessert', true, 3, '2026-02-09 15:03:29.8+01', '2026-02-12 18:09:19.723+01', 'glace-a-la-vanille');
INSERT INTO public.recipes VALUES (30, 'Lemon Cake', 'Préchauffer le four à 180°C. Beurrer et chemiser les moules.
Mélanger la farine, la levure et le sel.
Fouetter le sucre avec le zeste de citron. Ajouter le beurre et crémer.
Ajouter les blancs d’œufs un à un, puis l’huile et l’extrait de citron.
Incorporer les ingrédients secs puis le buttermilk.
Verser dans les moules et cuire 30 minutes. Laisser refroidir.
Préparer la crème citron.
Monter le gâteau et décorer.', 50, 2, 'Lemon Cake.jpg', 'dessert', true, 1, '2026-01-17 12:26:30.132129+01', '2026-01-17 12:26:30.132129+01', 'lemon-cake');
INSERT INTO public.recipes VALUES (39, 'Tarte Aux Pommes', 'Préchauffer le four à 180°C.
Éplucher et couper les pommes en fines lamelles.
Étaler la pâte brisée dans un moule à tarte.
Répartir les pommes sur toute la surface.
Saupoudrer de sucre, sucre vanillé et cannelle.
Ajouter quelques noisettes de beurre.
Badigeonner les bords avec le jaune d''œuf.
Enfourner pendant 35 à 40 minutes jusqu''à obtenir une belle coloration dorée.
Laisser refroidir quelques minutes avant de servir.', 17, 3, 'Tarte Aux Pommes.jpg', 'dessert', true, 16, '2026-06-01 23:06:08.663+02', '2026-06-01 23:35:17.081+02', 'tarte-aux-pommes');


--
-- Data for Name: recipe_has_ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recipe_has_ingredient VALUES (2, 14, 300, 'g', '2026-01-17 13:29:56.313197+01', '2026-01-17 13:29:56.313197+01');
INSERT INTO public.recipe_has_ingredient VALUES (2, 68, 270, 'ml', '2026-01-17 13:29:56.313197+01', '2026-01-17 13:29:56.313197+01');
INSERT INTO public.recipe_has_ingredient VALUES (2, 55, 1, 'cuillère à soupe', '2026-01-17 13:29:56.313197+01', '2026-01-17 13:29:56.313197+01');
INSERT INTO public.recipe_has_ingredient VALUES (2, 223, 75, 'g', '2026-01-17 13:29:56.313197+01', '2026-01-17 13:29:56.313197+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 1, 250, 'g', '2026-01-12 23:54:21.237+01', '2026-01-12 23:54:21.237+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 4, 400, 'g', '2026-01-12 23:54:21.262+01', '2026-01-12 23:54:21.262+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 6, 1, 'pièce', '2026-01-12 23:54:21.269+01', '2026-01-12 23:54:21.269+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 10, 1, 'cuillère', '2026-01-12 23:54:21.276+01', '2026-01-12 23:54:21.276+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 17, 1, 'pièce', '2026-01-12 23:54:21.282+01', '2026-01-12 23:54:21.282+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 19, 200, 'g', '2026-01-12 23:54:21.289+01', '2026-01-12 23:54:21.289+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 20, 1, 'pièce', '2026-01-12 23:54:21.296+01', '2026-01-12 23:54:21.296+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 21, 1, 'pièce', '2026-01-12 23:54:21.303+01', '2026-01-12 23:54:21.303+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 22, 1, 'pincée', '2026-01-12 23:54:21.31+01', '2026-01-12 23:54:21.31+01');
INSERT INTO public.recipe_has_ingredient VALUES (14, 23, 30, 'g', '2026-01-12 23:54:21.321+01', '2026-01-12 23:54:21.321+01');
INSERT INTO public.recipe_has_ingredient VALUES (2, 217, 1, 'cuillère à soupe', '2026-01-17 13:29:56.313197+01', '2026-01-17 13:29:56.313197+01');
INSERT INTO public.recipe_has_ingredient VALUES (2, 218, 45, 'g', '2026-01-17 13:29:56.313197+01', '2026-01-17 13:29:56.313197+01');
INSERT INTO public.recipe_has_ingredient VALUES (2, 154, 1, 'cuillère à soupe', '2026-01-17 13:29:56.313197+01', '2026-01-17 13:29:56.313197+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 227, 9, 'feuille', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 228, 500, 'g', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 6, 1, 'pièce', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 20, 2, 'gousse', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 231, 1, 'pièce', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 232, 1, 'branche', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 233, 800, 'g', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (21, 9, 80, 'g', '2026-01-13 00:50:15.951+01', '2026-01-13 00:50:15.951+01');
INSERT INTO public.recipe_has_ingredient VALUES (21, 14, 150, 'g', '2026-01-13 00:50:15.958+01', '2026-01-13 00:50:15.958+01');
INSERT INTO public.recipe_has_ingredient VALUES (21, 17, 1, 'pincée', '2026-01-13 00:50:15.965+01', '2026-01-13 00:50:15.965+01');
INSERT INTO public.recipe_has_ingredient VALUES (21, 28, 150, 'g', '2026-01-13 00:50:15.973+01', '2026-01-13 00:50:15.973+01');
INSERT INTO public.recipe_has_ingredient VALUES (21, 31, 4, 'pièces', '2026-01-13 00:50:15.981+01', '2026-01-13 00:50:15.981+01');
INSERT INTO public.recipe_has_ingredient VALUES (21, 27, 200, 'g', '2026-01-13 00:50:15.988+01', '2026-01-13 00:50:15.988+01');
INSERT INTO public.recipe_has_ingredient VALUES (21, 32, 1, 'sachet', '2026-01-13 00:50:15.993+01', '2026-01-13 00:50:15.993+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 234, 2, 'cuillère à soupe', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 235, 150, 'ml', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 190, 2, 'cuillère à soupe', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 17, 1, 'cuillère à café', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (20, 17, 1, 'pincée', '2026-01-13 11:29:13.951+01', '2026-01-13 11:29:13.951+01');
INSERT INTO public.recipe_has_ingredient VALUES (20, 22, 1, 'pincée', '2026-01-13 11:29:13.96+01', '2026-01-13 11:29:13.96+01');
INSERT INTO public.recipe_has_ingredient VALUES (20, 34, 180, 'g', '2026-01-13 11:29:13.966+01', '2026-01-13 11:29:13.966+01');
INSERT INTO public.recipe_has_ingredient VALUES (20, 35, 300, 'g', '2026-01-13 11:29:13.973+01', '2026-01-13 11:29:13.973+01');
INSERT INTO public.recipe_has_ingredient VALUES (20, 36, 2, 'càs', '2026-01-13 11:29:13.98+01', '2026-01-13 11:29:13.98+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 1, 1, 'kg', '2026-01-13 12:54:50.833+01', '2026-01-13 12:54:50.833+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 2, 1, 'kg', '2026-01-13 12:54:50.851+01', '2026-01-13 12:54:50.851+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 6, 1, 'gros', '2026-01-13 12:54:50.864+01', '2026-01-13 12:54:50.864+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 17, 1, 'tasse', '2026-01-13 12:54:50.891+01', '2026-01-13 12:54:50.891+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 20, 4, 'gousses', '2026-01-13 12:54:50.922+01', '2026-01-13 12:54:50.922+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 41, 1, 'pièce', '2026-01-13 12:54:50.929+01', '2026-01-13 12:54:50.929+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 42, 1, 'pouce', '2026-01-13 12:54:50.937+01', '2026-01-13 12:54:50.937+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 48, 3, 'cuillères', '2026-01-13 12:54:50.944+01', '2026-01-13 12:54:50.944+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 52, 0.25, 'cuillère', '2026-01-13 12:54:50.954+01', '2026-01-13 12:54:50.954+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 53, 1, 'cuillère', '2026-01-13 12:54:50.96+01', '2026-01-13 12:54:50.96+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 54, 1, 'cuillère', '2026-01-13 12:54:50.971+01', '2026-01-13 12:54:50.971+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 55, 1, 'cuillère', '2026-01-13 12:54:50.981+01', '2026-01-13 12:54:50.981+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 56, 1, 'pièce', '2026-01-13 12:54:50.994+01', '2026-01-13 12:54:50.994+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 57, 4, 'pièces', '2026-01-13 12:54:51.005+01', '2026-01-13 12:54:51.005+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 58, 6, 'pièces', '2026-01-13 12:54:51.016+01', '2026-01-13 12:54:51.016+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 59, 1, 'bâton', '2026-01-13 12:54:51.035+01', '2026-01-13 12:54:51.035+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 60, 1, 'pièce', '2026-01-13 12:54:51.042+01', '2026-01-13 12:54:51.042+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 61, 0.75, 'cuillère', '2026-01-13 12:54:51.049+01', '2026-01-13 12:54:51.049+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 62, 1, 'brin', '2026-01-13 12:54:51.06+01', '2026-01-13 12:54:51.06+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 9, 1, 'l', '2026-01-13 11:48:17.761+01', '2026-01-13 11:48:17.761+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 17, 1, 'pincée', '2026-01-13 11:48:17.767+01', '2026-01-13 11:48:17.767+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 20, 1, 'gousse', '2026-01-13 11:48:17.774+01', '2026-01-13 11:48:17.774+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 40, 100, 'g', '2026-01-13 11:48:17.78+01', '2026-01-13 11:48:17.78+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 41, 1, 'pièce', '2026-01-13 11:48:17.786+01', '2026-01-13 11:48:17.786+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 42, 10, 'g', '2026-01-13 11:48:17.792+01', '2026-01-13 11:48:17.792+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 44, 1, 'Cuillères À Café', '2026-01-13 11:48:17.797+01', '2026-01-13 11:48:17.797+01');
INSERT INTO public.recipe_has_ingredient VALUES (13, 45, 6, 'feuilles', '2026-01-13 11:48:17.803+01', '2026-01-13 11:48:17.803+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 63, 2, 'tasses', '2026-01-13 12:54:51.068+01', '2026-01-13 12:54:51.068+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 64, 2, 'cuillères', '2026-01-13 12:54:51.076+01', '2026-01-13 12:54:51.076+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 66, 15, 'feuilles', '2026-01-13 12:54:51.084+01', '2026-01-13 12:54:51.084+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 68, 3, 'tasses', '2026-01-13 12:54:51.093+01', '2026-01-13 12:54:51.093+01');
INSERT INTO public.recipe_has_ingredient VALUES (12, 69, 1, 'pincée', '2026-01-13 12:54:51.1+01', '2026-01-13 12:54:51.1+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 17, 1, 'pincée', '2026-01-13 22:48:30.975+01', '2026-01-13 22:48:30.975+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 36, 1, 'cuillère à soupe', '2026-01-13 22:48:30.981+01', '2026-01-13 22:48:30.981+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 64, 1, 'cuillère à café', '2026-01-13 22:48:30.987+01', '2026-01-13 22:48:30.987+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 68, 1, 'tasse', '2026-01-13 22:48:30.993+01', '2026-01-13 22:48:30.993+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 110, 1, 'pièce', '2026-01-13 22:48:30.999+01', '2026-01-13 22:48:30.999+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 111, 0.5, 'tasse', '2026-01-13 22:48:31.004+01', '2026-01-13 22:48:31.004+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 112, 0.25, 'tasse', '2026-01-13 22:48:31.01+01', '2026-01-13 22:48:31.01+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 113, 1, 'cuillère à café', '2026-01-13 22:48:31.016+01', '2026-01-13 22:48:31.016+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 114, 3, 'pincée', '2026-01-13 22:48:31.022+01', '2026-01-13 22:48:31.022+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 115, 0.125, 'cuillère à café', '2026-01-13 22:48:31.027+01', '2026-01-13 22:48:31.027+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 116, 1, 'cuillère à café', '2026-01-13 22:48:31.032+01', '2026-01-13 22:48:31.032+01');
INSERT INTO public.recipe_has_ingredient VALUES (24, 117, 1, 'cuillère à café', '2026-01-13 22:48:31.038+01', '2026-01-13 22:48:31.038+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 22, 0.5, 'cuillère à café', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 239, 500, 'ml', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 28, 50, 'g', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 9, 50, 'g', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 242, 200, 'g', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (1, 243, 50, 'g', '2026-01-17 13:36:51.396707+01', '2026-01-17 13:36:51.396707+01');
INSERT INTO public.recipe_has_ingredient VALUES (11, 126, 0.5, 'tasse', '2026-01-17 13:38:45.859+01', '2026-01-17 13:38:45.859+01');
INSERT INTO public.recipe_has_ingredient VALUES (11, 127, 1, 'tasse', '2026-01-17 13:38:45.977+01', '2026-01-17 13:38:45.977+01');
INSERT INTO public.recipe_has_ingredient VALUES (11, 128, 2, 'cuillère à soupe', '2026-01-17 13:38:46.093+01', '2026-01-17 13:38:46.093+01');
INSERT INTO public.recipe_has_ingredient VALUES (11, 129, 0.5, 'cuillère à café', '2026-01-17 13:38:46.232+01', '2026-01-17 13:38:46.232+01');
INSERT INTO public.recipe_has_ingredient VALUES (11, 130, 0.5, 'cuillère à café', '2026-01-17 13:38:46.392+01', '2026-01-17 13:38:46.392+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 9, 265, 'g', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 14, 300, 'g', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 145, 113, 'g', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 146, 4, 'pièce', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 147, 360, 'ml', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 32, 1, 'cuillère à soupe', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 17, 0.5, 'cuillère à café', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 151, 1, 'cuillère à soupe', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (30, 55, 45, 'ml', '2026-01-17 12:33:06.649977+01', '2026-01-17 12:33:06.649977+01');
INSERT INTO public.recipe_has_ingredient VALUES (11, 68, 1, 'tasse', '2026-01-17 13:38:46.545+01', '2026-01-17 13:38:46.545+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 4, 3, 'pièce', '2026-01-17 13:39:07.273+01', '2026-01-17 13:39:07.273+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 5, 2, 'pièce', '2026-01-17 13:39:07.306+01', '2026-01-17 13:39:07.306+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 6, 1, 'pièce', '2026-01-17 13:39:07.324+01', '2026-01-17 13:39:07.324+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 10, 2, 'cuillère à soupe', '2026-01-17 13:39:07.343+01', '2026-01-17 13:39:07.343+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 17, 1, 'pincée', '2026-01-17 13:39:07.369+01', '2026-01-17 13:39:07.369+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 20, 2, 'gousse', '2026-01-17 13:39:07.385+01', '2026-01-17 13:39:07.385+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 22, 1, 'pincée', '2026-01-17 13:39:07.403+01', '2026-01-17 13:39:07.403+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 133, 1, 'pièce', '2026-01-17 13:39:07.421+01', '2026-01-17 13:39:07.421+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 134, 1, 'pièce', '2026-01-17 13:39:07.438+01', '2026-01-17 13:39:07.438+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 135, 1, 'pièce', '2026-01-17 13:39:07.454+01', '2026-01-17 13:39:07.454+01');
INSERT INTO public.recipe_has_ingredient VALUES (10, 139, 1, 'bouquet', '2026-01-17 13:39:07.472+01', '2026-01-17 13:39:07.472+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 14, 1, 'cuillère à café', '2026-01-17 13:40:00.818+01', '2026-01-17 13:40:00.818+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 17, 1, 'pincée', '2026-01-17 13:40:00.999+01', '2026-01-17 13:40:00.999+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 148, 1, 'cuillère à soupe', '2026-01-17 13:40:01.425+01', '2026-01-17 13:40:01.425+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 156, 300, 'g', '2026-01-17 13:40:01.515+01', '2026-01-17 13:40:01.515+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 157, 150, 'g', '2026-01-17 13:40:01.568+01', '2026-01-17 13:40:01.568+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 158, 2, 'cuillère à soupe', '2026-01-17 13:40:01.617+01', '2026-01-17 13:40:01.617+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 160, 1, 'cuillère à soupe', '2026-01-17 13:40:01.666+01', '2026-01-17 13:40:01.666+01');
INSERT INTO public.recipe_has_ingredient VALUES (8, 163, 2, 'feuille', '2026-01-17 13:40:01.705+01', '2026-01-17 13:40:01.705+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 20, 2, 'gousse', '2026-01-17 13:40:19.93+01', '2026-01-17 13:40:19.93+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 42, 1, 'cuillère à café', '2026-01-17 13:40:19.947+01', '2026-01-17 13:40:19.947+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 148, 1, 'cuillère à soupe', '2026-01-17 13:40:19.965+01', '2026-01-17 13:40:19.965+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 68, 750, 'ml', '2026-01-17 13:40:19.982+01', '2026-01-17 13:40:19.982+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 157, 150, 'g', '2026-01-17 13:40:19.999+01', '2026-01-17 13:40:19.999+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 158, 2, 'cuillère à soupe', '2026-01-17 13:40:20.016+01', '2026-01-17 13:40:20.016+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 163, 1, 'feuille', '2026-01-17 13:40:21.125+01', '2026-01-17 13:40:21.125+01');
INSERT INTO public.recipe_has_ingredient VALUES (6, 27, 200, 'g', '2026-01-17 13:09:31.872+01', '2026-01-17 13:09:31.872+01');
INSERT INTO public.recipe_has_ingredient VALUES (6, 28, 50, 'g', '2026-01-17 13:09:32.027+01', '2026-01-17 13:09:32.027+01');
INSERT INTO public.recipe_has_ingredient VALUES (6, 174, 1, 'pièce', '2026-01-17 13:09:32.149+01', '2026-01-17 13:09:32.149+01');
INSERT INTO public.recipe_has_ingredient VALUES (6, 176, 20, 'cl', '2026-01-17 13:09:32.29+01', '2026-01-17 13:09:32.29+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 9, 250, 'g', '2026-01-17 13:09:47.365+01', '2026-01-17 13:09:47.365+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 14, 80, 'g', '2026-01-17 13:09:47.382+01', '2026-01-17 13:09:47.382+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 16, 2, 'cuillère à soupe', '2026-01-17 13:09:47.399+01', '2026-01-17 13:09:47.399+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 17, 1, 'pincée', '2026-01-17 13:09:47.416+01', '2026-01-17 13:09:47.416+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 28, 120, 'g', '2026-01-17 13:09:47.433+01', '2026-01-17 13:09:47.433+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 32, 1, 'cuillère à café', '2026-01-17 13:09:47.45+01', '2026-01-17 13:09:47.45+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 151, 1, 'pièce', '2026-01-17 13:09:47.468+01', '2026-01-17 13:09:47.468+01');
INSERT INTO public.recipe_has_ingredient VALUES (5, 169, 2, 'pièce', '2026-01-17 13:09:47.49+01', '2026-01-17 13:09:47.49+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 164, 200, 'g', '2026-01-17 13:40:21.142+01', '2026-01-17 13:40:21.142+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 169, 2, 'pièce', '2026-01-17 13:40:21.163+01', '2026-01-17 13:40:21.163+01');
INSERT INTO public.recipe_has_ingredient VALUES (7, 172, 1, 'tige', '2026-01-17 13:40:21.19+01', '2026-01-17 13:40:21.19+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 4, 1, 'pièce', '2026-01-17 13:41:11.858+01', '2026-01-17 13:41:11.858+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 17, 1, 'cuillère à café', '2026-01-17 13:41:11.99+01', '2026-01-17 13:41:11.99+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 20, 3, 'gousse', '2026-01-17 13:41:12.122+01', '2026-01-17 13:41:12.122+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 22, 0.5, 'cuillère à café', '2026-01-17 13:41:12.24+01', '2026-01-17 13:41:12.24+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 186, 500, 'g', '2026-01-17 13:41:12.402+01', '2026-01-17 13:41:12.402+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 187, 120, 'g', '2026-01-17 13:41:12.532+01', '2026-01-17 13:41:12.532+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 190, 2, 'cuillère à soupe', '2026-01-17 13:41:12.717+01', '2026-01-17 13:41:12.717+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 191, 1, 'cuillère à soupe', '2026-01-17 13:41:12.862+01', '2026-01-17 13:41:12.862+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 192, 1, 'cuillère à soupe', '2026-01-17 13:41:13.03+01', '2026-01-17 13:41:13.03+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 193, 1, 'cuillère à café', '2026-01-17 13:41:13.162+01', '2026-01-17 13:41:13.162+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 197, 4, 'pièce', '2026-01-17 13:41:13.179+01', '2026-01-17 13:41:13.179+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 198, 0.5, 'pièce', '2026-01-17 13:41:13.197+01', '2026-01-17 13:41:13.197+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 200, 1, 'pièce', '2026-01-17 13:41:13.225+01', '2026-01-17 13:41:13.225+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 201, 4, 'feuille', '2026-01-17 13:41:13.246+01', '2026-01-17 13:41:13.246+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 52, 1, 'cuillère à café', '2026-01-17 13:41:13.271+01', '2026-01-17 13:41:13.271+01');
INSERT INTO public.recipe_has_ingredient VALUES (4, 55, 2, 'cuillère à soupe', '2026-01-17 13:41:13.286+01', '2026-01-17 13:41:13.286+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 9, 2, 'cuillère à soupe', '2026-01-17 13:41:32.472+01', '2026-01-17 13:41:32.472+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 17, 1, 'pincée', '2026-01-17 13:41:32.603+01', '2026-01-17 13:41:32.603+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 20, 2, 'gousse', '2026-01-17 13:41:32.743+01', '2026-01-17 13:41:32.743+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 22, 1, 'pincée', '2026-01-17 13:41:32.889+01', '2026-01-17 13:41:32.889+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 190, 1, 'cuillère à soupe', '2026-01-17 13:41:33.04+01', '2026-01-17 13:41:33.04+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 202, 4, 'pièce', '2026-01-17 13:41:33.304+01', '2026-01-17 13:41:33.304+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 203, 1, 'pièce', '2026-01-17 13:41:33.421+01', '2026-01-17 13:41:33.421+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 204, 6, 'cuillère à café', '2026-01-17 13:41:33.456+01', '2026-01-17 13:41:33.456+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 205, 15, 'cl', '2026-01-17 13:41:33.472+01', '2026-01-17 13:41:33.472+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 208, 2, 'cuillère à soupe', '2026-01-17 13:41:33.49+01', '2026-01-17 13:41:33.49+01');
INSERT INTO public.recipe_has_ingredient VALUES (3, 68, 10, 'cl', '2026-01-17 13:41:33.518+01', '2026-01-17 13:41:33.518+01');
INSERT INTO public.recipe_has_ingredient VALUES (36, 14, 120, 'g', '2026-02-12 18:09:19.926314+01', '2026-02-12 18:09:19.926314+01');
INSERT INTO public.recipe_has_ingredient VALUES (34, 9, 400, 'g', '2026-02-11 15:52:48.930287+01', '2026-02-11 15:52:48.930287+01');
INSERT INTO public.recipe_has_ingredient VALUES (34, 14, 250, 'g', '2026-02-11 15:52:48.982407+01', '2026-02-11 15:52:48.982407+01');
INSERT INTO public.recipe_has_ingredient VALUES (34, 17, 1, 'pincée', '2026-02-11 15:52:48.996051+01', '2026-02-11 15:52:48.996051+01');
INSERT INTO public.recipe_has_ingredient VALUES (34, 28, 250, 'g', '2026-02-11 15:52:49.012668+01', '2026-02-11 15:52:49.012668+01');
INSERT INTO public.recipe_has_ingredient VALUES (34, 32, 1, 'sachet', '2026-02-11 15:52:49.019369+01', '2026-02-11 15:52:49.019369+01');
INSERT INTO public.recipe_has_ingredient VALUES (34, 169, 1, 'pièce', '2026-02-11 15:52:49.02632+01', '2026-02-11 15:52:49.02632+01');
INSERT INTO public.recipe_has_ingredient VALUES (34, 261, 1, 'sachet', '2026-02-11 15:52:49.031917+01', '2026-02-11 15:52:49.031917+01');
INSERT INTO public.recipe_has_ingredient VALUES (32, 14, 1, 'cuillère', '2026-02-11 15:53:19.259741+01', '2026-02-11 15:53:19.259741+01');
INSERT INTO public.recipe_has_ingredient VALUES (32, 27, 30, 'g', '2026-02-11 15:53:19.266127+01', '2026-02-11 15:53:19.266127+01');
INSERT INTO public.recipe_has_ingredient VALUES (32, 155, 150, 'ml', '2026-02-11 15:53:19.271656+01', '2026-02-11 15:53:19.271656+01');
INSERT INTO public.recipe_has_ingredient VALUES (32, 265, 1, 'tasse', '2026-02-11 15:53:19.277511+01', '2026-02-11 15:53:19.277511+01');
INSERT INTO public.recipe_has_ingredient VALUES (32, 266, 1, 'cuillère', '2026-02-11 15:53:19.292794+01', '2026-02-11 15:53:19.292794+01');
INSERT INTO public.recipe_has_ingredient VALUES (32, 267, 1, 'portion', '2026-02-11 15:53:19.302481+01', '2026-02-11 15:53:19.302481+01');
INSERT INTO public.recipe_has_ingredient VALUES (36, 31, 5, 'œufs', '2026-02-12 18:09:19.989834+01', '2026-02-12 18:09:19.989834+01');
INSERT INTO public.recipe_has_ingredient VALUES (36, 176, 250, 'ml', '2026-02-12 18:09:19.996666+01', '2026-02-12 18:09:19.996666+01');
INSERT INTO public.recipe_has_ingredient VALUES (36, 155, 500, 'ml', '2026-02-12 18:09:20.004765+01', '2026-02-12 18:09:20.004765+01');
INSERT INTO public.recipe_has_ingredient VALUES (36, 264, 1, 'gousse', '2026-02-12 18:09:20.013123+01', '2026-02-12 18:09:20.013123+01');
INSERT INTO public.recipe_has_ingredient VALUES (39, 14, 50, 'g', '2026-06-01 23:36:50.242423+02', '2026-06-01 23:36:50.242423+02');
INSERT INTO public.recipe_has_ingredient VALUES (39, 28, 20, 'g', '2026-06-01 23:36:50.248184+02', '2026-06-01 23:36:50.248184+02');
INSERT INTO public.recipe_has_ingredient VALUES (39, 59, 1, 'cuillère à café', '2026-06-01 23:36:50.251537+02', '2026-06-01 23:36:50.251537+02');
INSERT INTO public.recipe_has_ingredient VALUES (39, 261, 1, 'sachet', '2026-06-01 23:36:50.255167+02', '2026-06-01 23:36:50.255167+02');
INSERT INTO public.recipe_has_ingredient VALUES (39, 270, 1, 'pièce', '2026-06-01 23:36:50.258624+02', '2026-06-01 23:36:50.258624+02');
INSERT INTO public.recipe_has_ingredient VALUES (39, 269, 5, 'pièce', '2026-06-01 23:36:50.261961+02', '2026-06-01 23:36:50.261961+02');
INSERT INTO public.recipe_has_ingredient VALUES (39, 268, 1, 'rouleau', '2026-06-01 23:36:50.265176+02', '2026-06-01 23:36:50.265176+02');


--
-- Data for Name: recipe_seen_in; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recipe_seen_in VALUES (1, 1, '2025-11-23 18:17:59.365+01', '2025-11-23 18:17:59.365+01');
INSERT INTO public.recipe_seen_in VALUES (2, 2, '2025-11-23 18:17:59.45+01', '2025-11-23 18:17:59.45+01');
INSERT INTO public.recipe_seen_in VALUES (3, 3, '2025-11-23 18:17:59.554+01', '2025-11-23 18:17:59.554+01');
INSERT INTO public.recipe_seen_in VALUES (4, 4, '2025-11-23 18:17:59.652+01', '2025-11-23 18:17:59.652+01');
INSERT INTO public.recipe_seen_in VALUES (5, 5, '2025-11-23 18:17:59.71+01', '2025-11-23 18:17:59.71+01');
INSERT INTO public.recipe_seen_in VALUES (6, 6, '2025-11-23 18:17:59.787+01', '2025-11-23 18:17:59.787+01');
INSERT INTO public.recipe_seen_in VALUES (7, 7, '2025-11-23 18:17:59.851+01', '2025-11-23 18:17:59.851+01');
INSERT INTO public.recipe_seen_in VALUES (8, 8, '2025-11-23 18:17:59.966+01', '2025-11-23 18:17:59.966+01');
INSERT INTO public.recipe_seen_in VALUES (10, 10, '2025-11-23 18:18:00.131+01', '2025-11-23 18:18:00.131+01');
INSERT INTO public.recipe_seen_in VALUES (11, 11, '2025-11-23 18:18:00.23+01', '2025-11-23 18:18:00.23+01');
INSERT INTO public.recipe_seen_in VALUES (12, 12, '2025-11-23 19:18:19.38+01', '2025-11-23 19:18:19.38+01');
INSERT INTO public.recipe_seen_in VALUES (13, 11, '2025-11-26 21:54:46.773+01', '2025-11-26 21:54:46.773+01');
INSERT INTO public.recipe_seen_in VALUES (14, 28, '2026-01-09 22:39:06.029+01', '2026-01-09 22:39:06.029+01');
INSERT INTO public.recipe_seen_in VALUES (12, 27, '2026-01-12 16:52:28.33+01', '2026-01-12 16:52:28.33+01');
INSERT INTO public.recipe_seen_in VALUES (20, 38, '2026-01-12 19:56:40.902+01', '2026-01-12 19:56:40.902+01');
INSERT INTO public.recipe_seen_in VALUES (21, 6, '2026-01-12 20:02:13.694+01', '2026-01-12 20:02:13.694+01');
INSERT INTO public.recipe_seen_in VALUES (6, 39, '2026-01-12 20:25:21.939+01', '2026-01-12 20:25:21.939+01');
INSERT INTO public.recipe_seen_in VALUES (24, 41, '2026-01-13 23:02:10.47+01', '2026-01-13 23:02:10.47+01');
INSERT INTO public.recipe_seen_in VALUES (30, 9, '2026-01-17 12:38:32.427055+01', '2026-01-17 12:38:32.427055+01');
INSERT INTO public.recipe_seen_in VALUES (32, 46, '2026-01-24 11:00:39.705+01', '2026-01-24 11:00:39.705+01');
INSERT INTO public.recipe_seen_in VALUES (34, 48, '2026-01-25 16:20:25.388+01', '2026-01-25 16:20:25.388+01');
INSERT INTO public.recipe_seen_in VALUES (36, 49, '2026-02-09 15:08:31.002+01', '2026-02-09 15:08:31.002+01');
INSERT INTO public.recipe_seen_in VALUES (39, 50, '2026-06-01 23:13:49.972+02', '2026-06-01 23:13:49.972+02');


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 270, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 50, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 39, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 6ex4il8MY5eR5YuksO9zbEyQL5JsPvORM2oN0sQRuMqN0EPie2ycLeaq85EcIjQ

