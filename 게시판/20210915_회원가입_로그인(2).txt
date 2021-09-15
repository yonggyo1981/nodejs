board.member 테이블 DDL
CREATE TABLE `member` (
  `memNo` int NOT NULL AUTO_INCREMENT COMMENT '회원번호',
  `memId` varchar(20) NOT NULL COMMENT '회원 아이디',
  `memNm` varchar(30) NOT NULL COMMENT '회원 이름',
  `memPw` varchar(65) NOT NULL,
  `email` varchar(80) DEFAULT NULL,
  `cellPhone` varchar(11) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0' COMMENT '관리자 여부  0 - 일반화원, 1 - 관리자',
  `regDt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '가입일시',
  `modDt` datetime DEFAULT NULL COMMENT '회원정보 수정일',
  PRIMARY KEY (`memNo`),
  UNIQUE KEY `memId_UNIQUE` (`memId`)
);