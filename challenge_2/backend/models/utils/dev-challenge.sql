-- MySQL Script generated by MySQL Workbench
-- Fri Feb  2 13:00:15 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dev-challenge
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dev-challenge` ;

-- -----------------------------------------------------
-- Schema dev-challenge
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dev-challenge` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

-- -----------------------------------------------------
-- Table `dev-challenge`.`currency`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dev-challenge`.`currency` ;

CREATE TABLE IF NOT EXISTS `dev-challenge`.`currency` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `base` VARCHAR(45) NOT NULL,
  `counter` VARCHAR(45) NOT NULL,
  `rate` FLOAT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dev-challenge`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dev-challenge`.`user` ;

CREATE TABLE IF NOT EXISTS `dev-challenge`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;