/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : electric_manage

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 23/04/2022 20:06:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for el_bill
-- ----------------------------
DROP TABLE IF EXISTS `el_bill`;
CREATE TABLE `el_bill` (
  `orderNum` varchar(100) NOT NULL,
  `payPrice` double(10,2) NOT NULL,
  `unitPrice` double(10,2) NOT NULL,
  `pay_time` datetime NOT NULL,
  `bid` int(100) NOT NULL,
  `uid` int(255) NOT NULL,
  PRIMARY KEY (`orderNum`) USING BTREE,
  KEY `ob_fk1` (`bid`),
  CONSTRAINT `ob_fk1` FOREIGN KEY (`bid`) REFERENCES `el_box` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of el_bill
-- ----------------------------
BEGIN;
INSERT INTO `el_bill` VALUES ('1650506139308', 1000.00, 3.20, '2022-04-21 00:00:00', 1, 2);
INSERT INTO `el_bill` VALUES ('1650506267784', 1000.00, 3.20, '2022-04-21 00:00:00', 1, 2);
INSERT INTO `el_bill` VALUES ('1650506308803', 1000.00, 3.20, '2022-04-21 00:00:00', 1, 2);
INSERT INTO `el_bill` VALUES ('1650614505401', 100.00, 3.00, '2022-04-22 00:00:00', 3, 2);
INSERT INTO `el_bill` VALUES ('1650705042122', 100.00, 3.00, '2022-04-23 05:10:42', 1, 2);
INSERT INTO `el_bill` VALUES ('1650705198315', 20.00, 3.00, '2022-04-23 05:13:18', 1, 2);
COMMIT;

-- ----------------------------
-- Table structure for el_box
-- ----------------------------
DROP TABLE IF EXISTS `el_box`;
CREATE TABLE `el_box` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `electric_total` double(10,2) NOT NULL,
  `electric_use` double(10,2) NOT NULL,
  `uid` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `bu_fk1` (`uid`),
  CONSTRAINT `bu_fk1` FOREIGN KEY (`uid`) REFERENCES `el_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of el_box
-- ----------------------------
BEGIN;
INSERT INTO `el_box` VALUES (1, 3352.50, 1020.00, 2, '用户设备1');
INSERT INTO `el_box` VALUES (3, 133.33, 20.00, 2, '设备2');
COMMIT;

-- ----------------------------
-- Table structure for el_house
-- ----------------------------
DROP TABLE IF EXISTS `el_house`;
CREATE TABLE `el_house` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `unit` int(100) NOT NULL,
  `floor` int(100) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of el_house
-- ----------------------------
BEGIN;
INSERT INTO `el_house` VALUES (2, 'xxxxx小区', 10, 20);
INSERT INTO `el_house` VALUES (3, 'xxxxx别墅', 10, 3);
INSERT INTO `el_house` VALUES (4, 'xxxxx花苑', 10, 10);
INSERT INTO `el_house` VALUES (5, 'xx市xx小区', 20, 20);
COMMIT;

-- ----------------------------
-- Table structure for el_price
-- ----------------------------
DROP TABLE IF EXISTS `el_price`;
CREATE TABLE `el_price` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `newPrice` double(10,2) NOT NULL,
  `oldPrice` double(10,2) NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of el_price
-- ----------------------------
BEGIN;
INSERT INTO `el_price` VALUES (1, 3.30, 3.50, '2022-04-20 11:30:00');
INSERT INTO `el_price` VALUES (2, 3.60, 3.80, '2022-04-20 11:50:10');
INSERT INTO `el_price` VALUES (3, 3.20, 3.60, '2022-04-20 01:25:16');
INSERT INTO `el_price` VALUES (4, 3.00, 3.60, '2022-04-21 10:44:49');
COMMIT;

-- ----------------------------
-- Table structure for el_user
-- ----------------------------
DROP TABLE IF EXISTS `el_user`;
CREATE TABLE `el_user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` int(10) NOT NULL,
  `create_time` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of el_user
-- ----------------------------
BEGIN;
INSERT INTO `el_user` VALUES (1, 'admin', '123456789', '13555555555', '北京市顺义区', 1, '2022-04-01');
INSERT INTO `el_user` VALUES (2, '用户1', '123456789', '13777777777', '上海市浦东新区', 0, '2022-04-20');
INSERT INTO `el_user` VALUES (3, '测试用户1', '123456789', '13566666666', '上海市浦东新区', 0, '2022-04-22');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
