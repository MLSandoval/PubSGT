-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Feb 07, 2019 at 06:23 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `SGTStandard`
--

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` bigint(20) unsigned NOT NULL,
  `name` varchar(30) COLLATE utf32_unicode_ci NOT NULL,
  `course` varchar(30) COLLATE utf32_unicode_ci NOT NULL,
  `instructor` varchar(30) COLLATE utf32_unicode_ci NOT NULL,
  `grade` tinyint(3) unsigned NOT NULL,
  `added` date NOT NULL,
  `notes` text COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `name`, `course`, `instructor`, `grade`, `added`, `notes`) VALUES
(1, 'Sri Madhala', 'English', 'Charles Dickens', 90, '2018-08-23', 'Funny Dude.'),
(2, 'Michael Esfahani', 'Bongo Playing', 'Daniel Paschal', 78, '2018-06-13', 'Such a cool dude.  Even cooler hair.'),
(3, 'Christine Than', 'CS', 'Smith', 89, '2019-02-06', 'Emulating Kafi Aman'),
(4, 'Matthew Staniszewski', 'math', 'smith', 89, '2018-11-16', 'Slow down, dude!'),
(5, 'Charu Benjawal', 'math', 'smith', 89, '2018-09-12', 'Be confident in yourself!'),
(9, 'Diana Curtis', 'math', 'smith', 100, '2019-05-13', 'You know more than you know.'),
(10, 'Edgar Padilla', 'math', 'smith', 89, '2019-02-11', 'Great attitude.  Will go far.'),
(11, 'Alejandro Carrillo', 'math', 'smith', 89, '2019-01-09', 'The moment things go sideways, ask.  Early corrections lead to early understanding.'),
(12, 'Danika Quinteros', 'math', 'smith', 89, '2019-02-06', 'The poster child for underserved lack of confidence.  Capable person and programmer'),
(13, 'Xiaoyun(Stella) Hsin', 'math', 'smith', 89, '2018-11-13', 'Genius'),
(14, 'Karen King', 'math', 'smith', 89, '2018-11-13', 'Kindest person I know'),
(15, 'Joshua Garcia', 'math', 'smith', 89, '2018-10-13', 'There is so much to know, and you will.  Enjoy the ride and keep your dedication to your knowledge'),
(16, 'Anthony Boccino', 'math', 'smith', 89, '2018-10-13', 'Smart dude.  Smarter than he thinks.  Faith in yourself will go well.'),
(17, 'Bill Darnall', 'math', 'smith', 89, '2018-11-13', 'Listening is fundamental.  Slow down.  Keep your spirit up'),
(18, 'Christopher Sulayao', 'math', 'smith', 89, '2018-11-13', 'Growing step by step.  Will be the poster child for what conviction should look like.'),
(19, 'John Holman', 'math', 'smith', 89, '2018-11-13', 'If he parents like he works, his children will be very lucky.  VERY smart man.'),
(21, 'Sean Jaw', 'math', 'smith', 89, '2018-11-13', 'I know it is difficult.  Keep going.  Has the smarts, now will the conviction hold out.'),
(22, 'Scott Bowler', 'math', 'smith', 89, '2018-11-13', 'My finest student ever trained.  Definition of a good man.'),
(23, 'Test NAme', 'test course', 'test instructor', 99, '2019-02-07', 'some notes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
