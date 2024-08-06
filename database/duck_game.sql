-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2024 at 11:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duck_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_records`
--

CREATE TABLE `login_records` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `login_time` datetime DEFAULT current_timestamp(),
  `full_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_records`
--

INSERT INTO `login_records` (`id`, `user_id`, `username`, `login_time`, `full_name`) VALUES
(2, 4, 'usama@gmail.com', '2024-06-05 13:56:31', 'Usama'),
(3, 4, 'usama@gmail.com', '2024-06-05 13:58:49', ''),
(4, 4, 'usama@gmail.com', '2024-06-05 14:00:11', 'Usama'),
(5, 4, 'usama@gmail.com', '2024-06-05 14:01:07', 'Usama'),
(6, 4, 'usama@gmail.com', '2024-06-05 14:12:21', 'Usama'),
(7, 4, 'usama@gmail.com', '2024-06-05 14:17:55', 'Usama');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(10) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `fullname`, `email`, `password`, `created_at`) VALUES
(3, 'masood', 'masood@yahoo.com', '$2y$10$i32ivNxJX3vH/.u6Ye5zCuHg.Fr/HDzDfxk2clVjBG/RogDHZI1Ku', '2024-05-17 02:05:34.261127'),
(4, 'Usama', 'usama@gmail.com', '$2y$10$.NSw28.JOTzq84FogTWmAOVA.vCfxUnt9toWVrkXNwZ0DnNWsDFse', '2024-06-05 00:24:43.390675');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_records`
--
ALTER TABLE `login_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_records`
--
ALTER TABLE `login_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `login_records`
--
ALTER TABLE `login_records`
  ADD CONSTRAINT `login_records_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
