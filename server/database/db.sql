/*
 Navicat Premium Data Transfer

 Source Server         : BookingSystem
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : roombookingsystem

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 22/02/2023 15:22:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for configuration
-- ----------------------------
DROP TABLE IF EXISTS `configuration`;
CREATE TABLE `configuration`  (
  `id` int NOT NULL COMMENT 'id',
  `rsa_private_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'rsa私匙',
  ` rsa_public_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'rsa公匙',
  `create_at` datetime NOT NULL COMMENT '创建时间',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of configuration
-- ----------------------------

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20230215031418-init-users.js');
INSERT INTO `sequelizemeta` VALUES ('20230215032324-init-user_profile.js');
INSERT INTO `sequelizemeta` VALUES ('20230221072100-init-configuration.js');

-- ----------------------------
-- Table structure for user_profile
-- ----------------------------
DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE `user_profile`  (
  `sid` int NOT NULL,
  `uid` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `avatar` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `faculties` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `profexxionalClass` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_profile
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `uid` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telephone` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `psd` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `role` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `create_time` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'd88af05b02673d74dc6139d2fd096208', '18716981998', 'c2862df043a11d71602617a5978d407d', 'administrators', '2023-02-15 11:56:09', '2023-02-22 06:37:17', NULL);

SET FOREIGN_KEY_CHECKS = 1;
