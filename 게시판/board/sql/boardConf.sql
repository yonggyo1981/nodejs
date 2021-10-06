CREATE TABLE `board`.`boardconf` (
  `boardId` VARCHAR(20) NOT NULL COMMENT '게시판 아이디',
  `boardNm` VARCHAR(45) NOT NULL COMMENT '게시판 이름',
  `regDt` DATETIME NULL DEFAULT NOW() COMMENT '등록일시',
  `modDt` DATETIME NULL COMMENT '수정 일시',
  PRIMARY KEY (`boardId`))
COMMENT = '게시판 설정';
