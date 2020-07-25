INSERT INTO dropbag_user (id, password, last_login, is_superuser, email, first_name, last_name, is_active, is_mod, date_joined, username)
VALUES
(1, '1', '2020-07-24 22:13:40.490443', 0, 'test@gmail.com', '', '', 1, 0, '2020-07-21 22:59:31.020391', '1'),
(2, '2', '2020-07-23 22:53:58.242942', 0, 'test1@gmail.com', '', '', 1, 0, '2020-07-23 22:53:44.390596', '2');

INSERT INTO dropbag_thread (id, title, created_on, about, user_id)
VALUES
(1, 'title1', '2020-07-21 22:59:51.385469', 'about about about', 1),
(2, 'title2', '2020-07-21 22:59:53.356546', 'about about about', 1);

INSERT INTO dropbag_thread_subscription (id, thread_id, user_id)
VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 2);

INSERT INTO dropbag_post (id, title, slug, content, created_on, author, thread_id, user_id, upvote, downvote)
VALUES
(1, 'post 1', 'post-1-1', 'content 1', '2020-07-21 22:59:31.020391', 'username-1', 1, 1, 50, 2),
(2, 'post 2', 'post-2-1', 'content 2v', '2020-07-21 22:59:31.020391', 'username-2', 1, 2, 14, 0);

INSERT INTO dropbag_uservote (id, user_id, post_id, vote)
VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 2, 2, 1),
(4, 1, 2, 1);

INSERT INTO dropbag_uservote (id, user_id, post_id, vote)
VALUES
(4, 1, 2, 1);
