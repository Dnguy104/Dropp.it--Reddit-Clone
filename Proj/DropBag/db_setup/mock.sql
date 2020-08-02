INSERT INTO dropbag_user (id, password, last_login, is_superuser, email, first_name, last_name, is_active, is_mod, date_joined, username)
VALUES
(1, '1', '2020-07-24 22:13:40.490443', 0, 'test@gmail.com', '', '', 1, 0, '2020-07-21 22:59:31.020391', 'username-1'),
(2, '2', '2020-07-23 22:53:58.242942', 0, 'test1@gmail.com', '', '', 1, 0, '2020-07-23 22:53:44.390596', 'username-2'),
(3, '3', '2020-07-24 22:13:40.490443', 0, 'test3@gmail.com', '', '', 1, 0, '2020-07-21 22:59:31.020391', 'username-3'),
(4, '4', '2020-07-24 22:13:40.490443', 0, 'test2@gmail.com', '', '', 1, 0, '2020-07-21 22:59:31.020391', 'username-4');

INSERT INTO dropbag_thread (id, title, created_on, about, user_id)
VALUES
(1, 'webdev', '2020-07-21 22:59:51.385469', 'A community dedicated to all things web development: both front-end and back-end. For more design-related questions, try /r/web_design.', 1),
(2, 'softwarearchitecture', '2020-07-21 22:59:53.356546', 'A good place to start.', 1);

INSERT INTO dropbag_thread_subscription (id, thread_id, user_id)
VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 2);

INSERT INTO dropbag_post (id, title, slug, content, created_on, author, thread_id, user_id)
VALUES
(1, 'Software Development Life Cycle - SDLC', 'post-1-1', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', '2020-07-21 22:59:31.020391', 'username-1', 1, 1),
(2, 'post 2', 'post-2-1', 'content 2v', '2020-07-21 22:59:31.020391', 'username-2', 1, 2);

INSERT INTO dropbag_uservote (id, user_id, post_id, score)
VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 2, 2, 1),
(4, 1, 2, 1);
