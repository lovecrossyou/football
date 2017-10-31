```$xslt
CREATE TABLE `football`.`game_info` (
  `game_type` VARCHAR(10) NULL,
  `game_time` VARCHAR(20) NULL,
  `game_status` VARCHAR(10) NULL,
  `game_host` VARCHAR(25) NULL,
  `game_guest` VARCHAR(25) NULL,
  `game_result` VARCHAR(10) NULL,
  `game_win` VARCHAR(10) NULL,
  `game_even` VARCHAR(10) NULL,
  `game_lose` VARCHAR(10) NULL,
  `id` INT NOT NULL,
  `odd_url` VARCHAR(45) NULL,
  `history_url` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
```
  