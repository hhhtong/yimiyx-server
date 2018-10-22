/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MariaDB
 Source Server Version : 100308
 Source Host           : localhost:3306
 Source Schema         : yimiyx_db

 Target Server Type    : MariaDB
 Target Server Version : 100308
 File Encoding         : 65001

 Date: 22/10/2018 11:18:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_access
-- ----------------------------
DROP TABLE IF EXISTS `admin_access`;
CREATE TABLE `admin_access` (
  `access_id` int(11) NOT NULL AUTO_INCREMENT,
  `access_name` varchar(64) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_department
-- ----------------------------
DROP TABLE IF EXISTS `admin_department`;
CREATE TABLE `admin_department` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `IDX_d187030ef2acb3098ddb9ae6e7` (`department_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_department_access_admin_access
-- ----------------------------
DROP TABLE IF EXISTS `admin_department_access_admin_access`;
CREATE TABLE `admin_department_access_admin_access` (
  `admin_department_department_id` int(11) NOT NULL,
  `admin_access_access_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_department_department_id`,`admin_access_access_id`),
  KEY `FK_1219580d56b97fa773723c2e744` (`admin_access_access_id`),
  CONSTRAINT `FK_1219580d56b97fa773723c2e744` FOREIGN KEY (`admin_access_access_id`) REFERENCES `admin_access` (`access_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e003448f9d5d81e0b07e959ad87` FOREIGN KEY (`admin_department_department_id`) REFERENCES `admin_department` (`department_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_department_role_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_department_role_admin_role`;
CREATE TABLE `admin_department_role_admin_role` (
  `admin_department_department_id` int(11) NOT NULL,
  `admin_role_role_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_department_department_id`,`admin_role_role_id`),
  KEY `FK_f9c6104cacf3e7569e2fbfd07b7` (`admin_role_role_id`),
  CONSTRAINT `FK_7cf424247094644199610bd8353` FOREIGN KEY (`admin_department_department_id`) REFERENCES `admin_department` (`department_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f9c6104cacf3e7569e2fbfd07b7` FOREIGN KEY (`admin_role_role_id`) REFERENCES `admin_role` (`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_log
-- ----------------------------
DROP TABLE IF EXISTS `admin_log`;
CREATE TABLE `admin_log` (
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_user_id` int(11) DEFAULT NULL,
  `type` tinyint(4) NOT NULL,
  `content` varchar(200) NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `FK_a0b97db26182351ce051706921b` (`user_user_id`),
  CONSTRAINT `FK_a0b97db26182351ce051706921b` FOREIGN KEY (`user_user_id`) REFERENCES `admin_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(64) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_role_access_admin_access
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_access_admin_access`;
CREATE TABLE `admin_role_access_admin_access` (
  `admin_role_role_id` int(11) NOT NULL,
  `admin_access_access_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_role_role_id`,`admin_access_access_id`),
  KEY `FK_7daf9436be3239229adedfe7012` (`admin_access_access_id`),
  CONSTRAINT `FK_0fb4e290a6987121c33057c0ae1` FOREIGN KEY (`admin_role_role_id`) REFERENCES `admin_role` (`role_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_7daf9436be3239229adedfe7012` FOREIGN KEY (`admin_access_access_id`) REFERENCES `admin_access` (`access_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `avator` varchar(100) DEFAULT NULL,
  `is_disable` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `deleted_at` datetime DEFAULT NULL,
  `login_name` varchar(64) NOT NULL,
  `email` varchar(64) DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `login_time` datetime DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `user_name` varchar(64) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `IDX_a40e0d2c67d74e5d7c5ac93c0e` (`login_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
BEGIN;
INSERT INTO `admin_user` VALUES (999, 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png', 0, '2018-08-23 13:51:27.725316', '2018-08-23 13:51:27.725316', NULL, 'admin', NULL, 0, NULL, NULL, 'c237bbf597b4b4f6ff0d2f5c4ea5ea21', '汪东城', NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin_user_access_admin_access
-- ----------------------------
DROP TABLE IF EXISTS `admin_user_access_admin_access`;
CREATE TABLE `admin_user_access_admin_access` (
  `admin_user_user_id` int(11) NOT NULL,
  `admin_access_access_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_user_user_id`,`admin_access_access_id`),
  KEY `FK_0ff27da056431766e90efd2b460` (`admin_access_access_id`),
  CONSTRAINT `FK_0ff27da056431766e90efd2b460` FOREIGN KEY (`admin_access_access_id`) REFERENCES `admin_access` (`access_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_c4620f5d83b1616f52974e4acd9` FOREIGN KEY (`admin_user_user_id`) REFERENCES `admin_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_user_department_admin_department
-- ----------------------------
DROP TABLE IF EXISTS `admin_user_department_admin_department`;
CREATE TABLE `admin_user_department_admin_department` (
  `admin_user_user_id` int(11) NOT NULL,
  `admin_department_department_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_user_user_id`,`admin_department_department_id`),
  KEY `FK_d06cf16b77dce99f9a2683599e9` (`admin_department_department_id`),
  CONSTRAINT `FK_d06cf16b77dce99f9a2683599e9` FOREIGN KEY (`admin_department_department_id`) REFERENCES `admin_department` (`department_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f50f0d71071c41ebb6d2aa4a7cb` FOREIGN KEY (`admin_user_user_id`) REFERENCES `admin_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for admin_user_role_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_user_role_admin_role`;
CREATE TABLE `admin_user_role_admin_role` (
  `admin_user_user_id` int(11) NOT NULL,
  `admin_role_role_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_user_user_id`,`admin_role_role_id`),
  KEY `FK_df39a96aa0dd1e566f732195cba` (`admin_role_role_id`),
  CONSTRAINT `FK_df39a96aa0dd1e566f732195cba` FOREIGN KEY (`admin_role_role_id`) REFERENCES `admin_role` (`role_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f2f4ae8c16c0cf2a87e17cad3f8` FOREIGN KEY (`admin_user_user_id`) REFERENCES `admin_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_num` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `user_id` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f091e86a234693a49084b4c2c86` (`user_id`),
  KEY `FK_2c82bdfb1db2511d25a8dbceeba` (`goods_id`),
  CONSTRAINT `FK_2c82bdfb1db2511d25a8dbceeba` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`),
  CONSTRAINT `FK_f091e86a234693a49084b4c2c86` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for coupon
-- ----------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(200) NOT NULL,
  `coupon_type` tinyint(4) NOT NULL DEFAULT 1,
  `coupon_money` int(11) NOT NULL DEFAULT 0,
  `spend_money` int(11) NOT NULL DEFAULT 0,
  `coupon_des` text DEFAULT NULL,
  `send_num` int(11) NOT NULL DEFAULT 0,
  `receive_num` int(11) NOT NULL DEFAULT 0,
  `data_flag` tinyint(4) NOT NULL DEFAULT 1,
  `send_start_time` date NOT NULL,
  `send_end_time` date NOT NULL,
  `valid_start_time` date NOT NULL,
  `valid_end_time` date NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_no` char(10) NOT NULL,
  `goods_name` varchar(50) NOT NULL,
  `goods_alias` varchar(50) DEFAULT NULL,
  `stock_qty` int(11) NOT NULL DEFAULT 0,
  `is_online` tinyint(4) NOT NULL DEFAULT -1,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `deleted_at` datetime DEFAULT NULL,
  `made_in` varchar(50) DEFAULT NULL,
  `bar_code` varchar(32) DEFAULT NULL,
  `spec` varchar(20) DEFAULT NULL,
  `spec_num` int(11) NOT NULL DEFAULT 1,
  `description` text DEFAULT NULL,
  `unit_price` decimal(5,2) DEFAULT NULL,
  `resale_price` decimal(5,2) DEFAULT NULL,
  `goods_amount` int(11) NOT NULL DEFAULT 0,
  `activity_type` varchar(1000) DEFAULT NULL,
  `cover` varchar(100) DEFAULT NULL,
  `carousels` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_d644eef5c0d388ada12f6933b4` (`goods_no`)
) ENGINE=InnoDB AUTO_INCREMENT=288 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES (1, '0502020001', '长白菜', '', 99, -1, '2018-04-04 10:10:34.976000', '2018-04-04 10:10:34.976000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (2, '0502020002', '圆白菜', '', 99, -1, '2018-04-04 10:11:29.870000', '2018-04-04 10:11:29.870000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (3, '0502020025', '奶白菜', '', 99, -1, '2018-04-04 10:13:27.625000', '2018-04-06 09:21:41.169000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (4, '0502020014', '杭白菜', '', 99, -1, '2018-04-04 10:14:10.069000', '2018-04-06 09:21:59.766000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (5, '0502020011', '娃娃菜', '', 99, -1, '2018-04-04 10:15:17.979000', '2018-04-06 09:22:09.697000', NULL, '北京', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (6, '0502020006', '娃娃菜', '', 99, -1, '2018-04-04 10:15:43.585000', '2018-04-06 09:00:56.322000', NULL, '郑州', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (7, '0502020007', '乌塌菜', '菊花菜', 99, -1, '2018-04-04 10:16:53.240000', '2018-04-04 10:16:53.240000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (8, '0502020008', '小油菜', '上海青', 99, -1, '2018-04-04 10:17:21.366000', '2018-04-04 10:17:21.366000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (9, '0502020009', '油麦', '油麦菜', 99, -1, '2018-04-04 10:18:54.573000', '2018-04-04 10:18:54.573000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (10, '0502020010', '生菜', '', 99, -1, '2018-04-04 10:19:30.653000', '2018-04-04 10:19:30.653000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (11, '0502020005', '球生菜', '', 99, -1, '2018-04-04 10:20:31.780000', '2018-04-06 09:23:28.752000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (12, '0502010001', '菠菜', '', 99, -1, '2018-04-04 10:21:02.093000', '2018-04-04 10:21:02.093000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (13, '0502020012', '苦菊', ' ', 99, -1, '2018-04-04 10:21:43.378000', '2018-04-04 10:21:43.378000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (14, '0502020013', '空心菜', '', 99, -1, '2018-04-04 10:22:51.296000', '2018-04-04 10:22:51.296000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (15, '0502020004', '香菜', '', 99, -1, '2018-04-04 10:23:22.370000', '2018-04-06 09:29:52.374000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (16, '0502020015', '茼蒿', '', 99, -1, '2018-04-04 10:23:59.513000', '2018-04-04 10:23:59.513000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (17, '0502020016', '蒜苗', '', 99, -1, '2018-04-04 10:24:42.053000', '2018-04-04 10:24:42.053000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (18, '0502020017', '蒜黄', '', 99, -1, '2018-04-04 10:25:07.508000', '2018-04-04 10:25:07.508000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (19, '0502020018', '蒜薹', '蒜苔', 99, -1, '2018-04-04 10:25:38.319000', '2018-04-04 10:25:38.319000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (20, '0502020019', '韭菜', '', 99, -1, '2018-04-04 10:26:08.811000', '2018-04-04 10:26:08.811000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (21, '0502020020', '韭黄', '', 99, -1, '2018-04-04 10:26:30.290000', '2018-04-04 10:26:30.290000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (22, '0502020021', '茴香', '', 99, -1, '2018-04-04 10:27:11.109000', '2018-04-04 10:27:11.109000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (23, '0502020022', '冰草', '', 99, -1, '2018-04-04 10:27:34.308000', '2018-04-04 10:27:34.308000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (24, '0502020023', '蓬蒿', '', 99, -1, '2018-04-04 10:28:10.432000', '2018-04-04 10:28:10.432000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (25, '0502020024', '鸡毛菜', '', 99, -1, '2018-04-04 10:28:44.176000', '2018-04-04 10:28:44.176000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (26, '0502020003', '香椿', '香椿苗', 99, -1, '2018-04-04 10:30:02.757000', '2018-04-04 18:58:11.818000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (27, '0502030002', '菜心', '菜薹', 99, -1, '2018-04-04 10:35:04.766000', '2018-04-04 10:37:30.552000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (28, '0502030001', '广州菜心', '', 99, -1, '2018-04-04 10:38:32.246000', '2018-04-05 00:16:51.961000', NULL, '广州', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (29, '0502030003', '紫菜苔', '紫菜薹', 99, -1, '2018-04-04 10:39:49.055000', '2018-04-04 10:39:49.055000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (30, '0502030004', '芹菜', '', 99, -1, '2018-04-04 10:41:19.990000', '2018-04-04 10:41:19.990000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (31, '0502030005', '西芹', '', 99, -1, '2018-04-04 10:41:48.489000', '2018-04-04 10:41:48.489000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (32, '0502020026', '香芹', '', 99, -1, '2018-04-04 10:43:38.455000', '2018-04-04 10:43:38.455000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (33, '0502030006', '芥菜', '', 99, -1, '2018-04-04 10:44:13.601000', '2018-04-06 10:15:33.785000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (34, '0502030007', '芥蓝', '芥兰', 99, -1, '2018-04-04 18:12:55.977000', '2018-04-04 18:12:55.977000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (35, '0502030008', '西兰花', '青花菜', 99, -1, '2018-04-04 18:13:38.645000', '2018-04-04 18:34:35.199000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (36, '0502030009', '绿甘蓝', '包菜', 99, -1, '2018-04-04 18:14:20.118000', '2018-04-04 18:31:54.901000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (37, '0502030010', '紫甘蓝', '紫包菜', 99, -1, '2018-04-04 18:21:53.708000', '2018-04-04 18:23:09.973000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (38, '0502030011', '菜花', '花椰菜', 99, -1, '2018-04-04 18:33:03.778000', '2018-04-04 18:33:03.778000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (39, '0502030012', '有机菜花', '有机花', 99, -1, '2018-04-04 18:33:41.691000', '2018-04-04 18:33:41.691000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (40, '0502030013', '豌豆苗', '', 99, -1, '2018-04-04 18:35:36.554000', '2018-04-04 18:35:36.554000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (41, '0502030014', '绿芽菜', '', 99, -1, '2018-04-04 18:36:07.724000', '2018-04-04 18:56:08.704000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (42, '0502030015', '黄豆芽', '', 99, -1, '2018-04-04 18:55:18.034000', '2018-04-04 18:55:18.034000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (43, '0502030016', '竹笋', '', 99, -1, '2018-04-04 18:58:42.505000', '2018-04-04 18:58:42.505000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (44, '0502030017', '芦笋', '', 99, -1, '2018-04-06 09:00:34.004000', '2018-04-06 09:00:34.004000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (45, '0502030018', '秋葵', '', 99, -1, '2018-04-06 09:04:33.323000', '2018-04-06 09:04:33.323000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (46, '0502030019', '白萝卜', '', 99, -1, '2018-04-06 09:05:13.450000', '2018-04-06 09:05:13.450000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (47, '0502030020', '青萝卜', '', 99, -1, '2018-04-06 09:05:45.189000', '2018-04-06 09:05:45.189000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (48, '0502030021', '胡萝卜', '', 99, -1, '2018-04-06 09:06:37.822000', '2018-04-06 09:06:37.822000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (49, '0502030022', '红萝卜', '', 99, -1, '2018-04-06 09:06:58.970000', '2018-04-06 09:06:58.970000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (50, '0502030023', '榨菜头', '', 99, -1, '2018-04-06 09:07:35.550000', '2018-04-06 09:07:35.550000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (51, '0502030024', '芋头', '', 99, -1, '2018-04-06 09:08:01.254000', '2018-04-06 09:08:01.254000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (52, '0502030025', '毛芋艿', '', 99, -1, '2018-04-06 09:11:39.936000', '2018-04-06 09:11:39.936000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (53, '0502030026', '山芋', '', 99, -1, '2018-04-06 09:12:18.442000', '2018-04-06 09:12:18.442000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (54, '0502030027', '紫山芋', '', 99, -1, '2018-04-06 09:13:14.340000', '2018-04-06 09:13:14.340000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (55, '0502030028', '糯玉米', '', 99, -1, '2018-04-06 09:13:43.543000', '2018-04-06 09:13:59.082000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (56, '0502030029', '甜玉米', '', 11, -1, '2018-04-06 09:14:17.577000', '2018-04-06 09:14:17.577000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (57, '0502030030', '水果玉米', '', 11, -1, '2018-04-06 09:14:39.194000', '2018-04-06 09:14:39.194000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (58, '0502030031', '百合', '', 11, -1, '2018-04-06 09:17:40.357000', '2018-04-06 09:17:40.357000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (59, '0502030032', '山药', '毛山药', 11, -1, '2018-04-06 09:19:55.853000', '2018-04-06 09:20:56.537000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (60, '0502030033', '铁棍山药', '', 11, -1, '2018-04-06 09:20:39.127000', '2018-04-06 09:20:39.127000', NULL, '河南', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (61, '0502030034', '铁棍山药', '', 11, -1, '2018-04-06 09:42:00.422000', '2018-04-06 09:42:00.422000', NULL, '安徽', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (62, '0502030035', '牛蒡', '恶实、大力子、东洋参', 11, -1, '2018-04-06 09:44:04.477000', '2018-04-06 09:44:04.477000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (63, '0502030036', '魔芋', '蒟蒻（jǔ ruò）', 11, -1, '2018-04-06 09:45:09.195000', '2018-04-06 09:45:09.195000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (64, '0502030037', '冬笋', '', 99, -1, '2018-04-06 09:46:06.503000', '2018-04-06 09:46:06.503000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (65, '0502030038', '莴笋', '莴苣笋、青笋、莴菜', 11, -1, '2018-04-06 09:48:43.013000', '2018-04-06 09:48:43.013000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (66, '0502030039', '荷兰瓜', '小黄瓜', 11, -1, '2018-04-06 09:49:29.765000', '2018-04-06 09:49:29.765000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (67, '0502030040', '荷兰豆', '', 11, -1, '2018-04-06 09:49:52.338000', '2018-04-06 09:49:52.338000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (68, '0502030041', '扁豆', '', 11, -1, '2018-04-06 09:50:45.380000', '2018-04-06 09:50:45.380000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (69, '0502030042', '荚豆', '链荚豆', 11, -1, '2018-04-06 09:52:41.482000', '2018-04-06 09:52:41.482000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (70, '0502030043', '长豆角', '豇豆', 11, -1, '2018-04-06 09:53:56.433000', '2018-04-06 10:02:00.813000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (71, '0502030044', '豌豆', '', 11, -1, '2018-04-06 09:54:25.013000', '2018-04-06 09:54:25.013000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (72, '0502030045', '眉豆', '四季豆', 11, -1, '2018-04-06 09:55:16.726000', '2018-04-06 09:57:51.197000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (73, '0502030046', '毛豆', '', 11, -1, '2018-04-06 09:55:59.034000', '2018-04-06 09:55:59.034000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (74, '0502030047', '蚕豆', '', 11, -1, '2018-04-06 09:56:22.399000', '2018-04-06 09:56:22.399000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (75, '0502030048', '刀豆', '', 11, -1, '2018-04-06 09:57:09.358000', '2018-04-06 09:57:09.358000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (76, '0502030049', '豆王', '', 11, -1, '2018-04-06 10:07:01.581000', '2018-04-06 10:07:01.581000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (77, '0502030050', '绿龙豆角', '', 11, -1, '2018-04-06 10:08:09.038000', '2018-04-06 10:08:09.038000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (78, '0502040001', '土豆', '', 11, -1, '2018-04-06 10:09:44.600000', '2018-04-06 10:12:56.920000', NULL, '内蒙', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (79, '0502040002', '荷兰土豆', '', 11, -1, '2018-04-06 10:10:33.562000', '2018-04-06 10:13:13.408000', NULL, '山东', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (80, '0502040003', '红皮土豆', '', 11, -1, '2018-04-06 10:11:15.146000', '2018-04-06 10:13:31.724000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (81, '0502040004', '紫薯', '', 11, -1, '2018-04-06 10:11:47.444000', '2018-04-06 10:13:52.738000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (82, '0502040005', '小紫薯', '', 11, -1, '2018-04-06 10:14:15.963000', '2018-04-06 10:14:15.963000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (83, '0502040006', '红薯', '', 11, -1, '2018-04-06 10:14:42.677000', '2018-04-06 10:14:42.677000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (84, '0502040007', '心里美', '', 11, -1, '2018-04-06 10:15:58.595000', '2018-04-06 10:15:58.595000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (85, '0502040008', '荸荠', '荸芥、马蹄', 11, -1, '2018-04-06 10:18:28.193000', '2018-04-06 10:18:28.193000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (86, '0502040009', '黄瓜', '', 11, -1, '2018-04-06 10:19:14.896000', '2018-04-06 10:19:14.896000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (87, '0502040010', '冬瓜', '', 11, -1, '2018-04-06 10:19:43.135000', '2018-04-06 10:19:43.135000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (88, '0502040011', '吊瓜', '日本冬瓜', 11, -1, '2018-04-06 10:20:37.058000', '2018-04-06 10:20:37.058000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (89, '0502040012', '南瓜', '', 11, -1, '2018-04-06 10:21:05.685000', '2018-04-06 10:21:05.685000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (90, '0502040013', '日本南瓜', '', 11, -1, '2018-04-06 10:21:47.496000', '2018-04-06 10:21:47.496000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (91, '0502040014', '迷你南瓜', '', 11, -1, '2018-04-06 10:22:14.191000', '2018-04-06 10:22:14.191000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (92, '0502040015', '金瓜', '', 11, -1, '2018-04-06 10:38:13.232000', '2018-04-06 10:38:13.232000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (93, '0502040016', '北瓜', '', 11, -1, '2018-04-06 10:38:41.849000', '2018-04-06 10:38:41.849000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (94, '0502040017', '西葫芦', '', 11, -1, '2018-04-06 10:54:50.250000', '2018-04-06 10:54:50.250000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (95, '0502040018', '丝瓜', '', 11, -1, '2018-04-06 10:56:11.474000', '2018-04-06 10:56:11.474000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (96, '0502040019', '瓠瓜', '', 11, -1, '2018-04-06 10:56:47.990000', '2018-04-06 10:56:47.990000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (97, '0502040020', '苦瓜', '', 11, -1, '2018-04-06 10:57:56.107000', '2018-04-06 10:57:56.107000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (98, '0502040021', '佛手瓜', '', 11, -1, '2018-04-06 10:59:58.043000', '2018-04-06 10:59:58.043000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (99, '0502040022', '长茄子', '茄条', 11, -1, '2018-04-06 11:01:46.307000', '2018-04-06 11:01:46.307000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (100, '0502040023', '圆茄子', '', 11, -1, '2018-04-06 17:57:06.118000', '2018-04-06 17:57:06.118000', NULL, '山东', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (101, '0502040024', '圆茄子', '', 11, -1, '2018-04-06 17:57:38.748000', '2018-04-06 17:57:38.748000', NULL, '山东', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (102, '0502040025', '彩椒（红黄）', '', 11, -1, '2018-04-06 17:59:46.257000', '2018-04-06 17:59:46.257000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (103, '0502040026', '青椒', '', 11, -1, '2018-04-06 18:00:37.337000', '2018-04-06 18:00:37.337000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (104, '0502040027', '薄皮青椒', '', 11, -1, '2018-04-06 18:01:11.793000', '2018-04-06 18:01:11.793000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (105, '0502040028', '太空青椒', '', 11, -1, '2018-04-06 18:01:40.252000', '2018-04-06 18:01:40.252000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (106, '0502040029', '尖椒', '', 11, -1, '2018-04-06 18:03:46.433000', '2018-04-06 18:03:46.433000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (107, '0502040030', '红辣椒', '', 22, -1, '2018-04-06 18:25:05.689000', '2018-04-06 18:25:05.689000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (108, '0502040031', '线椒', '', 11, -1, '2018-04-06 18:25:39.463000', '2018-04-06 18:25:39.463000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (109, '0502040032', '美人椒（红）', '', 11, -1, '2018-04-06 18:30:11.078000', '2018-04-06 18:30:11.078000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (110, '0502040033', '美人椒（绿）', '', 11, -1, '2018-04-06 18:30:34.450000', '2018-04-06 18:30:34.450000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (111, '0502040034', '杭椒', '', 11, -1, '2018-04-06 18:30:54.316000', '2018-04-06 18:30:54.316000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (112, '0502040035', '龙椒', '螺丝椒', 11, -1, '2018-04-06 18:31:20.760000', '2018-04-06 18:31:20.760000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (113, '0502040036', '西红柿', '', 11, -1, '2018-04-06 18:32:07.050000', '2018-04-06 18:32:07.050000', NULL, '石家庄高邑', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (114, '0502040037', '西红柿', '', 11, -1, '2018-04-06 18:32:29.514000', '2018-04-06 18:32:29.514000', NULL, '邯郸永年', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (115, '0502040038', '圣女果', '小西红柿', 11, -1, '2018-04-06 18:34:35.296000', '2018-04-06 18:34:35.296000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (116, '0502030051', '莲藕', '', 11, -1, '2018-04-06 18:35:45.258000', '2018-04-06 18:35:45.258000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (117, '0502050001', '茨菇', '慈菇', 11, -1, '2018-04-06 18:38:11.325000', '2018-04-06 18:38:11.325000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (118, '0502020027', '莼菜', '', 11, -1, '2018-04-06 18:38:38.335000', '2018-04-06 18:38:38.335000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (119, '0502030052', '水芹', '', 11, -1, '2018-04-06 18:39:20.555000', '2018-04-06 18:39:20.555000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (120, '0502030053', '菱角', '', 11, -1, '2018-04-06 18:39:46.587000', '2018-04-06 18:39:46.587000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (121, '0502030054', '茭白', '', 11, -1, '2018-04-06 18:40:11.937000', '2018-04-06 18:40:11.937000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (122, '0502050002', '蘑菇', '平菇', 11, -1, '2018-04-06 18:40:53.174000', '2018-04-06 18:40:53.174000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (123, '0502050003', '金针菇', '', 11, -1, '2018-04-06 18:41:12.990000', '2018-04-06 18:41:12.990000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (124, '0502050004', '花菇', '', 11, -1, '2018-04-06 18:41:58.023000', '2018-04-06 18:41:58.023000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (125, '0502050005', '蟹味菇', '', 11, -1, '2018-04-06 18:42:11.631000', '2018-04-06 18:42:11.631000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (126, '0502050006', '海鲜菇', '', 11, -1, '2018-04-06 22:15:11.937000', '2018-04-06 22:15:11.937000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (127, '0502050007', '滑子菇', '', 11, -1, '2018-04-06 22:15:30.091000', '2018-04-06 22:15:30.091000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (128, '0502050008', '杏鲍菇', '', 22, -1, '2018-04-06 22:15:43.387000', '2018-04-06 22:15:43.387000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (129, '0502050009', '白玉菇', '', 11, -1, '2018-04-06 22:16:10.833000', '2018-04-06 22:16:10.833000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (130, '0502050010', '湿香菇', '', 11, -1, '2018-04-06 22:16:37.286000', '2018-04-06 22:16:37.286000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (131, '0502050011', '干香菇', '', 11, -1, '2018-04-06 22:16:50.471000', '2018-04-06 22:16:50.471000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (132, '0502050012', '草菇', '', 11, -1, '2018-04-06 22:17:05.937000', '2018-04-06 22:17:05.937000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (133, '0502050013', '秀珍菇', '', 12, -1, '2018-04-06 22:17:38.357000', '2018-04-06 22:17:38.357000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (134, '0502050014', '灰树花', '', 11, -1, '2018-04-06 22:19:52.511000', '2018-04-06 22:19:52.511000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (135, '0502050015', '扇贝菇', '', 0, -1, '2018-04-06 22:20:37.727000', '2018-04-06 22:20:37.727000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (136, '0502050016', '绣球菌', '', 0, -1, '2018-04-06 22:20:59.365000', '2018-04-06 22:20:59.365000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (137, '0502050017', '羊肚菌', '', 0, -1, '2018-04-06 22:21:15.137000', '2018-04-06 22:21:15.137000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (138, '0502050018', '鹿茸菇', '', 0, -1, '2018-04-06 22:21:28.813000', '2018-04-06 22:21:28.813000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (139, '0502050019', '大球盖菇', '', 0, -1, '2018-04-06 22:21:47.589000', '2018-04-06 22:21:47.589000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (140, '0502050020', '鲍鱼菇', '', 0, -1, '2018-04-06 22:22:02.469000', '2018-04-06 22:22:02.469000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (141, '0502050021', '猴头菇', '养胃', 0, -1, '2018-04-06 22:22:15.216000', '2018-04-06 22:22:15.216000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (142, '0502050022', '茶树菇', '', 0, -1, '2018-04-06 22:22:26.463000', '2018-04-06 22:22:26.463000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (143, '0502050023', '鸡腿菇', '', 0, -1, '2018-04-06 22:22:40.955000', '2018-04-06 22:22:40.955000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (144, '0502050024', '姬菇', '', 0, -1, '2018-04-06 22:23:09.111000', '2018-04-06 22:23:09.111000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (145, '0502050025', '银耳', '', 0, -1, '2018-04-06 22:23:23.703000', '2018-04-06 22:23:23.703000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (146, '0502050026', '紫菜', '', 0, -1, '2018-04-06 22:23:31.925000', '2018-04-06 22:23:31.925000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (147, '0502030056', '海带丝', '', 0, -1, '2018-04-06 22:23:44.568000', '2018-04-06 22:24:29.213000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (148, '0502030055', '海带条', '', 0, -1, '2018-04-06 22:24:20.600000', '2018-04-06 22:24:20.600000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (149, '0502050027', '木耳', '', 0, -1, '2018-04-06 22:24:47.392000', '2018-04-06 22:24:47.392000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (150, '0502050028', '鸡枞', '', 0, -1, '2018-04-06 22:25:00.359000', '2018-04-06 22:25:00.359000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (151, '0502050029', '黑皮鸡枞', '', 0, -1, '2018-04-06 22:25:13.242000', '2018-04-06 22:25:13.242000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (154, '0502060003', '紫皮洋葱', '', 0, -1, '2018-04-06 22:49:55.909000', '2018-04-06 22:56:06.907000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (155, '0502060004', '红皮洋葱', '', 0, -1, '2018-04-06 22:50:09.549000', '2018-04-06 22:50:09.549000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (156, '0502060005', '去皮黄洋葱', '', 0, -1, '2018-04-06 22:50:36.975000', '2018-04-06 22:50:36.975000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (157, '0502060006', '大葱', '', 0, -1, '2018-04-06 22:58:43.788000', '2018-04-06 22:58:43.788000', NULL, '山东', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (158, '0502060007', '精选大葱', '', 0, -1, '2018-04-06 22:59:05.685000', '2018-04-06 22:59:05.685000', NULL, '山东', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (159, '0502060008', '小香葱', '', 0, -1, '2018-04-06 22:59:24.115000', '2018-04-06 22:59:24.115000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (160, '0502060009', '生姜', '鲜姜', 0, -1, '2018-04-06 22:59:50.595000', '2018-04-06 22:59:50.595000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (161, '0502060010', '干姜', '', 0, -1, '2018-04-06 23:00:01.137000', '2018-04-06 23:00:01.137000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (162, '0502060011', '大蒜', '', 0, -1, '2018-04-06 23:00:23.375000', '2018-04-06 23:00:23.375000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (163, '0502060012', '精选净蒜', '', 0, -1, '2018-04-06 23:00:36.559000', '2018-04-06 23:00:36.559000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (164, '0502060013', '干辣椒', '', 0, -1, '2018-04-06 23:00:58.490000', '2018-04-06 23:00:58.490000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (165, '0502060014', '花椒', '', 0, -1, '2018-04-06 23:02:14.117000', '2018-04-06 23:02:14.117000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (166, '0502060015', '麻椒', '', 0, -1, '2018-04-06 23:02:22.180000', '2018-04-06 23:02:22.180000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (167, '0502060016', '八角', '大料', 0, -1, '2018-04-06 23:02:36.402000', '2018-04-06 23:02:36.402000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (168, '0502060017', '陈皮', '', 0, -1, '2018-04-06 23:02:48.071000', '2018-04-06 23:02:48.071000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (169, '0502060018', '肉桂', '', 0, -1, '2018-04-06 23:02:55.363000', '2018-04-06 23:02:55.363000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (170, '0502060019', '小茴香', '', 0, -1, '2018-04-06 23:03:25.202000', '2018-04-06 23:03:25.202000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (171, '0502060020', '白豆蔻', '白扣', 0, -1, '2018-04-06 23:04:28.201000', '2018-04-06 23:04:28.201000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (172, '0502060021', '草果', '', 0, -1, '2018-04-06 23:04:47.482000', '2018-04-06 23:04:47.482000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (173, '0502060022', '桂皮', '', 0, -1, '2018-04-06 23:05:02.706000', '2018-04-06 23:05:02.706000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (174, '0502060023', '香叶', '', 0, -1, '2018-04-06 23:05:25.249000', '2018-04-06 23:05:25.249000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (175, '0502060024', '甘松', '松香', 0, -1, '2018-04-06 23:05:46.864000', '2018-04-06 23:05:46.864000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (176, '0502060025', '孜然粒', '', 0, -1, '2018-04-06 23:06:21.500000', '2018-04-06 23:06:21.500000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (177, '0502060026', '孜然面', '孜然粉', 0, -1, '2018-04-06 23:06:39.713000', '2018-04-06 23:06:39.713000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (178, '0502060027', '辣椒面', '辣椒粉', 0, -1, '2018-04-06 23:06:53.920000', '2018-04-06 23:06:53.920000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (179, '0502060028', '花椒粉', '', 0, -1, '2018-04-06 23:07:41.264000', '2018-04-06 23:07:41.264000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (180, '0502060029', '麻椒粉', '', 0, -1, '2018-04-06 23:07:50.038000', '2018-04-06 23:07:50.038000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (181, '0502060030', '胡椒', '', 0, -1, '2018-04-06 23:07:59.585000', '2018-04-06 23:07:59.585000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (182, '0502060031', '胡椒粉', '', 0, -1, '2018-04-06 23:08:07.904000', '2018-04-06 23:08:07.904000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (183, '0502060032', '麻椒粉', '', 0, -1, '2018-04-06 23:08:29.978000', '2018-04-06 23:08:29.978000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (184, '0502060033', '鸡精', '', 0, -1, '2018-04-06 23:09:17.925000', '2018-04-06 23:09:17.925000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (185, '0502060034', '味精', '', 0, -1, '2018-04-06 23:10:00.810000', '2018-04-06 23:10:00.810000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (186, '0502060035', '食盐', '', 0, -1, '2018-04-06 23:10:20.443000', '2018-04-06 23:10:20.443000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (187, '0502060036', '砂糖', '', 0, -1, '2018-04-06 23:10:29.478000', '2018-04-06 23:10:29.478000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (188, '0502060037', '绵砂糖', '', 0, -1, '2018-04-06 23:10:49.384000', '2018-04-06 23:10:49.384000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (189, '0502060038', '冰糖', '', 0, -1, '2018-04-06 23:10:58.138000', '2018-04-06 23:10:58.138000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (190, '0502060039', '红糖', '', 0, -1, '2018-04-06 23:11:06.302000', '2018-04-06 23:11:06.302000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (191, '0502060040', '甜面酱', '', 0, -1, '2018-04-06 23:12:24.007000', '2018-04-06 23:12:24.007000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (192, '0502060041', '黄豆酱', '豆瓣酱', 0, -1, '2018-04-06 23:12:53.960000', '2018-04-06 23:12:53.960000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (193, '0502060042', '郫县豆瓣酱', '', 0, -1, '2018-04-06 23:13:07.199000', '2018-04-06 23:13:07.199000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (194, '0502060043', '番茄酱', '', 0, -1, '2018-04-06 23:13:16.983000', '2018-04-06 23:13:16.983000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (195, '0502060044', '沙拉酱', '', 0, -1, '2018-04-06 23:13:25.519000', '2018-04-06 23:13:25.519000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (196, '0502060045', '芥末油', '', 0, -1, '2018-04-06 23:13:38.128000', '2018-04-06 23:13:38.128000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (197, '0502060046', '蒜蓉辣酱', '', 0, -1, '2018-04-06 23:13:59.879000', '2018-04-06 23:13:59.879000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (198, '0502060047', '芝麻酱', '', 0, -1, '2018-04-06 23:14:38.973000', '2018-04-06 23:14:38.973000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (199, '06020001', '苹果', '', 0, -1, '2018-04-06 23:17:40.398000', '2018-04-06 23:17:40.398000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (200, '06020002', '富士苹果', '', 0, -1, '2018-04-07 00:26:25.522000', '2018-04-07 00:26:25.522000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (201, '06020003', '浆水苹果', '', 0, -1, '2018-04-07 00:27:07.306000', '2018-04-07 00:27:17.827000', NULL, '太行山浆水', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (202, '06020004', '水晶梨', '', 0, -1, '2018-04-07 00:27:37.381000', '2018-04-07 00:27:37.381000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (203, '06020005', '鸭梨', '', 0, -1, '2018-04-07 00:27:45.750000', '2018-04-07 00:27:45.750000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (204, '06020006', '香梨', '', 0, -1, '2018-04-07 00:28:04.607000', '2018-04-07 00:28:04.607000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (205, '06020007', '柿子', '', 0, -1, '2018-04-07 00:28:16.883000', '2018-04-07 00:28:16.883000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (206, '06020008', '柿子饼', '', 0, -1, '2018-04-07 00:29:33.591000', '2018-04-07 00:29:33.591000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (207, '06020009', '山楂', '', 0, -1, '2018-04-07 00:29:49.825000', '2018-04-07 00:29:49.825000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (208, '06020010', '沙果', '', 0, -1, '2018-04-07 00:30:03.675000', '2018-04-07 00:30:03.675000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (209, '06020011', '海棠果', '', 0, -1, '2018-04-07 00:30:18.062000', '2018-04-07 00:30:18.062000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (210, '06020012', '葡萄', '', 0, -1, '2018-04-07 00:30:32.795000', '2018-04-07 00:30:32.795000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (211, '06020013', '龙眼葡萄', '', 0, -1, '2018-04-07 00:37:54.552000', '2018-04-07 00:37:54.552000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (212, '06020014', '青提子', '', 0, -1, '2018-04-07 00:38:49.763000', '2018-04-07 00:38:49.763000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (213, '06020015', '红提子', '', 0, -1, '2018-04-07 00:39:02.179000', '2018-04-07 00:39:02.179000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (214, '06020016', '草莓', '', 0, -1, '2018-04-07 00:39:15.529000', '2018-04-07 00:39:15.529000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (215, '06020017', '奶油草莓', '', 0, -1, '2018-04-07 00:39:30.116000', '2018-04-07 00:39:30.116000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (216, '06020018', '石榴', '', 0, -1, '2018-04-07 00:39:49.913000', '2018-04-07 00:39:49.913000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (217, '06020019', '沙棘果', '', 0, -1, '2018-04-07 00:40:02.119000', '2018-04-07 00:40:02.119000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (218, '06020020', '猕猴桃', '', 0, -1, '2018-04-07 00:40:18.293000', '2018-04-07 00:40:24.111000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (219, '06020021', '黑莓', '', 0, -1, '2018-04-07 00:40:44.971000', '2018-04-07 00:40:44.971000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (220, '06020022', '蓝莓', '', 0, -1, '2018-04-07 00:40:55.180000', '2018-04-07 00:40:55.180000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (221, '06020023', '无花果', '', 0, -1, '2018-04-07 00:41:14.553000', '2018-04-07 00:41:14.553000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (222, '06020024', '醋栗', '', 0, -1, '2018-04-07 00:41:33.482000', '2018-04-07 00:41:33.482000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (223, '06020025', '越桔', '', 0, -1, '2018-04-07 00:41:47.070000', '2018-04-07 00:41:47.070000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (224, '06020026', '树莓', '', 0, -1, '2018-04-07 00:41:58.110000', '2018-04-07 00:41:58.110000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (225, '06020027', '桃', '', 0, -1, '2018-04-07 00:42:17.248000', '2018-04-07 00:42:17.248000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (226, '06020028', '黄桃', '', 0, -1, '2018-04-07 00:42:29.920000', '2018-04-07 00:42:29.920000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (227, '06020029', '油桃', '', 0, -1, '2018-04-07 00:42:44.330000', '2018-04-07 00:42:44.330000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (228, '06020030', '蟠桃', '', 0, -1, '2018-04-07 00:42:51.703000', '2018-04-07 00:42:51.703000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (229, '06020031', '樱桃', '', 0, -1, '2018-04-07 00:43:16.225000', '2018-04-07 00:43:25.240000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (230, '06020032', '李子', '', 0, -1, '2018-04-07 00:43:34.915000', '2018-04-07 00:43:34.915000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (231, '06020033', '杏子', '', 0, -1, '2018-04-07 00:44:01.619000', '2018-04-07 00:44:01.619000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (232, '06020034', '梅子', '乌梅', 0, -1, '2018-04-07 00:44:22.328000', '2018-04-07 00:44:22.328000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (233, '06020035', '板栗', '', 0, -1, '2018-04-07 00:44:43.539000', '2018-04-07 00:44:43.539000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (234, '06020036', '榛子', '', 0, -1, '2018-04-07 00:45:03.895000', '2018-04-07 00:45:03.895000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (235, '06020037', '松子', '', 0, -1, '2018-04-07 00:45:11.178000', '2018-04-07 00:45:11.178000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (236, '06020038', '杏仁', '', 0, -1, '2018-04-07 00:46:09.705000', '2018-04-07 00:46:09.705000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (237, '06020039', '白果', '', 0, -1, '2018-04-07 00:46:19.161000', '2018-04-07 00:46:19.161000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (238, '06020040', '开心果', '', 0, -1, '2018-04-07 00:46:29.308000', '2018-04-07 00:46:29.308000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (239, '06020041', '夏威夷果', '', 0, -1, '2018-04-07 00:46:48.285000', '2018-04-07 00:46:48.285000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (240, '06020042', '腰果', '', 0, -1, '2018-04-07 00:46:59.001000', '2018-04-07 00:46:59.001000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (241, '06020043', '槟榔', '', 0, -1, '2018-04-07 00:47:11.263000', '2018-04-07 00:47:11.263000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (242, '06020044', '核桃', '', 0, -1, '2018-04-07 00:47:22.307000', '2018-04-07 00:47:22.307000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (243, '06020045', '橄榄', '', 0, -1, '2018-04-07 00:47:37.640000', '2018-04-07 00:47:37.640000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (244, '06020046', '椰子', '', 0, -1, '2018-04-07 00:47:51.612000', '2018-04-07 00:47:51.612000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (245, '06020047', '冬枣', '', 0, -1, '2018-04-07 00:48:10.005000', '2018-04-07 00:48:10.005000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (246, '06020048', '红枣', '', 0, -1, '2018-04-07 00:48:21.591000', '2018-04-07 00:48:21.591000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (247, '06020049', '桔（橘）子', '橘柑', 0, -1, '2018-04-07 00:49:03.947000', '2018-04-07 00:49:35.322000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (248, '06020050', '蜜桔', '', 0, -1, '2018-04-07 00:49:47.930000', '2018-04-07 00:49:47.930000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (249, '06020051', '金桔', '小金橘', 0, -1, '2018-04-07 00:50:02.688000', '2018-04-07 00:50:02.688000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (250, '06020052', '丑橘', '', 0, -1, '2018-04-07 00:50:22.597000', '2018-04-07 00:50:22.597000', NULL, '四川', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (251, '06020053', '砂糖橘', '', 0, -1, '2018-04-07 00:51:03.256000', '2018-04-07 00:51:03.256000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (252, '06020054', '橙子', '', 0, -1, '2018-04-07 00:51:26.839000', '2018-04-07 00:51:26.839000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (253, '06020055', '白柚', '', 0, -1, '2018-04-07 00:52:28.087000', '2018-04-07 00:52:28.087000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (254, '06020056', '红柚', '', 0, -1, '2018-04-07 00:52:37.191000', '2018-04-07 00:52:37.191000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (255, '06020057', '葡萄柚', '', 0, -1, '2018-04-07 00:53:00.942000', '2018-04-07 00:53:00.942000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (256, '06020058', '蜜柚', '', 0, -1, '2018-04-07 00:53:16.332000', '2018-04-07 00:53:16.332000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (257, '06020059', '柠檬', '', 0, -1, '2018-04-07 00:53:26.330000', '2018-04-07 00:53:26.330000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (258, '06020060', '香蕉', '', 0, -1, '2018-04-07 00:53:47.052000', '2018-04-07 00:53:47.052000', NULL, '广西', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (259, '06020061', '菠萝', '', 0, -1, '2018-04-07 00:53:59.474000', '2018-04-07 00:53:59.474000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (260, '06020062', '荔枝', '', 0, -1, '2018-04-07 00:54:20.056000', '2018-04-07 00:54:20.056000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (261, '06020063', '龙眼', '', 0, -1, '2018-04-07 00:54:30.173000', '2018-04-07 00:54:30.173000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (262, '06020064', '芒果', '', 0, -1, '2018-04-07 00:54:39.045000', '2018-04-07 00:54:39.045000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (263, '06020065', '木瓜', '', 0, -1, '2018-04-07 00:54:51.157000', '2018-04-07 00:54:51.157000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (264, '06020066', '火龙果', '', 0, -1, '2018-04-07 00:55:02.150000', '2018-04-07 00:55:02.150000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (265, '06020067', '榴莲', '', 0, -1, '2018-04-07 00:55:16.427000', '2018-04-07 00:55:16.427000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (266, '06020068', '枇杷', '', 0, -1, '2018-04-07 00:55:29.915000', '2018-04-07 00:55:29.915000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (267, '06020069', '人参果', '', 0, -1, '2018-04-07 00:55:39.437000', '2018-04-07 00:55:39.437000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (268, '06020070', '山竹', '', 0, -1, '2018-04-07 00:55:49.679000', '2018-04-07 00:55:49.679000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (269, '06020071', '杨梅', '', 0, -1, '2018-04-07 00:56:02.666000', '2018-04-07 00:56:02.666000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (270, '06020072', '杨桃', '', 0, -1, '2018-04-07 00:56:13.995000', '2018-04-07 00:56:13.995000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (271, '06020073', '菠萝蜜', '', 0, -1, '2018-04-07 00:56:28.174000', '2018-04-07 00:56:28.174000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (272, '06020074', '西瓜', '', 0, -1, '2018-04-07 00:56:38.588000', '2018-04-07 00:56:38.588000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (273, '06020075', '无籽西瓜', '', 0, -1, '2018-04-07 00:56:48.694000', '2018-04-07 00:56:48.694000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (274, '06020076', '甜瓜', '', 0, -1, '2018-04-07 00:57:01.027000', '2018-04-07 00:57:01.027000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (275, '06020077', '香瓜', '', 0, -1, '2018-04-07 00:57:09.678000', '2018-04-07 00:57:09.678000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (276, '06020078', '哈密瓜', '', 0, -1, '2018-04-07 00:57:18.490000', '2018-04-07 00:57:18.490000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (277, '1101030001', '葡萄干', '', 0, -1, '2018-04-07 00:58:41.436000', '2018-04-07 00:58:41.436000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (278, '1101030002', '干红枣', '', 0, -1, '2018-04-07 00:58:58.564000', '2018-04-07 00:58:58.564000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (279, '1101030003', '巴旦木', '智慧果', 0, -1, '2018-04-07 00:59:12.831000', '2018-04-07 00:59:12.831000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (280, '1101010001', '薄皮核桃', '', 0, -1, '2018-04-07 01:04:23.577000', '2018-04-07 01:04:23.577000', NULL, '新疆', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (281, '1101010002', '开心果', '', 0, -1, '2018-04-07 14:00:57.627000', '2018-04-07 14:00:57.627000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (282, '1101010003', '原味瓜子', '', 0, -1, '2018-04-07 14:01:38.725000', '2018-04-07 14:01:38.725000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (283, '1101010004', '五香瓜子', '', 0, -1, '2018-04-07 14:01:50.859000', '2018-04-07 14:01:50.859000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (284, '1101010005', '绿茶瓜子', '', 0, -1, '2018-04-07 14:02:12.543000', '2018-04-07 14:02:12.543000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (285, '1101010006', '原味炒花生', '', 0, -1, '2018-04-07 14:02:40.253000', '2018-04-07 14:02:40.253000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (286, '1101010007', '五香炒花生', '', 0, -1, '2018-04-07 14:02:57.498000', '2018-04-07 14:02:57.498000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `goods` VALUES (287, '06020079', '车厘子', '', 0, -1, '2018-04-07 14:08:24.386000', '2018-04-07 14:40:27.875000', NULL, '', NULL, '450g', 1, NULL, NULL, NULL, 0, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for goods_attr
-- ----------------------------
DROP TABLE IF EXISTS `goods_attr`;
CREATE TABLE `goods_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attr_name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for goods_attr_value
-- ----------------------------
DROP TABLE IF EXISTS `goods_attr_value`;
CREATE TABLE `goods_attr_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attr_name` varchar(25) NOT NULL,
  `attr_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for goods_category
-- ----------------------------
DROP TABLE IF EXISTS `goods_category`;
CREATE TABLE `goods_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT 0,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `name` varchar(25) NOT NULL,
  `no` char(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of goods_category
-- ----------------------------
BEGIN;
INSERT INTO `goods_category` VALUES (1, 0, 1, '新鲜水果', '06');
INSERT INTO `goods_category` VALUES (2, 1, 2, '时令水果', '02');
INSERT INTO `goods_category` VALUES (3, 1, 2, '热销水果', '01');
INSERT INTO `goods_category` VALUES (4, 2, 3, '柚', '03');
INSERT INTO `goods_category` VALUES (5, 2, 3, '橘', '02');
INSERT INTO `goods_category` VALUES (6, 2, 3, '香蕉', '01');
INSERT INTO `goods_category` VALUES (10, 0, 1, '活动专区-便民缴费', '01');
INSERT INTO `goods_category` VALUES (11, 10, 2, '天天有肉', '0002');
INSERT INTO `goods_category` VALUES (12, 10, 2, '新用户专区', '0001');
INSERT INTO `goods_category` VALUES (16, 0, 1, '蔬菜豆菇', '05');
INSERT INTO `goods_category` VALUES (17, 16, 2, '加工蔬菜', '01');
INSERT INTO `goods_category` VALUES (18, 17, 3, '方便净菜', '01');
INSERT INTO `goods_category` VALUES (19, 17, 3, '冷冻果蔬', '02');
INSERT INTO `goods_category` VALUES (20, 17, 3, '蔬菜沙拉', '03');
INSERT INTO `goods_category` VALUES (21, 16, 2, '新鲜蔬菜', '02');
INSERT INTO `goods_category` VALUES (22, 21, 3, '有机蔬菜', '01');
INSERT INTO `goods_category` VALUES (23, 21, 3, '叶菜类', '02');
INSERT INTO `goods_category` VALUES (24, 21, 3, '根茎类', '03');
INSERT INTO `goods_category` VALUES (25, 21, 3, '茄果类', '04');
INSERT INTO `goods_category` VALUES (26, 21, 3, '菌菇类', '05');
INSERT INTO `goods_category` VALUES (27, 21, 3, '葱姜蒜调味品', '06');
INSERT INTO `goods_category` VALUES (28, 16, 2, '主食', '03');
INSERT INTO `goods_category` VALUES (29, 28, 3, '馒头', '04');
INSERT INTO `goods_category` VALUES (30, 28, 3, '饼', '03');
INSERT INTO `goods_category` VALUES (31, 28, 3, '面条', '02');
INSERT INTO `goods_category` VALUES (32, 28, 3, '饼丝', '01');
INSERT INTO `goods_category` VALUES (33, 16, 2, '豆制品', '04');
INSERT INTO `goods_category` VALUES (34, 33, 3, '豆腐', '05');
INSERT INTO `goods_category` VALUES (35, 33, 3, '半豆干制品', '04');
INSERT INTO `goods_category` VALUES (36, 33, 3, '面筋制品', '03');
INSERT INTO `goods_category` VALUES (37, 33, 3, '即食豆制品', '02');
INSERT INTO `goods_category` VALUES (38, 33, 3, '真粉制品', '01');
INSERT INTO `goods_category` VALUES (39, 33, 3, '豆制干货类', '06');
INSERT INTO `goods_category` VALUES (43, 0, 1, '家有大厨-净菜下锅', '02');
INSERT INTO `goods_category` VALUES (44, 43, 2, '本帮菜', '0001');
INSERT INTO `goods_category` VALUES (45, 43, 2, '川菜', '0002');
INSERT INTO `goods_category` VALUES (46, 43, 2, '鲁菜', '0003');
INSERT INTO `goods_category` VALUES (47, 43, 2, '江浙菜', '0004');
INSERT INTO `goods_category` VALUES (48, 43, 2, '粤菜', '0005');
INSERT INTO `goods_category` VALUES (49, 43, 2, '日餐', '0006');
INSERT INTO `goods_category` VALUES (50, 43, 2, '韩餐', '0007');
INSERT INTO `goods_category` VALUES (51, 43, 2, '西餐', '0008');
INSERT INTO `goods_category` VALUES (52, 43, 2, '烘培工具', '0009');
INSERT INTO `goods_category` VALUES (53, 10, 2, '新用户专区', '0003');
INSERT INTO `goods_category` VALUES (54, 10, 2, '礼盒区', '0004');
INSERT INTO `goods_category` VALUES (55, 0, 1, '养生方略', '03');
INSERT INTO `goods_category` VALUES (56, 55, 2, '田园时蔬', '0001');
INSERT INTO `goods_category` VALUES (57, 55, 2, '无肉不欢', '0002');
INSERT INTO `goods_category` VALUES (58, 55, 2, '精美凉菜', '0003');
INSERT INTO `goods_category` VALUES (59, 55, 2, '玲珑小炒', '0004');
INSERT INTO `goods_category` VALUES (60, 55, 2, '营养汤羹', '0005');
INSERT INTO `goods_category` VALUES (61, 55, 2, '独家秘籍', '0006');
INSERT INTO `goods_category` VALUES (62, 55, 2, '其他熟食', '0007');
INSERT INTO `goods_category` VALUES (63, 55, 2, '经典套餐', '0008');
INSERT INTO `goods_category` VALUES (65, 0, 1, '儿童专区', '04');
INSERT INTO `goods_category` VALUES (66, 65, 2, '宝宝营养餐', '0001');
INSERT INTO `goods_category` VALUES (67, 65, 2, '儿童发育餐', '0002');
INSERT INTO `goods_category` VALUES (68, 65, 2, '儿童食材', '0003');
INSERT INTO `goods_category` VALUES (69, 65, 2, '儿童水果乳饮', '0004');
INSERT INTO `goods_category` VALUES (70, 0, 1, '鲜肉蛋禽', '07');
INSERT INTO `goods_category` VALUES (71, 70, 2, '品在当下', '01');
INSERT INTO `goods_category` VALUES (72, 70, 2, '猪', '02');
INSERT INTO `goods_category` VALUES (73, 70, 2, '牛', '03');
INSERT INTO `goods_category` VALUES (74, 70, 2, '羊', '04');
INSERT INTO `goods_category` VALUES (75, 71, 3, '羊肉', '01');
INSERT INTO `goods_category` VALUES (76, 71, 3, '火锅（春）', '02');
INSERT INTO `goods_category` VALUES (77, 70, 2, '禽', '05');
INSERT INTO `goods_category` VALUES (78, 70, 2, '蛋', '06');
INSERT INTO `goods_category` VALUES (79, 70, 2, '肉制品', '07');
INSERT INTO `goods_category` VALUES (80, 70, 2, '礼盒', '08');
INSERT INTO `goods_category` VALUES (81, 72, 3, '品牌猪肉', '01');
INSERT INTO `goods_category` VALUES (82, 72, 3, '红烧（五花）肉', '02');
INSERT INTO `goods_category` VALUES (83, 72, 3, '排骨', '03');
INSERT INTO `goods_category` VALUES (84, 71, 3, '烤肉季', '03');
INSERT INTO `goods_category` VALUES (85, 72, 3, '里脊', '04');
INSERT INTO `goods_category` VALUES (86, 72, 3, '馅', '05');
INSERT INTO `goods_category` VALUES (87, 72, 3, '串', '06');
INSERT INTO `goods_category` VALUES (88, 73, 3, '牛肉', '01');
INSERT INTO `goods_category` VALUES (89, 73, 3, '牛排', '02');
INSERT INTO `goods_category` VALUES (90, 77, 3, '鸡胸肉', '01');
INSERT INTO `goods_category` VALUES (91, 77, 3, '鸡腿', '02');
INSERT INTO `goods_category` VALUES (92, 77, 3, '鸡翅', '03');
INSERT INTO `goods_category` VALUES (93, 78, 3, '鸡蛋', '01');
INSERT INTO `goods_category` VALUES (94, 78, 3, '茶叶蛋', '02');
INSERT INTO `goods_category` VALUES (95, 78, 3, '咸鸭蛋', '03');
INSERT INTO `goods_category` VALUES (96, 78, 3, '皮蛋', '04');
INSERT INTO `goods_category` VALUES (97, 78, 3, '鹌鹑蛋', '05');
INSERT INTO `goods_category` VALUES (98, 74, 3, '羊肉', '01');
INSERT INTO `goods_category` VALUES (99, 74, 3, '羊肉串', '02');
INSERT INTO `goods_category` VALUES (101, 0, 1, '海之馈赠', '08');
INSERT INTO `goods_category` VALUES (102, 101, 2, '虾“冰”', '01');
INSERT INTO `goods_category` VALUES (103, 101, 2, '蟹“酱”', '02');
INSERT INTO `goods_category` VALUES (106, 102, 3, '虾仁', '01');
INSERT INTO `goods_category` VALUES (107, 102, 3, '白虾', '02');
INSERT INTO `goods_category` VALUES (108, 101, 2, '淡水之鱼', '03');
INSERT INTO `goods_category` VALUES (109, 101, 2, '海货之鱼', '04');
INSERT INTO `goods_category` VALUES (110, 101, 2, '贝', '05');
INSERT INTO `goods_category` VALUES (111, 101, 2, '海鲜制品', '06');
INSERT INTO `goods_category` VALUES (112, 111, 3, '虾滑', '01');
INSERT INTO `goods_category` VALUES (113, 111, 3, '鱼丸', '02');
INSERT INTO `goods_category` VALUES (114, 111, 3, '鱼豆腐', '03');
INSERT INTO `goods_category` VALUES (115, 111, 3, '甜不辣', '04');
INSERT INTO `goods_category` VALUES (116, 0, 1, '速食冻品', '09');
INSERT INTO `goods_category` VALUES (117, 116, 2, '中式面点', '01');
INSERT INTO `goods_category` VALUES (118, 117, 3, '包子', '01');
INSERT INTO `goods_category` VALUES (119, 117, 3, '饺子', '02');
INSERT INTO `goods_category` VALUES (120, 117, 3, '糕点', '03');
INSERT INTO `goods_category` VALUES (121, 116, 2, '正餐', '02');
INSERT INTO `goods_category` VALUES (122, 117, 3, '汤圆', '04');
INSERT INTO `goods_category` VALUES (123, 116, 2, '充饥', '03');
INSERT INTO `goods_category` VALUES (124, 117, 3, '月饼', '05');
INSERT INTO `goods_category` VALUES (125, 121, 3, '熟食卤味', '01');
INSERT INTO `goods_category` VALUES (126, 121, 3, '火锅汇', '02');
INSERT INTO `goods_category` VALUES (127, 121, 3, '西餐', '03');
INSERT INTO `goods_category` VALUES (128, 121, 3, '烧烤档', '04');
INSERT INTO `goods_category` VALUES (129, 121, 3, '冷冻果蔬', '05');
INSERT INTO `goods_category` VALUES (130, 123, 3, '泡面加个蛋', '01');
INSERT INTO `goods_category` VALUES (131, 123, 3, '压缩饼干', '02');
INSERT INTO `goods_category` VALUES (132, 116, 2, '冷饮甜品', '04');
INSERT INTO `goods_category` VALUES (134, 0, 1, '牛奶糕点', '10');
INSERT INTO `goods_category` VALUES (135, 134, 2, '牛奶乳品', '01');
INSERT INTO `goods_category` VALUES (136, 135, 3, '纯奶', '01');
INSERT INTO `goods_category` VALUES (137, 135, 3, '酸奶', '02');
INSERT INTO `goods_category` VALUES (138, 135, 3, '奶粉', '03');
INSERT INTO `goods_category` VALUES (139, 135, 3, '布丁', '04');
INSERT INTO `goods_category` VALUES (140, 134, 2, '面包糕点', '03');
INSERT INTO `goods_category` VALUES (141, 135, 3, '进口牛奶', '05');
INSERT INTO `goods_category` VALUES (142, 140, 3, '面包片', '01');
INSERT INTO `goods_category` VALUES (143, 140, 3, '点心糕点', '02');
INSERT INTO `goods_category` VALUES (144, 140, 3, '烘培面点', '03');
INSERT INTO `goods_category` VALUES (145, 134, 2, '乳制品', '02');
INSERT INTO `goods_category` VALUES (146, 145, 3, '奶酪芝士', '01');
INSERT INTO `goods_category` VALUES (147, 145, 3, '黄油', '02');
INSERT INTO `goods_category` VALUES (148, 145, 3, '奶油', '03');
INSERT INTO `goods_category` VALUES (149, 0, 1, '粮油副食', '12');
INSERT INTO `goods_category` VALUES (150, 149, 2, '米面粉丝', '01');
INSERT INTO `goods_category` VALUES (151, 150, 3, '五谷', '01');
INSERT INTO `goods_category` VALUES (152, 149, 2, '油', '02');
INSERT INTO `goods_category` VALUES (153, 150, 3, '杂粮', '02');
INSERT INTO `goods_category` VALUES (154, 150, 3, '米线粉丝', '03');
INSERT INTO `goods_category` VALUES (155, 150, 3, '花生豆类', '04');
INSERT INTO `goods_category` VALUES (156, 150, 3, '挂面', '05');
INSERT INTO `goods_category` VALUES (157, 150, 3, '半豆干制品', '06');
INSERT INTO `goods_category` VALUES (158, 150, 3, '面筋制品', '07');
INSERT INTO `goods_category` VALUES (159, 150, 3, '即食豆制品', '08');
INSERT INTO `goods_category` VALUES (160, 150, 3, '干货类', '09');
INSERT INTO `goods_category` VALUES (161, 152, 3, '调和油', '01');
INSERT INTO `goods_category` VALUES (162, 152, 3, '花生油植物油', '02');
INSERT INTO `goods_category` VALUES (163, 152, 3, '调味油', '03');
INSERT INTO `goods_category` VALUES (164, 149, 2, '油盐酱醋', '03');
INSERT INTO `goods_category` VALUES (165, 164, 3, '瓶瓶罐罐袋袋', '01');
INSERT INTO `goods_category` VALUES (166, 164, 3, '香料', '02');
INSERT INTO `goods_category` VALUES (168, 149, 2, '南北干货', '04');
INSERT INTO `goods_category` VALUES (169, 168, 3, '有机杂粮', '01');
INSERT INTO `goods_category` VALUES (170, 168, 3, '五谷膳食', '02');
INSERT INTO `goods_category` VALUES (171, 0, 1, '厨房用品', '13');
INSERT INTO `goods_category` VALUES (172, 171, 2, '锅碗瓢盆', '01');
INSERT INTO `goods_category` VALUES (173, 171, 2, '清洁区', '02');
INSERT INTO `goods_category` VALUES (174, 0, 1, '休闲零食', '11');
INSERT INTO `goods_category` VALUES (175, 174, 2, '零食', '01');
INSERT INTO `goods_category` VALUES (176, 175, 3, '坚果炒货', '01');
INSERT INTO `goods_category` VALUES (177, 175, 3, '糕点饼干', '02');
INSERT INTO `goods_category` VALUES (178, 175, 3, '糖果蜜饯', '03');
INSERT INTO `goods_category` VALUES (179, 175, 3, '肉类即食', '04');
INSERT INTO `goods_category` VALUES (180, 174, 2, '品牌馆', '02');
INSERT INTO `goods_category` VALUES (181, 175, 3, '火腿腊肠', '05');
INSERT INTO `goods_category` VALUES (182, 175, 3, '海味儿鲜', '06');
INSERT INTO `goods_category` VALUES (183, 0, 1, '烟酒饮料', '14');
INSERT INTO `goods_category` VALUES (184, 183, 2, '水', '01');
INSERT INTO `goods_category` VALUES (185, 183, 2, '烟', '02');
INSERT INTO `goods_category` VALUES (186, 183, 2, '酒', '03');
INSERT INTO `goods_category` VALUES (187, 184, 3, '纯水', '01');
INSERT INTO `goods_category` VALUES (188, 184, 3, '带汽儿的', '02');
INSERT INTO `goods_category` VALUES (189, 184, 3, '茶味儿的', '03');
INSERT INTO `goods_category` VALUES (190, 184, 3, '功能味儿的', '04');
INSERT INTO `goods_category` VALUES (191, 184, 3, '凉', '05');
INSERT INTO `goods_category` VALUES (192, 184, 3, '暖', '06');
INSERT INTO `goods_category` VALUES (193, 186, 3, '啤的', '01');
INSERT INTO `goods_category` VALUES (194, 186, 3, '红的', '02');
INSERT INTO `goods_category` VALUES (195, 186, 3, '白的', '03');
INSERT INTO `goods_category` VALUES (196, 0, 1, '生活用品', '15');
INSERT INTO `goods_category` VALUES (197, 16, 2, '养生方略', '05');
INSERT INTO `goods_category` VALUES (198, 1, 2, '优选味道', '04');
INSERT INTO `goods_category` VALUES (199, 1, 2, '地标水果', '05');
INSERT INTO `goods_category` VALUES (200, 1, 2, '新奇特', '06');
INSERT INTO `goods_category` VALUES (201, 197, 3, '锅碗瓢盆', '01');
INSERT INTO `goods_category` VALUES (202, 196, 2, '电器', '05');
INSERT INTO `goods_category` VALUES (203, 196, 2, '工具', '06');
INSERT INTO `goods_category` VALUES (204, 10, 2, '水电气缴费', '0005');
COMMIT;

-- ----------------------------
-- Table structure for goods_categorys_goods_category
-- ----------------------------
DROP TABLE IF EXISTS `goods_categorys_goods_category`;
CREATE TABLE `goods_categorys_goods_category` (
  `goods_id` int(11) NOT NULL,
  `goods_category_id` int(11) NOT NULL,
  PRIMARY KEY (`goods_id`,`goods_category_id`) USING BTREE,
  KEY `FK_efbd7500e984740543f37d40d31` (`goods_category_id`),
  CONSTRAINT `FK_ca283e40c19e66e34f2d420188b` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_efbd7500e984740543f37d40d31` FOREIGN KEY (`goods_category_id`) REFERENCES `goods_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of goods_categorys_goods_category
-- ----------------------------
BEGIN;
INSERT INTO `goods_categorys_goods_category` VALUES (1, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (2, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (3, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (4, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (5, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (6, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (7, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (8, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (9, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (10, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (11, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (12, 22);
INSERT INTO `goods_categorys_goods_category` VALUES (13, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (14, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (15, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (15, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (16, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (17, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (17, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (18, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (19, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (19, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (20, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (21, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (22, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (23, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (24, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (25, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (26, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (27, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (28, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (29, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (30, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (31, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (32, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (33, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (33, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (34, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (35, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (36, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (37, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (38, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (39, 22);
INSERT INTO `goods_categorys_goods_category` VALUES (39, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (40, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (41, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (42, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (43, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (44, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (45, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (46, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (47, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (48, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (49, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (50, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (51, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (52, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (53, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (54, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (55, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (56, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (57, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (58, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (59, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (60, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (61, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (62, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (63, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (64, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (65, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (66, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (67, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (68, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (69, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (70, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (71, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (72, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (73, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (74, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (75, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (76, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (77, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (78, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (79, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (80, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (81, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (82, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (83, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (84, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (85, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (86, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (87, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (88, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (89, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (90, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (91, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (92, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (93, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (94, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (95, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (96, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (97, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (98, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (99, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (100, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (101, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (102, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (103, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (104, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (105, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (106, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (107, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (108, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (109, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (110, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (111, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (112, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (113, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (114, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (115, 25);
INSERT INTO `goods_categorys_goods_category` VALUES (116, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (117, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (118, 23);
INSERT INTO `goods_categorys_goods_category` VALUES (119, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (120, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (121, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (122, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (123, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (124, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (125, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (126, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (127, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (128, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (129, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (130, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (131, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (132, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (133, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (134, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (135, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (136, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (137, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (138, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (139, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (140, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (141, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (142, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (143, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (144, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (145, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (146, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (147, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (148, 24);
INSERT INTO `goods_categorys_goods_category` VALUES (149, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (150, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (151, 26);
INSERT INTO `goods_categorys_goods_category` VALUES (154, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (155, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (156, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (157, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (158, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (159, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (160, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (161, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (162, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (163, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (164, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (165, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (166, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (167, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (168, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (169, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (170, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (171, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (172, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (173, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (174, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (175, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (176, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (177, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (178, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (179, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (180, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (181, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (182, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (183, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (184, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (185, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (186, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (187, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (188, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (189, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (190, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (191, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (192, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (193, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (194, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (195, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (196, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (197, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (198, 27);
INSERT INTO `goods_categorys_goods_category` VALUES (199, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (200, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (201, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (202, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (203, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (204, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (205, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (206, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (206, 178);
INSERT INTO `goods_categorys_goods_category` VALUES (207, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (208, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (209, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (210, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (211, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (212, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (213, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (214, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (215, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (216, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (217, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (218, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (219, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (220, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (221, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (222, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (223, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (224, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (225, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (226, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (227, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (228, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (229, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (230, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (231, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (232, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (233, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (234, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (235, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (236, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (237, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (238, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (239, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (240, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (240, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (241, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (242, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (242, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (243, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (244, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (245, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (246, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (247, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (248, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (249, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (250, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (251, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (252, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (253, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (254, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (255, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (256, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (257, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (258, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (259, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (260, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (261, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (262, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (263, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (264, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (265, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (266, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (267, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (268, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (269, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (270, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (271, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (272, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (273, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (274, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (275, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (276, 2);
INSERT INTO `goods_categorys_goods_category` VALUES (277, 178);
INSERT INTO `goods_categorys_goods_category` VALUES (278, 178);
INSERT INTO `goods_categorys_goods_category` VALUES (279, 178);
INSERT INTO `goods_categorys_goods_category` VALUES (280, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (281, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (282, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (283, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (284, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (285, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (286, 176);
INSERT INTO `goods_categorys_goods_category` VALUES (287, 2);
COMMIT;

-- ----------------------------
-- Table structure for goods_desc
-- ----------------------------
DROP TABLE IF EXISTS `goods_desc`;
CREATE TABLE `goods_desc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `unit_price` decimal(5,2) NOT NULL,
  `resale_price` decimal(5,2) NOT NULL,
  `goods_amount` int(11) NOT NULL,
  `small_img_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `img_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `goods_id` int(11) DEFAULT NULL,
  `type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_bf2221061a8ea268eeee458e2bc` (`goods_id`) USING BTREE,
  CONSTRAINT `fk_bf2221061a8ea268eeee458e2bc` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for goods_desc_tags_goods_tag
-- ----------------------------
DROP TABLE IF EXISTS `goods_desc_tags_goods_tag`;
CREATE TABLE `goods_desc_tags_goods_tag` (
  `goods_desc_id` int(11) NOT NULL,
  `goods_tag_id` int(11) NOT NULL,
  PRIMARY KEY (`goods_desc_id`,`goods_tag_id`) USING BTREE,
  KEY `fk_01252b52c44d9c1216cf2b18f66` (`goods_tag_id`) USING BTREE,
  CONSTRAINT `fk_01252b52c44d9c1216cf2b18f66` FOREIGN KEY (`goods_tag_id`) REFERENCES `goods_tag` (`id`),
  CONSTRAINT `fk_181dbff13626cc310274368e74c` FOREIGN KEY (`goods_desc_id`) REFERENCES `goods_desc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for goods_stores_store
-- ----------------------------
DROP TABLE IF EXISTS `goods_stores_store`;
CREATE TABLE `goods_stores_store` (
  `goods_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  PRIMARY KEY (`goods_id`,`store_id`),
  KEY `FK_c4cf507c9b63e931615fbbf1b8a` (`store_id`),
  CONSTRAINT `FK_a239ae679a386c0d435fd3a1803` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_c4cf507c9b63e931615fbbf1b8a` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods_tag
-- ----------------------------
DROP TABLE IF EXISTS `goods_tag`;
CREATE TABLE `goods_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(25) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `goods_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_fc0372cacccf947c2103d4bee79` (`goods_id`),
  CONSTRAINT `FK_fc0372cacccf947c2103d4bee79` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for goods_unit
-- ----------------------------
DROP TABLE IF EXISTS `goods_unit`;
CREATE TABLE `goods_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` char(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for purchase_child_order
-- ----------------------------
DROP TABLE IF EXISTS `purchase_child_order`;
CREATE TABLE `purchase_child_order` (
  `cid` char(24) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `main_order_mid` char(24) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `FK_931bab972f6cc2802d43fba9c97` (`main_order_mid`),
  CONSTRAINT `FK_931bab972f6cc2802d43fba9c97` FOREIGN KEY (`main_order_mid`) REFERENCES `purchase_main_order` (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for purchase_main_order
-- ----------------------------
DROP TABLE IF EXISTS `purchase_main_order`;
CREATE TABLE `purchase_main_order` (
  `mid` char(24) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT -1,
  `purchase_num` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `goods_id` int(11) DEFAULT NULL,
  `order_id` char(24) DEFAULT NULL,
  PRIMARY KEY (`mid`),
  KEY `FK_0b6e55888e83f4a2acafb6e04f9` (`goods_id`),
  KEY `FK_c036271367acdc9143acb97af75` (`order_id`),
  CONSTRAINT `FK_0b6e55888e83f4a2acafb6e04f9` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`),
  CONSTRAINT `FK_c036271367acdc9143acb97af75` FOREIGN KEY (`order_id`) REFERENCES `purchase_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for purchase_order
-- ----------------------------
DROP TABLE IF EXISTS `purchase_order`;
CREATE TABLE `purchase_order` (
  `id` char(24) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `remark` varchar(255) NOT NULL,
  `transactor` char(32) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `deleted_at` datetime DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_405b14c8cebb7848b253939ac9d` (`category_id`),
  KEY `FK_3dacab5c4a43cecc0e48f5edb12` (`supplier_id`),
  CONSTRAINT `FK_3dacab5c4a43cecc0e48f5edb12` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  CONSTRAINT `FK_405b14c8cebb7848b253939ac9d` FOREIGN KEY (`category_id`) REFERENCES `goods_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(50) NOT NULL,
  `area_code` varchar(50) NOT NULL,
  `area_name` varchar(100) NOT NULL,
  `address` varchar(50) NOT NULL,
  `manager` char(10) NOT NULL DEFAULT '',
  `tel` char(11) NOT NULL DEFAULT '',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` tinyint(4) NOT NULL DEFAULT 2,
  `supplier_name` varchar(50) NOT NULL,
  `linkman_name` varchar(10) NOT NULL DEFAULT '',
  `area_code` varchar(50) NOT NULL,
  `area_name` varchar(100) NOT NULL,
  `address` varchar(50) NOT NULL DEFAULT '',
  `supplier_type` tinyint(4) NOT NULL DEFAULT 0,
  `tax_no` char(18) DEFAULT NULL,
  `pay_type` char(10) NOT NULL,
  `account_no` varchar(24) NOT NULL,
  `bank_name` varchar(10) DEFAULT NULL,
  `bank_username` char(10) DEFAULT NULL,
  `bank_address` varchar(50) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `deleted_at` datetime DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `tel` char(11) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_1e6c4a92b7d2ea5db198f313ce5` (`category_id`),
  CONSTRAINT `FK_1e6c4a92b7d2ea5db198f313ce5` FOREIGN KEY (`category_id`) REFERENCES `goods_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(50) NOT NULL,
  `gender` tinyint(4) NOT NULL,
  `country` char(10) NOT NULL,
  `province` char(10) NOT NULL,
  `city` char(10) NOT NULL,
  `language` char(10) NOT NULL,
  `openid` char(28) NOT NULL,
  `unionid` char(29) DEFAULT NULL,
  `avatar_url` varchar(500) NOT NULL,
  `is_authorized` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_0fda9260b0aaff9a5b8f38ac16` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_coupons_coupon
-- ----------------------------
DROP TABLE IF EXISTS `user_coupons_coupon`;
CREATE TABLE `user_coupons_coupon` (
  `user_id` int(11) NOT NULL,
  `coupon_coupon_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`coupon_coupon_id`),
  KEY `FK_7305eceff3d22a639ba86b952a0` (`coupon_coupon_id`),
  CONSTRAINT `FK_7305eceff3d22a639ba86b952a0` FOREIGN KEY (`coupon_coupon_id`) REFERENCES `coupon` (`coupon_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8bc2897dedb1aeb042582155102` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
