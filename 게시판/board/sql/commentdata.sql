CREATE TABLE `commentdata` (
  `idx` int NOT NULL AUTO_INCREMENT COMMENT '댓글 번호',
  `idxBoard` int NOT NULL COMMENT '원글 번호',
  `poster` varchar(30) NOT NULL COMMENT '작성자명',
  `memNo` int DEFAULT '0' COMMENT '회원번호',
  `password` varchar(65) DEFAULT NULL COMMENT '비회원 댓글 수정, 삭제시 비밀번호',
  `content` text NOT NULL,
  `regDt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일시',
  `modDt` datetime DEFAULT NULL COMMENT '수정일시',
  PRIMARY KEY (`idx`),
  KEY `ix_idxBoard` (`idxBoard`),
  KEY `ix_memNo` (`memNo`),
  KEY `ix_regDt` (`regDt`),
  CONSTRAINT `commentdata_ibfk_1` FOREIGN KEY (`idxBoard`) REFERENCES `boarddata` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='댓글 작성 데이터'